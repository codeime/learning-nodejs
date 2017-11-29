const fs = require("fs");

function copy(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src));
}

function main(src, dis) {
    copy(src, dist);
}
const src = process.argv[2];
const dist = process.argv[3];
main(src, dist);