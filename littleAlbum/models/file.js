const fs = require('fs');
const path = require('path');

module.exports.getAllAlbum = function (fn) {
    fs.readdir(path.join(__dirname, "../uploads"), function (err, data) {
        if (err) {
            fn(err, null);
            return;
        }
        let album = [];
        (function iterator(i) {
            if (i == data.length) {
                fn && fn(null, album);
                return;
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
module.exports.getImgByAlbumName = function (album, fn) {
    fs.readdir(path.join(__dirname, "../uploads" + album), function (err, data) {
        if (err) {
            fn(err, null);
            return;
        }
        let img = [];
        (function iterator(i) {
            if (i == data.length) {
                fn && fn(img);
                return;
            }
            fs.stat(path.join(__dirname, "../uploads/" + album + data[i]), (err, stats) => {
                if (err) {
                    fn(err, null);
                    return;
                }

                if (stats.isFile()) {
                    img.push(data[i])
                }
                i++;
                iterator(i);
            })
        })(0)
    })
}