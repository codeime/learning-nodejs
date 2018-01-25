const express = require("express");
const session = require('express-session');
const router = require("./router/router.js");
const path = require('path');

const app = express();

app.set('view engine', "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))



app.get("/", router.showIndex)
app.get("/regist", router.showRegist)
app.post("/regist", router.doRegist)
app.get("/login", router.showLogin)
app.post("/login", router.doLogin)


app.listen(3003, function () {
    console.log("****************************")
    console.log("*********启 动 成 功*********")
    console.log("****************************")
});