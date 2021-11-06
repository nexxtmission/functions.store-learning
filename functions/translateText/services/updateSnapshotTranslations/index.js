const getChangeType = require('../../helpers/getChangeType');
const translateCreated = require('./translateCreated');
const translateUpdated = require('./translateUpdated');

const updateSnapshotTranslations = async (snapshot) => {
    const changeType = getChangeType(snapshot);
    switch (changeType) {
        case 'CREATE':
            await translateCreated(snapshot.after);
            break;
        case 'UPDATE':
            await translateUpdated(snapshot.before, snapshot.after);
            break;
        default:
    }
};

module.exports = updateSnapshotTranslations;
