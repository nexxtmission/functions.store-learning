const bigQuery = require('./bigquery');
const schema = require('./usersTableSchema.json');

const resolveTable = async (datasetName, tableName) => {
    const dataset = bigQuery.dataset(datasetName);
    const existDatasetResponse = (await dataset.exists())[0];
    if (!existDatasetResponse) {
        await dataset.create();
    }
    const table = dataset.table(tableName);
    const existTable = (await table.exists())[0];
    if (!existTable) {
        const options = {
            schema,
            location: 'US',
        };
        await table.create(options);
    }
    return table;
};

module.exports = resolveTable;
