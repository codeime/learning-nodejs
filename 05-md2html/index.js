const fs = require('fs');
const path = require('path');
const browerSync = require('browser-sync');
const marked = require('marked');
let html = `<!DOCTYPE html>
<html lang="zh_cn">
<head>
    <meta charset="UTF-8">
    <title></title>
<style>
{{{style}}}
</style>
</head>
<body>
<div class="markdown-body">{{{content}}}</div>
</body>
</html>
`

function md2html(src, dist) {
    let root = path.dirname(module.parent.filename);
    src = path.join(root, src);
    dist = path.join(root, dist);
    try {
        fs.statSync(dist)
    } catch (err) {
        fs.mkdirSync(dist);

    }
    dist = path.join(dist, 'index.html');
    fs.readFile(src, (err, data) => {
        if (err) console.log(err);
        let css = fs.readFileSync(path.join(__dirname, "index.css"));

        html = html.replace('{{{content}}}', marked(data.toString())).replace('{{{style}}}', css);
        fs.writeFile(dist, html, (err) => {
            console.log(err);
        })
    })

}
module.exports = md2html;