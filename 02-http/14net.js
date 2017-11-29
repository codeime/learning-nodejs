const net = require('net');
const ops = {
    post: 3000,
    host: '172.16.4.52'
}
let client = net.connect(ops, () => {
    client.write('客户端发送');
});
client.on('data', data => {
    console.log(data);
    client.end();
})