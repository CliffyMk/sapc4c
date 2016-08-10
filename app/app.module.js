 /*global angular*/
 (function () {
     'use strict';
     var dependencies = ['ui.router'];
     var app = angular.module('MappingApp', dependencies);

     app.run([function (dependencies) {
         console.log("app started");
     }]);
 }());
