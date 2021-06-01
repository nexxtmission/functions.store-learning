### How this function works

This function will allow you to store the user data in a Firestore collection when a new user signs up.

### Requirements
* You must have previous knowledge of **Firestore**.
* You need a Firebase project with **Firestore** available.

### Function details

This function listens when a new user signs up and then adds this user record in the specific collection. 

To install this function you need to enter the values of the following environment variables:
* **FIRESTORE_COLLECTION_PATH**: The collection path that will be used to save the users.
