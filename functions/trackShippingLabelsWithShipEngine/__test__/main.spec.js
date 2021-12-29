const trackShippingLabelsWithShipEngine = require('../main');
const getTrackingData = require('../services/getTrackingData');
const updateDocument = require('../services/updateDocument');

jest.mock('../services/getTrackingData', () => jest.fn());
jest.mock('../services/updateDocument', () => jest.fn());
jest.mock('../services/getConfig', () => jest.fn(() => ({
    inputSchema: { labelId: 'label.id' },
    outputSchema: { trackingLabel: 'result.label' },
})));

describe('trackShippingLabelsWithShipEngine()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should return tracking label', async () => {
        expect.assertions(3);
        getTrackingData.mockReturnValue(
            Promise.resolve({
                trackingNumber: '1111111111',
                result: {
                    label: 'tracking label',
                },
            }),
        );
        const result = await trackShippingLabelsWithShipEngine({
            label: { id: 'se-123' },
        });
        expect(getTrackingData).toHaveBeenCalledWith({ labelId: 'se-123' });
        expect(updateDocument).toHaveBeenCalledWith(
            '1111111111',
            { trackingLabel: 'tracking label' },
        );
        expect(result).toEqual({ trackingLabel: 'tracking label' });
    });
    it('should throw error if something fails', async () => {
        expect.assertions(2);
        getTrackingData.mockReturnValue(Promise.reject(new Error('something happened')));
        await expect(
            trackShippingLabelsWithShipEngine({}),
        ).rejects.toThrow();
        expect(updateDocument).not.toHaveBeenCalledWith();
    });
});
