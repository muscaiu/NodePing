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

        machineFactory.editMachine = function (id, updateMachine) {
            return $http.put('/api/editMachine/' + id, { updateMachine: updateMachine })
        }

        return machineFactory
    })