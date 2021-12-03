const Logger = require('firebase-functions/lib/logger');
const sendInvoiceStripe = require('../main');
const getCustomerFromStripe = require('../services/getCustomerFromStripe');
const createInvoice = require('../services/createInvoice');
const sendInvoice = require('../services/sendInvoice');
const updateInvoice = require('../services/updateInvoice');

jest.mock('firebase-functions/lib/logger');
jest.mock('../services/getConfig', () => jest.fn(() => ({
    stripeSecretKey: 'stripe-key',
    stripeWebhookSecret: 'stripe-webhook-secret',
    daysUntilDue: 7,
})));
jest.mock('../services/getCustomerFromStripe', () => jest.fn());
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
        expect.assertions(5);
        await sendInvoiceStripe(buildSnapshot({}), { eventId: 'event-1' });
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            { errorMessage: 'There are no items', params: {} },
        );
        expect(getCustomerFromStripe).not.toHaveBeenCalled();
        expect(createInvoice).not.toHaveBeenCalled();
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should not create invoice if customer stripe id is missing', async () => {
        expect.assertions(5);
        await sendInvoiceStripe(buildSnapshot({ items: ['item1'] }), { eventId: 'event-1' });
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            {
                errorMessage: 'Missing customer Stripe ID',
                params: { items: ['item1'] },
            },
        );
        expect(getCustomerFromStripe).not.toHaveBeenCalled();
        expect(createInvoice).not.toHaveBeenCalled();
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should not create invoice if cannot retrieve stripe custommer', async () => {
        expect.assertions(5);
        getCustomerFromStripe.mockReturnValue(Promise.resolve());
        await sendInvoiceStripe(
            buildSnapshot({
                stripeUid: 'cus_123',
                items: ['item1'],
            }),
            { eventId: 'event-1' },
        );
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            {
                errorMessage: 'Customer "cus_123" was not found on Stripe',
                params: { stripeUid: 'cus_123' },

            },
        );
        expect(getCustomerFromStripe).toHaveBeenCalledWith('cus_123');
        expect(createInvoice).not.toHaveBeenCalled();
        expect(sendInvoice).not.toHaveBeenCalled();
        expect(updateInvoice).not.toHaveBeenCalled();
    });
    it('should not send invoice if it is not created', async () => {
        expect.assertions(4);
        getCustomerFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    id: 'cus_123',
                    email: 'user@email.com',
                    currency: 'usd',
                }],
            }),
        );
        createInvoice.mockReturnValue(Promise.resolve());
        await sendInvoiceStripe(
            buildSnapshot({
                stripeUid: 'cus_123',
                items: [{ currency: 'usd' }],
            }),
            { eventId: 'event-1' },
        );
        expect(createInvoice).toHaveBeenCalledWith({
            customerId: 'cus_123',
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
        getCustomerFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    stripeUid: 'cus_123',
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
            stripeUid: 'cus_123',
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
        getCustomerFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    stripeUid: 'cus_123',
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
            stripeUid: 'cus_123',
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
                    status: 'failed',
                },
            },
        );
    });
    it('should show log if error occur', async () => {
        expect.assertions(1);
        getCustomerFromStripe.mockReturnValue(
            Promise.resolve({
                data: [{
                    stripeUid: 'cus_123',
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
            stripeUid: 'cus_123',
            items: [{ currency: 'usd' }],
        });
        const error = new Error('something happened');
        sendInvoice.mockReturnValue(Promise.reject(error));
        await sendInvoiceStripe(
            snapshot,
            { eventId: 'event-1' },
        );
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_SEND_INVOICE',
            {
                errorMessage: 'Error occur while making a request to the Stripe API',
                error,
            },
        );
    });
});
