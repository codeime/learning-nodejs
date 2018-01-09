const formidable = require('formidable')


module.exports.showIndex = function (req, res, next) {
    res.render('index')
}
module.exports.showRegist = function (req, res, next) {
    res.render('regist')
}
module.exports.doRegist = function (req, res, next) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = fields.password;

    })
    res.render('regist')
}