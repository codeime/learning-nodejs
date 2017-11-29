const fs = require("fs");

function copy(src, dist) {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dist);
    rs.pipe(ws);
}

function main(src, dist) {
    copy(src, dist);
}
const src = process.argv[2];
const dist = process.argv[3];
main(src, dist);
