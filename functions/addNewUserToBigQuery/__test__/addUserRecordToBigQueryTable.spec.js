const addUserRecordToBigQueryTable = require('../services/addUserRecordToBigQueryTable');
const resolveTable = require('../services/resolveTable');

jest.mock('../services/resolveTable', () => jest.fn());

describe('addUserRecordToBigQueryTable()', () => {
    it('should call insert of resolveTable', async () => {
        const insertFunc = jest.fn();
        resolveTable.mockResolvedValue({
            insert: insertFunc,
        });
        await addUserRecordToBigQueryTable('New User');
        expect.assertions(1);
        expect(insertFunc).toHaveBeenCalledWith('New User', {
            ignoreUnknownValues: true,
        });
    });
});
