angular.module('cms.company.controller', ['kendo.directives', 'ui.bootstrap'])

.controller('companyController', ['$scope', 'RegionListService', 'CompanyService', 'SessionService', '$state', '$http', function($scope, RegionListService, CompanyService, SessionService, $state, $http) {

    var init = function() {

        $scope.isFormButtonVisible = true;
        $scope.company             = {};
        $scope.regionList          = [];
        $scope.deleteData          = [];

        SessionService.getCurrentSession();

        $scope.initialCompanyDataSource = new kendo.data.DataSource({
            pageSize: 1
        });
    };

    $scope.openWindow = function() {
        $scope.modalWindow.open();
    };

    $scope.windowOnClose = function() {
        $scope.confirmWindow.open().center();
    };

    var companyDataSource = null;

    $scope.getCompanyDataSource = function() {
        companyDataSource = CompanyService.getGridDataSource();
        return companyDataSource ? companyDataSource : $scope.initialCompanyDataSource;
    };

    $scope.loadData = function() {
        return CompanyService.refreshCompanyDataSource();
    };

    $scope.resetData = function() {
        CompanyService.resetCompanyDataSource();
    };

    $scope.onCancelClick = function() {
        alert('cancel clicked');
        $state.go('home.employee');
    };

    //http://www.telerik.com/forums/grid-programmatically-select-row-by-dataitem-values----when-the-item-is-not-on-the-current-grid-page-
    $scope.selectGridRow = function() {

        var grid = $('#companyKendoGrid').data('kendoGrid');
        var dataItem = {
            "companyName": "Altimetrik"
        };
        // var rowToSelect = grid.dataSource.data();
        highlightGridRowDataItem(grid, dataItem);
    };

    function highlightGridRowDataItem(theGrid, dataItem) {

        var ds = theGrid.dataSource;
        var view = kendo.data.Query.process(ds.data(), {
                        filter: ds.filter(),
                        sort: ds.sort()
                    }).data;

        // var view = companyDataSource.data();
        var index = -1;
        for (var x = 0; x < view.length; x++) {
            if (view[x].companyName == dataItem.companyName) {
                index = x;
                break;
            }
        }

        if (index === -1) {
            return;
        }

        var page = Math.floor(index / theGrid.dataSource.pageSize());
        var targetIndex = index - (page * theGrid.dataSource.pageSize()) + 1;

        theGrid.dataSource.page(++page);

        var row = theGrid.element.find("tr:eq(" + targetIndex + ")");
        theGrid.select(row);
        row[0].scrollIntoView();
    }

    //http://jsfiddle.net/BSQyd/light/

    // $('.pager').kendoPager({
    //     dataSource: $scope.companyDataSource,
    //     messages: {
    //         page: 'Go to Page:',
    //         display: 'Showing {0} to {1} | {2} <button class="btn btn-primary">Cancel</button>'
    //     },
    //     numeric: false,
    //     input: true
    // }).data('kendoPager');

    // ((grid.pager.page() - 1) * grid.pager.pageSize() + 1)
    // var totalPages              = grid.pager.totalPages();
    // var recordsDisplayedPerPage = grid.tbody.find('>tr').length;

    $scope.selectedGridItem = function(dataItem) {

        // loanSearchDataSource
        // for (var index = 0; index < list.searchResult.data.rows.length; index++) {
        //     list.searchResult.data.rows[index]['rowNumber'] = index;
        // }

        // var grid              = $('#companyKendoGrid').data('kendoGrid');
        // var currentRowIndex   = grid.items().index(grid.select()) + 1;
        // var pageSize          = grid.pager.pageSize();
        // var currentPageNumber = grid.pager.page();
        // var totalRecords      = grid.dataSource.total();
        //
        // var customPagerInfo =  '<span class="k-pager-info k-label">' +
        //                        'Showing ' + currentRowIndex +
        //                        ' to ' + Math.min(currentPageNumber * pageSize, totalRecords) +
        //                        ' of ' + totalRecords +
        //                        '</span>';
        // grid.wrapper.find('.k-pager-info').replaceWith(customPagerInfo);
    };

    $scope.clearFormData = function() {

        var defaultForm = {
            city:        '',
            state:       '',
            country:     ''
        };
        $scope.company = angular.copy(defaultForm);
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

    $scope.insertCompanyData = function() {

        $scope.companyDataSource.add($scope.company);
        CompanyService.addCompanyName($scope.company.companyName);
        $scope.clearFormData();
        $scope.modalWindow.close();
        $scope.notificationMessage.show('Record inserted successfully', 'success');
    };

    $scope.getSelectedRowData = function(dataItem) {

        $scope.openWindow();
        $scope.isFormButtonVisible = false;
        $scope.company             = dataItem;
    };

    $scope.updateCompanyData = function() {

        $scope.modalWindow.close();
        $scope.notificationMessage.show('Record updated successfully', 'success');
    };

    $scope.checkConfirmation = function(userRequest) {

        if (userRequest === 'no') {

            $scope.confirmWindow.close();
            return;
        }

        $scope.companyDataSource.remove($scope.deleteData);
        $scope.notificationMessage.show('Record deleted successfully', 'success');
        $scope.confirmWindow.close();
    };

    $scope.deleteSelectedGridData = function(dataItem) {

        $scope.confirmWindow.open().center();
        $scope.deleteData = dataItem;
    };

    $scope.searchGridData = function($event) {

        if ($event.keyCode == 13) {
            companyDataSource.filter({ field: 'companyName', value: $event.target.value, operator: 'contains' });
        }
    };

    init();
}]);
