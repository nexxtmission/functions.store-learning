### How this function works

Use this function to automatically delete all user data when it is deleted from your authenticated users.

You can configure this function to delete user data from any or all of the following: Cloud Firestore, Realtime Database, or Cloud Storage. Data must be keyed to the user's UserId.

> To use this extension, you need to manage your users with Firebase Authentication.

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
      "realtimeDatabaseName": "my-rt-database",
      "realtimeDatabasePaths": ["collection/{UID}"],
      "storageDefaultBucketName": "user_files",
      "storagePaths": ["{DEFAULT}/path/to/{UID}/files"]
    }
    ```

  - **firestorePaths**: A comma separated list of full paths that contain user data in your Cloud Firestore instance. Leave empty if you don't use Cloud Firestore. (You can represent the User ID of the deleted user with `{UID}` (e.g., `users/{UID}`). See examples below.

  > **Note** Use of `{UID}` in Cloud Firestore paths is mandatory.

  - **firestoreDeleteRecursive**: Recursively delete documents subcollections. (Cloud Firestore only).
  - **realtimeDatabaseName**: The Realtime Database instance where you want to delete the user data. To find the database name, Go to Firebase console, select your project and navigate to the Realtime Database section. Depending on the region you choosed for your project, the database name will be of the form `<databaseName>` or `<databaseName>.<region>`
  - **realtimeDatabasePaths**: A comma separated list of full paths that contain user data in your Realtime Database instance. Leave empty if you don't use Realtime Database. (You can represent the User ID of the deleted user with `{UID}`, e.g., `users/{UID}`). See examples below.

  > **Note** Use of `{UID}` in Realtime Database paths is mandatory.

  - **storageDefaultBucketName**: The name of the bucket to be used as default. Must be set if you want to use the wildcard `{DEFAULT}`.
  - **storagePaths**: A comma separated list of full paths to files or directories in your Google Cloud Storage buckets. Leave empty if you don't use Cloud Storage. (You can use `{UID}` to represent the User ID and `{DEFAULT}` to represent your default Storage bucket, e.g., `{DEFAULT}/{UID}-pic.png`, `my-app-logs/{UID}-logs.txt`).

> You can also use other wildcards to represent user's UserId: `{user}`, `{userId}`, `{uid}` or `{id}`. Lowercase and uppercase letters are treated as the same. Any other wildcard used as placeholder for user's UserId will be ignored.

As stated before, you can use `{DEFAULT}` in your storage paths to specify that the file is located in the default bucket. *Default* doesn't mean *"the default"* bucket for your project; it means that the bucket name will be used when `{DEFAULT}` appears in some path.

It is not mandatory to set all the configuration fields, and you will not see errors when installing the function, but you must configure some of them conditionally:

- If you set `realtimeDatabasePaths` to delete data from Realtime Database, then you must set `realtimeDatabaseName` as well.
- You don't need to set `storageDefaultBucketName` unless you use `{DEFAULT}` in your storage paths. See *Example 3* from *Function config examples* section to learn how to set config for Firebase Storage.

This function uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:

- Cloud Firestore
- Firebase Realtime Database
- Cloud Storage

### Function config examples

#### Example 1: Config to delete data in Cloud Firestore

```text
CONFIGURATION={
    "firestorePaths": [
      "profile-images/{UID}-jpg",
      "users/{userId}"
    ],
    "firestoreDeleteRecursive": false
}
```

#### Example 2: Config to delete data in Realtime Database

```text
CONFIGURATION={
    "realtimeDatabaseName": "my-database",
    "realtimeDatabasePaths": ["profile-images/{UID}-jpg", "users/{userId}"]
}
```

#### Example 3: Config to delete data in Firebase Storage

In this example, we have a project named `dummy-project`, that contains two buckets: the app default bucket to store user files, and a second one named `log-files` to store user logs. To delete the user files from boths buckets, we can set the configuration as follows:

Using `{DEAFULT}` placeholder and setting `storageDefaultBucketName`

```text
CONFIGURATION={
    "storageDefaultBucketName": "dummy-project.appspot.com",
    "storagePaths": ["{DEFAULT}/profile-images/{UID}-jpg", "log-files/{userId}"]
}
```

Or we can omit the `storageDefaultBucketName` and avoid using `{DEFAULT}`

```text
CONFIGURATION={
    "storagePaths": ["dummy-project.appspot.com/profile-images/{UID}-jpg", "log-files/{userId}"]
}
```

### Resources

- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Coud Firestore](https://firebase.google.com/docs/firestore)
- [Realtime Database](https://firebase.google.com/docs/database)
- [Cloud Storage](https://firebase.google.com/docs/storage)
