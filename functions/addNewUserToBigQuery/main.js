const addUserRecordToBigQueryTable = require('./services/addUserRecordToBigQueryTable');

const addNewUserToBigQuery = (userRecord) => addUserRecordToBigQueryTable(userRecord);

module.exports = addNewUserToBigQuery;
