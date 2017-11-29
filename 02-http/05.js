const https = require('https');
const fs = require('fs');
const opstions = {
    key: fs.readFileSync('./ssl/default.key'),
    cert: fs.readFileSync('./ssl/default.cert'),
}

let server = https.createServer(options, (req, res) => {
    // ...
})