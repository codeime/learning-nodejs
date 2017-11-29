const thread = require('child_process');
let child = thread.spawn('node', ['05child.js'], {
    stdio: [0, 1, 2, 'ipc']
});
child.on('message', msg => {
    console.log(msg);
});
child.send({
    hello: 'hello'
});