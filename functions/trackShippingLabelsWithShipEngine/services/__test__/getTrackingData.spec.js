const trackShipmentUsingLabel = require('../trackShipmentUsingLabel');
const trackShipmentUsingCarrierAndTracking = require('../trackShipmentUsingCarrierAndTracking');
const getTrackingData = require('../getTrackingData');

jest.mock('firebase-functions/lib/logger');
jest.mock('../trackShipmentUsingLabel', () => jest.fn(
    () => Promise.resolve({}),
));
jest.mock('../trackShipmentUsingCarrierAndTracking', () => jest.fn(
    () => Promise.resolve({}),
));

describe('getTrackingData()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should return empty object', async () => {
        expect.assertions(3);
        const result = await getTrackingData({});
        expect(trackShipmentUsingLabel).not.toHaveBeenCalled();
        expect(trackShipmentUsingCarrierAndTracking).not.toHaveBeenCalled();
        expect(result).toEqual({});
    });
    it('should get tracking data using label', async () => {
        expect.assertions(1);
        await getTrackingData({ labelId: 'se-123' });
        expect(trackShipmentUsingLabel).toHaveBeenCalledWith('se-123');
    });
    it('get tracking data using carrier and tracking number', async () => {
        expect.assertions(1);
        await getTrackingData({
            carrierCode: 'se-123',
            trackingNumber: 123,
        });
        expect(trackShipmentUsingCarrierAndTracking).toHaveBeenCalledWith(
            {
                carrierCode: 'se-123',
                trackingNumber: 123,
            },
        );
    });
    it('should throw error if unable to get tracking data using label', async () => {
        expect.assertions(1);
        trackShipmentUsingLabel.mockReturnValue(Promise.reject(new Error('something happened')));
        await expect(
            getTrackingData({ labelId: 'se-123' }),
        ).rejects.toThrow();
    });
    it('should throw error if unable to get tracking data using carrier and tracking number', async () => {
        expect.assertions(1);
        trackShipmentUsingCarrierAndTracking.mockReturnValue(Promise.reject(new Error('something happened')));
        await expect(
            getTrackingData({ carrierCode: 'se-123', trackingNumber: 123 }),
        ).rejects.toThrow();
    });
});
