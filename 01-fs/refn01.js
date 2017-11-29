const fs = require('fs');
const path = require('path');
let src = path.join(__dirname, process.argv[2]);
re(src);

function re(dir) {
    let infos = fs.readdirSync(dir);
    infos.forEach(info => {
        let pathname = path.join(dir, info);
        if (fs.statSync(pathname).isDirectory()) {
            console.log(pathname);
            re(pathname);
        } else {
            console.log(info);
        }
    })
}