const admin = require('./admin');
const getConfig = require('./getConfig');

const updateDocument = async (trackingNumber, data) => {
    const { collectionPath } = getConfig();
    if (trackingNumber) {
        return admin
            .firestore()
            .collection(collectionPath)
            .doc(trackingNumber)
            .set(data, { merge: true });
    }

    return Promise.resolve();
};

module.exports = updateDocument;
