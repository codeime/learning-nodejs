const fs = require('fs');
const path = require('path');

function mkdirs(pathname, callback) {
    let root = path.dirname(module.parent.filename)

    pathname = path.isAbsolute(pathname) ? pathname : path.join(root, pathname);
    let relativePath = path.relative(root, pathname);

    let folders = relativePath.split(path.sep);

    try {
        let pre = '';
        folders.forEach(folder => {
            let dir = path.join(root, pre, folder);

            fs.stat(dir, (err, stats) => {
                if (err) {
                    fs.mkdirSync(dir);
                }
            })

            pre = path.join(pre, folder);
        });
        callback && callback(null);
    } catch (error) {

        callback && callback(error);

    }
}
module.exports = mkdirs;