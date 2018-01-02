const fs = require('fs');
const path = require('path');

module.exports.getAllAlbum = function (fn) {
    fs.readdir(path.join(__dirname, "../uploads"), function (err, data) {
        if (err) console.log(err);
        let album = [];
        (function iterator(i) {
            if (i = data.length) {
                fn && fn(album);
            }
            fs.stat(path.join(__dirname, "../uploads/" + data[i]), (err, stats) => {
                if (err) console.log(err);

                if (stats.isDirectory()) {
                    album.push(data[i])
                }
                i++;
                iterator(i);
            })
        })(0)
    })

}