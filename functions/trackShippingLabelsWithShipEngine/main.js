const getConfig = require('./services/getConfig');
const mapDataAccordingToSchema = require('./helpers/mapDataAccordingToSchema');
const getTrackingData = require('./services/getTrackingData');
const updateDocument = require('./services/updateDocument');

const trackShippingLabelsWithShipEngine = async (data) => {
    const { inputSchema, outputSchema } = getConfig();
    const params = mapDataAccordingToSchema(data, inputSchema);
    const trackingData = await getTrackingData(params);
    const mappedResult = mapDataAccordingToSchema(trackingData, outputSchema);
    const { trackingNumber } = trackingData;
    await updateDocument(trackingNumber, mappedResult);
    return mappedResult;
};

module.exports = trackShippingLabelsWithShipEngine;
