/*global angular*/
(function () {
    'use strict';
    var app = angular.module('MappingApp');
    app.directive('draggable', function () {
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function ($scope, element, attr, controller) {
                element[0].addEventListener('dragstart', $scope.handleDragEvent, false);
                element[0].addEventListener('dragend', $scope.handleDragEnd, false);
                element[0].addEventListener('dragover', $scope.handleDragOver, false);
                element[0].addEventListener('drop', $scope.handleDropEvent, false);
            }
        };
    });
    app.directive('droppable', function () {
        // Runs during compile
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function (vm, element, attr, controller) {
                element[0].addEventListener('drop', vm.handleDropEvent, false);
                // element.bind("drop", function (event) {
                //     /* Act on the event */
                //     event.preventDefault();
                //     console.log("drop called");
                // });
            }
        };
    });

}());
