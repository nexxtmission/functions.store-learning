const functions = require('firebase-functions');
const Logger = require('firebase-functions/lib/logger');
const trackShipmentUsingLabel = require('./trackShipmentUsingLabel');
const trackShipmentUsingCarrierAndTracking = require('./trackShipmentUsingCarrierAndTracking');

const getTrackingData = async (params) => {
    try {
        const { labelId, trackingNumber, carrierCode } = params || {};
        if (labelId) {
            return trackShipmentUsingLabel(labelId);
        }
        if (trackingNumber && carrierCode) {
            return trackShipmentUsingCarrierAndTracking({
                trackingNumber,
                carrierCode,
            });
        }
        return {};
    } catch (error) {
        Logger.error('GET_TRACKING_DATA', {
            errorMessage: error.message,
            params,
        });
        throw new functions.https.HttpsError(
            'unknown',
            error.message,
        );
    }
};

module.exports = getTrackingData;
