const shipEngine = require('./shipengine');

const trackShipmentUsingLabel = async (labelId) => {
    const data = await shipEngine.trackUsingLabelId(labelId);
    return {
        ...data,
        labelId,
    };
};

module.exports = trackShipmentUsingLabel;
