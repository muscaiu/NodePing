angular.module('SortMachinesController', [])

    .controller('SortMachinesCtrl', function ($uibModalInstance) {
        var modalInstance = this;

        modalInstance.All = function (option) {
            console.log(option)
            $uibModalInstance.close(option);
        };
        modalInstance.Triboo = function (option) {
            console.log(option)
            $uibModalInstance.close(option);
        };
        modalInstance.Server = function (option) {
            console.log(option)
            $uibModalInstance.close(option);
        };

        // modalInstance.cancel = function () {
        //     $uibModalInstance.dismiss('cancel');
        // };

    });
