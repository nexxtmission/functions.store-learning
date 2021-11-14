const translateDocument = require('../translateDocument');
const extractFieldFromSnapshot = require('../../../../helpers/extractFieldFromSnapshot');
const translateSingle = require('../translateSingle');
const translateMultiple = require('../translateMultiple');

jest.mock('../../../getConfig', () => jest.fn(() => ({
    languages: ['en'],
    inputFieldName: 'field',
})));
jest.mock('../../../../helpers/extractFieldFromSnapshot', () => jest.fn(() => 'field'));
jest.mock('../translateSingle', () => jest.fn());
jest.mock('../translateMultiple', () => jest.fn());

describe('translateDocument()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should execute translation for single field', async () => {
        await translateDocument('snapshot');
        expect(extractFieldFromSnapshot).toHaveBeenCalledWith({
            snapshot: 'snapshot',
            fieldName: 'field',
        });
        expect(translateMultiple).not.toHaveBeenCalled();
        expect(translateSingle).toHaveBeenCalledWith({
            input: 'field',
            snapshot: 'snapshot',
            languages: ['en'],
        });
    });
    it('should execute translation for multiple fields', async () => {
        extractFieldFromSnapshot.mockReturnValue({ prop1: null, prop2: null });
        await translateDocument('snapshot');
        expect(extractFieldFromSnapshot).toHaveBeenCalledWith({
            snapshot: 'snapshot',
            fieldName: 'field',
        });
        expect(translateMultiple).toHaveBeenCalledWith({
            input: { prop1: null, prop2: null },
            snapshot: 'snapshot',
            languages: ['en'],
        });
        expect(translateSingle).not.toHaveBeenCalled();
    });
});
