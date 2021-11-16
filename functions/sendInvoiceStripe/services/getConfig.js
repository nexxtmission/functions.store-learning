const getConfig = () => ({
    stripeSecretKey: process.env.STRIPE_API_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    daysUntilDue: parseInt(process.env.DAYS_UNTIL_DUE_DEFAULT, 10),
    // invoicesCollectionPath: process.env.INVOICES_COLLECTION,
});

module.exports = getConfig;
