const Logger = require('firebase-functions/lib/logger');
const admin = require('./admin');
const extractUserPaths = require('../helpers/extractUserPaths');

const deleteDataFromRealtimeDatabase = async ({ paths: databasePaths, uid }) => {
    const paths = extractUserPaths(databasePaths, uid);
    const promises = paths.map(async (path) => {
        try {
            await admin.database().ref(path).remove();
        } catch (error) {
            Logger.error('ERROR_DELETE_DATA_FROM_REALTIME_DATABASE', {
                errorMessage: error.toString(),
                params: { paths },
            });
        }
    });

    await Promise.all(promises);
};

module.exports = deleteDataFromRealtimeDatabase;
