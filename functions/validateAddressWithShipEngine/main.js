const mapDataAccordingToSchema = require('./helpers/mapDataAccordingToSchema');
const validateAddress = require('./services/validateAddress');
const getConfig = require('./services/getConfig');

const validateAddressWithShipEngine = async (data) => {
    const { fieldsMapping } = getConfig();
    const params = mapDataAccordingToSchema(data, fieldsMapping);
    const result = await validateAddress(params);
    return result;
};

module.exports = validateAddressWithShipEngine;
