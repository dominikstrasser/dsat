var router = require("express").Router();
var ObjectId = require('mongodb').ObjectID;
var dsat = require("./../dsat-router/");

dsat.router = router;
dsat.root = "/api/runs";
dsat.factoryName = "runsProvider";

dsat.get("/", function(req, res){
    req.db.collection("runs").find().toArray(function(err,docs){
        if(err) return console.log(err);
       res.json(docs);
    });
});

dsat.get("/:_id", function(req, res){
    res.json({"get:_id": "1"});
});

dsat.post("/", function(req, res){
    req.db.collection("runs").insert(req.body, function(err,doc){
        if(err) return console.log(err);
        res.json(doc[0]);
    });
});

dsat.put("/:_id", function(req, res){
    delete req.body._id;
    req.db.collection("runs").update({"_id": ObjectId(req.params._id)}, req.body, function(err,doc){
        if(err) return console.log(err);
        res.json(doc[0]);
    });

});

dsat.delete("/:_id", function(req, res){
    console.log(req.params._id);
    req.db.collection("runs").remove({"_id": ObjectId(req.params._id)},function(err,docs){
        if(err) return console.log(err);
        console.log("REMOVED!")
        res.json(docs);
    });
});

module.exports =  dsat.router;