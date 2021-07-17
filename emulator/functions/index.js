const functions = require('firebase-functions');

exports.addNewUserToBigQuery = functions.auth
    .user()
    .onCreate(require('../../functions/addNewUserToBigQuery/main.js'));

exports.addNewUserToFirestore = functions.auth
    .user()
    .onCreate(require('../../functions/addNewUserToFirestore/main.js'));

exports.sendSignUpWelcomeEmail = functions.auth
    .user()
    .onCreate(require('../../functions/sendSignUpWelcomeEmail/main.js'));
