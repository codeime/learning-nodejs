const file = require("../models/file.js")
module.exports.showIndex = function (req, res) {
    file.getAllAlbum(function (data) {
        res.render('index', {
            album: data
        })
    })

}