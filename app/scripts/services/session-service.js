angular.module('cms.session.service', ['LocalStorageModule'])

.service('SessionService', ['$http', '$state', 'localStorageService', function($http, $state, localStorageService) {

    this.getCurrentSession = function() {

        this.userStatus = (sessionStorage.getItem('user') !== null) ? sessionStorage.getItem('user') : null;

        if (this.userStatus === null) {
            $state.go('login');
        }
        return this.userStatus;
    };

    this.logout = function() {

        sessionStorage.removeItem('user');
        $state.go('login');
    };
}]);
