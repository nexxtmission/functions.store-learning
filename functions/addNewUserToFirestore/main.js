const addUserRecordToFirestore = require('./services/addUserRecordToFirestore');

const addNewUserToFirestore = (userRecord) => addUserRecordToFirestore(userRecord);

module.exports = addNewUserToFirestore;
