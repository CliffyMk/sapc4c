(function () {
    'use strict';
    angular.module('MappingApp')
        .controller('MappedController', ['$scope', function ($scope) {
            var vm = this;
            console.log("mapped contrller loaded");
            vm.activateFileFn = function () {
                vm.leftDatas = [];
                vm.rightDatas = [];
                console.log('i am clicked');
                var fileInput = document.getElementById("csv"),
                    readFile = function () {
                        var reader = new FileReader();
                        reader.onload = function () {
                            //document.getElementById('out').innerHTML = reader.result;
                            var data = [];
                            data = reader.result.split('/\r\n|\n/');
                            console.log(data);
                            data = data[0].split('\n');
                            console.log("data first element is");
                            console.log(data[0].split(','));
                            $.each(data, function (index, val) {
                                val = val.split(",");
                                console.log(val[0] + val[1]);
                                vm.leftDatas.push(val[0]);
                                vm.rightDatas.push(val[1]);
                            });
                            vm.leftDatas.shift();
                            vm.rightDatas.shift();
                            $scope.$apply();

                        };
                        reader.readAsText(fileInput.files[0]);
                        reader.onload();
                    };

                fileInput.addEventListener('change', readFile);
            }
        }]);
})();
