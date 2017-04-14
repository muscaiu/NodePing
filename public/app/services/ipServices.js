angular.module('ipServices', [])

    .factory('Machine', function ($http) {
        machineFactory = {}

        machineFactory.newMachine = function (newMachine) {
            return $http.post('/api/newMachine', newMachine)
            // .then(function(response) {
            //     console.log("Data saved status:", response.data.success);
            // })
        }

        machineFactory.getAllMachines = function () {
            return $http.post('/api/getAllMachines')
        }

        machineFactory.getClickedMachine = function (id) {
            return $http.get('/api/getClickedMachine/' + id)
        }

        // machineFactory.editMachine = function (id) {
        //     return $http.put('/api/editMachine', { id: id})
        // }

        return machineFactory
    })