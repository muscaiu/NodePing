angular.module('ipServices', [])

    .factory('Ip', function ($http) {
        ipFactory = {};

        ipFactory.create = function (newIp) {
            console.log('service newip: ', newIp)
            return $http.post('/api/newIp', newIp)
            // .then(function(response) {
            //     console.log("Data saved status:", response.data.success);
            // })
        }

        ipFactory.getinterviews = function (username) {
            return $http.post('/api/getinterviews', { username: username })
        }

        return ipFactory;
    })