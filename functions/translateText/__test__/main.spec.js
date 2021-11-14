const Logger = require('firebase-functions/lib/logger');
const translateText = require('../main');
const getConfig = require('../services/getConfig');
const updateSnapshotTranslations = require('../services/updateSnapshotTranslations');

const config = {
    languages: ['en'],
    inputFieldName: 'input',
    outputFieldName: 'output',
};

jest.mock('firebase-functions/lib/logger');
jest.mock('../services/getConfig', () => jest.fn());
jest.mock('../services/updateSnapshotTranslations', () => jest.fn());

Logger.error = jest.fn();

describe('translateText()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should not translate text when input and output fields are the same', async () => {
        getConfig.mockReturnValue({
            ...config,
            outputFieldName: 'input',
        });
        await translateText('snapshot');
        expect(updateSnapshotTranslations).not.toHaveBeenCalled();
    });
    it('should not translate text when input field is an output path', async () => {
        getConfig.mockReturnValue({
            ...config,
            inputFieldName: 'output.en',
        });
        await translateText('snapshot');
        expect(updateSnapshotTranslations).not.toHaveBeenCalled();
    });
    it('should translate text', async () => {
        getConfig.mockReturnValue(config);
        await translateText('snapshot');
        expect(updateSnapshotTranslations).toHaveBeenCalledWith('snapshot');
    });
    it('should log error when translation fails', async () => {
        getConfig.mockReturnValue(config);
        updateSnapshotTranslations.mockReturnValue(Promise.reject(new Error('error')));
        await translateText('snapshot');
        expect(Logger.error).toHaveBeenCalled();
    });
});
