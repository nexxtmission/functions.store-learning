const sendGridMail = require('./sendGridEmailClient');

const sendGridSenderEmail = process.env.SENDGRID_SENDER_EMAIL;
const sendGridTemplateId = process.env.SENDGRID_TEMPLATE_ID;

const sendTemplateEmail = ({ to, receiverData }) => {
    const msg = {
        from: sendGridSenderEmail,
        templateId: sendGridTemplateId,
        to,
        dynamicTemplateData: receiverData,
    };
    return sendGridMail.send(msg);
};

module.exports = sendTemplateEmail;
