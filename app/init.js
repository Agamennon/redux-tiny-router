var fossnote = angular.module('fossnote', ['mm.foundation','ngRoute'])
    .config(['$routeProvider', function($routeProvider){

        console.log('--- module & router ---');

        $routeProvider.when('/', {
            templateUrl: 'app/list.html',
            controller: listCtrl
        });

        $routeProvider.otherwise({redirectTo: '/'});


    }]);






function initCtrl($scope){


    console.log('--- init ctrl ---');


}
