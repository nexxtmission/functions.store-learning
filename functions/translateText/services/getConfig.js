const getLanguagesList = require('../helpers/getLanguagesList');
const getProjectId = require('../helpers/getProjectId');

const getConfig = () => ({
    projectId: getProjectId(process.env),
    languages: getLanguagesList(process.env.LANGUAGES),
    inputFieldName: process.env.INPUT_FIELD_NAME,
    outputFieldName: process.env.OUTPUT_FIELD_NAME,
});

module.exports = getConfig;
