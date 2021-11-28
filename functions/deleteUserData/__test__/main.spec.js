const deleteUserData = require('../main');
const getConfig = require('../services/getConfig');
const deleteDataFromFirestore = require('../services/deleteDataFromFirestore');
const deleteDataFromRealtimeDatabase = require('../services/deleteDataFromRealtimeDatabase');
const deleteDataFromStorage = require('../services/deleteDataFromStorage');

const user = { uid: '123' };
const emptyConfig = {
    firestorePaths: '',
    firestoreDeleteRecursive: false,
    realtimeDatabaseUrl: '',
    realtimeDatabasePaths: '',
    storagePaths: '',
};

jest.mock('../services/deleteDataFromFirestore', () => jest.fn());
jest.mock('../services/deleteDataFromRealtimeDatabase', () => jest.fn());
jest.mock('../services/deleteDataFromStorage', () => jest.fn());
jest.mock('../services/getConfig', () => jest.fn(() => ({ ...emptyConfig })));

describe('deleteUserData()', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should not delete data', async () => {
        expect.assertions(3);
        await deleteUserData(user);
        expect(deleteDataFromFirestore).not.toHaveBeenCalled();
        expect(deleteDataFromRealtimeDatabase).not.toHaveBeenCalled();
        expect(deleteDataFromStorage).not.toHaveBeenCalled();
    });

    it('should delete data from firestore', async () => {
        expect.assertions(3);
        getConfig.mockReturnValue({
            ...emptyConfig,
            firestorePaths: 'users/{uid},admin/{uid}',
        });
        await deleteUserData(user);
        expect(deleteDataFromFirestore).toHaveBeenCalledWith({
            paths: 'users/{uid},admin/{uid}',
            recursive: false,
            uid: '123',
        });
        expect(deleteDataFromRealtimeDatabase).not.toHaveBeenCalled();
        expect(deleteDataFromStorage).not.toHaveBeenCalled();
    });

    it('should delete data from firestore recursivelly', async () => {
        expect.assertions(3);
        getConfig.mockReturnValue({
            ...emptyConfig,
            firestorePaths: 'users/{uid},admin/{uid}',
            firestoreDeleteRecursive: true,
        });
        await deleteUserData(user);
        expect(deleteDataFromFirestore).toHaveBeenCalledWith({
            paths: 'users/{uid},admin/{uid}',
            recursive: true,
            uid: '123',
        });
        expect(deleteDataFromRealtimeDatabase).not.toHaveBeenCalled();
        expect(deleteDataFromStorage).not.toHaveBeenCalled();
    });

    it('should delete data from realtime database', async () => {
        expect.assertions(3);
        getConfig.mockReturnValue({
            ...emptyConfig,
            realtimeDatabasePaths: 'users/{uid},admin/{uid}',
        });
        await deleteUserData(user);
        expect(deleteDataFromFirestore).not.toHaveBeenCalled();
        expect(deleteDataFromRealtimeDatabase).toHaveBeenCalledWith({
            paths: 'users/{uid},admin/{uid}',
            uid: '123',
        });
        expect(deleteDataFromStorage).not.toHaveBeenCalled();
    });

    it('should delete data from storage', async () => {
        expect.assertions(3);
        getConfig.mockReturnValue({
            ...emptyConfig,
            storagePaths: '{DEFAULT}/users/profile_{uid}.png,user_files/{uid}',
        });
        await deleteUserData(user);
        expect(deleteDataFromFirestore).not.toHaveBeenCalled();
        expect(deleteDataFromRealtimeDatabase).not.toHaveBeenCalled();
        expect(deleteDataFromStorage).toHaveBeenCalledWith({
            paths: '{DEFAULT}/users/profile_{uid}.png,user_files/{uid}',
            uid: '123',
        });
    });
});
