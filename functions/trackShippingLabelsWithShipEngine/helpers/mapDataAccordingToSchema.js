const castArray = require('lodash.castarray');
const get = require('lodash.get');
const set = require('lodash.set');

const mapDataAccordingToSchema = (data, schema) => {
    if (schema && data) {
        const mappedData = {};
        Object.keys(schema).forEach((key) => {
            if (schema[key].root) {
                const { root, ...otherSchemaProps } = schema[key];
                set(mappedData, key, castArray(get(data, schema[key].root)).map(
                    (item) => mapDataAccordingToSchema(
                        item,
                        { ...otherSchemaProps },
                    ),
                ));
            } else if (schema[key] === Object(schema[key])) {
                set(mappedData, key, mapDataAccordingToSchema(data, schema[key]));
            } else if (get(data, schema[key]) !== undefined) {
                set(mappedData, key, get(data, schema[key]));
            }
        });
        return mappedData;
    }
    return data || null;
};

module.exports = mapDataAccordingToSchema;
