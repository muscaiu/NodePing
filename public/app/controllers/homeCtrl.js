angular.module('homeController', [])


    .controller('homeCtrl', function ($scope, $location) {
        var home = this;
        console.log('homeCtrl OK')
        $location.path('/machinelist')
    });

