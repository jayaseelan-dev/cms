angular.module('cms.config', ['ui.router'])

.config(['$stateProvider', function ($stateProvider){

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .state('logout', {
            url: '/logout',
            templateUrl: 'views/login.html',
            controller: 'logoutController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            abstract: true
        })
        .state('home.company', {
            url: '/company',
            templateUrl: 'views/company/company-details.html',
            controller: 'companyController'
        })
        .state('home.employee', {
            url: '/employee',
            templateUrl: 'views/employee/employee-details.html',
            controller: 'employeeController'
        })
        .state('otherwise', {
            url: '*path',
            templateUrl: 'views/login.html'
        });
}]);
