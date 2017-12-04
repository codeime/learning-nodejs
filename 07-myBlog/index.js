const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');

const app = express();

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); //修改模版后缀为html

// 设置静态文件目录

app.use(express.static(path.join(__dirname, 'public')));


/* session中间件 */
app.use(session({
    name: config.session.key,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge
    },
    store: new MongoStore({
        url: config.mongodb
    })
}))

/* flash中间件，用来显示通知 */
app.use(flash());

/* 路由 */

routes(app);

/* 监听端口，启动程序 */
app.listen(config.port, () => {
    console.log(`${pkg.name}listening on post ${config.port}`)
})