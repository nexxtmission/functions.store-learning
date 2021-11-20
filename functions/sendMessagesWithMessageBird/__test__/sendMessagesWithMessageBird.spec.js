process.env.CHANNEL_ID = '987poi654lkj321mnb';
const firebaseFunctions = require('firebase-functions');
const sendMessagesWithMessageBird = require('../sendMessagesWithMessageBird');
const sendMessage = require('../services/messageBirdClient');

jest.mock('../services/messageBirdClient', () => jest.fn());
jest.mock('firebase-functions', () => ({
    logger: { info: jest.fn(), error: jest.fn() },
}));

describe('sendMessagesWithMessageBird', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should log the error', async () => {
        sendMessage.mockRejectedValue(new Error());
        const message = {
            json: {
                type: 'text',
                to: '123456789',
                content: {},
            },
        };
        const result = await sendMessagesWithMessageBird(message);
        expect(firebaseFunctions.logger.error).toHaveBeenCalledWith(
            'messagebird_error', expect.any(Error),
        );
        expect(result).toBeNull();
    });
    it("should send Messages With Message Bird with default from when from doesn't exist in message.json", async () => {
        expect.assertions(4);
        const message = {
            json: {
                type: 'text',
                to: '123456789',
                content: {
                    text: 'Hello world',
                },
            },
        };
        sendMessage.mockResolvedValue({
            fallback: null,
            id: 'qwertyuiopasdfghjklzxcvbnm',
            status: 'accepted',
        });
        const result = await sendMessagesWithMessageBird(message);
        expect(firebaseFunctions.logger.info).toHaveBeenNthCalledWith(
            1,
            'messagebird_request',
            {
                content: { text: 'Hello world' },
                from: '987poi654lkj321mnb',
                to: '123456789',
                type: 'text',
            },
        );
        expect(sendMessage).toHaveBeenCalledWith({
            content: { text: 'Hello world' },
            from: '987poi654lkj321mnb',
            to: '123456789',
            type: 'text',
        });
        expect(firebaseFunctions.logger.info).toHaveBeenNthCalledWith(
            2,
            'messagebird_response',
            {
                fallback: null,
                id: 'qwertyuiopasdfghjklzxcvbnm',
                status: 'accepted',
            },
        );
        expect(result).toEqual({
            fallback: null,
            id: 'qwertyuiopasdfghjklzxcvbnm',
            status: 'accepted',
        });
    });

    it('should send Messages With Message Bird', async () => {
        expect.assertions(4);
        const message = {
            json: {
                type: 'text',
                to: '123456789',
                from: '123qwe456asd789zxc',
                content: {
                    text: 'Hello world',
                },
            },
        };
        sendMessage.mockResolvedValue({
            fallback: null,
            id: 'qwertyuiopasdfghjklzxcvbnm',
            status: 'accepted',
        });
        const result = await sendMessagesWithMessageBird(message);
        expect(firebaseFunctions.logger.info).toHaveBeenNthCalledWith(
            1,
            'messagebird_request',
            {
                content: { text: 'Hello world' },
                from: '123qwe456asd789zxc',
                to: '123456789',
                type: 'text',
            },
        );
        expect(sendMessage).toHaveBeenCalledWith({
            content: { text: 'Hello world' },
            from: '123qwe456asd789zxc',
            to: '123456789',
            type: 'text',
        });
        expect(firebaseFunctions.logger.info).toHaveBeenNthCalledWith(
            2,
            'messagebird_response',
            {
                fallback: null,
                id: 'qwertyuiopasdfghjklzxcvbnm',
                status: 'accepted',
            },
        );
        expect(result).toEqual({
            fallback: null,
            id: 'qwertyuiopasdfghjklzxcvbnm',
            status: 'accepted',
        });
    });
});
