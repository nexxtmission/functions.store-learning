const mapDataAccordingToSchema = require('../mapDataAccordingToSchema');

describe('mapDataAccordingToSchema()', () => {
    it('should return same data if no schema is passed', () => {
        expect(
            mapDataAccordingToSchema({ foo: 'bar' }, null),
        ).toEqual({ foo: 'bar' });
    });
    it('should return null is no data is passed', () => {
        expect(
            mapDataAccordingToSchema(null, { propA: 'foo.bar' }),
        ).toEqual(null);
    });
    it('should return right mapping', () => {
        const documents = [
            { label: { id: '123' } },
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
                        eventCode: 'U1',
                    },
                ],
            },
            {
                from: {
                    user: {
                        id: 'user-245',
                        name: 'Jane Doe',
                        phone: '111-222-3333',
                    },
                    address: {
                        address: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: 'US',
                    },
                },
                sentTo: {
                    user: {
                        id: 'user-123',
                        name: 'John Doe',
                        phone: '111-111-1111',
                    },
                    address: {
                        address: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        country: 'UK',
                    },
                },
                package: {
                    content: [
                        {
                            weight: 5,
                            weightUnit: 'ounce',
                        },
                    ],
                },
            },
        ];
        const schemas = [
            { labelId: 'label.id' },
            {
                'tracking.id': 'trackingNumber',
                'tracking.status': 'statusCode',
                'tracking.carrier.status': 'carrierStatusCode',
                'tracking.events': {
                    root: 'events',
                    dateOccurred: 'occurredAt',
                    eventDescription: 'description',
                    country: 'countryCode',
                    company: 'companyName',
                    eventCode: 'eventCode',
                },
            },
            {
                shipment: {
                    shipTo: {
                        name: 'sentTo.user.name',
                        phone: 'sentTo.user.phone',
                        addressLine1: 'sentTo.address.address',
                        addressLine2: 'sendTo.address.address2',
                        cityLocality: 'sentTo.address.city',
                        stateProvince: 'sentTo.address.state',
                        postalCode: 'sentTo.address.zipCode',
                        countryCode: 'sentTo.address.country',
                    },
                    shipFrom: {
                        name: 'from.user.name',
                        phone: 'from.user.phone',
                        addressLine1: 'from.address.address',
                        addressLine2: 'from.address.address2',
                        cityLocality: 'from.address.city',
                        stateProvince: 'from.address.state',
                        postalCode: 'from.address.zipCode',
                        countryCode: 'from.address.country',
                    },
                    packages: {
                        root: 'package.content',
                        weight: {
                            value: 'weight',
                            unit: 'weightUnit',
                        },
                    },
                },
            },
        ];
        const results = [
            { labelId: '123' },
            {
                tracking: {
                    id: '9405511899223197428490',
                    status: 'DE',
                    carrier: {
                        status: '01',
                    },
                    events: [
                        {
                            dateOccurred: '2019-09-13T12:32:00Z',
                            eventCode: 'U1',
                            eventDescription: 'Arrived at USPS Facility',
                            company: 'USPS Facility',
                            country: 'US',
                        },
                    ],
                },
            },
            {
                shipment: {
                    shipTo: {
                        name: 'John Doe',
                        phone: '111-111-1111',
                        addressLine1: '',
                        cityLocality: '',
                        stateProvince: '',
                        postalCode: '',
                        countryCode: 'UK',
                    },
                    shipFrom: {
                        name: 'Jane Doe',
                        phone: '111-222-3333',
                        addressLine1: '',
                        cityLocality: '',
                        stateProvince: '',
                        postalCode: '',
                        countryCode: 'US',
                    },
                    packages: [
                        {
                            weight: {
                                value: 5,
                                unit: 'ounce',
                            },
                        },
                    ],
                },
            },
        ];
        documents.forEach((document, index) => {
            expect(mapDataAccordingToSchema(document, schemas[index])).toEqual(results[index]);
        });
    });
});
