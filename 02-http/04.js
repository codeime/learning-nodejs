const http = require('http');
http.get("http://www.baidu.com/", res => {
    let body = [];
    console.log(res.statusCode);
    console.log(res.headers);
    res.on('data', chunk => {
        body.push(chunk);
    })
    res.on('end', () => {
        console.log(Buffer.concat(body).toString());
    })
});