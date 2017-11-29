const net = require('net');
const ops = {
    port: 3000,
    host: '172.16.4.52'
}
let client = net.connect(ops, () => {

    client.write('客户端的请求');
});
client.on('data', data => {
    console.log(data.toString());
    client.end();
})