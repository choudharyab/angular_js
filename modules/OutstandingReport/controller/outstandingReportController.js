var outstandingReportModule= angular.module('outstandingReportModule',[]);
outstandingReportModule.controller('outstandingReportController',['$rootScope','$scope','$location','$route','$filter','getOutstandingData',
    function($rootScope,$scope,$location,$route,$filter,getOutstandingData) {

    
    $scope.get_outstanding_report_data = function () {
        getOutstandingData({
            from_date : $scope.from_date,
            to_date : $scope.to_date
        }).then(function (response) {
            console.log(response);
            $scope.total_payable_total = 0;
            $scope.total_amount = 0;
            for(var i=0;i<response.data.length;i++){
                response.data[i].payable_amount = parseFloat(response.data[i].total_amount) - parseFloat(response.data[i].paidamount);
                $scope.total_payable_total = parseFloat($scope.total_payable_total) + parseFloat(response.data[i].payable_amount);
                $scope.total_amount = parseFloat($scope.total_amount) + parseFloat(response.data[i].total_amount)
            }
            $scope.total_payable_total = $scope.total_payable_total.toFixed(2);
            $scope.total_amount = $scope.total_amount.toFixed(2);
            $scope.outstanding_data = response.data;
        });
    };
    $scope.get_outstanding_report_data();

    
}]);
