var otpModule = angular.module('otpModule',[]);
otpModule.controller('otpController',['$rootScope','$scope','$location','getOtpListServiceProvide',function($rootScope,$scope,$location,getOtpListServiceProvide){

var otp_lists;
$scope.get_otp_term = function(){
    getOtpListServiceProvide({}).then ( function(response){
		$scope.otp_list = response.data.data;
		otp_lists = response.data;
		console.log(response.data);
	},function(response){
		console.log(response);
	})
};
 $scope.get_otp_term();
}]);
