var cancelCaseManagementModule= angular.module('cancelCaseManagementModule',['ngBootbox']);
cancelCaseManagementModule.controller('cancelledCaseManagementController',['$rootScope','$scope','$location','$route','$timeout',
    '$filter','$window','getClientList','getServiceList','cancelledListingService',function($rootScope,$scope,$location,$route,$timeout,$filter,$window,getClientList,getServiceList,cancelledListingService,
             ){
    console.log('controller called');
    console.log($rootScope.current_module_rights);
    console.log(localStorage.getItem('warehouse_state_id'));
  
    $('.loading').hide();
    /*$scope.add_more_charges=function () {
        console.log('function called');
        $scope.case_details.charges_details.push({'charge_id':'','charge_amt':'','tax_rate':'','tax_total':'','total_charge':''});
    };*/

  
   
    $scope.get_case_details_list = function(){
        cancelledListingService({}).then(function (response) {
            $scope.cancel_case_details_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_case_details_list();



  
	  
}]);