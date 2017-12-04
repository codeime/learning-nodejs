const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(1);
    next(new Error('hahahha'))
});
app.use((req, res, next) => {
    console.log(2);
    res.status(200).end();
});

/* 错误处理 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error');
})

app.listen(3000);