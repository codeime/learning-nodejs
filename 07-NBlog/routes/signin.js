const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, (req, res, next) => {
    res.render('signin');
})
router.post('/', checkNotLogin, (req, res, next) => {

    res.send('登陆页');
})


module.exports = router;