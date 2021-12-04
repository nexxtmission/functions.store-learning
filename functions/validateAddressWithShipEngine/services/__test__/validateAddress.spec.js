const validateAddress = require('../validateAddress');
const shipengine = require('../shipengine');

jest.mock('../shipengine', () => ({
    validateAddresses: jest.fn(),
}));
jest.mock('../getConfig', () => jest.fn(() => ({
    validationFieldName: 'validation',
})));

const params = {
    name: 'John Smith',
    addressLine1: '200 Sunrise Mall',
    cityLocality: 'Massapequa',
    stateProvince: 'NY',
    postalCode: '11758',
    countryCode: 'US',
};

describe('validateAddress()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should call ShipEngine API with right params', async () => {
        expect.assertions(1);
        await validateAddress(params);
        expect(shipengine.validateAddresses).toHaveBeenCalledWith([params]);
    });
    it('should return validation data from ShipEngine', async () => {
        expect.assertions(1);
        shipengine.validateAddresses.mockReturnValue(Promise.resolve(['validation result']));
        const result = await validateAddress(params);
        expect(result).toEqual({ validation: 'validation result' });
    });
    it('should return error if validation fails', async () => {
        expect.assertions(1);
        shipengine.validateAddresses.mockReturnValue(Promise.reject(new Error('something happened')));
        const result = await validateAddress(params);
        expect(result).toEqual({ validation: { error: 'something happened' } });
    });
});
