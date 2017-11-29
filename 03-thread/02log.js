process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    log(chunk)

});

function log(str) {

    if (str) {
        process.stdout.write(str)
    }
}