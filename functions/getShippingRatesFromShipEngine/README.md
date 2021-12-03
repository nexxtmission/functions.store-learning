### How this function works

You can use this function to obtain calculated real-time shipping rates across global carriers using [ShipEngine](https://www.shipengine.com/).

### Prerequisites

- You must have previous knowledge of **Firebase**.
- You must have previous knowledge of **ShipEngine**.

### Function details

To install this function, add the required information to the form with the following parameters:

- **SHIPENGINE_API_KEY**: The ShipEngine API key.
- **RATES_FIELD_NAME**: The name of the field in the response object where the calculated rates will be stored.
- **CARRIERS_IDS**: An array of carriers ids from your ShipEngine account.

> All fields are required.

### Using the function

Once the function is installed, you can start using it in your project.

Call the function passing either a `shipmentId` or a `shipment` object as described in [ShipEngine API]().

> Use camel case for properties. (e.g., `serviceCodes` instead `service_codes`).

Here are some examples of how to call this function from your app with JavaScript.

### Usage examples

#### Example #1: getting rates using shipment id

```js
const getShippingRates = firebase.functions().httpsCallable('getShippingRatesFromShipEngine');

const rates = await getShippingRates({
    shipmentId: 'se-123',
});
```

#### Example #2: getting rates using shipment details

```js
const getShippingRates = firebase.functions().httpsCallable('getShippingRatesFromShipEngine');

const rates = await getShippingRates({
    shipment: {
        shipTo: {
            name: 'Sherlock Holmes',
            addressLine1: '221B Baker St',
            cityLocality: 'London',
            stateProvince: 'Westminster',
            postalCode: 'NW1 6XE',
            countryCode: 'GB',
        },
        shipFrom: {
            companyName: 'Scotland Yard',
            name: 'Dr. John H. Watson',
            phone: '111-111-111111',
            addressLine1: '4 Whitehall Place St',
            cityLocality: 'London',
            stateProvince: 'Westminster',
            postalCode: 'NW1 6XE',
            countryCode: 'GB',
        },
        packages: [{
            weight: {
                value: 5.0,
                unit: 'ounce',
            },
        }],
    },
});
```

#### Example #3: getting rates using package types

```js
const getShippingRates = firebase.functions().httpsCallable('getShippingRatesFromShipEngine');

const rates = await getShippingRates({
    shipmentId: 'se-123',
    rateOptions: {
        serviceCodes: [],
        packageTypes: [
            'flat_rate_envelope',
            'medium_flat_rate_box',
        ],
    },
});
```

#### Example #4: getting rates using service codes

```js
const getShippingRates = firebase.functions().httpsCallable('getShippingRatesFromShipEngine');

const rates = await getShippingRates({
    shipmentId: 'se-123',
    rateOptions: {
        serviceCodes: [
            'usps_first_class_mail',
            'usps_priority_mail',
            'ups_next_day_air_early_am'
        ],
        packageTypes: [],
    }
});
```

#### Example #5: getting rates using both service codes and package types

```js
const getShippingRates = firebase.functions().httpsCallable('getShippingRatesFromShipEngine');

const rates = await getShippingRates({
    shipmentId: 'se-123',
    rateOptions: {
        serviceCodes: [
            'usps_first_class_mail',
            'usps_priority_mail',
            'ups_next_day_air_early_am'
        ],
        packageTypes: [
            'flat_rate_envelope',
            'medium_flat_rate_box',
        ],
    },
});
```
