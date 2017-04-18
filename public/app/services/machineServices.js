angular.module('machineServices', [])

    .factory('Machine', function ($http) {
        machineFactory = {}

        machineFactory.newMachine = function (newMachine) {
            return $http.post('/api/newMachine', newMachine)
        }

        machineFactory.getMachines = function (sortOption) {
            //console.log('service', sortOption)
            return $http.post('/api/getMachines', { sortOption: sortOption })
        }

        machineFactory.getClickedMachine = function (id) {
            return $http.get('/api/getClickedMachine/' + id)
        }

        machineFactory.updateMachine = function (id, updateMachine) {
            return $http.put('/api/updateMachine/' + id, { updateMachine: updateMachine })
        }

        machineFactory.delete = function (id) {
            return $http.delete('/api/deleteMachine/' + id)
        }


        return machineFactory
    })