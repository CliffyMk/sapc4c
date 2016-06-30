(function () {
    'use strict';
    angular.module('MappingApp')
        .controller('MappedController', ['$scope', function ($scope) {
            var vm = this;
            console.log("mapping contrller loaded");
            vm.datas = {
                "data1": "value 1",
                "data2": "value2",
                "data3": "value3 ",
                "data4": "value 4",
                "data5": "value 5",
                "data6": "value 6",
                "data7": "value 7",
                "data8": "value 8",
                "data9": "value 9"
            };
            vm.datasMappedTo = {
                "data1": "value 1",
                "data2": "value2",
                "data3": "value3 ",
                "data4": "value 4",
                "data5": "value 5",
                "data6": "value 6",
                "data7": "value 7",
                "data8": "value 8",
                "data9": "value 9"
            }
        }]);
})();
