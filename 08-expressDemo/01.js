const express=require('express');
const path=require('path');
const app= express();  
app.get("/",(req,res)=>{
res.send("123")
})

app.get('/:ssss/:id',(req,res)=>{
	var id=req.params["ssss"];
	var id2=req.params["id"];
	res.send(id+id2);
})
/*还可以用正则表达式*/
// app.get(/\/app\/([\d]+)/,(req,res)=>{
// 	var id=req.params[0];
// 	res.send(id);
// })

/*静态资源服务*/
app.use(express.static(path.join(__dirname,'public')));
app.listen(3000)