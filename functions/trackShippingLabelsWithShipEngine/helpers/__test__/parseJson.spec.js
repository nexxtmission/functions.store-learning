const parseJson = require('../parseJson');

describe('parseJson()', () => {
    it('should return null', () => {
        [undefined, null, '', '{]'].forEach((value) => {
            expect(parseJson(value)).toBe(null);
        });
    });
    it('should return json object', () => {
        const results = [['23', '24'], { foo: 'bar' }];
        [
            '["23", "24"]',
            '{ "foo": "bar" }',
        ].forEach((value, index) => {
            expect(parseJson(value)).toEqual(results[index]);
        });
    });
});
