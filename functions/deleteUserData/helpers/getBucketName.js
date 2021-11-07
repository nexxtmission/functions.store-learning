const getBucketName = ({ path, defaultBucketName }) => {
    const parts = path.trim().split('/');
    const bucketName = parts[0];
    return (bucketName === '{DEFAULT}' ? defaultBucketName : bucketName);
};

module.exports = getBucketName;
