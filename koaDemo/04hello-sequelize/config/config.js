const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

let config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`load ${testConfig}....`);
    config = require(testConfig);
}