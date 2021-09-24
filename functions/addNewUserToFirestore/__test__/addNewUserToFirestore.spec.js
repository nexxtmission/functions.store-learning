const addUserRecordToFirestore = require('../services/addUserRecordToFirestore');
const firestore = require('../services/firestore');

jest.mock('../services/firestore', () => ({
    collection: jest.fn(),
}));

describe('addNewUserToFirestore', () => {
    it('should add a new user', async () => {
        expect.assertions(2);
        const addUser = jest.fn();
        firestore.collection.mockImplementation(() => ({
            add: addUser,
        }));
        await addUserRecordToFirestore({ user: 'test' });
        expect(firestore.collection).toHaveBeenCalled();
        expect(addUser).toHaveBeenCalledWith({ user: 'test' });
    });
    it('should return the right value', async () => {
        expect.assertions(1);
        const addUser = jest.fn();
        firestore.collection.mockImplementation(() => ({
            add: addUser,
        }));
        const result = await addUserRecordToFirestore({ user: 'test' });
        expect(result).toEqual({ user: 'test' });
    });
});
