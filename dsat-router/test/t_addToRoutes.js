var dsat = require("./../index.js");



var factoryName = "testFactoryName";
var factoryName2 = "testFactoryName2";

var e1 = {path: "/", method: "get", name: ""};
var arr1 = new Array();
arr1[factoryName] = new Array();
arr1[factoryName].push(e1);


var e2 = {path: "/detail", method: "get", name: "detail"};

var arr2 = new Array();
arr2[factoryName] = new Array();
arr2[factoryName].push(e1);
arr2[factoryName].push(e2);

var e3 = {path: "/detail", method: "post", name: "detail"};

var arr3 = new Array();
arr3[factoryName] = new Array();
arr3[factoryName].push(e1);
arr3[factoryName].push(e2);
arr3[factoryName].push(e3);


var e4 = {path: "/:_id", method: "put", name: ""};

var arr4 = new Array();
arr4[factoryName] = new Array();
arr4[factoryName].push(e1);
arr4[factoryName].push(e2);
arr4[factoryName].push(e3);
arr4[factoryName2] = new Array();
arr4[factoryName2].push(e4);
arr4[factoryName2]["reqUpdate"] = true;

var e5 = {path: "/:_id/detail", method: "get", name: "_id_detail"};

var arr5 = new Array();
arr5[factoryName] = new Array();
arr5[factoryName].push(e1);
arr5[factoryName].push(e2);
arr5[factoryName].push(e3);
arr5[factoryName2] = new Array();
arr5[factoryName2].push(e4);
arr5[factoryName2]["reqUpdate"] = true;
arr5[factoryName2].push(e5);




exports.addToRoutes = function(test){

    var r1 = dsat.addToRoutes(e1, factoryName);
    test.deepEqual(r1, arr1);
    var r2 = dsat.addToRoutes(e2, factoryName);
    test.deepEqual(r2, arr2);

    var r3 = dsat.addToRoutes(e3, factoryName);
    test.deepEqual(r3, arr3);

    var r4 = dsat.addToRoutes(e4, factoryName2);
    test.deepEqual(r4, arr4);

    var r5 = dsat.addToRoutes(e5, factoryName2);
    test.deepEqual(r5, arr5);

    test.done();

};