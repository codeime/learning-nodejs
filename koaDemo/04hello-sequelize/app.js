const koa = require('koa');

const bodyParser = require('koa-bodyparser');
const controller = require('./controllers/controllers')

const staticFile = require('./middleware/static-files')
const templating = require('./middleware/templating');
const app = new koa();

const isProduction = process.env.NODE_ENV === 'production';

/* 记录执行时间 */
app.use(async(ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${ms}ms`);
});

/* 静态服务 */
app.use(staticFile('/static/', __dirname + '/static'));

/* 解析post请求 */
app.use(bodyParser());

/* ctx添加render方法 */
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

/* 路由扫描 */
app.use(controller());

const port = 3004;
app.listen(port, err => {
    console.log('app started at port ' + port);
});