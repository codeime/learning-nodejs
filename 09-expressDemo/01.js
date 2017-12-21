const express=require('express');
const path=require('path');
const app= express();  
app.get("/",(req,res)=>{
res.send("123")
})
app.get('/:id',(req,res)=>{
	var id=req.params.id;
	res.send(id);
})

/*静态资源服务*/
app.use(express.static(path.join(__dirname,'public')));
app.listen(3000)