var fleetAvailabilityModule= angular.module('fleetAvailabilityModule',[]);
fleetAvailabilityModule.controller('fleetAvailabilityController',['$rootScope','$scope','$location','$route','getLocationListing','getAvailableFleetListing',
    'getAllocatedFleetListing','commonService',
    function($rootScope,$scope,$location,$route,getLocationListing,getAvailableFleetListing,getAllocatedFleetListing,check_permission) {

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();

    $scope.get_available_fleet_details = function(id){
        getAvailableFleetListing({
            location_id:id
        }).then(function (response) {
            $scope.available_fleet_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_available_fleet_details();

    $scope.get_allocated_fleet_details = function(id){
        getAllocatedFleetListing({
            location_id:id
        }).then(function (response) {
            $scope.allocated_fleet_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_allocated_fleet_details();

    $scope.get_locationwise_details=function(id){
        $scope.get_available_fleet_details(id);
        $scope.get_allocated_fleet_details(id);
    }

}]);