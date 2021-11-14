const isTranslationPath = require('../isTranslationPath');

describe('isTranslationPath()', () => {
    it('should return false', async () => {
        expect(isTranslationPath('field1', 'field2', ['es'])).toBe(false);
    });
    it('should return true', async () => {
        expect(isTranslationPath('field1.en', 'field1', ['en'])).toBe(true);
    });
});
