const Logger = require('firebase-functions/lib/logger');
const getConfig = require('./services/getConfig');
const isSameField = require('./validators/isSameField');
const isTranslationPath = require('./validators/isTranslationPath');
const updateSnapshotTranslations = require('./services/updateSnapshotTranslations');

const translateText = async (snapshot) => {
    const { languages, inputFieldName, outputFieldName } = getConfig();
    if (isSameField(inputFieldName, outputFieldName)) {
        Logger.error('ERROR_TRANSLATE_TEXT', {
            message: 'The `Input` and `Output` field names must not be the same',
            params: { inputFieldName, outputFieldName },
        });
        return;
    }

    if (isTranslationPath(inputFieldName, outputFieldName, languages)) {
        Logger.error('ERROR_TRANSLATE_TEXT', {
            message: 'The `Input` field name must not be the same as an `Output` path.',
            params: { inputFieldName, outputFieldName },
        });
        return;
    }

    try {
        await updateSnapshotTranslations(snapshot);
    } catch (error) {
        Logger.error('ERROR_TRANSLATE_TEXT', {
            message: error.toString(),
        });
    }
};

module.exports = translateText;
