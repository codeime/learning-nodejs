const fs = require('fs');
const path = require('path');

function mkdirs(pathname, callback) {

    pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname, pathname);
    let relativePath = path.relative(__dirname, pathname);

    let folders = relativePath.split(path.sep);

    try {
        let pre = '';
        folders.forEach(folder => {

            fs.mkdirSync(path.join(__dirname, pre, folder));
            pre = path.join(pre, folder);
        });
        callback && callback(null);
    } catch (error) {

        callback && callback(error);

    }
}
module.exports = mkdirs;