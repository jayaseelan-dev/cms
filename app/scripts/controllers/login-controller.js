angular.module('cms.login.controller', ['LocalStorageModule'])

.controller('loginController', ['$scope', '$http', '$state', 'localStorageService', function($scope, $http, $state, localStorageService) {

    var init = function() {

        $scope.userDetails = [];

        $http.get('data/user-data.json').success(function(data) {
            $scope.userDetails = data;
        });
    };

    $scope.checkCredentials = function() {

        var isValidUser = false;
        var userName    = $scope.userName;
        var password    = $scope.password;

        angular.forEach ($scope.userDetails, function(userValues) {

            if (userName === userValues.userName &&  password === userValues.password) {

                isValidUser = true;
                sessionStorage.setItem('user', userName);
            }
		});

        if (!isValidUser) {

             $scope.notificationMessage.show('Invalid username or password', 'error');
             return;
        }
        $state.go('home.company');
    };

    init();
}]);
