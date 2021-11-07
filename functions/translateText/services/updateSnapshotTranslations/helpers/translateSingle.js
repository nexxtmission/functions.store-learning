const Logger = require('firebase-functions/lib/logger');
const translateString = require('../../translateString');
const updateTranslations = require('./updateTranslations');

const translateSingle = async ({
    input, snapshot, languages,
}) => {
    try {
        const tasks = languages.map(async (targetLanguage) => ({
            language: targetLanguage,
            output: await translateString(input, targetLanguage),
        }));

        const translations = await Promise.all(tasks);
        const translationsMap = translations.reduce(
            (output, translation) => ({
                ...output,
                [translation.language]: translation.output,
            }),
            {},
        );
        await updateTranslations(snapshot, translationsMap);
    } catch (error) {
        Logger.error('ERROR_TRANSLATE_SINGLE', {
            message: error.toString(),
            params: { field: input, snapshot: snapshot.id },
        });
        throw error;
    }
};

module.exports = translateSingle;
