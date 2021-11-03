### How this function works

Use this function to automatically delete all user's data when deleted from your authenticated users.

You can configure this function to delete user data from any or all of the following: Cloud Firestore, Realtime Database, or Cloud Storage. Data must be keyed to the user's UserId.

> **Note:** To use this extension, you need to manage your users with Firebase Authentication.

This function is useful in respecting user privacy and fulfilling compliance requirements. However, its use does not guarantee compliance with government and industry regulations.

### Function details
To install this function, you must specify the path to the Firestore collection, the name of the dataset, the table, and the view. Add the required information to the form with the following parameters:

- **FIRESTORE_DELETE_RECURSIVE**: Recursively delete documents subcollections. (Cloud Firestore only)
- **FIRESTORE_PATHS**: A comma separated list of full paths that contain user data in your Cloud Firestore instance. Leave empty if you don't use Cloud Firestore. (You can represent the User ID of the deleted user with `{UID}`. Ex: users/{UID})
- **REALTIME_DATABASE_INSTANCE**: The Realtime Database instance where you want to delete user data
- **REALTIME_DATABASE_PATHS**: A comma separated list of full paths that contain user data in your Realtime Database instance. Leave empty if you don't use Realtime Database. (You can represent the User ID of the deleted user with `{UID}`. Ex: users/{UID})
- **STORAGE_DEFAULT_BUCKET**: The name of the default bucket to be used.
- **STORAGE_PATHS**: A comma separated list of full paths to files or directories in your buckets in Google Cloud Storage. Leave empty if you don't use Cloud Storage. (You can use `{UID}` to represent the User ID and `{DEFAULT}` to represent your default Storage bucket. Ex: `{DEFAULT}/{UID}-pic.png,my-app-logs/{UID}-logs.txt`)

> **Note:** You can also use other wildcards to represent user's UserId: `{user}`, `{userId}`, `{uid}` or `{id}`. Lower an upper letters are treated as equal.

### Warnings

This function uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:

- Cloud Firestore
- Firebase Realtime Database
- Cloud Storage
