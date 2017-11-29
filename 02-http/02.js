const http = require('http');

http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.headers);
    let body = [];
    req.on("data", chunk => {
        body.push(chunk);
    });
    req.on('end', () => {
        console.log(Buffer.concat(body).toString());
    })
}).listen(3000);