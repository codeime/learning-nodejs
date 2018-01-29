const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new koa();

app.use(bodyParser());

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
})

router.get('/hello/:name', async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello ${name}</h1>`;
});

router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>index</h1>
    <form action="/signin" method="post">
    <p>Name:<input name="name" value="koa"></p>
    <p>Name:<input name="password" type="password" value=""></p>
    <p>Name:<input  type="submit" value="提交"></p>
    
    </form>
    `;
});
router.post('/signin', async(ctx, next) => {
    var name = ctx.request.body.name || '',
        pas = ctx.request.body.password || '';
    console.log(`signin with name:${name},password:${pas}`);
    if (name == 'koa' && pas == '123456') {
        ctx.response.body = `<h1>welcome ,${name}</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">重试</a></p>`;

    }
});


app.use(router.routes());

const port = 3004;
app.listen(port, err => {
    console.log('app started at port ' + port);
})