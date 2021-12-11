### How this function works

You can use this function to obtain calculated real-time shipping rates across global carriers using [ShipEngine](https://www.shipengine.com/).

> Rates estimation is not exact as they may not include things like insurance amount, fuel surcharges, customs charges, or other carrier fees.

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

Call the function passing either a `shipmentId` or a `shipment` object as described in [ShipEngine API](https://www.shipengine.com/docs/rates/estimate/). Use camel case for properties. (e.g., `serviceCodes` instead `service_codes`).

You can also pass additional options to calculate rates in `rateOptions`. See examples section.

The command will return the list of calculated rates as a property keyed with the value in `RATES_FIELD_NAME` config.

An example response (assuming that we have set the value of `RATES_FIELD_NAME` to "rates"):

```json
{
    "rates": [{
        "rateId": "se-1234",
        "rateType": "shipment",
        "carrierId": "se-1179703",
        "shippingAmount": {
            "currency": "usd",
            "amount": 0.53
        },
        "insuranceAmount": {
            "currency": "usd",
            "amount": 0
        },
        "confirmationAmount": {
            "currency": "usd",
            "amount": 0
        },
        "otherAmount": {
            "currency": "usd",
            "amount": 0
        },
        "taxAmount": null,
        "zone": 7,
        "packageType": "letter",
        "deliveryDays": 4,
        "guaranteedService": false,
        "estimatedDeliveryDate": "2021-12-11T00:00:00Z",
        "carrierDeliveryDays": "4",
        "shipDate": "2021-12-07T00:00:00Z",
        "negotiatedRate": false,
        "serviceType": "USPS First Class Mail",
        "serviceCode": "usps_first_class_mail",
        "trackable": false,
        "carrierCode": "stamps_com",
        "carrierNickname": "ShipEngine Test Account - Stamps.com",
        "carrierFriendlyName": "Stamps.com",
        "validationStatus": "valid",
        "warningMessages": [],
        "errorMessages": []
    }]
}
```

> A full response object can be found in *Example Response* from [Calculate Shipping Costs](https://www.shipengine.com/docs/rates/) section in ShipEngine API docs.

### Usage examples

Here are some examples of how to call this function from your app with JavaScript.

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
