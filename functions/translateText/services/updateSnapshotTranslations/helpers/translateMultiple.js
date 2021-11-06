const Logger = require('firebase-functions/lib/logger');
const translateString = require('../../translateString');
const updateTranslations = require('./updateTranslations');

const translateMultiple = async ({
    input, snapshot, languages,
}) => {
    const translations = {};
    const promises = [];
    Object.entries(input).forEach(([field, value]) => {
        languages.forEach((language) => {
            promises.push(async () => {
                const output = typeof value === 'string'
                    ? await translateString(value, language)
                    : null;

                if (!translations[field]) translations[field] = {};
                translations[field][language] = output;
            });
        });
    });
    try {
        await Promise.all(promises);
        await updateTranslations(snapshot, translations);
    } catch (error) {
        Logger.error('ERROR_TRANSLATE_MULTIPLE', {
            message: error.message,
            params: {
                fields: input,
                translations,
                languages,
                snapshot: snapshot.id,
            },
        });
        throw error;
    }
};

module.exports = translateMultiple;
