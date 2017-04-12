'use strict'

angular.module('mainController', [])

    .controller('mainCtrl', function ($http, $location) {

        // var main = this;
        $location.path('/list')
        // main.orderByField = 'ip';
        // main.reverseSort = false;

        // main.LocalNetworkArray = [
        //     { ip: '192.168.0.1' },
        //     { ip: '192.168.0.3' },
        //     { ip: '192.168.0.4' },
        //     { ip: '192.168.1.1' },
        //     { ip: '8.8.8.8' }
        // ]

        // function Scan() {
        //     $http.post('api/getData', { test: 'testing data' })
        //         .then(function (response) {
        //             main.pingData = response.data
        //             main.pingData.forEach(function (element) {
        //                 console.log(element.ip, element.status, element.time)
        //             })

        //             main.LocalNetworkArray.forEach(function (localIp) {
        //                 main.pingData.forEach(function (serverIp) {
        //                     if (localIp.ip == serverIp.ip) {
        //                         localIp.status = serverIp.status
        //                     }
        //                 })
        //             }, this);
        //         })
        //     setTimeout(Scan, 6000);
        // }
        // Scan();

    })