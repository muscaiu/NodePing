'use strict'

angular.module('mainController', [])

    .controller('mainCtrl', function ($scope, $http, $timeout) {

        var main = this;

        function test() {
            $http.post('api/getData', { test: 'testing data' })
                .then(function (response) {
                    console.log(response.data)
                    main.pingData = response.data
                })
            setTimeout(test, 5000);
        }
        test();

    })