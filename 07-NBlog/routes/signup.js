const fs = require('fs');
const sha1 = require('sha1');
const path = require('path');
const express = require('express');
const router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;

const UserModel = require('../models/user')
router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signup')
})
router.post('/', checkNotLogin, (req, res, next) => {
    const name = req.fields.name;
    const gender = req.fields.sex;
    const bio = req.fields.bio;
    const psd1 = req.fields.password;
    const psd2 = req.fields.password2;


    try {

        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('用户名限制1-10个字符')
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('选择性别不正确')
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('简介限制1-30个字符')
        }


        if (psd1.length < 6) {
            throw new Error('密码太短')

        }
        if (psd1 != psd2) {
            throw new Error('两次密码不一致')
        }
    } catch (err) {
        console.log(err.message);
        // fs.unlink(req.files.file.path);
        req.flash('error', err.message);
        return res.redirect('/signup')
    }
    let user = {
        name: name,
        password: sha1(psd1),
        gender: gender,
        bio: bio,
    }

    UserModel.create(user)
        .then(result => {
            user = result.ops[0];
            delete user.password;
            req.session.user = user;
            req.flash('success', "注册成功");
            res.redirect('/posts');
        })
        .catch(e => {
            fs.unlink(req.files.file.path);
            if (e.message.match('duplicate key')) {
                req.flash('error', '用户名已被占用');
                return res.redirect('/signup')
            }
            next(e);
        })

})
module.exports = router;