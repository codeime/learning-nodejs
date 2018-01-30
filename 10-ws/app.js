const Ws = require('ws');


const WsServer = Ws.Server;

const wss = new WsServer({
    port: 3000
});


wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (ms) {
        console.log(`[SERVER] Recevied:${ms}`);
        ws.send(`ECHO:${ms}`, err => {
            if (err) console.log(`[SERVER] error:${err}`);
        })
    })
})