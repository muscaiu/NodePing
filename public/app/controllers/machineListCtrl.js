angular.module('machineListController', [])

    .controller('machineListCtrl', function ($http, $timeout, $uibModal, $log, $document, Machine) {

        var machineList = this;
        var displayingObject = {}
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
                        machineList.countMachines = response.data.length
                    })
                $timeout(RefreshData, 6000)
            }
        }
        checkDisplaying()

        function checkDisplaying() {
            getMachinesFiltered(machineList.sortOption.Department)
        }
        function getMachinesFiltered() {
            if (!machineList.sortOption.Department) {
                console.log('something wrong on getMachinesFiltered')
            } else {
                RefreshData()
            }
        }
        // var IpArray = []
        // machineList.GetChartData = function () {
        //     Machine.getMachines(machineList.sortOption.Department)
        //         .then(function (response) {
        //             // machineList.allMachines = [];
        //             machineList.allMachines = response.data
        //             machineList.allMachines.forEach(function (allMachines) {
        //                 //console.log([...new Set(machineList.allMachines.map(item => item.Ip))]) //distinct ip's array
        //                 allMachines.DayStatus.forEach(function (dayStatus) {
        //                     // console.log([...new Set(machineList.allMachines)])
        //                     // var hours = ([... new Set(allMachines.DayStatus.map(item => moment(item.StoredDate).format('HH')))])
        //                     // var statuses = ([... new Set(allMachines.DayStatus.map(item => item.StoredStatus))])
        //                     // console.log(hours)
        //                     // console.log(statuses)

        //                     //get each ip, //get the hours for this ip, get the status for each your for this ip

        //                     // pushData = { Ip: allMachines.Ip, Hour: moment(dayStatus.StoredDate).format('HH'), Status: dayStatus.StoredStatus }

        //                     // IpArray.indexOf(pushData) === -1 ? IpArray.push(pushData) : console.log("item already exists")

        //                     // console.log(allMachines.Ip, moment(dayStatus.StoredDate).format('HH'), dayStatus.StoredStatus)
        //                     console.log(allMachines.Ip, dayStatus.StoredStatus)

        //                 })
        //             }, this)
        //             console.log(IpArray)
        //         })
        // }

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
                                size: 'md',
                                appendTo: parentElem,
                                resolve: { //send the list of items to the modal
                                    currentMachine: function () {
                                        //console.log(machineList.editedObject)
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
                                            checkDisplaying()
                                            console.log('got back delete:', response.data)
                                        })
                                } else {
                                    Machine.updateMachine(newMachine._id, newMachine)
                                        .then(function (response) {
                                            checkDisplaying()
                                            console.log('got back update:', response.data)
                                        })
                                }
                            }, function () {
                                //$log.info('Modal dismissed at: ' + new Date());
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
                        size: 'md',
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
                            checkDisplaying()
                            console.log('got back:', response.data)
                        })
                    }, function () {
                        //$log.info('Modal dismissed at: ' + new Date());
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
                    checkDisplaying()
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
        }

        machineList.GetChartData = function (parentSelector) {
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
                    templateUrl: 'app/modals/ChartModal.html',
                    controller: 'chartCtrl',
                    controllerAs: 'chart',
                    size: 'md',
                    appendTo: parentElem,
                    resolve: { //send the list of items to the modal
                        allMachines: function () {
                            return machineList.allMachines;
                        }
                    }
                });
            //Modal Result
            modalInstance.result
                .then(function (sortOption) {
                    machineList.sortOption.Department = sortOption;
                    // Machine.newMachine({
                    //     newMachine: newMachine
                    // }).then(function (response) {
                    // })
                    checkDisplaying()
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
        }


    })

