const extractFieldFromSnapshot = require('../../helpers/extractFieldFromSnapshot');
const getConfig = require('../getConfig');
const shortenUrl = require('../bitly/shorten');
const updateShortUrl = require('./updateShortUrl');

const shortenCreated = async (snapshot) => {
    const { longUrlField } = getConfig();
    const longUrl = extractFieldFromSnapshot({ snapshot, fieldName: longUrlField });
    if (longUrl) {
        const shortenedUrl = await shortenUrl(longUrl);
        await updateShortUrl(snapshot, shortenedUrl);
    }
};

module.exports = shortenCreated;
