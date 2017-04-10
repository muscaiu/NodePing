'use strict'

angular.module('mainController', [])

    .controller('mainCtrl', function ($http, $timeout) {

        var main = this;

        function scan() {
            $http.post('api/getData', { test: 'testing data' })
                .then(function (response) {
                    console.log(response.data.length)
                    main.pingData = response.data
                })
            setTimeout(scan, 5000);
        }
        scan();

    })