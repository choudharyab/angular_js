var clientwiseTotalCaseReportModule= angular.module('clientwiseTotalCaseReportModule',[]);
clientwiseTotalCaseReportModule.controller('clientwiseReportController',['$rootScope','$scope','$location','$route','$filter','getClientWiseTotalCaseReport',
'getClientWiseTotalCaseDetails',
    function($rootScope,$scope,$location,$route,$filter,getClientWiseTotalCaseReport,getClientWiseTotalCaseDetails) {

    
    $scope.get_client_wise_total_case_data = function () {
        getClientWiseTotalCaseReport({}).then(function (response) {
            console.log(response);
            $scope.total_punched_cases = 0;
            $scope.total_closed_cases = 0;
            $scope.total_cases_for_inv = 0;
            $scope.total_inv = 0;
            
            for(var i=0;i<response.data.length;i++){
                $scope.total_punched_cases = parseFloat(response.data[i].case_punched) + parseFloat($scope.total_punched_cases);
                $scope.total_closed_cases = parseFloat(response.data[i].case_closed) + parseFloat($scope.total_closed_cases);
                $scope.total_cases_for_inv = parseFloat(response.data[i].case_invoice_raised) + parseFloat($scope.total_cases_for_inv);
                $scope.total_inv = parseFloat(response.data[i].total_invoice_raised) + parseFloat($scope.total_inv);
            }
            $scope.client_case_data = response.data;
        });
    };
    $scope.get_client_wise_total_case_data();

    $scope.get_client_wise_case_details = function (id) {
        getClientWiseTotalCaseDetails({
            client_id : id
        }).then(function (response) {
            console.log(response);
            // $scope.total_punched_cases = 0;
            // $scope.total_closed_cases = 0;
            // $scope.total_cases_for_inv = 0;
            // $scope.total_inv = 0;
            
            // for(var i=0;i<response.data.length;i++){
            //     $scope.total_punched_cases = parseFloat(response.data[i].case_punched) + parseFloat($scope.total_punched_cases);
            //     $scope.total_closed_cases = parseFloat(response.data[i].case_closed) + parseFloat($scope.total_closed_cases);
            //     $scope.total_cases_for_inv = parseFloat(response.data[i].case_invoice_raised) + parseFloat($scope.total_cases_for_inv);
            //     $scope.total_inv = parseFloat(response.data[i].total_invoice_raised) + parseFloat($scope.total_inv);
            // }
            $scope.client_case_details = response.data;
        });
    };
    

    
}]);
