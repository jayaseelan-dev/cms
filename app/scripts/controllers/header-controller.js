angular.module('cms.header.controller', [])

.controller('headerController', ['$scope', 'SessionService', function($scope, SessionService) {

    var sessionValue = SessionService.getCurrentSession();

    $scope.user = (sessionValue !== null) ? ('Welcome, ' + sessionValue) : '';

            $scope.imageName = 'admin-image.png';
	$scope.isUserImageVisible = false;

    if ($scope.user !== ''){
        $scope.isUserImageVisible = true;
    }
}]);
