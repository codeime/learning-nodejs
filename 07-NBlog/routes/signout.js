const express = require('express');
const router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;
router.get('/', checkNotLogin, (req, res, next) => {
    req.session.user = null;
    req.flash("success", '登出成功');
    res.redirect('/posts')
})

module.exports = router;