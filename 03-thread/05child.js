process.on('message', msg => {
    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
})