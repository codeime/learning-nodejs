const fs = require('fs');
const path = require('path');

// fs.writeFile();
// fs.writeFileSync();
// fs.createWriteStream();

// fs.writeFile(path.join(__dirname,'temmp.txt'),JSON.stringify({id:10}),(err)=>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("success")
// 	}
// })

var streamWriter = fs.createWriteStream(path.join(__dirname, 'temp.txt'));
// streamWriter.write("sdgfagqergqewrg", () => {
//     console.log("success");
// });
var i = 0;
setInterval(() => {
    streamWriter.write("sdgfagqergqewrg", () => {
        console.log(i + 1);
    });
}, 1000)