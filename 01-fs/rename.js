const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname);
console.log(dirPath);
let q = process.argv[2] || '.jpg',
    h = process.argv[3] || '.png';
fs.readdir(dirPath, (err, infos) => {
    if (err) {
        console.log(err);
    } else {

        infos.forEach(info => {

            fs.stat(info, (err, stats) => {

                if (!stats.isDirectory() && path.extname(info) == q) {
                    var newName = info.replace(q, h);
                    fs.rename(info, newName, err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            })
        });
    }
});