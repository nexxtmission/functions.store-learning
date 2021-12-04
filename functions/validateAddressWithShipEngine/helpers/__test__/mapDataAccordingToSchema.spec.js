const mapDataAccordingToSchema = require('../mapDataAccordingToSchema');

describe('mapDataAccordingToSchema()', () => {
    it('should return right mapping', () => {
        const documents = [{
            name: 'John Smith',
            addressLine1: '200 Sunrise Mall',
            cityLocality: 'Massapequa',
            stateProvince: 'NY',
            postalCode: '11758',
            countryCode: 'US',
        }, {
            name: 'John Smith',
            address: {
                addressLine1: '200 Sunrise Mall',
                cityLocality: 'Massapequa',
                stateProvince: 'NY',
                postalCode: '11758',
                countryCode: 'US',
            },
        }, {
            name: 'John Smith',
            address: ['200 Sunrise Mall', 'Massapequa', 'NY', '11758', 'US'],
        }];
        const schemas = [{
            name: 'name',
            addressLine1: 'addressLine1',
            cityLocality: 'cityLocality',
            stateProvince: 'stateProvince',
            postalCode: 'postalCode',
            countryCode: 'countryCode',
        }, {
            name: 'name',
            addressLine1: 'address.addressLine1',
            cityLocality: 'address.cityLocality',
            stateProvince: 'address.stateProvince',
            postalCode: 'address.postalCode',
            countryCode: 'address.countryCode',
        }, {
            name: 'name',
            addressLine1: 'address[0]',
            cityLocality: 'address[1]',
            stateProvince: 'address[2]',
            postalCode: 'address[3]',
            countryCode: 'address[4]',
        }];
        documents.forEach(
            (document, index) => expect(
                mapDataAccordingToSchema(document, schemas[index]),
            ).toEqual({
                name: 'John Smith',
                addressLine1: '200 Sunrise Mall',
                cityLocality: 'Massapequa',
                stateProvince: 'NY',
                postalCode: '11758',
                countryCode: 'US',
            }),
        );
    });
});
