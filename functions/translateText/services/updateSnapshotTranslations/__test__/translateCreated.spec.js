const translateCreated = require('../translateCreated');
const extractFieldFromSnapshot = require('../../../helpers/extractFieldFromSnapshot');
const translateDocument = require('../helpers/translateDocument');

const config = {
    inputFieldName: 'input',
};

jest.mock('../../getConfig', () => jest.fn(() => config));
jest.mock('../../../helpers/extractFieldFromSnapshot', () => jest.fn());
jest.mock('../helpers/translateDocument', () => jest.fn());

describe('translateCreated()', () => {
    beforeAll(() => jest.clearAllMocks());
    it('should not translate document', async () => {
        expect.assertions(1);
        extractFieldFromSnapshot.mockReturnValue(null);
        await translateCreated('snapshot');
        expect(translateDocument).not.toHaveBeenCalled();
    });
    it('should translate document', async () => {
        expect.assertions(1);
        extractFieldFromSnapshot.mockReturnValue('input');
        await translateCreated('snapshot');
        expect(translateDocument).not.toHaveBeenCalledWith({
            snapshot: 'snapshot',
            fieldName: 'input',
        });
    });
});
