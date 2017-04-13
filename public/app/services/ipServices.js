angular.module('ipServices', [])

    .factory('Ip', function ($http) {
        ipFactory = {};

        ipFactory.create = function (newMachine) {
            return $http.post('/api/newMachine', newMachine)
            // .then(function(response) {
            //     console.log("Data saved status:", response.data.success);
            // })
        }

        ipFactory.getinterviews = function (username) {
            return $http.post('/api/getinterviews', { username: username })
        }

        return ipFactory;
    })