/*global angular*/
(function () {
    'use strict';
    var app = angular.module('MappingApp');

    app.directive('appHeader', function () {
        // Runs during compile
        return {
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'app/shared/header.html',
        };
    });
    app.directive('appFooter', function () {
        // Runs during compile
        return {
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            templateUrl: 'app/shared/footer.html',
        };
    });
    app.directive('savedMapping', [function () {
        // Runs during compile
        return {
            restrict: 'E',
            templateUrl: 'app/components/mapping/partials/savedMapping.html'
        };
    }]);
    app.directive('currentMapping', [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/components/mapping/partials/currMapping.html'
        };
    }]);
    app.directive('valueMapping', [function () {
        // Runs during compile
        return {
            restrict: 'E',
            templateUrl: 'app/components/mapping/partials/valueMapping.html'
        };
    }]);
}());
