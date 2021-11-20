const util = require('util');
const messagebird = require('messagebird');

const liveApiKey = process.env.MESSAGEBIRD_LIVE_API_KEY;

const client = messagebird(liveApiKey);

const sendMessage = util.promisify(client.conversations.send);

module.exports = sendMessage;
