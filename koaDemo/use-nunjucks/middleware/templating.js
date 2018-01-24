const nunjucks = require('nunjucks');
const path = require('path');



function createEnv(path, opts) {
    var autoescape = opts.autoescape == undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        );
    if (opts.filters) {
        for (const f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(src, opts) {
    var src = path.join(__dirname, "../" + src);
    console.log(src);
    var env = createEnv(src, opts);
    return async(ctx, next) => {
        ctx.render = function (view, model) {
            ctx.response.type = 'text/html';
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
        }
        await next();
    };
}

module.exports = templating;