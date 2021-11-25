const isEmptyString = require('../isEmptyString');

describe('isEmptyString()', () => {
    it('should return false', () => {
        [
            '{DEFAULT}',
            '  admin_files/users/{UID}_image.png  ',
        ].forEach((path) => expect(isEmptyString(path)).toBe(false));
    });
    it('should return true', () => {
        [
            null, undefined, ' ', '      ',
        ].forEach((path) => expect(isEmptyString(path)).toBe(true));
    });
});
