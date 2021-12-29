const shipEngine = require('./shipengine');

const trackShipmentUsingCarrierAndTracking = ({
    trackingNumber, carrierCode,
}) => shipEngine.trackUsingCarrierCodeAndTrackingNumber({
    trackingNumber,
    carrierCode,
});

module.exports = trackShipmentUsingCarrierAndTracking;
