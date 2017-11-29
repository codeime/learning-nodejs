const fs = require("fs");

function copy(src, dist) {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dist);
    rs.on("data", chunk => {
        if (ws.write(chunk) === false) {
            rs.pause();
        }
    });
    rs.on("end", () => {
        ws.end();
    });
    rs.on("drain", () => {
        rs.resume();
    });
}

var src = process.argv[2];
var dist = process.argv[3];
copy(src, dist);