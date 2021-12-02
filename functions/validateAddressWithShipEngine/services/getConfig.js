const getConfig = () => ({
    shipEngineApiKey: process.env.SHIPENGINE_API_KEY,
    validationFieldName: process.env.VALIDATION_FIELD_NAME || 'validation',
    fieldsMapping: JSON.parse(process.env.DATA_MAPPING),
});

module.exports = getConfig();
