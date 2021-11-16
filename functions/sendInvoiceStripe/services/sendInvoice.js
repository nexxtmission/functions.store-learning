const stripe = require('./stripe');

const sendInvoice = ({ id, eventId }) => stripe.invoices.sendInvoice(
    id,
    { idempotencyKey: `invoices-sendInvoice-${eventId}` },
);

module.exports = sendInvoice;
