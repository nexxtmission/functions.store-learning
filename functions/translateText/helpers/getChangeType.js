const getChangeType = (snapshot) => {
    if (!snapshot.before.exists) {
        return 'CREATE';
    }
    if (!snapshot.after.exists) {
        return 'DELETE';
    }
    return 'UPDATE';
};

module.exports = getChangeType;
