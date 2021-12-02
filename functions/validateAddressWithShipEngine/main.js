const functions = require('firebase-functions');
const mapDataAccordingToSchema = require('./helpers/mapDataAccordingToSchema');
const validateAddress = require('./services/validateAddress');
const config = require('./services/getConfig');

const validateAddressWithShipEngine = async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'This function requires authentication.',
        );
    }
    const { fieldsMapping } = config;
    const params = mapDataAccordingToSchema(data, fieldsMapping);
    const result = await validateAddress(params);
    return result;
};

module.exports = validateAddressWithShipEngine;
