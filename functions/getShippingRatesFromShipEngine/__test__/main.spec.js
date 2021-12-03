const getShippingRatesFromShipEngine = require('../main');
const calculateShippingRates = require('../services/calculateShippingRates');

jest.mock('../services/calculateShippingRates', () => jest.fn());
jest.mock('../services/getConfig', () => ({
    carriersIds: ['se-123456'],
    ratesFieldName: 'rates',
}));

describe('getShippingRatesFromShipEngine()', () => {
    it('should not calculate shipping rates if auth fails', async () => {
        expect.assertions(1);
        await expect(getShippingRatesFromShipEngine({}, {})).rejects.toThrow();
    });
    it('should not calculate shipping rates if both shipment and shipmentId are passed', async () => {
        expect.assertions(1);
        await expect(
            getShippingRatesFromShipEngine(
                { shipment: {}, shipmentId: 'se-123' },
                { auth: { uid: '123' } },
            ),
        ).rejects.toThrow();
    });
    it('should calculate shipping rates', async () => {
        expect.assertions(1);
        calculateShippingRates.mockReturnValue(Promise.resolve('rates'));
        const result = await getShippingRatesFromShipEngine({}, { auth: { uid: '123' } });
        expect(result).toBe('rates');
    });
});
