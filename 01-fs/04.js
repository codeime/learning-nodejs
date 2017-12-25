/* 递归 */
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, process.argv[2] || './');
 // const target = path.join(process.env.localappdata,"\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\");

getDist(target, 0);

function getDist(src, level) {
    var dirInfo = fs.readdirSync(src);
    var files = [];
    var dirs = [];
    dirInfo.forEach(info => {

        var stats = fs.statSync(path.join(src, info));

        if (stats.isFile()) {
            files.push(info);

        } else {
            dirs.push(info);

        }

    });


    // var str = '';
    // for (let index = 0; index < level; index++) {
    //     str += "┃  "

    // }
    var str = new Array(level + 1).join("┃  ");

    dirs.forEach(dir => {
        console.log(`${str}┠${dir}`);

        getDist(path.join(src, dir), level + 1);
    });
    var count = files.length - 1;
    files.forEach(file => {
        console.log(`${str}${count--?'┠':'┗'}─${file}`);
    });
}