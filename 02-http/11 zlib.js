const http = require('http');
const zlib = require('zlib');
http.createServer((req, res) => {
    let i = 1024,
        data = '';
    data = new Array(i + 1).join(".");

    //根据请求头判断浏览器是否支持gzip压缩，如果支持就启用
    if ((req.headers['accept-encoding'] || '').indexOf('gzip') != -1) {
        zlib.gzip(data, (err, data) => {
            res.writeHead(200, {
                'Content-type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            res.end(data);
        });
    } else {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        res.end(data);
    }
}).listen(3000);