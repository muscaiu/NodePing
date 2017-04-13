angular.module('ModalInstanceController', [])

    .controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
        var ctrl = this;
        ctrl.items = items;
        ctrl.selected = {
            item: ctrl.items[0]
        };

        ctrl.ok = function () {
            $uibModalInstance.close(ctrl.selected.item);
            console.log(ctrl.selected)
        };

        ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
