const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const postModel = require('../models/post');
const userModel = require('../models/user');
const path = require('path');
const fs = require("fs");
const gm = require('gm');

router.get('/', checkLogin, (req, res, next) => {
    var author = req.session.user._id;
    postModel.getPosts(author)
        .then(function (result) {
            res.render('userCenter', {
                posts: result
            })
        }).catch(next)
});
router.get("/upload", checkLogin, (req, res, next) => {
    res.render("uploadAvatar");
})
router.post("/upload", checkLogin, (req, res, next) => {
    const filename = req.files.file.path.split(path.sep).pop();
    const uploadDir = path.join(__dirname, "../public/img");
    const id = req.session.user._id;
    userModel.updataById(id, {
            'avatar': filename
        })
        .then(function (result) {
            res.json({
                code: 200,
                avatar: filename
            })
        })
        .catch(next)

})
router.get("/cut/:filename", checkLogin, (req, res, next) => {
    res.render("cut", {
        filename: req.params['filename']
    });
})
router.post("/cut", checkLogin, (req, res, next) => {
    console.log(req.fields);
    let filename01 = req.fields.filename;
    let filename02 = "avatar" + req.fields.filename;
    let file01 = path.join(__dirname, "../public/img/" + filename01);
    let file02 = path.join(__dirname, "../public/img/" + filename02);
    var cutData = req.fields;
    gm(file01)
        .crop(cutData.w, cutData.h, cutData.x, cutData.y)
        .resize(100, 100, '!')
        .write(file02, function (err) {
            if (err) console.log(err);

            userModel.updataById(req.session.user._id, {
                avatar: filename02
            });
            req.session.user.avatar = filename02;
            res.send("剪切成功");
        });

})



module.exports = router;