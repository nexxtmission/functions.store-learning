const Logger = require('firebase-functions/lib/logger');
const isSameField = require('./helpers/isSameField');
const getConfig = require('./services/getConfig');
const updateSnapshotShortUrl = require('./services/updateSnapshotShortUrl');

const shortenUrl = async (snapshot) => {
    const { longUrlField, shortUrlField } = getConfig();
    if (isSameField(longUrlField, shortUrlField)) {
        Logger.error('ERROR_SHORTEN_URL', {
            errorMessage: 'The `LONG_URL` and `SHORT_URL` field names must not be the same',
            params: { longUrlField, shortUrlField },
        });
        return;
    }

    try {
        await updateSnapshotShortUrl(snapshot);
    } catch (error) {
        Logger.error('ERROR_SHORTEN_URL', {
            errorMessage: error.toString(),
        });
    }
};

module.exports = shortenUrl;
