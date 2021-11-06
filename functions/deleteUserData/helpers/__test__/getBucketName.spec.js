const getBucketName = require('../getBucketName');

describe('getBucketName()', () => {
    it('should return right bucket name', async () => {
        const paths = [
            '{DEFAULT}/users/{UID}_image.png',
            '  {DEFAULT}/users/{UID}_image.png  ',
            'admin_files/users/{UID}_image.png',
            '  admin_files/users/{UID}_image.png  ',
        ];
        const bucketNames = [
            'default',
            'default',
            'admin_files',
            'admin_files',
        ];
        paths.forEach((path, index) => {
            expect(
                getBucketName({ path, defaultBucketName: 'default' }),
            ).toBe(bucketNames[index]);
        });
    });
});
