const thread = require('child_process');

function spawn(main) {
    let worker = thread.spawn('node', [main]);
    worker.on('exit', code => {
        if (code != 0) {
            spawn(main);
        }
    })
}

spawn("main.js");