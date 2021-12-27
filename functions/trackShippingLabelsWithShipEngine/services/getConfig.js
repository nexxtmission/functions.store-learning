const parseJson = require('../helpers/parseJson');

const getConfig = () => ({
    shipEngineApiKey: process.env.SHIPENGINE_API_KEY,
    inputSchema: parseJson(process.env.INPUT_DATA_MAPPING),
    outputSchema: parseJson(process.env.OUTPUT_DATA_MAPPING),
    collectionPath: process.env.COLLECTION_PATH,
    trackingResultFieldName: process.env.TRACKING_RESULT_FIELD_NAME,
});

module.exports = getConfig;
