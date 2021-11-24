const Logger = require('firebase-functions/lib/logger');
const admin = require('./admin');
const extractUserPaths = require('../helpers/extractUserPaths');
const getBucketName = require('../helpers/getBucketName');
const extractFilePath = require('../helpers/extractFilePath');

const deleteDataFromStorage = async ({ paths: storagePaths, uid, defaultBucketName }) => {
    const paths = extractUserPaths(storagePaths, uid);
    const promises = paths.map(async (path) => {
        const bucketName = getBucketName({
            path,
            defaultBucketName,
        });
        const bucket = admin.storage().bucket(bucketName);
        const prefix = extractFilePath({ path });
        try {
            await bucket.deleteFiles({ prefix });
        } catch (error) {
            if (error.code !== 404) {
                Logger.error('ERROR_DELETE_DATA_STORAGE', {
                    errorMessage: error.toString(),
                    params: { paths },
                });
            }
        }
    });

    await Promise.all(promises);
};

module.exports = deleteDataFromStorage;
