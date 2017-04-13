angular.module('listController', [])


    .controller('listCtrl', function ($http, $uibModal, $log, $document, Ip) {

        var list = this;
        //$location.path('/list')
        list.orderByField = 'ip';
        list.reverseSort = false;

        list.LocalNetworkArray = [
            { ip: '192.168.0.1' },
            { ip: '192.168.0.3' },
            { ip: '192.168.0.4' },
            { ip: '192.168.1.1' },
            { ip: '8.8.8.8' }
        ]

        function Scan() {
            $http.post('api/getData', { test: 'testing data' })
                .then(function (response) {
                    list.pingData = response.data
                    // list.pingData.forEach(function (element) {
                    //     console.log(element.ip, element.status, element.time)
                    // })

                    list.LocalNetworkArray.forEach(function (localIp) {
                        list.pingData.forEach(function (serverIp) {
                            if (localIp.ip == serverIp.ip) {
                                localIp.status = serverIp.status
                            }
                        })
                    }, this);
                })
            setTimeout(Scan, 6000);
        }
        Scan();


        list.items = ['item1', 'item2', 'item3'];

        list.animationsEnabled = true;

        list.open = function (size, parentSelector) {
            console.log('open Modal')
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open(
                {
                    animation: list.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/modals/myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: 'ctrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: { //send the list of items to the modal
                        items: function () {
                            return list.items;
                        }
                    }
                });

            modalInstance.result
                .then(function (newMachine) {
                    list.newMachine = newMachine;

                    Ip.create({
                        newMachine: newMachine
                    }).then(function (response) {
                        console.log('got back:',response.data)
                    })
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        };

    })

