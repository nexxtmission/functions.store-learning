const admin = require('firebase-admin');

const adminClient = admin.initializeApp();

module.exports = adminClient.firestore();
