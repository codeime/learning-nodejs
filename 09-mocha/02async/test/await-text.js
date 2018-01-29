const hello = require('../hello2');
const assert = require('assert');

it('#async with done', async () => {

    let t = await hello();
    assert.strictEqual(t, 15);

})