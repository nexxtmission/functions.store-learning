const getProjectId = (env) => env.PROJECT_ID || env.GCLOUD_PROJECT || env.GCP_PROJECT;

module.exports = getProjectId;
