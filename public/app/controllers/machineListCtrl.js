angular.module('machineListController', [])

    .controller('machineListCtrl', function ($http, $timeout, $uibModal, $log, $document, Machine) {

        var machineList = this;
        var displayingObject = {}
        //$location.path('/list')
        machineList.orderByField = 'ip';
        machineList.reverseSort = false;
        machineList.sortOption = {
            Department: 'All'
        }

        var RefreshData = function () {
            if (!machineList.sortOption.Department) {
                console.log('no sort option')
            } else {
                Machine.getMachines(machineList.sortOption.Department)
                    .then(function (response) {
                        // machineList.allMachines = [];
                        machineList.allMachines = response.data
                        console.log('RefreshData 6 sec', machineList.allMachines)
                        displayingObject = {
                            activator: 'All'
                        }
                    })
                $timeout(RefreshData, 6000)
            }
        }
        RefreshData('All')

        function checkDisplaying() {
            if (displayingObject.activator === 'All') {
                getMachinesFiltered('All')
            } else {
                console.log('diffrent check')
            }
        }
        function getMachinesFiltered() {
            if (!machineList.sortOption.Department) {
                console.log('something wrong on getMachinesFiltered')
            } else {
                RefreshData()
            }
        }

        machineList.EditMachine = function (id, parentSelector) {
            if (id) {
                Machine.getClickedMachine(id)
                    .then(function (response) {
                        machineList.editedObject = response.data.item
                        var parentElem = parentSelector ?
                            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                        //Modal Code
                        machineList.animationsEnabled = true;
                        //Modal Setup
                        var modalInstance = $uibModal.open(
                            {
                                animation: machineList.animationsEnabled,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                templateUrl: 'app/modals/EditMachineModal.html',
                                controller: 'EditMachineCtrl',
                                controllerAs: 'ctrl',
                                size: 'lg',
                                appendTo: parentElem,
                                resolve: { //send the list of items to the modal
                                    currentMachine: function () {
                                        console.log(machineList.editedObject)
                                        return machineList.editedObject;
                                    }
                                }
                            });
                        //Modal Result
                        modalInstance.result
                            .then(function (newMachine) {
                                machineList.newMachine = newMachine;
                                if (newMachine.action === 'delete') {
                                    console.log('deleteing', newMachine.id)
                                    Machine.delete(newMachine.id)
                                        .then(function (response) {
                                            console.log('got back delete:', response.data)
                                        })
                                } else {
                                    Machine.updateMachine(newMachine._id, newMachine)
                                        .then(function (response) {
                                            console.log('got back update:', response.data)
                                        })
                                }
                            }, function () {
                                $log.info('Modal dismissed at: ' + new Date());
                            });
                    })
            } else {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                //Modal Code
                machineList.animationsEnabled = true;
                //Modal Setup
                var modalInstance = $uibModal.open(
                    {
                        animation: machineList.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/modals/EditMachineModal.html',
                        controller: 'EditMachineCtrl',
                        controllerAs: 'ctrl',
                        size: 'lg',
                        appendTo: parentElem,
                        resolve: { //send the list of items to the modal
                            currentMachine: function () {
                                machineList.editedObject = {}
                                return machineList.editedObject;
                            }
                        }
                    });
                //Modal Result
                modalInstance.result
                    .then(function (newMachine) {
                        machineList.newMachine = newMachine;
                        Machine.newMachine({
                            newMachine: newMachine
                        }).then(function (response) {
                            console.log('got back:', response.data)
                        })
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
            }
        }

        machineList.SortMachines = function (parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            //Modal Code
            machineList.animationsEnabled = true;
            //Modal Setup
            var modalInstance = $uibModal.open(
                {
                    animation: machineList.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/modals/SortMachinesModal.html',
                    controller: 'SortMachinesCtrl',
                    controllerAs: 'sortCtrl',
                    size: 'md',
                    appendTo: parentElem,
                    // resolve: { //send the list of items to the modal
                    //     items: function () {
                    //         return machineList.editedObject;
                    //     }
                    // }
                });
            //Modal Result
            modalInstance.result
                .then(function (sortOption) {
                    machineList.sortOption.Department = sortOption;
                    // Machine.newMachine({
                    //     newMachine: newMachine
                    // }).then(function (response) {
                    // })
                    getMachinesFiltered()
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        }


    })

