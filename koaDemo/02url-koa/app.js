const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controllers/controllers')
const app = new koa();

app.use(bodyParser());

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
})



app.use(controller());

const port = 3004;
app.listen(port, err => {
    console.log('app started at port ' + port);
})