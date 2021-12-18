### How this function works

You can use this function to obtain calculated real-time shipping rates across global carriers using [ShipEngine](https://www.shipengine.com/).

> Rate estimates are not exact quotes as they may not include things like insurance amount, fuel surcharges, customs charges, or other carrier fees.

### Prerequisites

- You must have previous knowledge of **Firebase**.
- You must have previous knowledge of **ShipEngine**.

### Function details

To install this function, add the required information to the form with the following parameters:

- **SHIPENGINE_API_KEY**: The ShipEngine API Key.
- **CARRIERS_IDS**: An array of carrier IDs from your ShipEngine account.

> All fields are required.

### Using this function

Once the function is installed, you can start using it in your project.

Call the function passing either the `shipmentId` obtained from ShipEngine (see [Create a Shipment](https://www.shipengine.com/docs/shipping/create-a-shipment/)) or a `shipment` object as described in [Estimate a Rate](https://www.shipengine.com/docs/rates/estimate/). Use camel case for properties (e.g., `serviceCodes` instead of `service_codes`).

You can also pass additional options to calculate rates in `rateOptions`. See the examples section.

> A full response object can be found in the *Example Response* from [Calculate Shipping Costs](https://www.shipengine.com/docs/rates/) section in ShipEngine API docs.

### Usage examples

Here are some examples of how to call this function from your app with JavaScript.

#### Example 1: Getting rates using shipment ID

```js
const getShippingRates = firebase.functions().httpsCallable('getShippingRatesFromShipEngine');

const rates = await getShippingRates({
    shipmentId: 'se-123',
});
```

#### Example 2: Getting rates using shipment details

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

#### Example 3: Getting rates using package types

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

#### Example 4: Getting rates using service codes

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

#### Example 5: Getting rates using both service codes and package types

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
### Resources
- [ShipEngine API Management page](https://app.shipengine.com/#/portal/apimanagement)
- [ShipEngine documentation](https://www.shipengine.com/docs/getting-started/)
