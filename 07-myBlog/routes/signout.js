const express = require('express');
const router = express.Router();
const checkNotLogin = require('../middlewares/check').checkNotLogin;
router.get('/', checkNotLogin, (req, res, next) => {
    res.send('退出登陆')
})

module.exports = router;