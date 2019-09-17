awpTollReportModule= angular.module('awpTollReportModule',[]);
awpTollReportModule.controller('awpTollReportController',['$rootScope','$scope','$location','getAwpTollReportData','getServiceListing','getAwpLocationDetails',
	function($rootScope,$scope,$location,getAwpTollReportData,getServiceListing,getAwpLocationDetails){
	
$scope.awp_toll_report_data=function(){
	getAwpTollReportData({
		from_date:$scope.from_date,
		to_date:$scope.to_date,
		service_id: $scope.service_id,
		location_id: $scope.location_id
	})
		.then(function(response){
			$scope.total_amount=0;

			for(var i=0;i<response.data.length;i++){
				$scope.total_amount = (parseFloat($scope.total_amount) + parseFloat(response.data[i].total_toll_amount)).toFixed(2);

			}
		$scope.awp_toll_data=response.data;
		
		
		//$scope.total_amount = $scope.total_amount;
		
	},function(response){
		console.log(response);
	})
};
	$scope.awp_toll_report_data();

	$scope.get_service_details = function(){
            getServiceListing({
                type:'service'
            }).then(function (response) {
                $scope.service_details = response.data;
                console.log(response.data);
            },function (response) {
                console.log(response);
            })
        };
        $scope.get_service_details();
        
        $scope.get_location_details = function(){
            getAwpLocationDetails({}).then(function (response) {
                $scope.location_details = response.data;
                console.log(response.data);
            },function (response) {
                console.log(response);
            })
        };
        $scope.get_location_details();

}]);