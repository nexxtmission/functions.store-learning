const getProjectId = require('../getProjectId');

describe('getProjectId()', () => {
    it('should return project id', async () => {
        [
            { PROJECT_ID: 'project' },
            { GCP_PROJECT: 'project' },
            { GCLOUD_PROJECT: 'project' },
        ].forEach(
            (env) => expect(getProjectId(env)).toBe('project'),
        );
    });
});
