// rename
const fs = require('fs');
const path = require('path');

var currentPath = path.join(__dirname, "temp.txt");
var targetPath = path.join(__dirname, "123.txt");

fs.rename(currentPath, targetPath);