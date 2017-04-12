angular.module('listController', [])


    .controller('listCtrl', function ($http) {

        var list = this;
        //$location.path('/list')
        list.orderByField = 'ip';
        list.reverseSort = false;

        list.LocalNetworkArray = [
            { ip: '192.168.0.1' },
            { ip: '192.168.0.3' },
            { ip: '192.168.0.4' },
            { ip: '192.168.1.1' },
            { ip: '8.8.8.8' }
        ]

        function Scan() {
            $http.post('api/getData', { test: 'testing data' })
                .then(function (response) {
                    list.pingData = response.data
                    list.pingData.forEach(function (element) {
                        console.log(element.ip, element.status, element.time)
                    })

                    list.LocalNetworkArray.forEach(function (localIp) {
                        list.pingData.forEach(function (serverIp) {
                            if (localIp.ip == serverIp.ip) {
                                localIp.status = serverIp.status
                            }
                        })
                    }, this);
                })
            setTimeout(Scan, 6000);
        }
        Scan();

    })

