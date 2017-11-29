const fs = require("fs");
const path = require("path");
var srcPath = path.join(__dirname, process.argv[2]);
var distPath = path.join(__dirname, process.argv[3]);
fs.readFile(srcPath, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        fs.writeFile(distPath, data, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
});