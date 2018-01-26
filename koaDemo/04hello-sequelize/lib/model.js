/* scan all models defined in models dir */

const fs = require('fs');
const db = require('./db');
const path = require('path');

modelPath = path.join(__dirname, "../models");

let files = fs.readdirSync(modelPath);


let js_files = files.filter(f => {
    return f.endsWith('.js');
});


for (let f of js_files) {
    console.log(`import model from file ${f}...`)
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(modelPath + "/" + f);
}

module.exports.sync = () => {
    db.sync();
};