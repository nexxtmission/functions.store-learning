const get = require('lodash.get');

const mapDataAccordingToSchema = (data, schema) => {
    const mappedData = {};
    Object.keys(schema).forEach((key) => {
        if (get(data, schema[key]) !== undefined) {
            mappedData[key] = get(data, schema[key]);
        }
    });
    return mappedData;
};

module.exports = mapDataAccordingToSchema;
