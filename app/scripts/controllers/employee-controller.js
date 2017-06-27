angular.module('cms.employee.controller', ['kendo.directives'])

.controller('employeeController', ['$scope', 'RegionListService', 'SessionService', 'CompanyService', function($scope, RegionListService, SessionService, CompanyService) {

    var init = function() {

        $scope.isFormButtonVisible = true;
        $scope.employee            = {};
        $scope.companyNames        = CompanyService.getCompanyNames();

        SessionService.getCurrentSession();
    };

    $scope.employeeDataSource = new kendo.data.DataSource({

        transport: {
            read: {
                url: 'data/employee-data.json',
                dataType: 'json'
            }
        },
        pageSize: 5
    });

    $scope.clearFormData = function() {

        var defaultForm = {
                companyName : '',
                city:         '',
                state:        '',
                country:      ''
        };
        $scope.employee = angular.copy(defaultForm);
    };

    $scope.openWindow = function() {

        $scope.modalWindow.open();
    };

    $scope.countryList = new kendo.data.DataSource({

        transport: {
            read: function(options) {
                RegionListService.getRegionList().then(
                    function(list) {
                        options.success(list.data.country);
                        // options.success({records: list.data.country});
                    },
                    function() {

                    }
                );
            }
        }
        // ,
        // schema: {
        //     data: 'records'
        // }
    });

    $scope.stateList = new kendo.data.DataSource({

        transport: {
            read: function(options) {
                RegionListService.getRegionList().then(
                    function(list) {
                        options.success(list.data.state);
                    },
                    function() {

                    }
                );
            }
        }
    });

    $scope.cityList = new kendo.data.DataSource({

        transport: {
            read: function(options) {
                RegionListService.getRegionList().then(
                    function(list) {
                        options.success(list.data.city);
                    },
                    function() {

                    }
                );
            }
        }
    });

    $scope.insertEmployeeData = function() {

        $scope.employeeDataSource.add($scope.employee);
        $scope.modalWindow.close();
        $scope.clearFormData();
        $scope.notificationMessage.show('Record inserted successfully', 'success');
    };

    $scope.getSelectedRowData = function(dataItem) {

        $scope.openWindow();
        $scope.isFormButtonVisible = false;
        $scope.employee = dataItem;
    };

    $scope.updateEmployeeData = function() {

        $scope.modalWindow.close();
        $scope.notificationMessage.show('Record updated successfully', 'success');
    };

    $scope.deleteSelectedGridData = function(dataItem) {

        $scope.employeeDataSource.remove(dataItem);
        $scope.notificationMessage.show('Record deleted successfully', 'success');
    };

    init();
}]);
