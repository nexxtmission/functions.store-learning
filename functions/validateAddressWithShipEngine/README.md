### How this function works

You can use this function to ensure valid addresses around the world with [ShipEngine](https://www.shipengine.com/).

Though every country in the world is supported, validation precision may vary. See the [full list of countries](https://www.shipengine.com/docs/addresses/validation/countries/) and their level of validation.

### Prerequisites

- You must have previous knowledge of **Firebase**.
- You must have previous knowledge of **ShipEngine**.

### Function details

To install this function, add the required information to the form with the following parameters:

- **SHIPENGINE_API_KEY**: The ShipEngine API Key.
- **DATA_MAPPING**: A JSON object that defines how the data is mapped to ShipEngine API structure. See section **Data mapping**.

> All fields are required.

### Data mapping

As described before, it is required to map your data to ShipEngine. The mapping object is defined as:

```json
{
    "addressLine1": "<field in your document>",
    "addressLine2": "<field in your document>",
    "addressLine3": "<field in your document>",
    "countryCode": "<field in your document>",
    "name": "<field in your document>",
    "companyName": "<field in your document>",
    "phone": "<field in your document>",
    "cityLocality": "<field in your document>",
    "stateProvince": "<field in your document>",
    "postalCode": "<field in your document>",
    "addressResidentialIndicator": "<field in your document>"
}
```

> The fields `addressLine1`, `cityLocality`, `stateProvince` and `countryCode` are required.

By default, the mapping is set to the same field names:

```json
{
    "name": "name",
    "phone": "phone",
    "companyName": "companyName",
    "addressLine1": "addressLine1",
    "addressLine2": "addressLine2",
    "addressLine3": "addressLine3",
    "cityLocality": "cityLocality",
    "stateProvince": "stateProvince",
    "postalCode": "postalCode",
    "countryCode": "countryCode",
    "addressResidentialIndicator": "addressResidentialIndicator"
}
```

Here are some examples:

#### Example 1: Mapping document with flattened structure

If the request parameter has the following structure:

```javascript
{
    name: 'Sherlock Holmes',
    address: '221B Baker St'
    city: 'London',
    state: 'Westminster',
    country: 'UK',
    postal_code: 'NW1 6XE'
}
```

Then the mapping JSON should have a structure as follows:

```json
{
    "name": "name",
    "addressLine1": "address",
    "cityLocality": "city",
    "stateProvince": "state",
    "countryCode": "country",
    "postalCode": "postal_code"
}
```

#### Example 2: Mapping document with nested fields

If the request parameter has the following structure:

```javascript
{
    name: 'Sherlock Holmes',
    address: {
        street: '221B Baker St'
        city: {
            name: 'London',
            location: {
                _latitude: -23.002 
                _longitude: -0.002
            }
        },
        state: 'Westminster',
        country: 'UK',
        postalCode: 'NW1 6XE'
    }
}
```

Then the mapping JSON should have a structure as follows:

```json
{
    "name": "name",
    "addressLine1": "address.street",
    "cityLocality": "address.city.name",
    "stateProvince": "address.state",
    "countryCode": "address.country",
    "postalCode": "address.postalCode"
}
```

### Resources

- [ShipEngine API Management page](https://app.shipengine.com/#/portal/apimanagement)
- [ShipEngine Address Validation](https://www.shipengine.com/docs/addresses/validation/)
