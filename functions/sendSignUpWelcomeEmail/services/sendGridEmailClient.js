const sendGridMail = require('@sendgrid/mail');

const apiKey = process.env.SENDGRID_API_KEY;

sendGridMail.setApiKey(apiKey);

module.exports = sendGridMail;
