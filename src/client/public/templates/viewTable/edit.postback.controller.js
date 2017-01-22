
app.controller('editPostback', ['$scope', '$http', '$rootScope', '$routeParams', '$location', function ($scope, $http, $rootScope, $routeParams, $location) {
    $scope.postback = {};
    $http.get('/postbacks/' + $routeParams.id).success(function (data) {
        $scope.postback = data;
        $scope.trigger = data.trigger;
        $scope.response = data.response;
        $scope.operation = data.action.operation;
        $scope.value = data.action.value;
        $rootScope.$emit('log', 'GET /postback/:id success')
    });
    $scope.update = function () {
        $http.put('/postbacks/' + $routeParams.id, {
            trigger: $scope.trigger,
            response: $scope.response,
            action: {
                operation: $scope.operation,
                value: $scope.value
            }
        }).success(function (data) {
            $scope.trigger = $scope.response = $scope.operation = $scope.value = '';
            $location.url('/table');
            $rootScope.$emit('log', 'PUT /responses/:id success')
        })
    }
}]);