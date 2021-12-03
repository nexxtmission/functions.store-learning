const Logger = require('firebase-functions/lib/logger');
const stripe = require('./stripe');

const createInvoice = async ({
    customerId,
    orderItems,
    daysUntilDue,
    idempotencyKey,
    defaultTaxRates,
    transferData,
    description,
}) => {
    try {
        const promises = orderItems.map(
            (item, index) => stripe.invoiceItems.create(
                {
                    customer: customerId,
                    unit_amount: item.amount,
                    currency: item.currency,
                    quantity: item.quantity || 1,
                    description: item.description,
                    tax_rates: item.tax_rates || [],
                },
                { idempotencyKey: `create-invoice-item-${idempotencyKey}-${index}` },
            ),
        );

        await Promise.all(promises);

        const invoiceParams = {
            customer: customerId,
            collection_method: 'send_invoice',
            days_until_due: daysUntilDue,
            auto_advance: true,
            default_tax_rates: defaultTaxRates || [],
            description: description || '',
        };

        if (transferData) {
            invoiceParams.transfer_data = transferData;
        }

        const invoice = await stripe.invoices.create(
            invoiceParams,
            { idempotencyKey: `create-invoice-${idempotencyKey}` },
        );

        return invoice;
    } catch (error) {
        Logger.error('ERROR_CREATE_INVOICE', {
            errorMessage: 'Error occur while making a request to the Stripe API',
            params: {
                customerId,
                orderItems,
                daysUntilDue,
                defaultTaxRates,
                transferData,
                description,
            },
        });
    }

    return null;
};

module.exports = createInvoice;
