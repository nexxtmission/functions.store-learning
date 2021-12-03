const Logger = require('firebase-functions/lib/logger');
const createInvoice = require('../createInvoice');
const stripe = require('../stripe');

jest.mock('firebase-functions/lib/logger');
jest.mock('../stripe', () => ({
    invoiceItems: { create: jest.fn() },
    invoices: { create: jest.fn() },
}));

Logger.error = jest.fn();

const fakeData = {
    customerId: 'cus_123',
    orderItems: [{ currency: 'usd' }, { currency: 'usd' }],
    daysUntilDue: 7,
    idempotencyKey: 'event-1',
    defaultTaxRates: null,
    transferData: {},
    description: 'description',
};

describe('createInvoice()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should return log error and return null when error occur', async () => {
        expect.assertions(2);
        stripe.invoiceItems.create.mockReturnValue(Promise.reject(new Error('Something happened')));
        const result = await createInvoice(fakeData);
        expect(result).toBe(null);
        expect(Logger.error).toHaveBeenCalledWith(
            'ERROR_CREATE_INVOICE',
            {
                errorMessage: 'Error occur while making a request to the Stripe API',
                params: {
                    customerId: 'cus_123',
                    orderItems: [{ currency: 'usd' }, { currency: 'usd' }],
                    daysUntilDue: 7,
                    defaultTaxRates: null,
                    transferData: {},
                    description: 'description',
                },
            },
        );
    });
    it('should create invoice', async () => {
        expect.assertions(3);
        stripe.invoiceItems.create.mockReturnValue(Promise.resolve('invoiceItem'));
        stripe.invoices.create.mockReturnValue(Promise.resolve('invoice'));
        const result = await createInvoice(fakeData);
        expect(stripe.invoiceItems.create).toHaveBeenCalledTimes(2);
        expect(stripe.invoices.create).toHaveBeenCalledWith(
            {
                customer: 'cus_123',
                collection_method: 'send_invoice',
                days_until_due: 7,
                auto_advance: true,
                default_tax_rates: [],
                transfer_data: {},
                description: 'description',
            },
            { idempotencyKey: 'create-invoice-event-1' },
        );
        expect(result).toBe('invoice');
    });
});
