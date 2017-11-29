const querystring = require('querystring');
var param = querystring.parse('foo=bar&baz=qux&baz=quux&corge');
console.log(param);