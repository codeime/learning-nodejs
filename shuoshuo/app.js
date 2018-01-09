const express = require("express");

const router = require("./router/router.js");
const path = require('path');

const app = express();

app.set('view engine', "ejs");
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", router.showIndex)
app.get("/regist", router.showRegist)
app.post("/regist", router.doRegist)


app.listen(3000, function () {
    console.log("****************************")
    console.log("*********启 动 成 功*********")
    console.log("****************************")
});