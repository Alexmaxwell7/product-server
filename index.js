const express = require('express');
const mongoose = require('mongoose');
const app= express();
const url = 'mongodb://localhost/ProductDB'
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on("open",()=>{
    console.log("Server Connected")
})
app.use(express.json())
//router
app.use('/', require('./router/api'))
app.use('/product',require('./router/product'));
app.use('/admin',require('./router/admin'));

app.listen(5000,()=>{
    console.log("server Started")
})


module.exports = app;

