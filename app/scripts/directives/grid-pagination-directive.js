angular.module('cms.kendopager.directive', [])

.directive('customGridPagination', [function () {

    return {
        restrict: 'A',
        scope: {
            onCancelClicked: '&'
        },
        link: function(scope, element, attrs) {

            if (angular.isDefined(angular.element('#grid-pagination'))) {
                angular.element('#grid-pagination').append('<button style=\"float:right;\" class=\"btn btn-primary\" id=\"cancel-btn\">Cancel</button>');
            }

            $('#cancel-btn').bind('click', function() {
                scope.onCancelClicked();
            });
        }
    };
}]);
