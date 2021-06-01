const sendTemplateEmail = require('../services/sendTemplateEmail');

jest.mock('../services/sendTemplateEmail', () => jest.fn());

const sendgridSendSignUpWelcomeEmail = require('../main');

describe('sendgrid-send-sign-up-welcome-email', () => {
    it('should send an email according to data received', async () => {
        await sendgridSendSignUpWelcomeEmail({
            email: 'user1@test.com',
            photoURL: 'http://myphoto.com/user1',
            displayName: 'John Doe',
        });
        expect(sendTemplateEmail).toBeCalledWith({
            to: 'user1@test.com',
            receiverData: {
                displayName: 'John Doe',
                phoneNumber: undefined,
                photoURL: 'http://myphoto.com/user1',
                provider: undefined,
            },
        });
    });
});
