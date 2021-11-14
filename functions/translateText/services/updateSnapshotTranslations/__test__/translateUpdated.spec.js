const translateUpdated = require('../translateUpdated');
const extractFieldFromSnapshot = require('../../../helpers/extractFieldFromSnapshot');
const translateDocument = require('../helpers/translateDocument');
const updateTranslations = require('../helpers/updateTranslations');

const config = {
    inputFieldName: 'input',
};

const snapshot = {
    before: 'before',
    after: 'after',
};

jest.mock('../../getConfig', () => jest.fn(() => config));
jest.mock('../../../helpers/extractFieldFromSnapshot', () => jest.fn());
jest.mock('../helpers/translateDocument', () => jest.fn());
jest.mock('../helpers/updateTranslations', () => jest.fn());
jest.mock('../../admin', () => ({
    firestore: {
        FieldValue: {
            delete: jest.fn(),
        },
    },
}));

describe('translateUpdated()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should not translate document if value for input field is undefined', async () => {
        extractFieldFromSnapshot.mockReturnValue(undefined);
        await translateUpdated(snapshot.before, snapshot.after);
        expect(translateDocument).not.toHaveBeenCalled();
        expect(updateTranslations).not.toHaveBeenCalled();
    });
    it('should remove output field if it have a non string or object value', async () => {
        extractFieldFromSnapshot.mockReturnValue(3);
        await translateUpdated(snapshot.before, snapshot.after);
        expect(updateTranslations).toHaveBeenCalled();
        expect(translateDocument).not.toHaveBeenCalled();
    });

    it('should not translate document if value for inputs (before and after) are the same', async () => {
        extractFieldFromSnapshot.mockReturnValue('value');
        await translateUpdated(snapshot.before, snapshot.after);
        expect(translateDocument).not.toHaveBeenCalled();
        expect(updateTranslations).not.toHaveBeenCalled();
    });

    it('should translate document', async () => {
        extractFieldFromSnapshot.mockImplementation(({ snapshot: snapshotArg }) => {
            const fields = { before: 'field1', after: 'field2' };
            return fields[snapshotArg];
        });
        await translateUpdated(snapshot.before, snapshot.after);
        expect(updateTranslations).not.toHaveBeenCalled();
        expect(translateDocument).toHaveBeenCalledWith(snapshot.after);
    });
});
