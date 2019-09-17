overallCaseReportModule= angular.module('overallCaseReportModule',[]);
overallCaseReportModule.controller('overallCaseReportController',['$rootScope','$scope','$location','getCaseReportData','getWarehouseDetailsService',
function($rootScope,$scope,$location,getCaseReportData,getWarehouseDetailsService){
	
	
	getWarehouseDetailsService({}).then(function (response) {
        $scope.company_list = response.data;
    });
    
$scope.getOverallCaseData=function(){
	getCaseReportData({
	    fromdate:$scope.from_date,
	    todate:$scope.to_date,
	    company_id:$scope.company_id
	}).then(function(response){
		console.log(response);
		$scope.case_data=response.data.case_data;
		$scope.closed_cases=parseInt(response.data.approvesheet)+parseInt(response.data.closed_case)+parseInt(response.data.cashcasesheet)+parseInt(response.data.disputedsheet);
		$scope.punched_cases=parseInt(response.data.ETAsheet)+parseInt(response.data.approvesheet)+parseInt(response.data.closed_case)+parseInt(response.data.cashcasesheet)+parseInt(response.data.disputedsheet);
		$scope.count_data = response.data;
	},function(response){
		console.log(response);
	})
};
	$scope.getOverallCaseData();
	
	

}]);