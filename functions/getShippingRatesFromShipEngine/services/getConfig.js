const getConfig = () => ({
    shipEngineApiKey: process.env.SHIPENGINE_API_KEY,
    ratesFieldName: process.env.RATES_FIELD_NAME || 'rates',
    carriersIds: JSON.parse(process.env.CARRIERS_IDS || '[]'),
});

module.exports = getConfig;
