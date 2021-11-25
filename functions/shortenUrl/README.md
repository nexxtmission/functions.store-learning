### How this function works

Use this function to shorten urls written to a Cloud Firestore collection.

This function listens for the changes made to a Cloud Firestore collection. When an url is added to a specified field in any document within that collection, this function:

- Shortens the url.
- Adds the shortened url to a separate field in the same document.

The shortened url will also be updated when the original url in the document is modified.

>To shorten multiple urls, you must install the function several times.

### Requirements

- You must have previous knowledge of **Cloud Firestore**.
- Your project must be on the **Blaze plan** of Firebase.

### Function details

To install this function, add the required information to the form with the following parameters:

- **Document Path**: The document path that you'd like this function to listen to. A placeholder should be used for the document ID (e.g., `/collection/{docId}`).
- **BITLY_ACCESS_TOKEN**: Your access token generated using [Bitly](https://bitly.com/a/oauth_apps).
- **LONG_URL_FIELD_NAME**: The name of the field that contains the url to be shortened.
- **SHORT_URL_FIELD_NAME**: The name of the field to store shortened urls.
- **SHORT_URL_DEFAULT_DOMAIN** (optional): A custom domain for shortened urls. This values defaults to `bit.ly`.

As this function uses other Firebase and Google Cloud Platform services, you will be charged if you exceed the service’s free tier:

- Cloud Firestore
- Cloud Functions
