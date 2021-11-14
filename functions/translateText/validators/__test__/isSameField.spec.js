const isSameField = require('../isSameField');

describe('isSameField()', () => {
    it('should return false', async () => {
        expect(isSameField('field1', 'field2')).toBe(false);
    });
    it('should return true', async () => {
        expect(isSameField('field1', 'field1')).toBe(true);
    });
});
