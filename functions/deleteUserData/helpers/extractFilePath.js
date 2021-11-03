const extractFilePath = ({ path }) => {
    const parts = path.trim().split('/');
    return parts.slice(1).join('/');
};

module.exports = extractFilePath;
