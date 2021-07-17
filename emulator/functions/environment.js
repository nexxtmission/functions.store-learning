// addNewUserToBigQuery
process.env.DATASET_NAME = 'your_dataset_name';
process.env.USERS_TABLE_NAME = 'your_users_table_name';

// addNewUserToFirestore
process.env.FIRESTORE_COLLECTION_PATH = 'your_firestore_collection_path';

// sendSignUpWelcomeEmail
process.env.SENDGRID_API_KEY = 'your_sendgrid_api_key';
process.env.SENDGRID_SENDER_EMAIL = 'your_sendgrid_sender_email';
process.env.SENDGRID_TEMPLATE_ID = 'your_sendgrid_template_id';
