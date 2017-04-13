angular.module('ipServices', [])

    .factory('Machine', function ($http) {
        machineFactory = {}

        machineFactory.create = function (newMachine) {
            return $http.post('/api/newMachine', newMachine)
            // .then(function(response) {
            //     console.log("Data saved status:", response.data.success);
            // })
        }

        return machineFactory
    })