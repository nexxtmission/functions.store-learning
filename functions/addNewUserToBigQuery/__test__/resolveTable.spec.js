const resolveTable = require('../services/resolveTable');
const bigQuery = require('../services/bigquery');

jest.mock('../services/bigquery', () => (
    {
        dataset: jest.fn(),
    }
));

describe('resolveTable', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should call bigQuery.dataset with datasetName', async () => {
        bigQuery.dataset.mockImplementation(
            () => (
                {
                    exists: () => [true],
                    create: () => {},
                    table: () => (
                        {
                            exists: () => [true],
                            create: () => {},
                        }
                    ),
                }
            ),
        );
        await resolveTable('datasetName');
        expect.assertions(1);
        expect(bigQuery.dataset).toHaveBeenCalledWith('datasetName');
    });

    it('should create a dataset if does not exist', async () => {
        const createDataset = jest.fn();
        bigQuery.dataset.mockImplementation(
            () => (
                {
                    exists: () => [false],
                    create: createDataset,
                    table: () => (
                        {
                            exists: () => [true],
                            create: () => {},
                        }
                    ),
                }
            ),
        );
        await resolveTable('datasetName');
        expect.assertions(1);
        expect(createDataset).toHaveBeenCalled();
    });

    it('should not create a dataset if exist', async () => {
        const createDataset = jest.fn();
        bigQuery.dataset.mockImplementation(
            () => (
                {
                    exists: () => [true],
                    create: createDataset,
                    table: () => (
                        {
                            exists: () => [true],
                            create: () => {},
                        }
                    ),
                }
            ),
        );
        await resolveTable('datasetName');
        expect.assertions(1);
        expect(createDataset).not.toHaveBeenCalled();
    });

    it('should call bigQuery.table with tableName', async () => {
        const bigQueryTable = jest.fn(() => (
            {
                exists: () => [true],
                create: () => {},
            }
        ));
        bigQuery.dataset.mockImplementation(
            () => (
                {
                    exists: () => [true],
                    create: () => {},
                    table: bigQueryTable,
                }
            ),
        );
        await resolveTable('datasetName', 'tableName');
        expect.assertions(1);
        expect(bigQueryTable).toHaveBeenCalledWith('tableName');
    });

    it('should not create table if exists', async () => {
        const createTable = jest.fn();
        bigQuery.dataset.mockImplementation(
            () => (
                {
                    exists: () => [true],
                    create: () => {},
                    table: () => (
                        {
                            exists: () => [true],
                            create: createTable,
                        }
                    ),
                }
            ),
        );
        await resolveTable('datasetName');
        expect.assertions(1);
        expect(createTable).not.toHaveBeenCalled();
    });

    it('should  create table if does not exists', async () => {
        const createTable = jest.fn();
        bigQuery.dataset.mockImplementation(
            () => (
                {
                    exists: () => [true],
                    create: () => {},
                    table: () => (
                        {
                            exists: () => [false],
                            create: createTable,
                        }
                    ),
                }
            ),
        );
        await resolveTable('datasetName');
        expect.assertions(1);
        expect(createTable).toHaveBeenCalled();
    });
});
