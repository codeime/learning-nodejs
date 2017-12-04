const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        ls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    });
})

module.exports = router;