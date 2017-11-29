const net = require('net');
net.createServer(conn => {
    conn.on('data', data => {
        console.log(data);
        conn.write('服务端收到客户端的发来的消息了');
    })
}).listen(3000);