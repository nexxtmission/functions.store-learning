const getConfig = () => ({
    shipEngineApiKey: process.env.SHIPENGINE_API_KEY,
    carriersIds: JSON.parse(process.env.CARRIERS_IDS || '[]'),
});

module.exports = getConfig;
