const file = require("../models/file.js")
const fs = require('fs');
const path = require('path');
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



    file.getImgByAlbumName(req.params.album, function (err, data) {
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

module.exports.showUp = function (req, res, next) {

    file.getAllAlbum(function (err, data) {
        if (err) {

            next();
            return;
        }
        res.render('upload', {
            album: data
        })
    })
}

module.exports.upFile = function (req, res, next) {
    const album = req.fields.album;
    const src = req.files.file.path;
    file.saveFile(src, album, function (err) {
        if (err) {
            next()
        }
        res.redirect('/up');
    })

}