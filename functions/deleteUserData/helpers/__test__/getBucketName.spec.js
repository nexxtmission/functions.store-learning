const getBucketName = require('../getBucketName');

describe('getBucketName()', () => {
    it('should return undefined', () => {
        const paths = [
            '{DEFAULT}/users/{UID}_image.png',
            '{default}/users/{UID}_image.png',
            '  {DEFAULT}/users/{UID}_image.png  ',
            '/users/{UID}_image.png  ',
            '    /users/{UID}_image.png  ',
        ];
        paths.forEach((path) => {
            expect(
                getBucketName({ path }),
            ).toBe(undefined);
        });
    });
    it('should return bucket name', () => {
        const paths = [
            'admin_files/users/{UID}_image.png',
            '  admin_files/users/{UID}_image.png  ',
        ];
        paths.forEach((path) => {
            expect(
                getBucketName({ path }),
            ).toBe('admin_files');
        });
    });
});
