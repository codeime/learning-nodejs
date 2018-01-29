const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {

    const start = Date.now();
    await next();

    const ms = Date.now() - start;

    console.log(`${ctx.request.method} ${ctx.request.url}:${ms}ms`);

    ctx.response.set('X-Response-Time', `${ms}ms`);

});

app.use(async (ctx, next) => {
    let name = ctx.request.query.name || 'world';
    ctx.response.type = 'text/html';
    ctx.response.body = `<h1>hello ${name}</h1>`
});

module.exports = app;