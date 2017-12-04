const path = require('path');

const express = require('express');
const app = express();
// app.get('/', (req, res) => {
//     res.send('hello world123');
// });
// app.get('/user/:name', (req, res) => {
//     res.send('hello worlduser' + req.params.name);
// })
const indexRouter = require('./routers/index');
const userRouter = require('./routers/user');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(indexRouter);
app.use(userRouter);

app.listen(3000);