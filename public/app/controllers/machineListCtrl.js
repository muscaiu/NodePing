angular.module('machineListController', [])


    .controller('machineListCtrl', function ($http, $timeout, $uibModal, $log, $document, Machine) {

        var machineList = this;
        //$location.path('/list')
        machineList.orderByField = 'ip';
        machineList.reverseSort = false;

        var RefreshData = function () {
            Machine.getAllMachines().then(function (response) {
                machineList.allMachines = [];
                machineList.allMachines = response.data
                console.log('RefreshData 6 sec', machineList.allMachines)
            })
            setTimeout(RefreshData, 6000)
        }
        RefreshData()

        // machineList.recreate = function () {
        //     RefreshData()
        // }



        machineList.EditMachine = function (id, parentSelector) {
            if (id) {
                Machine.getClickedMachine(id)
                    .then(function (response) {
                        machineList.editedObject = response.data.item

                        console.log('Edit Modal', id)
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
                                templateUrl: 'app/modals/myModalContent.html',
                                controller: 'ModalInstanceCtrl',
                                controllerAs: 'ctrl',
                                size: 'lg',
                                appendTo: parentElem,
                                resolve: { //send the list of items to the modal
                                    items: function () {
                                        console.log(machineList.editedObject)
                                        return machineList.editedObject;
                                    }
                                }
                            });
                        //Modal Result
                        modalInstance.result
                            .then(function (newMachine) {
                                machineList.newMachine = newMachine;
                                Machine.updateMachine(newMachine._id, newMachine)
                                    .then(function (response) {
                                        console.log('got back:', response.data)
                                    })
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
                        templateUrl: 'app/modals/myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        controllerAs: 'ctrl',
                        size: 'lg',
                        appendTo: parentElem,
                        resolve: { //send the list of items to the modal
                            items: function () {
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





    })

