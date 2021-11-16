const stripe = require('./stripe');

const getCustomersFromStripe = (email) => stripe.customers.list({ email });

module.exports = getCustomersFromStripe;
