const extractFilePath = require('../extractFilePath');

describe('extractFilePath()', () => {
    it('return right file path', async () => {
        [
            '{DEFAULT}/users/{UID}_image.png',
            '  {DEFAULT}/users/{UID}_image.png  ',
            'admin_files/users/{UID}_image.png',
            '  admin_files/users/{UID}_image.png  ',
        ].forEach((path) => {
            expect(extractFilePath({ path })).toBe('users/{UID}_image.png');
        });
    });
});
