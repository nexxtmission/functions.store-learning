### How this function works

Use this function to automatically delete a user's data if the user is deleted from your authenticated users.

You can configure this extension to delete user data from any or all of the following: Cloud Firestore, Realtime Database, or Cloud Storage. Each trigger of the extension to delete data is keyed to the user's UserId.

Note: To use this extension, you need to manage your users with Firebase Authentication.

This extension is useful in respecting user privacy and fulfilling compliance requirements. However, using this extension does not guarantee compliance with government and industry regulations.

### Prerequisites

* You must have previous knowledge of **BigQuery**.
* You must have previous knowledge of **Firestore**.

### Function details
To install this function, you must specify the path to the Firestore collection, the name of the dataset, the table, and the view. Add the required information to the form with the following parameters:

* **Document Path**: The document path that you'd like this function to listen to. A placeholder should be used for the document id (e.g., `users/{userId}`).
* **DATASET_NAME**: The name of the dataset to store the documents.
* **TABLE_NAME**: The name of the table to store the documents.
* **VIEW_NAME**: The name of the view that represents the current state of the data.

### Warnings
This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:

- Cloud Firestore
- Firebase Realtime Database
- Cloud Storage
