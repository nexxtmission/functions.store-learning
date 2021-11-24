### How this function works

Use this function to create and send invoices to customers using the Stripe payments platform.

The invoices are automatically customized according to your Stripe settings. After the invoice is sent, you can use the Stripe dashboard to track and get more detailed reports.

As this function uses other Firebase and Google Cloud Platform services, you will be charged if you exceed the service's free tier:

- Cloud Firestore
- Cloud Functions

### Requirements

- You must have previous knowledge of **Firebase**.
- You must have previous knowledge of **Firestore**.
- You must have previous knowledge of **Stripe**.


### Function details

To install this function, add the required information to the form with the following parameters:

- **Document Path**: The document path that you'd like this function to listen to. A placeholder should be used for the document ID (e.g., `/invoices/{invoiceId}`).
- **STRIPE_API_KEY**: The API key to access Stripe services.
- **DAYS_UNTIL_DUE_DEFAULT**: The default number of days the customer has before the payment due date.

### Using this extension

#### Create an invoice

To create an invoice, it is required to provide:

- An `email` address or a Firebase Authentication user ID (`uid`).
- The list of payments (represented as a list of `items`). Each item must include:

  - **amount** (required): A numeric value reprensenting the price.
  - **currency** (required): A string reprensenting the currency. e.g., `usd`.
  - **description** (required): A descriptive text for the item.
  - **quantity** (optional): A number value representing the quantity. If omitted, the default value will be 1.
  - **tax_rates** (optional): An array of strings.

- **daysUntilDue** (optional): The number of days a customer has to pay the invoice before it’s closed. This value defaults to ${param:DAYS_UNTIL_DUE_DEFAULT}.
- **default_tax_rates** (optional): An array of tax rates that can be applied to items.
- **transfer_data** (optional): A [transfer_data](https://stripe.com/docs/api/invoices/create#create_invoice-transfer_data) object to send funds to a connected account after a successful payment.

Here are some sample documents to reprensent an invoice:

##### Example #1: A basic invoice

```javascript
{
  email: 'customer@example.com',
  items: [{
      amount: 1999,
      currency: 'usd',
      quantity: 2,
      description: 'Some awesome product'
  },
  {
      amount: 540,
      currency: 'usd',
      description: 'shipping cost'
  }]
}
```

##### Example #2: An invoice with customer `uid`

```javascript
{
  uid: 'APkKkSLsT6cjxsCqYMh3Gi0TZtl5',
  items: [{
      amount: 5000,
      currency: 'usd',
      description: 'A pair of shoes'
  }],
  daysUntilDue: 2
}
```

##### Example #3: An invoice with tax rates

```javascript
{
  email: 'user@domain.com',
  default_tax_rates: ['txr_1HCkCjYHgolSFC23vh4cyHB6'],
  items: [
    {
      amount: 6000,
      currency: 'usd',
      description: 'Some amazing books',
      tax_rates: ['txr_1HCkCjYHgolSFC23vh4cyHB6'],
    },
    {
      amount: 999,
      currency: 'usd',
      description: 'A very soft pillow',
    },
  ],
}
```

##### Example #4: An invoice with transfer_data

```javascript
{
  transfer_data: {
    destination: 'acct_1234',
    amount: 2114,
  },
  email: 'user@domain.com',
  items: [
    {
      amount: 1099,
      currency: 'usd',
      description: 'item 1',
    },
    {
      amount: 1250,
      currency: 'usd',
      description: 'item 2',
    },
  ],
}
```
