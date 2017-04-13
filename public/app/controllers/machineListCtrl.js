angular.module('machineListController', [])


    .controller('machineListCtrl', function ($http, $uibModal, $log, $document, Machine) {

        var machineList = this;
        //$location.path('/list')
        machineList.orderByField = 'ip';
        machineList.reverseSort = false;

        Machine.getAllMachines().then(function (response) {
            machineList.allMachines = response.data
            console.log('getallmachines', machineList.allMachines)
        })

        var Scan = function () {

            Machine.getAllMachines().then(function (response) {
                machineList.allMachines = response.data
                console.log('Scan 6 sec', machineList.allMachines)
            })
            setTimeout(Scan, 6000)
        }
        Scan()


        machineList.items = ['item1', 'item2', 'item3'];

        machineList.animationsEnabled = true;

        machineList.open = function (size, parentSelector) {
            console.log('open Modal')
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open(
                {
                    animation: machineList.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/modals/myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: 'ctrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: { //send the list of items to the modal
                        items: function () {
                            return machineList.items;
                        }
                    }
                });

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
        };

    })

