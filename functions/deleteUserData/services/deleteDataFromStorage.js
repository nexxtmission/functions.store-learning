const Logger = require('firebase-functions/lib/logger');
const isEmpty = require('@rainbow-modules/validation/lib/isEmpty');
const admin = require('./admin');
const extractUserPaths = require('../helpers/extractUserPaths');
const getBucketName = require('../helpers/getBucketName');
const extractFilePath = require('../helpers/extractFilePath');
const isFolder = require('../helpers/isFolder');

const deleteDataFromStorage = async ({ paths: storagePaths, uid, defaultBucketName }) => {
    const paths = extractUserPaths(storagePaths, uid);
    const promises = paths.map(async (path) => {
        try {
            const bucketName = getBucketName({ path, defaultBucketName });
            const prefix = extractFilePath({ path });
            const bucket = (
                isEmpty(bucketName)
                    ? admin.storage().bucket()
                    : admin.storage().bucket(bucketName)
            );
            await (isFolder(prefix)
                ? bucket.deleteFiles({ prefix })
                : bucket.file(prefix).delete());
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
