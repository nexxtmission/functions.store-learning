const shipEngine = require('./shipengine');
const getConfig = require('./getConfig');

const validateAddress = async (params) => {
    const { validationFieldName } = getConfig();
    try {
        const [result] = await shipEngine.validateAddresses([params]);
        return { [validationFieldName]: result };
    } catch (error) {
        return {
            [validationFieldName]: {
                error: error.message,
            },
        };
    }
};

module.exports = validateAddress;
