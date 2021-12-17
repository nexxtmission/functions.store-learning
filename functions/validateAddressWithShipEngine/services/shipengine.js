const ShipEngine = require('shipengine');
const getConfig = require('./getConfig');

const shipEngine = new ShipEngine(getConfig().shipEngineApiKey);

module.exports = shipEngine;
