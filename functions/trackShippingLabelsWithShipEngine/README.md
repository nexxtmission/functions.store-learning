### How this function works

You can use this function to [get the current status of a package](https://www.shipengine.com/docs/tracking/) with [ShipEngine](https://www.shipengine.com/).

### Prerequisites

- You must have previous knowledge of **Firebase**.
- You must have previous knowledge of **ShipEngine**.

### Function details

To install this function, add the required information to the form with the following parameters:

- **SHIPENGINE_API_KEY**: The ShipEngine API Key.
- **INPUT_DATA_MAPPING**: A JSON object that defines how the data is mapped to ShipEngine API request structure. See section **Data mapping**.
- **OUTPUT_DATA_MAPPING**: A JSON object that defines how the response data is mapped to your own structure. See section **Data mapping**.
- **COLLECTION_PATH**: The collection path to store tracking data. Documents created will be have the tracking number as ID.

> Only the fields `SHIPENGINE_API_KEY` and `COLLECTION_PATH` are required.

### Using this function

Once the function is installed, you can start using it in your project.

Call the function passing either the `labelId` obtained from ShipEngine (see [Create a Label](https://www.shipengine.com/docs/labels/create-a-label/)) or passing the `trackingNumber` and `carrierCode` as described in [Track a Package](https://www.shipengine.com/docs/tracking/).

> A full response object can be found in the *Example Response* from [Track a Package](https://www.shipengine.com/docs/tracking/) section in ShipEngine API docs. (Use camel case for properties (e.g., `trackingNumber` instead of `tracking_number`).)

### Usage examples

Here are some examples of how to call this function from your app with JavaScript.


#### Example 1: Track a package

```js
const trackShippingLabels = firebase.functions().httpsCallable('trackShippingLabelsWithShipEngine');

const rates = await trackShippingLabels({
    trackingNumber: '9405511899223197428490',
    carrierCode: 'stamps_com',
});
```

#### Example 2: Track using a label ID

```js
const trackShippingLabels = firebase.functions().httpsCallable('trackShippingLabelsWithShipEngine');

const rates = await trackShippingLabels({
    labelId: 'se-123456',
});
```

### Data mapping

As described before, you can map your data either to ShipEngine API request object or map ShipEngine responses to your own structure.

Lets see how to map data for input or output data.

#### Mapping input data

To track a package you can either use a `labelId` if the label was created using ShipEngine API or use a `trackingNumber` and a `carrierCode` for other packages.

The input mapping object is defined as:

```json
{
    "labelId": "<field in your request data>",
    "trackingNumber": "<field in your request data>",
    "carrierCode": "<field in your request data>",
}
```

For example, lets asume we want to submit an object like:

```js
{
    shipment: {
        trackingNumber: '1234',
        carrier: {
            name: 'Stamps',
            code: 'stamps_com'
        }
    }
}
```

our input map should be

```json
{
    "trackingNumber": "shipment.trackingNumber",
    "carrierCode": "shipment.carrier.code"
}
```

>Note that we omit `labelId` as we are only interested on tracking using a tracking number and a carrier code.

#### Mapping output data

Once we got the tracking information for our package, we may want to have a different structure that meet our app needs. You can map result as defined:

```json
{
    "<field in response data>": "trackingNumber",
    "<field in response data>": "statusCode",
    "<field in response data>": "statusDescription",
    "<field in response data>": "carrierStatusCode",
    "<field in response data>": "carrierDetailCode",
    "<field in response data>": "carrierStatusDescription",
    "<field in response data>": "shipDate",
    "<field in response data>": "estimatedDeliveryDate",
    "<field in response data>": "actualDeliveryDate",
    "<field in response data>": "exceptionDescription",
    "<field in response data>": {
        "root": "events",
        "<field in response data>": "occurredAt",
        "<field in response data>": "carrierOccurredAt",
        "<field in response data>": "description",
        "<field in response data>": "cityLocality",
        "<field in response data>": "stateProvince",
        "<field in response data>": "postalCode",
        "<field in response data>": "countryCode",
        "<field in response data>": "companyName",
        "<field in response data>": "signer",
        "<field in response data>": "eventCode",
        "<field in response data>": "statusCode",
        "<field in response data>": "carrierStatusCode",
        "<field in response data>": "carrierDetailCode",
        "<field in response data>": "latitude",
        "<field in response data>": "longitude"
    }
}
```

>By default all fields are mapped to the same name.

For example, lets asume that ShipEngine response was:

```js
{
    trackingNumber: '9405511899223197428490',
    statusCode: 'DE',
    statusDescription: 'Delivered',
    carrierStatusCode: '01',
    carrierStatusDescription: 'Your item was delivered in or at the mailbox at 9:10 am on March 2, 2017 in AUSTIN, TX 78756.',
    shipDate: '2019-07-26T22:10:50.286Z',
    estimatedDeliveryDate: null,
    actualDeliveryDate: '2019-07-26T22:10:50.286Z',
    exceptionDescription: null,
    events: [
        {
            occurredAt: '2019-09-13T12:32:00Z',
            carrierOccurredAt: '2019-09-13T05:32:00',
            description: 'Arrived at USPS Facility',
            cityLocality: 'OCEANSIDE',
            stateProvince: 'CA',
            postalCode: '92056',
            countryCode: 'US',
            companyName: 'USPS Facility',
            signer: '',
            eventCode: 'U1'
        }
    ]
}
```

And we want to map that response to an object like:

```js
{
    tracking: {
        id: '9405511899223197428490',
        status: 'DE',
        carrier: {
            status: '01'
        },
        events: [
            {
                dateOccurred: '2019-09-13T12:32:00Z',
                eventCode: 'U1',
                eventDescription: 'Arrived at USPS Facility',
                company: 'USPS Facility',
                country: 'US'
            }
        ]
    }
}
```

The output map should be:

```json
{
    "tracking.id": "trackingNumber",
    "tracking.status": "statusCode",
    "tracking.carrier.status": "carrierStatusCode",
    "tracking.events": {
        "root": "events",
        "dateOccurred": "occurredAt",
        "eventDescription": "description",
        "country": "countryCode",
        "company": "companyName",
        "eventCode": "eventCode"
    }
}
```

> Note that you don't have to include all fields in your mapping. Only those you you want to be included in the response.

### Resources

- [ShipEngine API Management page](https://app.shipengine.com/#/portal/apimanagement)
- [ShipEngine documentation](https://www.shipengine.com/docs/getting-started/)
- [Track a Package](https://www.shipengine.com/docs/tracking/)
- [Track Using a Label ID](https://www.shipengine.com/docs/tracking/track-by-label-id/)
