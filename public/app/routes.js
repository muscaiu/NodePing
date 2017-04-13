var app = angular.module('appRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html',
                controller: 'homeCtrl',
                controllerAs: 'home'
            })
            .when('/machinelist', {
                templateUrl: 'app/views/pages/MachineList.html',
                controller: 'machineListCtrl',
                controllerAs: 'machineList',
            })

            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        })
    });
