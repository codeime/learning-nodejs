const zlib = require('zlib');
const http = require('http');
let ops = {
    hostname: 'www.baidu.com',
    port: '',
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'gzip,deflate'
    }
};
http.request(ops, res => {
    let body = [];
    res.on('data', chunk => {
        body.push(chunk);
    });
    res.on('end', () => {
        body = Buffer.concat(body);
        if ((res.headers['content-encoding'] || '').indexOf('gzip') != -1) {
            zlib.gunzip(body, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data.toString());
                }
            })

        } else {
            console.log(body.toString());
        }
    })
}).end();