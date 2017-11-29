/* 打印当前目录下的所有文件 */
const fs = require('fs');
const path = require('path');
require('./proto.js');
const target = path.join(__dirname, process.argv[2] || './');
fs.readdir(target, (err, files) => {
    // console.log(files);
    files.forEach(file => {
        console.time(file)
            // console.log(path.join(target, file));
        fs.stat(path.join(target, file), (err, stats) => {
            if (err) {
                console.log(err)
            } else {
                console.log(stats.mtime.format("yyyy/MM/dd HH:mm") + "\t" + stats.size + "\t" + file);
                console.timeEnd(file);
            }
        })
    });
})