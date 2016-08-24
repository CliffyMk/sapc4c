(function () {
    'use strict';
    angular.module('MappingApp')
        .controller('MappingController', ['$scope', 'Excel', '$timeout', '$state', '$window', function ($scope, Excel, $timeout, $state, $window) {
            console.log("mapping contrller loaded");
            var vm = this;
            vm.srcDragElement = {};
            vm.fieldMappings = {};
            vm.savedSapAttrColumn = {};
            vm.savedSfAttrColumn = {};
            vm.editingMode = false;
            vm.sfObjectInitialised = false;
            vm.valueMappingMode = false;
            vm.savedMapping = {};

            // end of variable declaration
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
                        vm.sfObjectInitialised = true;
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


            vm.saveMapping = function () {

                if (vm.inputSfObject && vm.inputSapObject) {
                    if (vm.fieldMappings !== null) {
                        if (vm.savedMapping[vm.inputSfObject + "->" + vm.inputSapObject] && !vm.editingMode) {
                            displayMsg('error', "Mapping Already Saved");
                        } else {
                            vm.savedMapping[vm.inputSfObject + "->" + vm.inputSapObject] = vm.fieldMappings;
                            vm.savedSapAttrColumn[vm.inputSapObject] = vm.rightColumn;
                            displayMsg('success', "Successfully Saved!!");
                            clearInputs();
                        }
                        vm.fieldMappings = {};
                        vm.editingMode = false;
                        $window.scrollTo(0, 0);
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
                $("table#" + key).toggleClass('hide');
            };
            vm.deleteMapping = function (key) {
                delete vm.fieldMappings[key];
            }
            vm.editSavedMapping = function (Gkey) {
                var sapObj = Gkey.split("->")[1];
                vm.fieldMappings = vm.savedMapping[Gkey];
                vm.rightColumn = vm.savedSapAttrColumn[sapObj];
                vm.inputSapObject = sapObj;
                vm.editingMode = true;
                vm.showSavedMapping(Gkey);
            }
            vm.reloadView = function () {
                $state.reload();
            }
            vm.rmAttrFromMapping = function (key, data, value) {
                var obj = data.fieldMapping;
                $.each(obj, function (index, val) {
                    if (val === value) {
                        obj.splice(index, 1);
                        if (obj.length === 0)
                            delete vm.fieldMappings[key];
                        return;
                    }

                    /* iterate through array or object */
                });
            }
            vm.showValueMappingFn = function () {
                vm.valueMappingMode = true;
            }
            vm.showValMapBoxFn = function (key, value) {
                vm.showValMapBox = true;
                console.log(key);
                console.log(value);
                vm.currValMapKey = key;
                vm.currValMapVal = value.fieldMapping;
            }
            vm.saveValMap = function () {
                vm.showValMapBox = false;
            }
            vm.exportMapping = function (btn) {
                alert("exported Successfully");
                var data = vm.savedMapping;
                var json = JSON.stringify(data);
                var blob = new Blob([json], { type: "application/json" });
                var url = URL.createObjectURL(blob);
                var a = btn.target;
                a.download = "mapping.json";
                a.href = url;
            }
            var displayMsg = function (type, msg) {
                    vm.displayMsgType = type;
                    vm.displayMsg = msg;
                    $timeout(function () {
                        vm.displayMsg = null;
                    }, 1000);
                }
                /*-----------*/
            var clearInputs = function () {
                vm.inputSapObject = undefined;
                vm.rightColumn = [];
                // var file = $("#rightCsv");
                // file.replaceWith(file = file.clone(true));
            }

            function insIntoFieldMapping(srcAttr, destAttr) {
                vm.fieldMappings[srcAttr] = vm.fieldMappings[srcAttr] || {};
                vm.fieldMappings[srcAttr].fieldMapping = vm.fieldMappings[srcAttr].fieldMapping || [];
                var data = vm.fieldMappings[srcAttr].fieldMapping;
                var flag = true;
                $.each(data, function (index, val) {
                    if (destAttr === val) {
                        flag = false;
                        return;
                    }
                });
                if (flag === true) {
                    data.unshift(destAttr);
                    vm.srcAttr = srcAttr;
                }
            }
        }]);
})();
