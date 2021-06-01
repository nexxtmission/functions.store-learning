const sendTemplateEmail = require('./services/sendTemplateEmail');

const getUsedProvider = (userRecord) => {
    const { providerData = [] } = userRecord || {};
    return providerData[0];
};

const sendSignUpWelcomeEmail = (userRecord) => {
    const userProvider = getUsedProvider(userRecord) || {};
    const email = userRecord.email || userProvider.email;
    if (email) {
        const { displayName, phoneNumber, photoURL } = userRecord;
        const receiverData = {
            displayName: displayName || userProvider.displayName,
            phoneNumber: phoneNumber || userProvider.phoneNumber,
            photoURL: photoURL || userProvider.photoURL,
            provider: userProvider.providerId,
        };
        return sendTemplateEmail({ to: email, receiverData });
    }
    return null;
};

module.exports = sendSignUpWelcomeEmail;
