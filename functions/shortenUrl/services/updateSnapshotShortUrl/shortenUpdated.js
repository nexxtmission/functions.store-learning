const firebase = require('firebase-admin');
const extractFieldFromSnapshot = require('../../helpers/extractFieldFromSnapshot');
const getConfig = require('../getConfig');
const shortenUrl = require('../bitly/shorten');
const updateShortUrl = require('./updateShortUrl');

const shortenUpdated = async (before, after) => {
    const { longUrlField } = getConfig();
    const valueBefore = extractFieldFromSnapshot({ snapshot: before, fieldName: longUrlField });
    const valueAfter = extractFieldFromSnapshot({ snapshot: after, fieldName: longUrlField });

    if (valueBefore === valueAfter) {
        return;
    }

    if (valueAfter && typeof valueAfter === 'string') {
        const shortenedUrl = await shortenUrl(valueAfter);
        await updateShortUrl(after, shortenedUrl);
        return;
    }

    if (valueBefore) {
        await updateShortUrl(after, firebase.firestore.FieldValue.delete());
    }
};

module.exports = shortenUpdated;
