angular.module('machineServices', [])

    .factory('Machine', function ($http) {
        machineFactory = {}

        machineFactory.newMachine = function (newMachine) {
            return $http.post('/api/newMachine', newMachine)
        }

        machineFactory.getAllMachines = function () {
            return $http.post('/api/getAllMachines')
        }

        machineFactory.getClickedMachine = function (id) {
            return $http.get('/api/getClickedMachine/' + id)
        }

        machineFactory.updateMachine = function (id, updateMachine) {
            return $http.put('/api/updateMachine/' + id, { updateMachine: updateMachine })
        }

        return machineFactory
    })