var agingReportModule= angular.module('agingReportModule',[]);
agingReportModule.controller('agingReportController',['$rootScope','$scope','$location','$route','$filter','getAgingReportData',
    function($rootScope,$scope,$location,$route,$filter,getAgingReportData) {

    $scope.get_aging_report_data = function () {
        getAgingReportData({
            from_date : $scope.from_date,
            to_date: $scope.to_date
        }).then(function (resposne) {
            console.log(resposne);
            $scope.aging_data = resposne.data;
        });
    };
    $scope.get_aging_report_data();
    
}]);
