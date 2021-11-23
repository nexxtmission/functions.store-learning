const getConfig = () => ({
    bitlyAccessToken: process.env.BITLY_ACCESS_TOKEN,
    longUrlField: process.env.LONG_URL_FIELD_NAME,
    shortUrlField: process.env.SHORT_URL_FIELD_NAME,
    defaultDomain: process.env.SHORT_URL_DEFAULT_DOMAIN || 'bit.ly',
});

module.exports = getConfig;
