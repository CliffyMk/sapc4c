(function () {
    'use strict';
    angular.module('MappingApp')
        .controller('MappingController', ['$scope', function ($scope) {
            var vm = this;
            console.log("mapping contrller loaded");
            vm.getLeftColumn = function () {
                vm.leftColumn = [];
                console.log('i am clicked');
                var fileInput = document.getElementById("csv"),
                    readFile = function () {
                        var reader = new FileReader();
                        reader.onload = function () {
                            console.log(data);
                            var data = reader.result.split('/\r\n|\n/');
                            console.log(data);
                            data = data[0].split('\n');
                            console.log(data);
                            data = data[0].split(',');
                            $.each(data, function (index, val) {
                                vm.leftColumn.push(val);
                            });
                            vm.leftColumn.shift();
                            $scope.$apply();

                        };
                        reader.readAsText(fileInput.files[0]);
                        reader.onload();
                        // start reading the file. When it is done, calls the onload event defined above.

                    };
                fileInput.addEventListener('change', readFile);
            }
            vm.getRightColumn = function () {
                vm.rightColumn = [];
                console.log('i am clicked');
                var fileInput = document.getElementById("csv2"),
                    readFile = function () {
                        var reader = new FileReader();
                        reader.onload = function () {
                            console.log(data);
                            var data = reader.result.split('/\r\n|\n/');
                            console.log(data);
                            data = data[0].split('\n');
                            console.log(data);
                            data = data[0].split(',');
                            $.each(data, function (index, val) {
                                vm.rightColumn.push(val);
                            });
                            $scope.$apply();

                        };
                        reader.readAsText(fileInput.files[0]);
                        reader.onload();
                        // start reading the file. When it is done, calls the onload event defined above.

                    };
                fileInput.addEventListener('change', readFile);
            }
        }]);
})();
