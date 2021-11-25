const Stripe = require('stripe');
const getConfig = require('./getConfig');

module.exports = Stripe(getConfig().stripeSecretKey);
