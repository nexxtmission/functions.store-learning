const get = require('lodash.get');
const shipEngine = require('./shipengine');

const calculateShippingRates = async ({ shipmentData, carriers, ratesKey }) => {
    try {
        const { rateOptions, ...shipmentOptions } = shipmentData;
        const result = await shipEngine.getRatesWithShipmentDetails({
            ...shipmentOptions,
            rateOptions: {
                ...rateOptions,
                carrierIds: carriers,
            },
        });
        const rates = get(result, 'rateResponse.rates');
        return { [ratesKey]: rates };
    } catch (error) {
        return {
            [ratesKey]: {
                error: error.message,
            },
        };
    }
};

module.exports = calculateShippingRates;
