const url = require('url');
const ops = {
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
};
console.log(url.format(ops));


// resolve
let newUrl = url.resolve('http://www.example.com/foo/bar', '../bar');
console.log(newUrl);