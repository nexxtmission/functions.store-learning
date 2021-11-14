const admin = require('../../admin');
const getConfig = require('../../getConfig');

const updateTranslations = async (snapshot, translations) => {
    await admin.firestore().runTransaction((transaction) => {
        transaction.update(
            snapshot.ref,
            getConfig().outputFieldName,
            translations,
        );
        return Promise.resolve();
    });
};

module.exports = updateTranslations;
