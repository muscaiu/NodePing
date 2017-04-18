angular.module('ModalInstanceController', [])

    .controller('ModalInstanceCtrl', function ($uibModalInstance) {
        var modalInstance = this;

        modalInstance.ok = function () {
            $uibModalInstance.close(modalInstance.newMachine);
        };

        modalInstance.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
