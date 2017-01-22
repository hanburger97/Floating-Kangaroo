



app.controller('tableCtrl', ['$scope', '$http', '$rootScope', '$location', function($scope,$http, $rootScope, $location) {
    $scope.responses = [];
    $scope.trigger = $scope.response = $scope.action ='';
    $http.get('/responses').success(function(data) {
        $scope.responses = data;
        $rootScope.$emit('log', 'GET /responses success');
    });


    $scope.add = function () {
        $http.post('/responses', {
            trigger: $scope.trigger,
            response: $scope.response,
            action: {}
        }).success(function(data) {
            $scope.responses.push(data);
            $scope.trigger = $scope.response = $scope.action = '';
            $rootScope.$emit('log', 'POST /responses success');
        });
    };
    $scope.remove = function(response) {
        $http.delete('/responses/' + response.id).success(function() {
            $http.get('/responses').success(function(data) {
                $scope.responses = data;
                $rootScope.$emit('log', 'GET /responses success');
            });
            $rootScope.$emit('log', 'DELETE /responses success');
        });
    };
    $scope.toEdit = function(response){
        $location.url('/table/response/'+ response.id);
    }

}]);
app.controller('postbacks', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {
    $scope.postbacks = [];
    $scope.trigger = $scope.response = $scope.action = '';
    $http.get('/postbacks').success(function (data) {
        $scope.postbacks = data;
        $rootScope.$emit('log', 'GET /postbacks success');
    });


    $scope.add = function () {
        $http.post('/postbacks', {
            trigger: $scope.trigger,
            response: $scope.response,
            action: {}
        }).success(function (data) {
            $scope.postbacks.push(data);
            $scope.trigger = $scope.response = $scope.action = '';
            $rootScope.$emit('log', 'POST /postbacks success');
        });
    };
    $scope.remove = function (postback) {
        $http.delete('/postbacks/' + postback.id).success(function () {
            //$scope.responses = data;
            //$scope.responses.splice(response);
            $http.get('/postbacks').success(function (data) {
                $scope.postbacks = data;
            });
            $rootScope.$emit('log', 'DELETE /responses success');
        });
    };
    $scope.toEdit = function (postback) {
        $location.url('/table/postback/' + postback.id)
    }
}]);

