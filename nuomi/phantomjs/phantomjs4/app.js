/**
 * Created by hao on 2017/7/20.
 */
const express = require('express'),
    path = require('path'),
    config = require("./config/default"),
    app = express(),
    router = require('./router/server');

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));




router(app);


app.listen(config.port,()=>console.log("server is listening"))

