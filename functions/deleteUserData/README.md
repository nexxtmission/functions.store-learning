### How this function works

Use this function to automatically delete all user data when it is deleted from your authenticated users.

You can configure this function to delete user data from any or all of the following: Cloud Firestore, Realtime Database, or Cloud Storage. Data must be keyed to the user's UserId.

>To use this extension, you need to manage your users with Firebase Authentication.

This function respects user privacy and meets compliance requirements. However, its use does not guarantee compliance with government and industry regulations.

### Requirements

- You must have previous knowledge of **Firebase**.
- You must have previous knowledge of **Firestore**.

### Function details

To install this function, add the required information to the form with the following parameters:

- **CONFIGURATION**: It is a JSON object with the following format:

    ```json
    {
      "firestorePaths": ["documents/{UID}"],
      "firestoreDeleteRecursive": false,
      "realtimeDatabaseUrl": "https://my-database.firebaseio.com",
      "realtimeDatabasePaths": ["collection/{UID}"],
      "storagePaths": ["{DEFAULT}/path/to/{UID}/files"]
    }
    ```

  - **firestorePaths**: A comma separated list of full paths that contain user data in your Cloud Firestore instance. Leave empty if you don't use Cloud Firestore. (You can represent the User ID of the deleted user with `{UID}`, e.g., `users/{UID}`). You will see an example in section **Function config examples. Example 1**.

  >The use of `{UID}` in Cloud Firestore paths is required.

  - **firestoreDeleteRecursive**: Recursively delete documents subcollections. (Cloud Firestore only).
  - **realtimeDatabaseUrl**: The url to the Realtime Database instance where you want to delete user data. To find the database url, go to Firebase console, select your project, and navigate to the Realtime Database section. Depending on the region you chose for your project, the database url will be in the format `https://<databaseName>.firebaseio.com`, or `https://<databaseName>.<region>.firebaseio.com`.
  - **realtimeDatabasePaths**: A comma separated list of full paths that contain user data in your Realtime Database instance. Leave empty if you don't use Realtime Database. (You can represent the User ID of the deleted user with `{UID}`, e.g., `users/{UID}`). You will see an example in section **Function config examples. Example 2**.

  >The use of `{UID}` in Realtime Database paths is required.

  - **storagePaths**: A comma separated list of full paths to files or directories in your Google Cloud Storage buckets. Leave empty if you don't use Cloud Storage. Storage paths must be in the form `<bucket name>/<path to storage object>`. Paths to folders must end with a `/` (e.g., `{DEFAULT}/users/{uid}/`). (You can use `{UID}` to represent the User ID and `{DEFAULT}` to represent the default Storage bucket for your project, e.g., `{DEFAULT}/{UID}-pic.png`, `my-app-logs/{UID}-logs.txt`). You will see an example in section **Function config examples. Example 3**.

>You can also use other wildcards to represent user's UserId: `{user}`, `{userId}`, `{uid}` or `{id}`. Lowercase and uppercase letters are treated as the same. Any other wildcard used as a placeholder for the UserId of the user will be ignored.

It is not mandatory to set all the configuration fields, and you will not see errors when installing the function, but you must configure some of them conditionally:

- If you set `realtimeDatabasePaths` to delete data from Realtime Database, then you must set `realtimeDatabaseUrl` as well.

This function uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:

- Cloud Firestore
- Firebase Realtime Database
- Cloud Storage

### Function config examples

#### Example 1: Configuration to delete data in Cloud Firestore

```text
CONFIGURATION={
    "firestorePaths": [
      "profile-images/{UID}-jpg",
      "users/{userId}"
    ],
    "firestoreDeleteRecursive": false
}
```

#### Example 2: Configuration to delete data in Realtime Database

```text
CONFIGURATION={
    "realtimeDatabaseUrl": "https://my-database.firebaseio.com",
    "realtimeDatabasePaths": ["profile-images/{UID}-jpg", "users/{userId}"]
}
```

#### Example 3: Configuration to delete data in Firebase Storage

In this example, we have a project named `dummy-project`, that contains two buckets: the app default storage bucket to store user files, and a second one named `log-files` to store user logs. To delete the user files from boths buckets, we can set the configuration as follows:

```text
CONFIGURATION={
    "storagePaths": [
      "{DEFAULT}/profile-images/{UID}-jpg",
      "log-files/{userId}/"
    ]
}
```

### Resources

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Coud Firestore](https://firebase.google.com/docs/firestore)
- [Realtime Database](https://firebase.google.com/docs/database)
- [Cloud Storage](https://firebase.google.com/docs/storage)
