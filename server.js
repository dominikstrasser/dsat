var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/laufApp", function(err, db) {
    console.log("Connected correctly to server");
    if(err) return console.log(err);


    app.use(function(req,res,next){
        req.db = db;
        next();
    });




    app.use(bodyParser.json());

    var dsat = require("./dsat-router/");
    dsat.moduleName = "serviceModul";

    var usersRouter= require("./api/users.js");
    var runsRouter= require("./api/runs.js");

    app. use("/api/users/", usersRouter);
    app. use("/api/runs/", runsRouter);

    app.use(express.static(path.join(__dirname,'public')));

    dsat.createAngularService(function(err){
        if(err) console.log(err);
        console.log("createAngularService ok");
    });

    app.listen(3000, function (err) {
        if (err) throw err;
        console.log("Express server listening on port 3000");
    });

});