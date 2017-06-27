angular.module('cms.regionlist.service', [])

.service('RegionListService', ['$http', function ($http) {

    this.getRegionList = function() {
        return $http.get('data/region-data.json');
    };

    // var regionList = {};
    //
    // $http.get('data/region-data.json')
    //     .success(function(responseData) {
    //
    //         regionList = responseData;
    //     })
    //     .error(function(){
    //         console.log('url not found');
    //     });
    //
    // this.getCountryList = function() {
    //     return regionList.state;
    // };
    //
    // this.getStateList = function() {
    //     return regionList.state;
    // };
    //
    // this.getCityList = function() {
    //     return regionList.city;
    // };
}]);
