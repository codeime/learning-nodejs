var fn_index = async(ctx, next) => {
    ctx.response.body = `<h1>index</h1>
    <form action="/signin" method="post">
    <p>Name:<input name="name" value="koa"></p>
    <p>Name:<input name="password" type="password" value=""></p>
    <p>Name:<input  type="submit" value="提交"></p>
    </form>`;
};
var fn_signin = async(ctx, next) => {
    var name = ctx.request.body.name || '',
        pas = ctx.request.body.password || '';
    console.log(`signin with name:${name},password:${pas}`);
    if (name == 'koa' && pas == '123456') {
        ctx.response.body = `<h1>welcome ,${name}</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">重试</a></p>`;

    }
};
module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}