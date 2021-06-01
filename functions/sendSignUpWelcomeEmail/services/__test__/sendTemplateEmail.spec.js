const sendGridEmailClient = require('../sendGridEmailClient');

process.env.SENDGRID_SENDER_EMAIL = 'sender@test.com';
process.env.SENDGRID_TEMPLATE_ID = 'sendGridApiKey1234';

jest.mock('../sendGridEmailClient', () => ({
    send: jest.fn(),
}));

const sendTemplateEmail = require('../sendTemplateEmail');

describe('sendTemplateEmail', () => {
    it('should resolve email sender according to SENDGRID_SENDER_EMAIL environment variable', async () => {
        await sendTemplateEmail({
            to: 'user1@test.com',
            receiverData: {
                userPhotoURL: 'http://myphoto.com/user1',
                userName: 'John Doe',
            },
        });
        expect(sendGridEmailClient.send).toBeCalledWith(expect.objectContaining({
            from: process.env.SENDGRID_SENDER_EMAIL,
        }));
    });
    it('should resolve templateId according to SENDGRID_TEMPLATE_ID environment variable', async () => {
        await sendTemplateEmail({
            to: 'user1@test.com',
            receiverData: {
                userPhotoURL: 'http://myphoto.com/user1',
                userName: 'John Doe',
            },
        });
        expect(sendGridEmailClient.send).toBeCalledWith(expect.objectContaining({
            templateId: process.env.SENDGRID_TEMPLATE_ID,
        }));
    });
    it('should send email to email passed as parameter', async () => {
        await sendTemplateEmail({
            to: 'user1@test.com',
            receiverData: {
                userPhotoURL: 'http://myphoto.com/user1',
                userName: 'John Doe',
            },
        });
        expect(sendGridEmailClient.send).toBeCalledWith(expect.objectContaining({
            to: 'user1@test.com',
        }));
    });
    it('should resolve dynamicTemplateData from receiverData parameter', async () => {
        await sendTemplateEmail({
            to: 'user1@test.com',
            receiverData: {
                userPhotoURL: 'http://myphoto.com/user1',
                userName: 'John Doe',
            },
        });
        expect(sendGridEmailClient.send).toBeCalledWith(expect.objectContaining({
            dynamicTemplateData: {
                userPhotoURL: 'http://myphoto.com/user1',
                userName: 'John Doe',
            },
        }));
    });
});
