'use strict';

angular.
module('recipteList').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/', {
            template: '<main-view></main-view>'
        }).
        when('/login', {
            template: '<login-view></login-view>'
        }).
        when('/list', {
            template: '<list-view></list-view>'
        }).
        otherwise('/');
    }
]);
