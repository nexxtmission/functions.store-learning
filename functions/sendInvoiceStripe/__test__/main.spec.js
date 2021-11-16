const Logger = require('firebase-functions/lib/logger');
const sendInvoiceStripe = require('../main');
const getUser = require('../services/getUser');
const getCustomersFromStripe = require('../services/getCustomersFromStripe');
const createStripeCustomer = require('../services/createStripeCustomer');
const createInvoice = require('../services/createInvoice');
const sendInvoice = require('../services/sendInvoice');
const updateInvoice = require('../services/updateInvoice');

jest.mock('firebase-functions/lib/logger');
jest.mock('../services/getConfig', () => jest.fn(() => ({
    stripeSecretKey: 'stripe-key',
    stripeWebhookSecret: 'stripe-webhook-secret',
    daysUntilDue: 7,
})));
jest.mock('../services/getUser', () => jest.fn());
jest.mock('../services/getCustomersFromStripe', () => jest.fn());
jest.mock('../services/createStripeCustomer', () => jest.fn());
jest.mock('../services/createInvoice', () => jest.fn());
jest.mock('../services/sendInvoice', () => jest.fn());
jest.mock('../services/updateInvoice', () => jest.fn());

Logger.error = jest.fn();

const buildSnapshot = (data) => ({
    data() {
        return data;
    },
});

describe('sendInvoiceStripe()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should not create invoice if there are no items', async () => {
        expect.assertions(7);
        await sendInvoiceStripe(buildSnapshot({}), { eventId: 'event-1' });
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            { errorMessage: 'There are no items' },
        );
        expect(getUser).not.toHaveBeenCalled();
        expect(getCustomersFromStripe).not.toHaveBeenCalled();
        expect(createStripeCustomer).not.toHaveBeenCalled();
        expect(createInvoice).not.toHaveBeenCalled();
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should not create invoice if user id or email are missing', async () => {
        expect.assertions(7);
        await sendInvoiceStripe(buildSnapshot({ items: ['item1'] }), { eventId: 'event-1' });
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            { errorMessage: 'Missing either a customer email or uid' },
        );
        expect(getUser).not.toHaveBeenCalled();
        expect(getCustomersFromStripe).not.toHaveBeenCalled();
        expect(createStripeCustomer).not.toHaveBeenCalled();
        expect(createInvoice).not.toHaveBeenCalled();
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should not create invoice if both user id and email are passed', async () => {
        expect.assertions(7);
        await sendInvoiceStripe(
            buildSnapshot({
                email: 'email',
                uid: 'uid',
                items: ['item1'],
            }),
            { eventId: 'event-1' },
        );
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            { errorMessage: 'Customer email and uid were passed but only one is permitted' },
        );
        expect(getUser).not.toHaveBeenCalled();
        expect(getCustomersFromStripe).not.toHaveBeenCalled();
        expect(createStripeCustomer).not.toHaveBeenCalled();
        expect(createInvoice).not.toHaveBeenCalled();
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should not create invoice if cannot retrieve users email', async () => {
        expect.assertions(7);
        getUser.mockReturnValue(Promise.resolve({}));
        await sendInvoiceStripe(
            buildSnapshot({
                uid: '123',
                items: ['item1'],
            }),
            { eventId: 'event-1' },
        );
        expect(getUser).toHaveBeenCalledWith('123');
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            { errorMessage: 'Missing email address for user: 123' },
        );
        expect(getCustomersFromStripe).not.toHaveBeenCalled();
        expect(createStripeCustomer).not.toHaveBeenCalled();
        expect(createInvoice).not.toHaveBeenCalled();
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should get customer from stripe', async () => {
        expect.assertions(2);
        getCustomersFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    email: 'user@email.com',
                    currency: 'usd',
                }],
            }),
        );
        await sendInvoiceStripe(
            buildSnapshot({
                email: 'user@email.com',
                items: [{ currency: 'usd' }],
            }),
            { eventId: 'event-1' },
        );
        expect(getCustomersFromStripe).toHaveBeenCalledWith('user@email.com');
        expect(createStripeCustomer).not.toHaveBeenCalled();
    });
    it('should create customer if not exists', async () => {
        expect.assertions(2);
        getCustomersFromStripe.mockReturnValue(
            Promise.resolve({
                data: [],
            }),
        );
        await sendInvoiceStripe(
            buildSnapshot({
                email: 'user@email.com',
                items: [{ currency: 'usd' }],
            }),
            { eventId: 'event-1' },
        );
        expect(getCustomersFromStripe).toHaveBeenCalledWith('user@email.com');
        expect(createStripeCustomer).toHaveBeenCalledWith({
            email: 'user@email.com',
            eventId: 'event-1',
        });
    });
    it('should not send invoice if it is not created', async () => {
        expect.assertions(4);
        getCustomersFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    email: 'user@email.com',
                    currency: 'usd',
                }],
            }),
        );
        createInvoice.mockReturnValue(Promise.resolve());
        await sendInvoiceStripe(
            buildSnapshot({
                email: 'user@email.com',
                items: [{ currency: 'usd' }],
            }),
            { eventId: 'event-1' },
        );
        expect(createInvoice).toHaveBeenCalledWith({
            customer: { email: 'user@email.com', currency: 'usd' },
            orderItems: [{ currency: 'usd' }],
            daysUntilDue: 7,
            idempotencyKey: 'event-1',
        });
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            { errorMessage: 'Error occur while creating the invoice' },
        );
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should send invoice', async () => {
        expect.assertions(2);
        getCustomersFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    email: 'user@email.com',
                    currency: 'usd',
                }],
            }),
        );
        createInvoice.mockReturnValue(
            Promise.resolve({
                id: 'invoice-1',
                livemode: false,
            }),
        );
        const snapshot = buildSnapshot({
            email: 'user@email.com',
            items: [{ currency: 'usd' }],
        });
        sendInvoice.mockReturnValue(Promise.resolve({
            id: 'invoice-1',
            status: 'open',
            hosted_invoice_url: 'url',
        }));
        await sendInvoiceStripe(
            snapshot,
            { eventId: 'event-1' },
        );
        expect(sendInvoice).toHaveBeenCalledWith({
            eventId: 'event-1',
            id: 'invoice-1',
        });
        expect(updateInvoice).toHaveBeenCalledWith({
            snapshot,
            invoiceId: 'invoice-1',
            hostedInvoiceUrl: 'url',
            isLiveMode: false,
        });
    });
    it('should log error if invoice is not sent', async () => {
        expect.assertions(1);
        getCustomersFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    email: 'user@email.com',
                    currency: 'usd',
                }],
            }),
        );
        createInvoice.mockReturnValue(
            Promise.resolve({
                id: 'invoice-1',
                livemode: false,
            }),
        );
        const snapshot = buildSnapshot({
            email: 'user@email.com',
            items: [{ currency: 'usd' }],
        });
        sendInvoice.mockReturnValue(Promise.resolve({ status: 'failed' }));
        await sendInvoiceStripe(
            snapshot,
            { eventId: 'event-1' },
        );
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            {
                errorMessage: 'Error occur while creating the invoice',
                params: {
                    invoice: { id: 'invoice-1', livemode: false },
                },
            },
        );
    });
    it('should show log if error occur', async () => {
        expect.assertions(1);
        getCustomersFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    email: 'user@email.com',
                    currency: 'usd',
                }],
            }),
        );
        createInvoice.mockReturnValue(
            Promise.resolve({
                id: 'invoice-1',
                livemode: false,
            }),
        );
        const snapshot = buildSnapshot({
            email: 'user@email.com',
            items: [{ currency: 'usd' }],
        });
        sendInvoice.mockReturnValue(Promise.reject(new Error('something happened')));
        await sendInvoiceStripe(
            snapshot,
            { eventId: 'event-1' },
        );
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            { errorMessage: 'Error occur while making a request to the Stripe API' },
        );
    });
    // it('should ', async () => {});
    // it('should ', async () => {});
    // it('should ', async () => {});
    // it('should ', async () => {});
});
