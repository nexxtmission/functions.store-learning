const getConfig = require('./services/getConfig');
const deleteDataFromFirestore = require('./services/deleteDataFromFirestore');
const deleteDataFromRealtimeDatabase = require('./services/deleteDataFromRealtimeDatabase');
const deleteDataFromStorage = require('./services/deleteDataFromStorage');

const deleteUserData = async (userRecord) => {
    const { uid } = userRecord;
    const {
        firestorePaths,
        firestoreDeleteRecursive,
        realtimeDatabasePaths,
        storagePaths,
        storageDefaultBucket,
    } = getConfig();
    const promises = [];

    if (firestorePaths) {
        promises.push(deleteDataFromFirestore({
            uid,
            paths: firestorePaths,
            recursive: firestoreDeleteRecursive,
        }));
    }

    if (realtimeDatabasePaths) {
        promises.push(deleteDataFromRealtimeDatabase({
            uid,
            paths: realtimeDatabasePaths,
        }));
    }

    if (storagePaths) {
        promises.push(deleteDataFromStorage({
            uid,
            paths: storagePaths,
            defaultBucketName: storageDefaultBucket,
        }));
    }

    await Promise.all(promises);
};

module.exports = deleteUserData;
