const updateSnapshotTranslations = require('../index');
const getChangeType = require('../../../helpers/getChangeType');
const translateCreated = require('../translateCreated');
const translateUpdated = require('../translateUpdated');

jest.mock('../../../helpers/getChangeType', () => jest.fn());
jest.mock('../translateCreated', () => jest.fn());
jest.mock('../translateUpdated', () => jest.fn());

const snapshot = {
    before: 'before',
    after: 'after',
};

describe('updateSnapshotTranslations()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should not call translate when document is deleted', async () => {
        getChangeType.mockReturnValue('DELETE');
        await updateSnapshotTranslations(snapshot);
        expect(translateCreated).not.toHaveBeenCalled();
        expect(translateUpdated).not.toHaveBeenCalled();
    });
    it('should call translate when document is created', async () => {
        getChangeType.mockReturnValue('CREATE');
        await updateSnapshotTranslations(snapshot);
        expect(translateCreated).toHaveBeenCalledWith('after');
        expect(translateUpdated).not.toHaveBeenCalled();
    });
    it('should call translate when document is updated', async () => {
        getChangeType.mockReturnValue('UPDATE');
        await updateSnapshotTranslations(snapshot);
        expect(translateCreated).not.toHaveBeenCalled();
        expect(translateUpdated).toHaveBeenCalledWith('before', 'after');
    });
});
