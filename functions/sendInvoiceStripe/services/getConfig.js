const getConfig = () => ({
    stripeSecretKey: process.env.STRIPE_API_KEY,
    daysUntilDue: parseInt(process.env.DAYS_UNTIL_DUE_DEFAULT, 10),
});

module.exports = getConfig;
