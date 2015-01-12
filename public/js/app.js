var laufApp = angular.module("laufApp", ["serviceModul"]);

laufApp.controller('mainCtrl', function($scope, usersProvider, runsProvider){

    $scope.runningData = runsProvider.query();
    $scope.runners = [
        "Dominik",
        "Magdalena"
    ];

    $scope.addRun = function(){
        console.log("addRun");
        var newR = {
            date: $scope.newDate,
            km: $scope.newKm,
            time: $scope.newTime,
            runner: $scope.newRunner
        };
        runsProvider.save(newR, function(data){
            console.log(data);
            $scope.runningData.push(data);
            $scope.newDate = "";
            $scope.newKm = "";
            $scope.newTime = "";
            $scope.newRunner = "";
        });


    };

    $scope.editRun = function(ev){
        var tr = ev.currentTarget.parentNode.parentNode;
        tr.classList.add("activeEdit");
    };

    $scope.updateRun = function(_id, ev){
        console.log(_id);

        $scope.runningData.forEach(function(d){
            if(d._id == _id){
                runsProvider.update(d, function(data){
                    console.log(data);
                    var tr = ev.currentTarget.parentNode.parentNode;
                    tr.classList.remove("activeEdit");
                });
            }
        });

    };

    $scope.removeRun = function(_id){
        console.log("removeRun: " + _id);
        runsProvider.remove({"_id":_id}, function(data){
            $scope.runningData = runsProvider.query();
        });
    };

    $scope.addRunner = function(){
        $scope.runners.push($scope.newRunnerInModal);
        $scope.newRunnerInModal = "";
    }


});