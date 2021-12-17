const Logger = require('firebase-functions/lib/logger');
const functions = require('firebase-functions');
const shipEngine = require('./shipengine');

const validateAddress = async (params) => {
    try {
        const [result] = await shipEngine.validateAddresses([params]);
        return result;
    } catch (error) {
        Logger.error('VALIDATE_ADDRESS', {
            errorMessage: error.message,
            params,
        });
        throw new functions.https.HttpsError(
            'unknown',
            error.message,
        );
    }
};

module.exports = validateAddress;
