const assert = require('assert');
const sum = require('../hello');



/* describe('#hello.js', () => {
    it('sum() should return 0', () => {
        assert.strictEqual(sum(), 0)
    });
    it('sum(1) should return 1', () => {
        assert.strictEqual(sum(1), 1);
    });
    it('sum(1,2) should return 3', () => {
        assert.strictEqual(sum(1, 2), 3);
    });
    it('sum(1,2,3) should return 6', () => {
        assert.strictEqual(sum(1, 2, 3), 6);
    });


}) */


describe('#hello.js', () => {
    describe('#sum()', () => {

        before(function () {
            console.log('before');
        });

        after(function () {
            console.log('after');
        });

        beforeEach(() => {
            console.log('beforeEach')
        });
        afterEach(() => {
            console.log('afterEach');
        });

        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        });
        it('sum() should return 1', () => {
            assert.strictEqual(sum(1), 1);
        });
        it('sum() should return 3', () => {
            assert.strictEqual(sum(1, 2), 3);
        });
        it('sum() should return 6', () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });
    });
});