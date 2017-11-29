const http = require('http');

const options = {
    hostname: "www.baidu.com",
    port: "",
    method: 'GET',
}
let req = http.request(options, res => {
    console.log(res);
});
req.end();