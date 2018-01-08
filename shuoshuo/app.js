const express = require("express");

const router = require("./router/router.js");
const path = require('path');

const app = express();

app.set('view engine', "ejs");
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res, next) => {
    res.render("index");
})


app.listen(3000);