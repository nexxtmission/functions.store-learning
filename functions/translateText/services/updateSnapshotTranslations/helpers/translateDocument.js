const extractFieldFromSnapshot = require('../../../helpers/extractFieldFromSnapshot');
const translateSingle = require('./translateSingle');
const translateMultiple = require('./translateMultiple');
const getConfig = require('../../getConfig');

const translateDocument = async (snapshot) => {
    const { languages, inputFieldName } = getConfig();
    const input = extractFieldFromSnapshot({
        snapshot,
        fieldName: inputFieldName,
    });

    if (typeof input === 'object') {
        return translateMultiple({ input, snapshot, languages });
    }

    return translateSingle({ input, snapshot, languages });
};

module.exports = translateDocument;
