'use strict';
var fs = require("fs");
var pathModul = require("path");



var dsat = function(){

    this.pathToApi = "public/api/";
    this.fileName = "services.js";
    this.root = "/";
    this.router = null;
    this.moduleName = "";
    this.factoryName = "";
    this.routes = new Array();
};

var Route = function(path, method, name){
    //every route must have a path and a method but not a name
    this.path = path;
    this.method = method;
    this.name = name;
    this.param;
};


dsat.prototype.createRoute = function(rPath, rMethod){

    //remove ending slash
    rPath = rPath.replace(/\/$/, "");
    var rName =  rPath;
    var rParam;
    //remove beginning slash
    if(rName.match(/^\//)){
        rName  = rName.replace(/^\//, "");

        if(rName.substr(0,1) == ":"){
            rName  = rName.replace(":", "");

            if(!rName.match(/\/./g)){
                rParam = rName;
                rName = "";
            }
        }

        //replace next slashes with underscores...
        rName = rName.replace(/\//g, "_");
    }

    rPath = pathModul.join(this.root, rPath);

    var r = new Route(rPath, rMethod, rName);

    if(rParam != null){
        r.param = rParam;
        console.log("PARAM: " + r.param);
    }

    return r;
};



dsat.prototype.addToRoutes = function(route, fName){

    if(!(fName in this.routes)){
        this.routes[fName] = new Array();
    }

    if(route.name == "" && route.method=="put"){
        this.routes[fName]['reqUpdate'] = true;
    }
    if(typeof route.param != 'undefined') {
        this.routes[fName]['param'] = route.param;
    }

    this.routes[fName].push(route);
    return this.routes;

};


var writeFile = function(path, msg, cb){
    fs.writeFile(path, msg, function(err) {
        if(err) {
            return cb(err, null);
        } else {
            return cb(null, path);
        }
    });
};


dsat.prototype.createAngularService = function(cb){
    this.createAngularServiceWithData(this.routes,cb)
};

dsat.prototype.createAngularServiceWithData = function(data, cb){


    if(typeof data =='undefined'){
        return cb("keine Daten!", null);
    }

    var msg = "";
    var myRoutes = data;
    //console.log(myRoutes);
    //1) Write Module Head
    msg ="angular.module('"+this.moduleName+"', ['ngResource'])\n";
    //2) Write every Main Route as a Factory
    for(var r in myRoutes) {
        msg += ".factory('"+r+"', function($resource){\n";

        msg += "return $resource('"+ myRoutes[r][0].path;
        //Add Parameter if needed...
        if(typeof myRoutes[r].param != 'undefined') {
            msg += "/:" + myRoutes[r].param;
            msg += "',{"+myRoutes[r].param+": '@" + myRoutes[r].param+"'},{\n";
        }else {
            msg += "',{},{\n";
        }
        var isFirstCustomAction = true;
        for(var f  in myRoutes[r]) {
            if(myRoutes[r].reqUpdate && isFirstCustomAction){
                msg += "update: { method: 'put' } \n";
                isFirstCustomAction = false;
            }
            // != undefined means that there is a custom action
            // != '' means that its not a crud operation
            if(typeof myRoutes[r][f].name != 'undefined' && myRoutes[r][f].name != '') {
                if(!isFirstCustomAction){
                    msg += ",";
                }
                msg += myRoutes[r][f].name + ": {method:'" + myRoutes[r][f].method + "', url:'" + myRoutes[r][f].path + "', isArray:true}\n";
                isFirstCustomAction = false;
            }
        }
        //close for return resource...
        msg += "});\n";
        //close for factory...
        msg += "})\n";

    }

    msg += ";\n";

    writeFile(this.pathToApi + this.fileName, msg, function(err, path){
        if(err) return console.log(err);
        return cb(null,path);
    });


};

dsat.prototype.get = function(path, cb){
    console.log("dsat.router get");
    this.addToRoutes(this.createRoute(path, "get"), this.factoryName);
    this.router.get(path, cb);
};

dsat.prototype.post = function(path, cb){
    console.log("dsat.router post");
    this.addToRoutes(this.createRoute(path, "post"), this.factoryName);
    this.router.post(path, cb);
};

dsat.prototype.put = function(path, cb){
    console.log("dsat.router put");
    this.addToRoutes(this.createRoute(path, "put"), this.factoryName);
    this.router.put(path, cb);
};

dsat.prototype.delete = function(path, cb){
    console.log("dsat.router delete");
    this.addToRoutes(this.createRoute(path, "delete"), this.factoryName);
    this.router.delete(path, cb);
};


module.exports = new dsat();