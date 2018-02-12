'use strict';

var logigame = angular.module ('logigame', ['ngRoute']);

logigame.config (['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/main/main.html',
            controller: 'mainController'
        }).otherwise ({
            redirectTo: '/'
        });
    }]);
