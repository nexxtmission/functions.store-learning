const shortenCreated = require('../shortenCreated');
const extractFieldFromSnapshot = require('../../../helpers/extractFieldFromSnapshot');
const shortenUrl = require('../../bitly/shorten');
const updateShortUrl = require('../updateShortUrl');

const config = {
    longUrlField: 'url',
};

jest.mock('../../getConfig', () => jest.fn(() => config));
jest.mock('../../../helpers/extractFieldFromSnapshot', () => jest.fn());
jest.mock('../../bitly/shorten', () => jest.fn());
jest.mock('../updateShortUrl', () => jest.fn());

describe('shortenCreated()', () => {
    beforeAll(() => jest.clearAllMocks());
    it('should not update snapshot with shortened url', async () => {
        expect.assertions(2);
        extractFieldFromSnapshot.mockReturnValue(null);
        await shortenCreated('snapshot');
        expect(shortenUrl).not.toHaveBeenCalled();
        expect(updateShortUrl).not.toHaveBeenCalled();
    });
    it('should update snapshot with shortened url', async () => {
        expect.assertions(2);
        extractFieldFromSnapshot.mockReturnValue('url');
        shortenUrl.mockReturnValue('short');
        await shortenCreated('snapshot');
        expect(shortenUrl).toHaveBeenCalledWith('url');
        expect(updateShortUrl).toHaveBeenCalledWith('snapshot', 'short');
    });
});
