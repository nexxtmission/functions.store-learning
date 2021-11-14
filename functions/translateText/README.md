### How this function works

Use this function to translate strings written to a Cloud Firestore collection.

This function listens for the changes made to a Cloud Firestore collection. When a string is added to a specified field in any document within that the collection, this function:

- Translates the string into the target language(s); the source language of the string is automatically detected.
- Adds the translation(s) of the string to a separate field in the same document.

Target languages must use ISO-639-1 codes. You can find a list of valid languages and their corresponding codes in [Cloud Translation API documentation](https://cloud.google.com/translate/docs/languages).

The translations will also be updated when the original non-translated field in the document is modified.

> **Note** To translate multiple collections you must install the function several times

### Function details
To install this function add the required information to the form with the following parameters:

- **Document Path**: The document path that you'd like this function to listen to. A placeholder should be used for the document id (e.g., `/collection/{docId}`).
- **LANGUAGES**: A comma-separated list of target languages for translations.
- **INPUT_FIELD_NAME**: The input field for translation.
- **OUTPUT_FIELD_NAME**: The output field name where translations will be stored.

### Requirements
To install this function, your project must be on the **Blaze plan**.

As this function uses other Firebase and Google Cloud Platform services, you will be charged if you exceed the service’s free tier:

- Cloud Translation API
- Cloud Firestore
- Cloud Functions
