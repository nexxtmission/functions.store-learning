const getBucketName = ({ path, defaultBucketName }) => {
    const parts = path.trim().split('/');
    const bucketName = parts[0];
    return (/{default}/gi.test(bucketName) ? defaultBucketName : bucketName);
};

module.exports = getBucketName;
