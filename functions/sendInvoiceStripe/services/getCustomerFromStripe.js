const stripe = require('./stripe');

const getCustomerFromStripe = (customerId) => stripe.customers.retrieve(customerId);

module.exports = getCustomerFromStripe;
