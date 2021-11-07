const translateMultiple = require('../translateMultiple');
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

describe('translateMultiple()', () => {
    beforeEach(() => jest.clearAllMocks());
    it('should translate single field', async () => {
        expect.assertions(2);
        await translateMultiple({
            input: { field1: 'value1', field2: 'value2' },
            snapshot: 'snapshot',
            languages: ['en', 'es'],
        });
        expect(translateString).toHaveBeenCalledTimes(4);
        expect(updateTranslations).toHaveBeenCalledWith(
            'snapshot',
            {
                field1: {
                    en: 'translated',
                    es: 'traducido',
                },
                field2: {
                    en: 'translated',
                    es: 'traducido',
                },
            },
        );
    });
    it('should throw error if translation fails', async () => {
        expect.assertions(1);
        updateTranslations.mockReturnValue(Promise.reject(new Error('error')));
        return expect(translateMultiple({
            input: { field1: 'value1', field2: 'value2' },
            snapshot: 'snapshot',
            languages: ['en', 'es'],
        })).rejects.toThrow();
    });
});
