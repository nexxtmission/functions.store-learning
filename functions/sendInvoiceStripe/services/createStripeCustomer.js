const stripe = require('./stripe');

const createStripeCustomer = ({ email, eventId }) => stripe.customers.create(
    {
        email,
        metadata: { createdBy: 'sendInvoiceStripe' },
    },
    { idempotencyKey: `create-customer-${eventId}` },
);

module.exports = createStripeCustomer;
