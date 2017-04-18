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
        modalInstance.delete = function () {
            $uibModalInstance.close(
                {
                    id: modalInstance.newMachine._id,
                    action: 'delete'
                });
        };
    });
