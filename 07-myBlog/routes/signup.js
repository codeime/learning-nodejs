import {
    User
} from '../lib/mongo';

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
    const filename = req.files.file.path.split(path.sep).pop();

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

        if (!req.fields.file.name) {
            throw new Error('没有上传头像')
        }
        if (psd1.length < 6) {
            throw new Error('密码太短')

        }
        if (psd1 != psd2) {
            throw new Error('两次密码不一致')
        }
    } catch (err) {
        fs.unlink(req.fields.file.path);
        req.flash('error', err.message);
        return res.redirect('/signup')
    }
    let user = {
        name: name,
        password: sha1(psd),
        gender: gender,
        bio: bio,
        avatar: filename
    }
    UserModel.create(user)
        .then(res => {
            user = res.ops[0];
            delete use.password;
            req.session.user = user;
            req.flash('success', "注册成功");
            res.redirect('/posts');
        })
        .catch(e => {
            fs.unlink(req.files.file.path);

        })

})
module.exports = router;