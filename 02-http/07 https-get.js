const https = require('https');
const options = {
    hostname: 'www.baidu.com',
    port: '',
    path: '/',
    method: "GET"
}

let req = https.request(options, res => {
    // ...
})
req.end();