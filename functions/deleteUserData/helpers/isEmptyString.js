const isEmptyString = (value) => [null, undefined, ''].includes(value && value.trim());

module.exports = isEmptyString;
