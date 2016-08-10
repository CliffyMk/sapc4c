(function () {
    'use strict';
    angular.module('MappingApp')
        .controller('MappingController', ['$scope', 'Excel', '$timeout', function ($scope, Excel, $timeout) {
            console.log("mapping contrller loaded");
            var vm = this;
            vm.srcDragElement = {};
            vm.rightColumn = ["row1", "row2", "row3", "row4"];
            var leftFileInput = document.getElementById("leftCsv");
            var readLeftFile = function () {
                if (readLeftFile !== null) {
                    vm.leftColumn = [];
                    var reader = new FileReader();
                    reader.onload = function () {
                        var data = reader.result.split('/\r\n|\n/');
                        data = data[0].split('\n');
                        data = data[0].split(',');
                        $.each(data, function (index, val) {
                            if (val.replace(" ", "") == "") return true;
                            vm.leftColumn.push(val);
                        });

                        vm.leftColumnObject = vm.leftColumn[0];
                        console.log("vm.leftColumn[0]" + vm.leftColumn[0]);
                        vm.leftColumn.shift();
                        // vm.leftColumn.pop();
                        vm.mappedColumn = vm.leftColumn;

                        $scope.$apply();


                    };
                    reader.readAsText(leftFileInput.files[0]);
                    reader.onload();
                }

            };
            leftFileInput.addEventListener('change', readLeftFile);
            // reading and displaying the right csv col
            var rightFileInput = document.getElementById("rightCsv");
            var readRightFile = function () {
                vm.rightColumn = [];
                var reader = new FileReader();
                reader.onload = function () {
                    var data = reader.result.split('/\r\n|\n/');
                    data = data[0].split('\n');
                    data = data[0].split(',');
                    $.each(data, function (index, val) {
                        vm.rightColumn.push(val);
                    });
                    $scope.$apply();
                };
                reader.readAsText(rightFileInput.files[0]);
                reader.onload();
                // start reading the file. When it is done, calls the onload event defined above.

            };
            rightFileInput.addEventListener('change', readRightFile);
            /*-------------------------------------------------------------------------------*/
            vm.getSrcAttribute = function (srcAttr) {
                vm.srcAttr = srcAttr;
                console.log(vm.srcAttr);
                $(this).css("background", "black");
            }
            vm.setDestAttribute = function (destAttr) {
                if (srcAttr != null) {

                }
            }

            /*-----------*/


        }]);
})();
