const translateString = require('../translateString');

const mockedTranslation = jest.fn(() => Promise.resolve(['translated']));

jest.mock('firebase-functions/lib/logger');
jest.mock('@google-cloud/translate', () => ({
    v2: {
        Translate: jest.fn(() => ({
            constructor: jest.fn().mockReturnValue('test-translator'),
            translate: jest.fn((...args) => mockedTranslation(...args)),
        })),
    },
}));
jest.mock('../getConfig', () => jest.fn(() => ({ projectId: 'project' })));

describe('translateString()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should translate string', async () => {
        expect.assertions(2);
        const result = await translateString('string', 'en');
        expect(mockedTranslation).toHaveBeenCalledWith('string', 'en');
        expect(result).toBe('translated');
    });
    it('should log error when translation fails', async () => {
        expect.assertions(1);
        mockedTranslation.mockReturnValue(Promise.reject(new Error('error')));
        await expect(translateString('string', 'en')).rejects.toThrow();
    });
});
