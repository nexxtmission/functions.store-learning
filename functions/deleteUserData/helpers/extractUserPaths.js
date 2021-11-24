const replaceUID = (path, uid) => path.replace(/{id}|{uid}|{userid}|{user_id}|{user}/gi, uid);

const extractUserPaths = (
    paths, uid,
) => paths.map((path) => replaceUID(path.trim(), uid));

module.exports = extractUserPaths;
