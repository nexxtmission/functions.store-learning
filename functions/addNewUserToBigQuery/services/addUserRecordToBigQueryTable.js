const resolveTable = require('./resolveTable');

const datasetName = process.env.DATASET_NAME;
const usersTableName = process.env.USERS_TABLE_NAME;

const addUserRecordToBigQueryTable = async (userRecord) => {
    const table = await resolveTable(datasetName, usersTableName);
    await table.insert(userRecord, {
        ignoreUnknownValues: true,
    });
};

module.exports = addUserRecordToBigQueryTable;
