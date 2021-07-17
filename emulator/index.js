const functions = require('firebase-functions');
require('./environment');

exports.addNewUserToBigQuery = functions.auth
    .user()
    .onCreate(require('../functions/addNewUserToBigQuery/main'));

exports.addNewUserToFirestore = functions.auth
    .user()
    .onCreate(require('../functions/addNewUserToFirestore/main'));

exports.sendSignUpWelcomeEmail = functions.auth
    .user()
    .onCreate(require('../functions/sendSignUpWelcomeEmail/main'));
