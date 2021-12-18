const functions = require('firebase-functions');
const Logger = require('firebase-functions/lib/logger');
const get = require('lodash.get');
const shipEngine = require('./shipengine');

const calculateShippingRates = async ({ shipmentData, carriers }) => {
    try {
        const { rateOptions, ...shipmentOptions } = shipmentData;
        const result = await shipEngine.getRatesWithShipmentDetails({
            ...shipmentOptions,
            rateOptions: {
                ...rateOptions,
                carrierIds: carriers,
            },
        });
        return get(result, 'rateResponse');
    } catch (error) {
        Logger.error('CALCULATE_SHIPPING_RATES', {
            errorMessage: error.message,
            params: shipmentData,
        });
        throw new functions.https.HttpsError(
            'unknown',
            error.message,
        );
    }
};

module.exports = calculateShippingRates;
