/*global angular*/
(function () {
    'use strict';
    var app = angular.module('MappingApp');
    var srcDragElement = null;
    var innerHTML = null;
    app.directive('draggable', function () {
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function ($scope, element, attr, controller) {
                // element.bind('dragstart', function (e) {
                //     console.log("drag event occured");
                //     srcDragElement = e.target;
                //     innerHTML = srcDragElement.innerHTML;
                //     //e.dataTransfer.setData("text/html", srcDragElement.innerHTML);
                // });
                // element.bind('dragenter', function (e) {
                //     e.stopPropagation();
                //     e.preventDefault();

                // });
                // element.bind('dragleave', function (e) {
                //     e.stopPropagation();
                //     e.preventDefault();

                // });
                // element.bind('drop', function (e) {
                //     console.log("drop funciotn called");
                //     e.stopPropagation();
                //     e.preventDefault();
                //     console.log("drop funciotn called");
                // });
                console.log(element);
                element[0].addEventListener('dragstart', $scope.handleDragEvent, false);
            }
        };
    });
    app.directive('droppable', function () {
        // Runs during compile
        return {
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function ($scope, element, attr, controller) {
                console.log("drop has been initialised");
                element[0].addEventListener('drop', $scope.handleDropEvent, false);
            }
        };
    });
}());
