const axios = require('axios');
const getConfig = require('../getConfig');

const instance = axios.create({
    headers: {
        Authorization: `Bearer ${getConfig().bitlyAccessToken}`,
        'Content-type': 'application/json',
    },
    baseURL: 'https://api-ssl.bitly.com/v4/',
});

module.exports = instance;
