const shipEngine = require('./shipengine');
const config = require('./getConfig');

const validateAddress = async (params) => {
    try {
        const [result] = await shipEngine.validateAddresses([params]);
        return { [config.validationFieldName]: result };
    } catch (error) {
        return {
            [config.validationFieldName]: {
                error: error.message,
            },
        };
    }
};

module.exports = validateAddress;
