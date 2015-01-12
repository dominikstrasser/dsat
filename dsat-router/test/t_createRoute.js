var dsat = require("./../index.js");

var path1 = "/";
var path2 = "/detail";
var path3 = "detail";
var path4 = "/:_id";
var path5 = "/:_id/detail";
var path6 = "/detail/max/";

var e1 = {path: "/", method: "get", name: ""};
var e2 = {path: "/detail", method: "get", name: "detail"};
var e3 = {path: "/detail", method: "post", name: "detail"};
var e4 = {path: "/:_id", method: "put", name: "", param: "_id"};
var e5 = {path: "/:_id/detail", method: "get", name: "_id_detail"};
var e6 = {path: "/detail/max", method: "get", name: "detail_max"};

exports.createRoute = function(test){

    var r1 = dsat.createRoute(path1, "get");
    var r2 = dsat.createRoute(path2, "get");
    var r3 = dsat.createRoute(path3, "post");
    var r4 = dsat.createRoute(path4, "put");
    var r5 = dsat.createRoute(path5, "get");
    var r6 = dsat.createRoute(path6, "get");


    test.deepEqual(r1, e1);
    test.deepEqual(r2, e2);
    test.deepEqual(r3, e3);
    test.deepEqual(r4, e4);
    test.deepEqual(r5, e5);
    test.deepEqual(r6, e6);

    test.done();
};