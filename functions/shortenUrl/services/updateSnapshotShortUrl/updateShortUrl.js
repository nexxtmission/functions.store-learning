const admin = require('../admin');
const getConfig = require('../getConfig');

const updateShortUrl = async (snapshot, shortenedUrl) => {
    await admin.firestore().runTransaction((transaction) => {
        transaction.update(
            admin.firestore().doc(snapshot.ref.path),
            getConfig().shortUrlField,
            shortenedUrl,
        );
        return Promise.resolve();
    });
};

module.exports = updateShortUrl;
