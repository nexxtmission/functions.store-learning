const { logger } = require('firebase-functions');
const sendMessage = require('./services/messageBirdClient');

const defaultFrom = process.env.CHANNEL_ID;

const sendMessagesWithMessageBird = async (message) => {
    try {
        const { from, ...restParams } = message.json;
        const messageBirdParams = {
            from: from || defaultFrom,
            ...restParams,
        };
        logger.info('messagebird_request', messageBirdParams);
        const resp = await sendMessage(messageBirdParams);
        logger.info('messagebird_response', resp);
        return resp;
    } catch (error) {
        logger.error('messagebird_error', error);
        return null;
    }
};

module.exports = sendMessagesWithMessageBird;
