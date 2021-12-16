const functions = require('firebase-functions');
const calculateShippingRates = require('./services/calculateShippingRates');
const getConfig = require('./services/getConfig');

const getShippingRatesFromShipEngine = async (data) => {
    const { shipment, shipmentId } = data;
    if (!!shipment && !!shipmentId) {
        throw new functions.https.HttpsError(
            'failed_precondition',
            'You must specify either `shipment` or `shipmentId` but not both.',
        );
    }

    const { carriersIds } = getConfig();
    const result = await calculateShippingRates({
        shipmentData: data,
        carriers: carriersIds,
    });
    return result;
};

module.exports = getShippingRatesFromShipEngine;
