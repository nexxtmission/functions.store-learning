const stripe = require('./stripe');

const createStripeCustomer = ({ email, eventId }) => stripe.customers.create(
    {
        email,
        metadata: { createdBy: 'sendInvoiceStripe' },
    },
    { idempotencyKey: `customers-create-${eventId}` },
);

module.exports = createStripeCustomer;
