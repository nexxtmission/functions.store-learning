const getConfig = () => ({
    firestorePaths: process.env.FIRESTORE_PATHS,
    firestoreDeleteRecursive: process.env.FIRESTORE_DELETE_RECURSIVE,
    realtimeDatabaseInstance: process.env.REALTIME_DATABASE_INSTANCE,
    realtimeDatabasePaths: process.env.REALTIME_DATABASE_PATHS,
    storageDefaultBucket: process.env.STORAGE_DEFAULT_BUCKET,
    storagePaths: process.env.STORAGE_PATHS,
});

module.exports = getConfig;
