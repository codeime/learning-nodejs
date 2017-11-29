const path = require('path');
let cache = {};

function store(key, value) {
    cache[path.normalize(key)] = value;
}
store('node/day01', 1);
store("node//day01/../", 2);
console.log(cache);