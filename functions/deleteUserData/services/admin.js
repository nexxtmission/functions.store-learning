const functions = require('firebase-functions');
const admin = require('firebase-admin');
const getConfig = require('./getConfig');

const defaultFirebaseConfig = functions.firebaseConfig();

const instance = admin.initializeApp({
    ...defaultFirebaseConfig,
    credential: admin.credential.applicationDefault(),
    databaseURL: getConfig().realtimeDatabaseUrl || defaultFirebaseConfig.databaseURL,
});

module.exports = instance;
