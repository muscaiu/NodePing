angular.module('ModalInstanceController', [])

    .controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
        var ctrl = this;
        ctrl.items = items;
        ctrl.selected = {
            item: ctrl.items[0]
        };

        ctrl.ok = function (ip) {
            //console.log(ip)
            $uibModalInstance.close(ctrl.newIp);
        };

        ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
