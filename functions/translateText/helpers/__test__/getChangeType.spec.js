const getChangeType = require('../getChangeType');

describe('getChangeType()', () => {
    it('should return right change type for snapshot', async () => {
        const results = ['CREATE', 'DELETE', 'UPDATE'];
        [
            { before: { exists: false }, after: { exists: true } },
            { before: { exists: true }, after: { exists: false } },
            { before: { exists: true }, after: { exists: true } },
        ].forEach(
            (snapshot, index) => expect(getChangeType(snapshot)).toBe(results[index]),
        );
    });
});
