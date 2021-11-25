const stripe = require('./stripe');

const sendInvoice = ({ id, eventId }) => stripe.invoices.sendInvoice(
    id,
    { idempotencyKey: `send-invoice-${eventId}` },
);

module.exports = sendInvoice;
