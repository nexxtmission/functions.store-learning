const getLanguagesList = require('../getLanguagesList');

describe('getLanguagesList()', () => {
    it('should return empty list', async () => {
        [null, '', false, undefined].forEach(
            (languages) => expect(getLanguagesList(languages)).toEqual([]),
        );
    });
    it('should return languages as list', async () => {
        [
            'es,en,pt,fr,es',
            'es,en,pt,fr,es,fr',
        ].forEach(
            (languages) => expect(getLanguagesList(languages)).toEqual(['es', 'en', 'pt', 'fr']),
        );
    });
});
