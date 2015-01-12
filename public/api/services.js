angular.module('serviceModul', ['ngResource'])
.factory('usersProvider', function($resource){
return $resource('/api/users/:_id',{_id: '@_id'},{
update: { method: 'put' } 
});
})
.factory('runsProvider', function($resource){
return $resource('/api/runs/:_id',{_id: '@_id'},{
update: { method: 'put' } 
});
})
;
