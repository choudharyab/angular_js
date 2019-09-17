var customerStatusModule = angular.module('customerStatusModule',[]);
customerStatusModule.controller('customerStatusController',['$rootScope','$scope','$location','$route','$routeParams','getCustomerStatusService','blockCustomerService',
    function($rootScope,$scope,$location,$route,$routeParams,getCustomerStatusService,blockCustomerService){
        console.log('controller called');
    $scope.get_customer_status_details=function(){
        getCustomerStatusService({}).then(function (response) {
            console.log('!!!!!!!!!!!!',response.data.cheque_details_results);
            $scope.customer_list=response.data;
        });
    };
    $scope.get_customer_status_details();

    $scope.block_customer=function(id){
        blockCustomerService({
            id:id
        }).then(function (response) {
            console.log(response);
        });
    }

    var cust_id;
    $scope.block_customer = function (id,approve_status) {
        cust_id=id;
        $scope.heading_msg='Block';
        if(approve_status=='unblock'){

            $scope.check_approve_msg = "Do you want to block this customer ?";
            //$scope.pi_product_id = pro_id;

            $('#approve_msg').modal('show');
            $scope.approve_btn = true;
        }else{
            $scope.check_approve_msg = "Do you want to unblock this customer ?";
            $('#approve_msg').modal('show');
            $scope.approve_btn = true;
            //$scope.check_approve_msg = "Already approved";
        }
    };

    $scope.block = function () {
        blockCustomerService({
            id:cust_id
        }).then(function(response){
            console.log(response);
            $scope.get_customer_status_details();
            $scope.close_add_product();
        },function(response){
            console.log(response);

        });
    };

}]);