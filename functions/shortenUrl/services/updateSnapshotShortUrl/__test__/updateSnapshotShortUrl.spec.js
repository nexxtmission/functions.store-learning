const updateSnapshotTranslations = require('../index');
const getChangeType = require('../../../helpers/getChangeType');
const shortenCreated = require('../shortenCreated');
const shortenUpdated = require('../shortenUpdated');

jest.mock('../../../helpers/getChangeType', () => jest.fn());
jest.mock('../shortenCreated', () => jest.fn());
jest.mock('../shortenUpdated', () => jest.fn());

const snapshot = {
    before: 'before',
    after: 'after',
};

describe('updateSnapshotTranslations()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should not call shorten when document is deleted', async () => {
        getChangeType.mockReturnValue('DELETE');
        await updateSnapshotTranslations(snapshot);
        expect(shortenCreated).not.toHaveBeenCalled();
        expect(shortenUpdated).not.toHaveBeenCalled();
    });
    it('should call shorten when document is created', async () => {
        getChangeType.mockReturnValue('CREATE');
        await updateSnapshotTranslations(snapshot);
        expect(shortenCreated).toHaveBeenCalledWith('after');
        expect(shortenUpdated).not.toHaveBeenCalled();
    });
    it('should call shorten when document is updated', async () => {
        getChangeType.mockReturnValue('UPDATE');
        await updateSnapshotTranslations(snapshot);
        expect(shortenCreated).not.toHaveBeenCalled();
        expect(shortenUpdated).toHaveBeenCalledWith('before', 'after');
    });
});
