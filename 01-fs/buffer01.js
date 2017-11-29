var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
var str = bin.toString('utf-8');
console.log(str);

var bin2 = new Buffer('hello', 'utf-8');
console.log(bin2);
// console.log(bin2.slice(2).toString());

var bin3 = new Buffer(bin2.length);
bin2.copy(bin3);

console.log(bin3);