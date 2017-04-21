angular.module('EditMachineController', [])

    .controller('EditMachineCtrl', function ($uibModalInstance, currentMachine) {
        var ctrl = this;

        ctrl.newMachine = currentMachine;

        ctrl.UptimeList = ctrl.newMachine.DayStatus


        ctrl.ok = function () {
            $uibModalInstance.close(ctrl.newMachine);
        };

        ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        ctrl.delete = function () {
            $uibModalInstance.close({
                id: ctrl.newMachine._id,
                action: 'delete'
            });
        };
    });
