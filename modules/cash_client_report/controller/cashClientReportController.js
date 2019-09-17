cashClientReportModule= angular.module('cashClientReportModule',[]);
cashClientReportModule.controller('cashClientReportController',['$rootScope','$scope','$location','getCashClientReportData',function($rootScope,$scope,$location,getCashClientReportData){
	
$scope.CashClientReportData=function(){
	getCashClientReportData({
		from_date:$scope.from_date,
		to_date:$scope.to_date})
		.then(function(response){
			$scope.total_amount=0;
		console.log(response);
		$scope.cash_client_data=response.data.cashcasesheet;
		
				$scope.total_amount =response.data.total;
			
		
		
		//$scope.total_amount = $scope.total_amount;
		
	},function(response){
		console.log(response);
	})
};
	$scope.CashClientReportData();

}]);