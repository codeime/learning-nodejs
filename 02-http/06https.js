const https = require('https');
const fs = require('fs');
const opstions = {
    key: fs.readFileSync('./ssl/default.key'),
    cert: fs.readFileSync('./ssl/default.cert'),
}

let server = https.createServer(options, (req, res) => {
    // ...
});

// NodeJS支持SNI技术 ,使用以下方法为HTTPS服务器添加多组证书。
server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.key'),
    cert: fs.readFileSync('./ssl/foo.cert'),
});
server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.key'),
    cert: fs.readFileSync('./ssl/bar.cert'),
});