var router = require("express").Router();

var dsat = require("./../dsat-router/");

dsat.router = router;
dsat.root = "/api/users";
dsat.factoryName = "usersProvider";

dsat.get("/", function(req, res){
    req.db.collection("users").find().toArray(function(err,docs){
        if(err) return console.log(err);
       res.json(docs);
    });
});

dsat.get("/:_id", function(req, res){
    res.json({"get:_id": "1"});
});

dsat.post("/", function(req, res){
    req.db.collection("users").insert(req.body, function(err,doc){
        if(err) return console.log(err);
        res.json(doc[0]);
    });
});

dsat.put("/", function(req, res){
    res.json({"put": 1});
});

dsat.delete("/:_id", function(req, res){
    console.log(req.params._id);
    req.db.collection("users").remove({"_id": req.params._id},function(err,docs){
        if(err) return console.log(err);
        res.json(docs);
    });
});

module.exports =  dsat.router;