/*global angular*/
(function () {
    'use strict';
    angular.module("MappingApp")
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('main', {
                    url: '/main',
                    templateUrl: 'app/components/main/main.html'
                })
                .state('mapping', {
                    url: '/mapping',
                    templateUrl: 'app/components/mapping/mapping.html'
                })
                .state('mapped', {
                    url: '/mapped',
                    templateUrl: 'app/components/mapped/mapped.html'
                });
            $urlRouterProvider.otherwise('/main');
        }]);
}());
