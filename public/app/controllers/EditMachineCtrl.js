angular.module('EditMachineController', [])

    .controller('EditMachineCtrl', function ($uibModalInstance, currentMachine) {
        var modalInstance = this;

        modalInstance.newMachine = currentMachine;

        modalInstance.ok = function () {
            $uibModalInstance.close(modalInstance.newMachine);
        };

        modalInstance.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        modalInstance.delete = function () {
            $uibModalInstance.close({
                id: modalInstance.newMachine._id,
                action: 'delete'
            });
        };
    });
