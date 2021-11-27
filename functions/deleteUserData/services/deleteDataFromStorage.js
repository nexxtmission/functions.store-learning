const Logger = require('firebase-functions/lib/logger');
const admin = require('./admin');
const extractUserPaths = require('../helpers/extractUserPaths');
const getBucketName = require('../helpers/getBucketName');
const extractFilePath = require('../helpers/extractFilePath');
const isFolder = require('../helpers/isFolder');
const isEmptyString = require('../helpers/isEmptyString');

const deleteDataFromStorage = async ({ paths: storagePaths, uid }) => {
    const paths = extractUserPaths(storagePaths, uid);
    const promises = paths.map(async (path) => {
        const bucketName = getBucketName({ path });
        const prefix = extractFilePath({ path });
        try {
            const bucket = (
                isEmptyString(bucketName)
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
                    params: { bucketName: bucketName || '{DEFAULT}', path: prefix },
                });
            }
        }
    });

    await Promise.all(promises);
};

module.exports = deleteDataFromStorage;
