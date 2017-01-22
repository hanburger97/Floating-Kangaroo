

var app = angular.module('app', ['ngRoute']);


    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/table', {
                templateUrl: './templates/viewTable/table.template.html',
                controller: 'tableCtrl'
            })
            .when('/table/response/:id', {
                templateUrl: './templates/viewTable/edit.response.template.html',
                controller: 'editResponse'
            })
            .when('/table/postback/:id', {
            templateUrl: './templates/viewTable/edit.postback.template.html',
            controller: 'editPostback'
            })
    }]);


    app.controller('logger', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.events = [];
        $rootScope.$on('log', function (event, data) {
            $scope.events.push(data.trim());
        });
    }]);
