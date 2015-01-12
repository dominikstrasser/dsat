var dsat = require("./../index.js");


var path1 = "/";
var path2 = "/detail";
var path3 = "detail";
var path4 = "/:_id";
var path5 = "/:_id/detail";
var path6 = "/detail/max/";

var r1 = dsat.createRoute(path1, "get");
var r2 = dsat.createRoute(path2, "get");
var r3 = dsat.createRoute(path3, "post");
var r4 = dsat.createRoute(path4, "put");
var r5 = dsat.createRoute(path5, "get");

var factoryName = "myTestFactory";
var factoryName2 = "myTestFactory2";

var data = new Array();
data[factoryName] = new Array();
data[factoryName].push(r1);
data[factoryName].push(r2);
data[factoryName].push(r3);
data[factoryName2] = new Array();
data[factoryName2].push(r4);
data[factoryName2].push(r5);


var result =    "angular.module('', ['ngResource'])";
result +=      ".factory('myTestFactory', function($resource){";
result +=      "return $resource('/',{},{";
result +=                 "detail: {method:'get', url:'/detail', isArray:true}";
result +=                 ",detail: {method:'post', url:'/detail', isArray:true}";
result +=             "});";
result +=         "})";
result +=         ".factory('myTestFactory2', function($resource){";
result +=             "return $resource('/:_id',{},{";
result +=                 "_id_detail: {method:'get', url:'/:_id/detail', isArray:true}";
result +=             "});";
result +=         "})";


exports.createAngularServiceWithData = function(test){

    dsat.createAngularServiceWithData(data,function(err, data){
        if(err) return console.log(err);
        console.log(data);

        //test.deepEqual(data, result);

    });

    test.done();

};