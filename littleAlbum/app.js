const express = require('express');
const path = require('path');
const app = express();
const router = require('./controller')
const formidable = require('express-formidable');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(formidable({
    uploadDir: path.join(__dirname, "/temp"),
    keepExtensions: true
}))



app.get('/', router.showIndex);
app.get('/up', router.showUp);
app.post('/up', router.upFile);
app.get('/album/:album', router.showAlbum);


app.use(function (req, res) {
    res.render('err')
})
app.listen(3002);