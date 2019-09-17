var fleetMaintenanceReportModule= angular.module('fleetMaintenanceReportModule',[]);
fleetMaintenanceReportModule.controller('fleetMaintenanceReportController',['$rootScope','$scope','$location','$route','$filter','getFleetMaintenanceReportData',
    function($rootScope,$scope,$location,$route,$filter,getFleetMaintenanceReportData) {

    

    $scope.get_maintenance_report_data = function () {
        getFleetMaintenanceReportData({
            from_date : $scope.from_date,
            to_date : $scope.to_date
        }).then(function (resposne) {
            console.log(resposne);
            $scope.fm_report_data = resposne.data;
        });
    };
    $scope.get_maintenance_report_data();

    
}]);
