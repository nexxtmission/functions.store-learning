const Logger = require('firebase-functions/lib/logger');
const extractUserPaths = require('../helpers/extractUserPaths');
const admin = require('./admin');

const deleteDataFromFirestore = async ({ paths: firestorePaths, uid, recursive }) => {
    const paths = extractUserPaths(firestorePaths, uid);
    const promises = paths.map(async (path) => {
        try {
            const firestore = admin.firestore();
            if (!recursive) {
                await firestore.runTransaction((transaction) => {
                    transaction.delete(firestore.doc(path));
                    return Promise.resolve();
                });
            } else {
                firestore.recursiveDelete(firestore.doc(path));
            }
        } catch (error) {
            Logger.error('ERROR_DELETE_DATA_FROM_FIRESTORE', {
                message: error.message,
                params: { paths },
            });
        }
    });

    await Promise.all(promises);
};

module.exports = deleteDataFromFirestore;
