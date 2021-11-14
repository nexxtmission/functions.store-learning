const admin = require('firebase-admin');
const getConfig = require('./getConfig');

const instance = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://${getConfig().realtimeDatabaseInstance}.firebaseio.com`,
});

module.exports = instance;
