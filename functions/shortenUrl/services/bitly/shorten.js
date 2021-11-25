const axios = require('./axios');
const getConfig = require('../getConfig');

const shorten = async (url) => {
    const domain = getConfig().defaultDomain;
    const response = await axios.post(
        'bitlinks',
        { long_url: url, domain },
    );
    const { link } = response.data;
    return link;
};

module.exports = shorten;
