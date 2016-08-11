(function () {
    'use strict';
    angular.module('MappingApp')
        .controller('MappingController', ['$scope', 'Excel', '$timeout', function ($scope, Excel, $timeout) {
            console.log("mapping contrller loaded");
            var vm = this;
            vm.srcDragElement = {};
            vm.fieldMappings = {};
            vm.savedMapping = {};

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
                        if (val.replace(" ", "") == "") return true;
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
            var outerSrcAttr = null;
            vm.getSrcAttribute = function (srcAttr) {
                vm.srcAttr = srcAttr;

            }

            vm.setDestAttribute = function (destAttr) {
                if (vm.srcAttr != null) {
                    insIntoFieldMapping(vm.srcAttr, destAttr);
                }
            }

            function insIntoFieldMapping(srcAttr, destAttr) {
                if (vm.fieldMappings[srcAttr] === undefined)
                    vm.fieldMappings[srcAttr] = [];
                var flag = true;
                if (vm.fieldMappings[srcAttr] !== null)
                    $.each(vm.fieldMappings[srcAttr], function (index, val) {
                        if (destAttr === val) {
                            flag = false;
                            return;
                        }
                        /* iterate through array or object */
                    });
                if (flag === true) {

                    vm.fieldMappings[srcAttr].push(destAttr);
                    vm.srcAttr = srcAttr;
                }

            }

            vm.saveMapping = function () {
                if (vm.inputSfObject && vm.inputSapObject) {
                    if (vm.fieldMappings !== null) {
                        if (vm.savedMapping[vm.inputSapObject + "->" + vm.inputSfObject]) {
                            displayMsg('error', "Mapping Already Saved");

                        } else {
                            vm.savedMapping[vm.inputSapObject + "->" + vm.inputSfObject] = vm.fieldMappings;
                            displayMsg('success', "Successfully Saved!!");
                        }
                        vm.fieldMappings = {};
                    }
                } else {
                    displayMsg('error', "Please Enter Object Name");
                    if (vm.inputSfObject)
                        $("input#inputSfObject").focus();
                    else
                        $("input#inputSapObject").focus();
                }
            }
            vm.deleteSavedMapping = function (key) {
                delete vm.savedMapping[key];
            }
            vm.showSavedMapping = function (key) {
                console.log("show saved mapping");
            };
            vm.deleteMapping = function (key) {
                delete vm.fieldMappings[key];
            }

            var displayMsg = function (type, msg) {
                    vm.displayMsgType = type;
                    vm.displayMsg = msg;
                    $timeout(function () {
                        vm.displayMsg = null;
                    }, 1000);
                }
                /*-----------*/


        }]);
})();
