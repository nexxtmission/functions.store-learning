const Logger = require('firebase-functions/lib/logger');
const { Translate } = require('@google-cloud/translate').v2;
const getConfig = require('./getConfig');

const instance = new Translate({
    projectId: getConfig().projectId,
});

const translateString = async (string, targetLanguage) => {
    try {
        const [translatedString] = await instance.translate(
            string,
            targetLanguage,
        );
        return translatedString;
    } catch (error) {
        Logger.error('ERROR_TRANSLATE_STRING', {
            message: error.toString(),
            params: { string, targetLanguage },
        });
        throw error;
    }
};

module.exports = translateString;
