const admin = require('../admin');
const extractFieldFromSnapshot = require('../../helpers/extractFieldFromSnapshot');
const translateDocument = require('./helpers/translateDocument');
const updateTranslations = require('./helpers/updateTranslations');
const getConfig = require('../getConfig');

const translateUpdated = async (before, after) => {
    const { inputFieldName } = getConfig();
    const inputBefore = extractFieldFromSnapshot({ snapshot: before, fieldName: inputFieldName });
    const inputAfter = extractFieldFromSnapshot({ snapshot: after, fieldName: inputFieldName });

    if (inputBefore === undefined && inputAfter === undefined) {
        return;
    }

    if (typeof inputAfter !== 'string' && typeof inputAfter !== 'object') {
        await updateTranslations(after, admin.firestore.FieldValue.delete());
        return;
    }

    if (JSON.stringify(inputBefore) !== JSON.stringify(inputAfter)) {
        await translateDocument(after);
    }
};

module.exports = translateUpdated;
