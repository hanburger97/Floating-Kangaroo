
app.controller('editResponse', ['$scope', '$http', '$rootScope', '$routeParams', '$location', function ($scope, $http, $rootScope, $routeParams, $location) {
    $scope.response = {};
    $http.get('/responses/' + $routeParams.id).success(function (data) {
        $scope.response = data;
        $scope.trigger = data.trigger;
        $scope.responsew = data.response;
        $scope.operation = data.action.operation;
        $scope.value = data.action.value;
        $rootScope.$emit('log', 'GET /responses/:id success')
    });
    $scope.update = function () {
        $http.put('/responses/' + $routeParams.id, {
            trigger: $scope.trigger,
            response: $scope.responsew,
            action: {
                operation: $scope.operation,
                value: $scope.value
            }
        }).success(function (data) {

            $location.url('/table');
            $rootScope.$emit('log', 'PUT /responses/:id success')
        })
    }


}]);