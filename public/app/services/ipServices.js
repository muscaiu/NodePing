angular.module('ipServices', [])

    .factory('Machine', function ($http) {
        machineFactory = {}

        machineFactory.newMachine = function (newMachine) {
            return $http.post('/api/newMachine', newMachine)
            // .then(function(response) {
            //     console.log("Data saved status:", response.data.success);
            // })
        }

        machineFactory.getAllMachines = function (username) {
            return $http.post('/api/getAllMachines')
        }

        return machineFactory
    })