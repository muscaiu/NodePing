angular.module('chartController', ["chart.js"])

    .controller('chartCtrl', function ($scope, $uibModalInstance, allMachines) {
        console.log(allMachines)

        $scope.labels = ['Maran', 'Triboo', 'Telekom', 'Tehnic', 'Web', 'Server', 'Router']
        $scope.data = [0, 0, 0, 0, 0, 0, 0]
        $scope.series = ['All Data']
        $scope.options = {
            responsive: false,
            maintainAspectRatio: true,
            legend: { display: true }
        }
        // $scope.colors = ["#F7464A", "#97BBCD", "#000000"]

        for (let i = 0; i < $scope.labels.length; i++) {

            for (let x = 0; x < allMachines.length; x++) {
                if ($scope.labels[i] == allMachines[x].Department) {
                    $scope.data[i]++
                }
            }
        }
        console.log($scope.data)

    });
