angular.module('ModalInstanceController', [])

    .controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
        var modalInstance = this;

        if (items) {
            modalInstance.newMachine = items;
            console.log(items)
        }

        modalInstance.ok = function () {
            $uibModalInstance.close(modalInstance.newMachine);
        };

        modalInstance.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
