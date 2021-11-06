const admin = require('firebase-admin');

const instance = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

module.exports = instance;
