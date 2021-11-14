const translateSingle = require('../translateSingle');
const translateString = require('../../../translateString');
const updateTranslations = require('../updateTranslations');

const translations = {
    en: 'translated',
    es: 'traducido',
};

jest.mock('firebase-functions/lib/logger');
jest.mock('../../../translateString', () => jest.fn(
    (_, language) => Promise.resolve(translations[language]),
));
jest.mock('../updateTranslations', () => jest.fn());

describe('translateSingle()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should translate single field', async () => {
        expect.assertions(2);
        await translateSingle({
            input: 'field',
            snapshot: 'snapshot',
            languages: ['en', 'es'],
        });
        expect(translateString).toHaveBeenCalledTimes(2);
        expect(updateTranslations).toHaveBeenCalledWith(
            'snapshot',
            translations,
        );
    });
    it('should throw error if translation fails', async () => {
        expect.assertions(1);
        translateString.mockReturnValue(Promise.reject(new Error('error')));
        return expect(translateSingle({
            input: 'field',
            snapshot: 'snapshot',
            languages: ['en', 'es'],
        })).rejects.toThrow();
    });
});
