const getChangeType = require('../../helpers/getChangeType');
const shortenCreated = require('./shortenCreated');
const shortenUpdated = require('./shortenUpdated');

const updateSnapshotShortUrl = async (snapshot) => {
    const changeType = getChangeType(snapshot);
    switch (changeType) {
        case 'CREATE':
            await shortenCreated(snapshot.after);
            break;
        case 'UPDATE':
            await shortenUpdated(snapshot.before, snapshot.after);
            break;
        default:
    }
};

module.exports = updateSnapshotShortUrl;
