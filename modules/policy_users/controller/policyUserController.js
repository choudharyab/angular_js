var policyUserModule= angular.module('policyUserModule',['ngBootbox']);
policyUserModule.controller('policyUserController',['$rootScope','$scope','$location','$route',
    'getPolicyUserDetailsService','savePolicyUserService','editPolicyUserService','getPolicyUserById',
    'commonService',
    function($rootScope,$scope,$location,$route,getPolicyUserDetailsService,
        savePolicyUserService,editPolicyUserService,
        getPolicyUserById,check_permission){


	$scope.active_lable = false;
    $scope.details = {};
    $('.loading').hide();
    var warehouse_list;
    var edit_state_id;
    $scope.comment ={};
    $scope.otp_object = {};
	$scope.warehouse_title = "Add New Policy User";
    var policy_id;
    $scope.add_policy_user_buttton = function () {
        $scope.details = {};
        $scope.warehouse_success = '';
        $scope.warehouse_error = '';
        $scope.show_save = false;
        $scope.show_edit = false;
		$route.reload();
       
		
    };
    $scope.get_policy_user_details = function(){
        getPolicyUserDetailsService({}).then(function (response) {
            $scope.policy_user_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_policy_user_details();

    $scope.save_policy_user = function () {
    $('.loading').show();
        savePolicyUserService({
            policy_user:$scope.details
        }).then(function (response) {
            $('.loading').hide();
            $scope.details = {};
            $scope.dismiss();
            $scope.get_policy_user_details();
            $('#warehouseSuccess').fadeIn().delay(5000).fadeOut();
            $scope.warehouse_success = "Policy User Added Successfully";
            //$route.reload();
        },function (response) {
            $('#warehouseError').fadeIn().delay(5000).fadeOut();
            $scope.warehouse_error = 'Something Went Wrong...Please Try Again';
        })
    };
    $scope.get_policy_user_details_by_id = function (wh_id) {
        policy_id = wh_id;
        getPolicyUserById({id:wh_id}).then(function (response) {
            console.log(response);
            $scope.details = response.data[0];
            $scope.auto_country=response.data[0].country;
            edit_state_id = response.data[0].state;
            $scope.state_id=response.data[0].state.id;
            $scope.details.state_id=response.data[0].state.id;
            $scope.get_state_list();
            $scope.details.state_id = response.data[0].state.id;
            $('#example2').modal('show');
            $scope.warehouse_title = "Edit Company Details";
            $scope.active_lable = true;
            $scope.show_save = true;
            $scope.show_edit = true;
        },function (response) {
            console.log(response);
        });
        $scope.show_save = true;
        $scope.show_edit = true;
    };
    $scope.edit_policy_user = function () {
        $('.loading').show();
        editPolicyUserService({
            policy_user:$scope.details,
            id:policy_id
        }).then(function (response) {
            $scope.get_policy_user_details();
            $scope.dismiss();
            $('.loading').hide();
			 $scope.warehouse_title = "Add Warehouse";
            $('#warehouseSuccess').fadeIn().delay(5000).fadeOut();
            $scope.warehouse_success = JSON.parse(response.data);
            $scope.details = {};
            $scope.warehouse_id = '';
        },function (response) {
            $scope.warehouse_success = "";
            $('#warehouseError').fadeIn().delay(5000).fadeOut();
            if(response.data.code==401){
                $scope.warehouse_error = response.data.error;
            }else{
                $scope.warehouse_error = response.data.error[0];
            }
        })
    };

    $scope.current_modal = "policy_user";
    $scope.warehouse_permission_popup = function (wh_id,wh_status,wh_type) {
        check_permission.check_status(wh_id,wh_status,wh_type,$scope.current_modal);
        $scope.comment ={};
    };
    $scope.generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            console.log(data);
            $scope.get_policy_user_details();
            if(data.otp){
                $('#wh_delete').fadeIn().delay(5000).fadeOut();
                $scope.delete_warehouse_msg = 'Policy User deleted Successfully';
            }
        }
    });
    $scope.$on('CallParentMethod', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.warehouse_id = data.id;
            $scope.get_policy_user_details();
            $scope.get_policy_user_details_by_id(data.id);
            $('#example2').modal('show');
        }
    });

   

}]);



