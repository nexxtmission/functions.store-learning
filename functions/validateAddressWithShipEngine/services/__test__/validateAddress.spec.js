const Logger = require('firebase-functions/lib/logger');
const validateAddress = require('../validateAddress');
const shipengine = require('../shipengine');

jest.mock('firebase-functions/lib/logger');
jest.mock('../shipengine', () => ({
    validateAddresses: jest.fn(() => Promise.resolve(['validation result'])),
}));

Logger.error = jest.fn();

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
        const result = await validateAddress(params);
        expect(result).toBe('validation result');
    });
    it('should throw error if validation fails', async () => {
        expect.assertions(1);
        shipengine.validateAddresses.mockReturnValue(Promise.reject(new Error('something happened')));
        await expect(validateAddress(params)).rejects.toThrow();
    });
});
