const file = require("../models/file.js")
module.exports.showIndex = function (req, res, next) {
    file.getAllAlbum(function (err, data) {
        if (err) {
            next();
            return;
        }
        res.render('index', {
            album: data
        })
    })

}
module.exports.showAlbum = function (req, res, next) {
    file.getAllImageByAlbumName(req.params.album, function (err, data) {
        if (err) {
            next();
            return;
        }
        res.render('album', {
            'data': {
                "albumname": req.params.album,
                "img": data
            }
        })
    })
}