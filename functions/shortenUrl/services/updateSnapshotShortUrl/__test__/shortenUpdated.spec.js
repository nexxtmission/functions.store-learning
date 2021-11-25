const shortenUpdated = require('../shortenUpdated');
const extractFieldFromSnapshot = require('../../../helpers/extractFieldFromSnapshot');
const shortenUrl = require('../../bitly/shorten');
const updateShortUrl = require('../updateShortUrl');

const config = {
    longUrlField: 'input',
};

const snapshot = {
    before: 'before',
    after: 'after',
};

jest.mock('../../getConfig', () => jest.fn(() => config));
jest.mock('../../../helpers/extractFieldFromSnapshot', () => jest.fn());
jest.mock('../../bitly/shorten', () => jest.fn());
jest.mock('../updateShortUrl', () => jest.fn());
jest.mock('../../admin', () => ({
    firestore: {
        FieldValue: {
            delete: jest.fn(() => null),
        },
    },
}));

describe('shortenUpdated()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should not update snapshot with shortened url if value for longUrl field is undefined', async () => {
        expect.assertions(2);
        extractFieldFromSnapshot.mockReturnValue(undefined);
        await shortenUpdated(snapshot.before, snapshot.after);
        expect(shortenUrl).not.toHaveBeenCalled();
        expect(updateShortUrl).not.toHaveBeenCalled();
    });
    it('should remove shortUrl field if it have a non string value', async () => {
        expect.assertions(2);
        extractFieldFromSnapshot.mockReturnValue(3);
        await shortenUpdated(snapshot.before, snapshot.after);
        expect(updateShortUrl).toHaveBeenCalledWith('after', null);
        expect(shortenUrl).not.toHaveBeenCalled();
    });

    it('should not update snapshot with shortened url if value for longUrl (before and after) are the same', async () => {
        expect.assertions(2);
        extractFieldFromSnapshot.mockReturnValue('value');
        await shortenUpdated(snapshot.before, snapshot.after);
        expect(shortenUrl).not.toHaveBeenCalled();
        expect(updateShortUrl).not.toHaveBeenCalled();
    });

    it('should update snapshot with shortened', async () => {
        expect.assertions(2);
        extractFieldFromSnapshot.mockImplementation(({ snapshot: snapshotArg }) => {
            const fields = { before: 'url1', after: 'url2' };
            return fields[snapshotArg];
        });
        shortenUrl.mockReturnValue('short');
        await shortenUpdated(snapshot.before, snapshot.after);
        expect(shortenUrl).toHaveBeenCalledWith('url2');
        expect(updateShortUrl).toHaveBeenCalledWith(snapshot.after, 'short');
    });
});
