const getConfig = () => ({
    shipEngineApiKey: process.env.SHIPENGINE_API_KEY,
    fieldsMapping: JSON.parse(process.env.DATA_MAPPING),
});

module.exports = getConfig;
