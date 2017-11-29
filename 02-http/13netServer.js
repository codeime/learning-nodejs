const net = require('net');
net.createServer(conn => {
    conn.on('data', data => {
        console.log(data.toString());
        conn.write('服务端的返回信息');
    })
}).listen(3000);