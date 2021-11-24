const isFolder = require('../isFolder');

describe('isFolder()', () => {
    it('should return false', () => {
        [
            '{DEFAULT}/users/{UID}_image.png',
            '  {DEFAULT}/users/{UID}_image.png  ',
            'admin_files/users/{UID}_image.png',
            '  admin_files/users/{UID}_image.png  ',
        ].forEach((path) => expect(isFolder(path)).toBe(false));
    });
    it('should return true', () => {
        [
            '{DEFAULT}/users/{UID}/',
            '  {DEFAULT}/users/{UID}/  ',
            'admin_files/users/{UID}/',
            '  admin_files/users/{UID}/  ',
        ].forEach((path) => expect(isFolder(path)).toBe(true));
    });
});
