angular.module('cms.company.service', [])

.service('CompanyService', ['$http', function ($http) {

    this.companyDataSource = null;

    this.getGridDataSource = function() {
        return this.companyDataSource;
    };

    this.refreshCompanyDataSource = function() {

        this.companyDataSource = new kendo.data.DataSource({
            transport: {
                /***************** Method 1 ****************/
                // read: {
                //     url: 'data/company-data.json',
                //     dataType: 'json'
                // }
                /***************** Method 2 ****************/
                read: function(options) {
                    $http.get('data/company-data.json').then(function(responseData) {
                        /***************** Method 1 ****************/
                        options.success(responseData.data);
                        /***************** Method 2 ****************/
                        // options.success({
                        //     recordsList: responseData.data
                        // });
                    });
                }
            },
            /***************** For Method 2 ****************/
            // schema: {
            //   data: 'recordsList'
            // },
            pageSize: 10
        });
    };

    this.resetCompanyDataSource = function() {
        if (this.companyDataSource) {
            this.companyDataSource.data([]);
        }
    };

    this.companyName = ['Object-frontier Softwares', 'TCS'];

    this.addCompanyName = function (name) {
        this.companyName.push(name);
    };

    this.getCompanyNames = function () {
        return this.companyName;
    };
}]);
