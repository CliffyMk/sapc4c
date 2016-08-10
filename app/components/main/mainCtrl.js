/*global angular*/
(function () {
    'use strict';
    angular.module('MappingApp').controller('MainController', ['$scope', function ($scope) {
        var vm = this;
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
                        $.each(data, function (index, val) {
                            val = val.split(",");
                            vm.leftDatas.push(val[0]);
                            vm.rightDatas.push(val[1]);
                        });
                        vm.leftDatas.shift();
                        vm.rightDatas.shift();
                    };
                    // start reading the file. When it is done, calls the onload event defined above.
                    reader.readAsText(fileInput.files[0]);
                    reader.onload();
                };

            fileInput.addEventListener('change', readFile);
        }
    }]);
}());
