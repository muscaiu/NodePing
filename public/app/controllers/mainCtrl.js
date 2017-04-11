'use strict'

angular.module('mainController', [])

    .controller('mainCtrl', function ($http, $timeout) {

        var main = this;

        main.LocalNetworkArray = [
            {ip:'192.168.0.1'},
            {ip:'192.168.0.3'},
            {ip:'192.168.0.4'}            
        ]

        function scan() {
            $http.post('api/getData', { test: 'testing data' })
                .then(function (response) {                                     
                    main.pingData = response.data
                    main.pingData.forEach(function(element){
                        console.log(element.ip, element.status)
                    })

                    main.LocalNetworkArray.forEach(function (localIp) {
                        main.pingData.forEach(function (serverIp) {
                            if(localIp.ip == serverIp.ip){
                                localIp.status = serverIp.status
                            }
                        })
                    }, this);
                })
            setTimeout(scan, 6000);
        }
        scan();

    })