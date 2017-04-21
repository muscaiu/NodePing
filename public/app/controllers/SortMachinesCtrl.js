angular.module('SortMachinesController', [])

    .controller('SortMachinesCtrl', function ($uibModalInstance) {
        var modalInstance = this;

        modalInstance.Sort = function (option) {
            console.log(option)
            $uibModalInstance.close(option);
        };
        // modalInstance.cancel = function () {
        //     $uibModalInstance.dismiss('cancel');
        // };

    });
