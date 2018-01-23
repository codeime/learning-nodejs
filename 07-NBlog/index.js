const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routes');
const pkg = require('./package');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

app.set('views', path.join(__dirname, "views"));
app.engine('.html', require('ejs').renderFile); //修改模版后缀为html
app.set('view engine', 'html');


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


app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'),
    keepExtensions: true
}));

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})

/* 正常请求的日志 */
app.use(expressWinston.logger({
    transports: [
        new(winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}))

/* 路由 */
routes(app);

/* 错误请求的日志 */
app.use(expressWinston.errorLogger({
    transports: [
        new(winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}))

app.use(function (err, req, res, next) {
    console.log(err);
    req.flash('error', err.message);
    res.redirect('/posts');
})

/* 监听端口，启动程序 */
app.listen(config.port, () => {
    console.log(`${pkg.name} listening on post ${config.port}`)
})