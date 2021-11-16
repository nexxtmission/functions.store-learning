const admin = require('./admin');

const getUser = async (uid) => admin.auth().getUser(uid);

module.exports = getUser;
