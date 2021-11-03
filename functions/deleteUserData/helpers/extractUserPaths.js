const replaceUID = (path, uid) => path.replace(/{id}|{uid}|{userid}|{user_id}|{user}/gi, uid);

const extractUserPaths = (
    paths, uid,
) => paths.split(',').map((path) => replaceUID(path.trim(), uid));

module.exports = extractUserPaths;
