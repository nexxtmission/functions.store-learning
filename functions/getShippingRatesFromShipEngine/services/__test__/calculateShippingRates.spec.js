const Logger = require('firebase-functions/lib/logger');
const calculateShippingRates = require('../calculateShippingRates');
const shipengine = require('../shipengine');

jest.mock('firebase-functions/lib/logger');
jest.mock('../shipengine', () => ({
    getRatesWithShipmentDetails: jest.fn(
        () => Promise.resolve({ rateResponse: 'calculated rates' }),
    ),
}));

Logger.error = jest.fn();

describe('calculateShippingRates()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should call ShipEngine API with right params', async () => {
        expect.assertions(2);

        const shipments = [
            {
                shipmentId: 'se-123',
            },
            {
                shipmentId: 'se-123',
                rateOptions: {
                    serviceCodes: [
                        'usps_first_class_mail',
                        'usps_priority_mail',
                        'ups_next_day_air_early_am',
                    ],
                    packageTypes: [
                        'flat_rate_envelope',
                        'medium_flat_rate_box',
                    ],
                },
            },
        ];

        const params = [
            {
                shipmentId: 'se-123',
                rateOptions: { carrierIds: ['se-123456'] },
            },
            {
                shipmentId: 'se-123',
                rateOptions: {
                    carrierIds: ['se-123456'],
                    serviceCodes: [
                        'usps_first_class_mail',
                        'usps_priority_mail',
                        'ups_next_day_air_early_am',
                    ],
                    packageTypes: [
                        'flat_rate_envelope',
                        'medium_flat_rate_box',
                    ],
                },
            },
        ];

        shipments.forEach(async (shipmentData, index) => {
            await calculateShippingRates({
                shipmentData,
                carriers: ['se-123456'],
            });
            expect(shipengine.getRatesWithShipmentDetails)
                .toHaveBeenCalledWith(params[index]);
        });
    });
    it('should return validation data from ShipEngine', async () => {
        expect.assertions(1);
        const result = await calculateShippingRates({
            shipmentData: { shipmentId: 'se-123' },
            carriers: ['se-123456'],
        });
        expect(result).toBe('calculated rates');
    });
    it('should return error if validation fails', async () => {
        expect.assertions(1);
        shipengine.getRatesWithShipmentDetails.mockReturnValue(Promise.reject(new Error('something happened')));
        await expect(calculateShippingRates({
            shipmentData: { shipmentId: 'se-123' },
            carriers: ['se-123456'],
        })).rejects.toThrow();
    });
});
