const thread = require('child_process');
let util = require('util');

function copy(src, dist, cb) {
    thread.exec(
        fn(src, dist),
        cb
    )
};
copy('a', 'b', err => {
    console.log(123);
});

function fn(src, dist) {
    let str = util.format('cp -r %s/* %s', src, dist);
    console.log(str);
}