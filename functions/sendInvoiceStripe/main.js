const Logger = require('firebase-functions/lib/logger');
const getConfig = require('./services/getConfig');
const getCustomerFromStripe = require('./services/getCustomerFromStripe');
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
                params: payload,
            });
            return;
        }

        if (!payload.stripeUid) {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: 'Missing customer Stripe ID',
                params: payload,
            });
            return;
        }

        const { eventId } = context;
        const { stripeUid } = payload;
        const customer = await getCustomerFromStripe(stripeUid);
        if (!customer) {
            Logger.error('ERROR_SEND_INVOICE', {
                errorMessage: `Customer "${stripeUid}" was not found on Stripe`,
                params: { stripeUid },
            });
            return;
        }

        const invoice = await createInvoice({
            customerId: stripeUid,
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
                params: { invoice, status },
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
            error,
        });
    }
};

module.exports = sendInvoiceStripe;
