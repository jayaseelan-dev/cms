angular.module('cms.notification.directive', [])

.directive('notificationMessage', function () {

    return{
        restrict: 'E',
        template: '<div class=\"notification-area\"><div class=\"notification-message\"></div><span kendo-notification=\"notificationMessage\" k-append-to="\'.notification-message\'" k-auto-hide-after=\"2000\"></span></div>'
    };
});
