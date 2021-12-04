const validateAddressWithShipEngine = require('../main');
const mapDataAccordingToSchema = require('../helpers/mapDataAccordingToSchema');
const validateAddress = require('../services/validateAddress');

jest.mock('../helpers/mapDataAccordingToSchema', () => jest.fn());
jest.mock('../services/validateAddress', () => jest.fn());
jest.mock('../services/getConfig', () => ({
    fieldsMapping: 'mappingSchema',
}));

describe('validateAddressWithShipEngine()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should validate address', async () => {
        expect.assertions(2);
        mapDataAccordingToSchema.mockReturnValue('data mapped');
        validateAddress.mockReturnValue(Promise.resolve('validatedData'));
        const result = await validateAddressWithShipEngine({}, { auth: { uid: '123' } });
        expect(validateAddress).toHaveBeenCalledWith('data mapped');
        expect(result).toBe('validatedData');
    });
});
