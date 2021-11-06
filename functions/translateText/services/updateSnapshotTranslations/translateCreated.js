const extractFieldFromSnapshot = require('../../helpers/extractFieldFromSnapshot');
const translateDocument = require('./helpers/translateDocument');
const getConfig = require('../getConfig');

const translateCreated = async (snapshot) => {
    const { inputFieldName } = getConfig();
    const input = extractFieldFromSnapshot({ snapshot, fieldName: inputFieldName });
    if (input) {
        await translateDocument(snapshot);
    }
};

module.exports = translateCreated;
