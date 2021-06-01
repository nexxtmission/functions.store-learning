### How this function works

This function will allow you to store the user data in a BigQuery table when a new user signs up.

### Prerequisites
* You must have previous knowledge of **BigQuery**.
* You must have the **BigQuery** API available.
* You must grant BigQuery read/write access to the default service account that will be used. For more information about this, see: https://cloud.google.com/iam/docs/service-accounts#default.

### Function details

This function listens when a new user signs up and then add this user record in a BigQuery table.

To install this function you need to specify the name of the dataset and the name of the table into which the new users will be inserted as follows:
* **DATASET_NAME**: The name of the dataset to store the users. If it does not exist, the function will create it.
* **USERS_TABLE_NAME**: The name of the table to store the users. If it does not exist, the function will create it.

>It is recommended that you do not create the table manually, but let the function create it for you.

The created table will have the following schema:
```JSON
{
    "fields": [
        {
            "name": "uid",
            "type": "STRING",
            "mode": "REQUIRED"
        },
        {
            "name": "disabled",
            "type": "BOOLEAN"
        },
        {
            "name": "displayName",
            "type": "STRING"
        },
        {
            "name": "email",
            "type": "STRING"
        },
        {
            "name": "emailVerified",
            "type": "BOOLEAN"
        },
        {
            "name": "metadata",
            "type": "RECORD",
            "fields": [
                {
                    "name": "creationTime",
                    "type": "TIMESTAMP"
                },
                {
                    "name": "lastRefreshTime",
                    "type": "TIMESTAMP"
                },
                {
                    "name": "lastSignInTime",
                    "type": "TIMESTAMP"
                }
            ]
        },
        {
            "name": "passwordHash",
            "type": "STRING" 
        },
        {
            "name": "passwordSalt",
            "type": "STRING"
        },
        {
            "name": "phoneNumber",
            "type": "STRING"
        },
        {
            "name": "photoURL",
            "type": "STRING"
        },
        {
            "name": "providerData",
            "type": "RECORD",
            "mode": "REPEATED",
            "fields": [        
                {
                    "name": "displayName",
                    "type": "STRING"
                },
                {
                    "name": "email",
                    "type": "STRING"
                },
                {
                    "name": "phoneNumber",
                    "type": "STRING"
                },
                {
                    "name": "photoURL",
                    "type": "STRING"
                },
                {
                    "name": "providerId",
                    "type": "STRING"
                },
                {
                    "name": "uid",
                    "type": "STRING"
                }
            ]
        },
        {
            "name": "tenantId" ,
            "type": "STRING"  
        },
        {
            "name": "tokensValidAfterTime",
            "type": "TIMESTAMP"
        }   
    ]
}
```

### Resources
* [BigQuery docs](https://cloud.google.com/bigquery/docs)
