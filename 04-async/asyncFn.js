function async(fn, cb) {
    setTimeout(() => {
        try {
            cb(null, fn());
        } catch (err) {
            cb(err);
        }
    }, 0);
}

async(null, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})