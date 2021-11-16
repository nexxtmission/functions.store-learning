const updateInvoice = async ({
    snapshot, invoiceId, hostedInvoiceUrl, isLiveMode,
}) => {
    const testUrl = isLiveMode ? '' : '/test';
    await snapshot.ref.update({
        stripeInvoiceId: invoiceId,
        stripeInvoiceUrl: hostedInvoiceUrl,
        stripeInvoiceRecord: `https://dashboard.stripe.com${testUrl}/invoices/${invoiceId}`,
    });
};

module.exports = updateInvoice;
