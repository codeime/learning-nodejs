const fs = require('fs');
const path = require('path');


function addControllers(router, dir) {
    var js_files = fs.readdirSync(path.join(__dirname, '../' + dir));

    var js_files = js_files.filter(f => {
        return f.endsWith('.js');
    });
    for (const f in js_files) {
        let mapping = require(path.join(__dirname, '../' + dir + '/' + js_files[f]));
        addMapping(router, mapping)
    }
}



function addMapping(router, mapping) {
    for (const url in mapping) {
        if (url.startsWith('GET')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
        } else {
            console.log(`invalid URL:${url}`);
        }
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers';
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
}