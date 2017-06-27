angular.module('cms.contextmenu.directive', [])

.directive('contextMenu', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/common/context-menu.html'
    };
});
