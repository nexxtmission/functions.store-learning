const isTranslationPath = (
    inputFieldName, outputFieldName, languages,
) => languages.some((language) => inputFieldName === `${outputFieldName}.${language}`);

module.exports = isTranslationPath;
