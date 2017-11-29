const http = require('http');

const url = require('url');

http.createServer((req, res) => {
    let reqUrl = req.url;
    console.log(url.parse(reqUrl));

}).listen(3000);