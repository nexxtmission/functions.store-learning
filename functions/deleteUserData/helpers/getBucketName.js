const getBucketName = ({ path }) => {
    const parts = path.trim().split('/');
    const bucketName = parts[0].trim() || '{default}';
    return (/{default}/gi.test(bucketName) ? undefined : bucketName);
};

module.exports = getBucketName;
