const Logger = require('firebase-functions/lib/logger');
const getConfig = require('./services/getConfig');
const getUser = require('./services/getUser');
const getCustomersFromStripe = require('./services/getCustomersFromStripe');
const createStripeCustomer = require('./services/createStripeCustomer');
const createInvoice = require('./services/createInvoice');
const sendInvoice = require('./services/sendInvoice');
const updateInvoice = require('./services/updateInvoice');

const sendInvoiceStripe = async (snapshot, context) => {
    try {
        const config = getConfig();
        const payload = snapshot.data();
        const daysUntilDue = payload.daysUntilDue || config.daysUntilDue;

        if (!payload.items || !payload.items.length) {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: 'There are no items',
            });
            return;
        }

        if (!payload.email && !payload.uid) {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: 'Missing either a customer email or uid',
            });
            return;
        }

        if (payload.email && payload.uid) {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: 'Customer email and uid were passed but only one is permitted',
            });
            return;
        }

        const { eventId } = context;
        const { email } = (payload.uid)
            ? await getUser(payload.uid)
            : payload;

        if (!email) {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: `Missing email address for user: ${payload.uid}`,
            });
            return;
        }

        const customers = await getCustomersFromStripe(email);
        let customer;

        if (customers.data && customers.data.length) {
            customer = customers.data.find(
                (cus) => cus.currency === payload.items[0].currency,
            );
        }

        if (!customer) {
            customer = await createStripeCustomer({ email, eventId });
        }

        const invoice = await createInvoice({
            customer,
            orderItems: payload.items,
            daysUntilDue,
            idempotencyKey: eventId,
            defaultTaxRates: payload.default_tax_rates,
            transferData: payload.transfer_data,
            description: payload.description,
        });

        if (!invoice) {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: 'Error occur while creating the invoice',
            });
            return;
        }

        const {
            id: invoiceId,
            status,
            hosted_invoice_url: hostedInvoiceUrl,
        } = await sendInvoice({ id: invoice.id, eventId });

        if (status !== 'open') {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: 'Error occur while creating the invoice',
                params: { invoice },
            });
        }

        await updateInvoice({
            snapshot,
            invoiceId,
            hostedInvoiceUrl,
            isLiveMode: invoice.livemode,
        });
    } catch (error) {
        Logger.error('ERROR_SEND_INVOICE', {
            errorMessage: 'Error occur while making a request to the Stripe API',
        });
    }
};

module.exports = sendInvoiceStripe;
