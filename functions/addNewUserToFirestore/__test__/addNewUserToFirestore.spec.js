const addUserRecordToFirestore = require('../services/addUserRecordToFirestore');
const firestore = require('../services/firestore');

jest.mock('../services/firestore', () => ({
    collection: jest.fn(),
}));

describe('addNewUserToFirestore', () => {
    it('should add a new user', async () => {
        const addUser = jest.fn();
        firestore.collection.mockImplementation(() => ({
            add: addUser,
        }));
        await addUserRecordToFirestore({ user: 'test' });
        expect.assertions(2);
        expect(firestore.collection).toHaveBeenCalled();
        expect(addUser).toHaveBeenCalledWith({ user: 'test' });
    });
});
