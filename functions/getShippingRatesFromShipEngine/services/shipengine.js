const ShipEngine = require('shipengine');
const config = require('./getConfig');

const shipEngine = new ShipEngine(config.shipEngineApiKey);

module.exports = shipEngine;
