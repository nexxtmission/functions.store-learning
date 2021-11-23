const extractFieldFromSnapshot = require('../../helpers/extractFieldFromSnapshot');
const getConfig = require('../getConfig');
const admin = require('../admin');
const shortenUrl = require('../bitly/shorten');
const updateShortUrl = require('./updateShortUrl');

const shortenUpdated = async (before, after) => {
    const { longUrlField } = getConfig();
    const valueBefore = extractFieldFromSnapshot({ snapshot: before, fieldName: longUrlField });
    const valueAfter = extractFieldFromSnapshot({ snapshot: after, fieldName: longUrlField });

    if (valueBefore === undefined && valueAfter === undefined) {
        return;
    }

    if (typeof valueAfter !== 'string') {
        await updateShortUrl(after, admin.firestore.FieldValue.delete());
        return;
    }

    if (valueBefore !== valueAfter) {
        const shortenedUrl = await shortenUrl(valueAfter);
        await updateShortUrl(after, shortenedUrl);
    }
};

module.exports = shortenUpdated;
