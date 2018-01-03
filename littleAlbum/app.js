const express = require('express');
const path = require('path');
const app = express();
const router = require('./controller')

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.get('/', router.showIndex);
app.get('/:album', router.showAlbum);
app.use(function (req, res) {
    res.render('err')
})
app.listen(3002);