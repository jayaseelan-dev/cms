angular.module('cms.logout.controller', [])

.controller('logoutController' , ['SessionService', function(SessionService) {

    // Calls the service method to check clear session value
    SessionService.logout();
}]);
