const extractUserPaths = require('../extractUserPaths');

describe('extractUserPaths()', () => {
    it('return right paths list', async () => {
        [
            '   /users/{UID}   ,   /admins/{UID}   ',
            '/users/{UID},/admins/{UID}',
            '/users/{userId},/admins/{userId}',
            '/users/{UserId},/admins/{UserId}',
            '/users/{user},/admins/{user}',
            '/users/{User_Id},/admins/{User_Id}',
            '/users/{ID},/admins/{ID}',
            '/users/{id},/admins/{id}',
        ].forEach((paths) => {
            expect(extractUserPaths(paths, 'user1')).toEqual([
                '/users/user1',
                '/admins/user1',
            ]);
        });
    });
});
