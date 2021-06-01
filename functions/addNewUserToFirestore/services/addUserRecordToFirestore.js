const firestore = require('./firestore');

const usersCollectionPath = process.env.FIRESTORE_COLLECTION_PATH;

const addUserRecordToFirestore = (userRecord) => {
    const usersCollectionRef = firestore.collection(usersCollectionPath);
    return usersCollectionRef.add(JSON.parse(JSON.stringify(userRecord)));
};

module.exports = addUserRecordToFirestore;
