
const fs = require('fs');
const path = require('path');


const target = path.join(process.env.localappdata,"\\Packages\\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\\LocalState\\Assets\\");
const src=path.join(process.env.userprofile,'Pictures\\spotlight\\'+new Date().getTime());
fs.mkdirSync(src);
const files=fs.readdirSync(target);

files.forEach(file=>{

    const stats=fs.statSync(path.join(target,file));
    
    if(stats.isFile()){

      fs.readFile(path.join(target,file),(err,data)=>{

        const tempData=data.slice(0,7);
        let filename;

        if(tempData.indexOf( Buffer.from('FFD8FF',"hex"))!=-1){

          filename=path.join(src,file+".jpg");  

        }else if(tempData.indexOf( Buffer.from('89504E47','hex'))!=-1){

          filename=path.join(src,file+".png");
         }

        if(filename){

         fs.writeFile(filename,data,err=>{

            if(err)console.log(err);

        });

     }

 })  
  }
})