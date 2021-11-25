const Logger = require('firebase-functions/lib/logger');
const shortenUrl = require('../main');
const getConfig = require('../services/getConfig');
const updateSnapshotShortUrl = require('../services/updateSnapshotShortUrl');

const config = {
    longUrlField: 'long',
    shortUrlField: 'shortened',
};

jest.mock('firebase-functions/lib/logger');
jest.mock('../services/getConfig', () => jest.fn());
jest.mock('../services/updateSnapshotShortUrl', () => jest.fn());

Logger.error = jest.fn();

describe('shortenUrl()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should not shorten url when longUrl and shortUrl fields are the same', async () => {
        getConfig.mockReturnValue({
            ...config,
            shortUrlField: 'long',
        });
        await shortenUrl('snapshot');
        expect(updateSnapshotShortUrl).not.toHaveBeenCalled();
    });
    it('should shorten url', async () => {
        getConfig.mockReturnValue(config);
        await shortenUrl('snapshot');
        expect(updateSnapshotShortUrl).toHaveBeenCalledWith('snapshot');
    });
    it('should log error when shorten url fails', async () => {
        getConfig.mockReturnValue(config);
        updateSnapshotShortUrl.mockReturnValue(Promise.reject(new Error('error')));
        await shortenUrl('snapshot');
        expect(Logger.error).toHaveBeenCalled();
    });
});
