### How this function works

Use this function to automatically delete all user's data when deleted from your authenticated users.

You can configure this function to delete user data from any or all of the following: Cloud Firestore, Realtime Database, or Cloud Storage. Data must be keyed to the user's UserId.

> **Note:** To use this extension, you need to manage your users with Firebase Authentication.

This function respects user privacy and meets compliance requirements. However, its use does not guarantee compliance with government and industry regulations.

### Function details

To install this function add the required information to the form with the following parameters:

- **CONFIG**: It is a JSON object with the following format:

   ```json
   {
      "firestorePaths": [
       "documents/{UID}"
      ],
     "firestoreDeleteRecursive": false,
     "realtimeDatabaseName": "my-rt-database",
     "realtimeDatabasePaths": [
       "collection/{UID}"
     ],
     "storageDefaultBucketName": "user_files",
     "storagePaths": [
       "{DEFAULT}/path/to/{UID}/files"
     ]
    }
    ```

  - **firestorePaths**: A comma separated list of full paths that contain user data in your Cloud Firestore instance. Leave empty if you don't use Cloud Firestore. (You can represent the User ID of the deleted user with `{UID}`. Ex: users/{UID})
  - **firestoreDeleteRecursive**: Recursively delete documents subcollections. (Cloud Firestore only)
  - **realtimeDatabaseName**: The Realtime Database instance where you want to delete user data
  - **realtimeDatabasePaths**: A comma separated list of full paths that contain user data in your Realtime Database instance. Leave empty if you don't use Realtime Database. (You can represent the User ID of the deleted user with `{UID}`. Ex: users/{UID})
  - **storageDefaultBucketName**: The name of the bucket to be used as default. If omited your project default bucket will be used.
  - **storagePaths**: A comma separated list of full paths to files or directories in your buckets in Google Cloud Storage. Leave empty if you don't use Cloud Storage. (You can use `{UID}` to represent the User ID and `{DEFAULT}` to represent your default Storage bucket. Ex: `{DEFAULT}/{UID}-pic.png`,`my-app-logs/{UID}-logs.txt`)

    > **Note:** You can also use other wildcards to represent user's UserId: `{user}`, `{userId}`, `{uid}` or `{id}`. Lower an upper letters are treated as equal.

### Warnings

This function uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:

- Cloud Firestore
- Firebase Realtime Database
- Cloud Storage
