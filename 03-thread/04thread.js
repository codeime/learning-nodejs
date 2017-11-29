const thread = require('child_process');

// 子进程是01.js
let child = thread.spawn('node', ['01.js']);
// 访问子进程的输出
child.stdout.on('data', data => {
    console.log(`OUT:${data}`);
});
child.stderr.on('data', data => {
    console.log(`ERR:${data}`);
});

child.on('close', code => {
    console.log(`CLOSE:${code}`)
})