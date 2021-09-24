const firestore = require('./firestore');

const usersCollectionPath = process.env.FIRESTORE_COLLECTION_PATH;

const addUserRecordToFirestore = async (userRecord) => {
    const userData = JSON.parse(JSON.stringify(userRecord));
    const usersCollectionRef = firestore.collection(usersCollectionPath);
    await usersCollectionRef.add(userData);
    return userData;
};

module.exports = addUserRecordToFirestore;
