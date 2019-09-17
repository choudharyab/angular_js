var policyDetailsModule= angular.module('policyDetailsModule',['ngBootbox']);
policyDetailsModule.controller('policyDetailsController',['$rootScope','$scope','$location','$route',
	'$filter','$window','getPolicyDetails','savePolicyDetails','getPolicyDetailsById','updatePolicyDetails',
    'commonService','getPolicyDetailsByIdForService','getPolicyServicesListing','generatePolicyPdf',
    'savePolicyServiceDetails','getPolicyServiceHistory','approvePolicyStatus',
function($rootScope,$scope,$location,$route,$filter,$window,getPolicyDetails,savePolicyDetails,getPolicyDetailsById,
	updatePolicyDetails,check_permission,getPolicyDetailsByIdForService,getPolicyServicesListing,
	generatePolicyPdf,savePolicyServiceDetails,getPolicyServiceHistory,approvePolicyStatus){

	$scope.policy_details = {};
	var policy_details_id,policy_rule_id,renew_policy_id,policy_approve_id;
	$('.loading').hide();

	$scope.policy_service_details = {};
	$scope.policy_service_details.additional = [{'service_type_id':'','no_of_service_allowed':'','service_provided':'0'}];
	$scope.add_btn_clicked = function(){
        // $scope.hide_to_date = true;
        $scope.hide_to_date = true;
		$scope.policy_details = {};
		$scope.hide_save = false;
		$scope.hide_update = true;
		$scope.policy_details.punch_date=$filter('date')(new Date(),'dd/MM/yyyy');
		var days = $scope.policy_details.punch_date.match(/\d/g);
		console.log(days);
		var date = $filter('date')(new Date());
		console.log(date);
		var from_date = new Date(date);
		var to_date = new Date(date);
		console.log(to_date.getFullYear()+1);
		from_date.setDate(from_date.getDate() + parseInt(3));
		//to_date.setDate(to_date.getFullYear() + parseInt(1));
		console.log(to_date.getFullYear());
		$scope.policy_details.validity_from_date = from_date.getDate()+ '/' +(from_date.getMonth()+1)+ '/' +from_date.getFullYear();
		$scope.policy_details.validity_to_date = to_date.getDate()+ '/' +(to_date.getMonth()+1)+ '/' +(to_date.getFullYear()+1);
	}

	$scope.get_policy_service_data = function(){
        getPolicyServicesListing({}).then(function(response){
            $scope.policy_service_listing = response.data;
        });
    }
    $scope.get_policy_service_data();

	$scope.get_policy_details = function(){
		$('.loading').show();
		getPolicyDetails({}).then(function(response){
			$('.loading').hide();
			$scope.policy_details_data = response.data;
		})
	}
	$scope.get_policy_details();

	$scope.save_policy_details = function(type){
		savePolicyDetails({
            policy_id: renew_policy_id,
            type: type,
			policy_details: $scope.policy_details
		}).then(function(response){
			$('#add_policy_details').modal('hide');
            $('#renew_policy_details').modal('hide');
			$scope.policy_details = {};
			$scope.get_policy_details();
			$('#fleetSuccess').fadeIn().delay(5000).fadeOut();
            if(type == 'save'){
                $scope.fleet_success = "Policy Added Successfully";
            }else if(type == 'renew'){
                $scope.fleet_success = "Policy Renewed Successfully";
            }
            
            $scope.fleet_error = "";
		},function(err){
			$scope.fleet_success = '';
            $('#fleetError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_error = 'Something Went Wrong...Please Try Again!!';
		});
	}

	$scope.get_policy_details_by_id = function(id){
		$scope.hide_save = true;
		$scope.hide_update = false;
        // $scope.hide_from_date = false;
        $scope.hide_to_date = false;
		policy_details_id = id;
		getPolicyDetailsById({
			id: id
		}).then(function(response){
			$scope.policy_details = response.data[0];
		});
	}

	$scope.get_policy_details_by_id_for_service = function(id,vehicle_type){
		getPolicyDetailsByIdForService({
			id: id,
			service_type: vehicle_type
		}).then(function(response){
			$scope.policy_service_details.service_type = response.data.service_type;
			$scope.policy_service_details = response.data;
            policy_rule_id = response.data.policy_rule_id;
            $scope.calc_total_service();
		});
	}

	$scope.update_policy_details = function(){
		updatePolicyDetails({
			id: policy_details_id,
			policy_details: $scope.policy_details
		}).then(function(response){
			$('#add_policy_details').modal('hide');
			$scope.get_policy_details();
			$scope.policy_details = {};
			$('#fleetSuccess').fadeIn().delay(5000).fadeOut();
            $scope.fleet_success = "Policy Updated Successfully";
            $scope.fleet_error = "";
		},function(err){
			$scope.fleet_success = '';
            $('#fleetError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_error = 'Something Went Wrong...Please Try Again!!';
		})
	}

	$scope.current_modal = "policy";
    $scope.policy_details_permission_popup = function (cm_id,cm_status,cm_type) {
        check_permission.check_status(cm_id,cm_status,cm_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object = {};
    };

    $scope.generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };

    $scope.$on('CallParentMethod', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.get_policy_details();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.get_policy_details_by_id(data.id);
            $('#add_policy_details').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_policy_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
                $scope.fleet_success = "Policy Deleted Successfully";
            }
        }
    });

    $scope.calc_total_service = function(index){
    	var t = 0;
        if(index != null){
            if($scope.policy_service_details.additional[index].service_provided > $scope.policy_service_details.additional[index].no_of_service_allowed){
            alert('Only ' +$scope.policy_service_details.additional[index].no_of_service_allowed+ ' Service/s are allowed');
            $scope.policy_service_details.additional[index].service_provided = '';
        }
        }
    	
    	for(var i=0;i<$scope.policy_service_details.additional.length;i++){
    		t = parseFloat(t) + parseFloat($scope.policy_service_details.additional[i].service_provided);
    	}
    	if(t > 4){
    		alert('Already 4 services has been provided, No more services allowed');
            $('#add_policy_service_details').modal('hide');
    	}else{
    		$scope.policy_service_details.total_services_provided = t;
    	}
    }

    $scope.generate_policy_pdf = function (id) {
        $('.loading').show();
        generatePolicyPdf({
            id:id
            }).then(function (response) {
               console.log(response)
              var file_name= JSON.parse(response.data);
                $window.open('wheelsonroadserver/invoices/'+file_name+'.pdf');
                $('.loading').hide();
            },function (res) {
                console.log(res);
            })
       
    };

    $scope.save_policy_service_details = function(){
    	savePolicyServiceDetails({
    		policy_service_details: $scope.policy_service_details
    	}).then(function(response){
    		$('#add_policy_service_details').modal('hide');
    		$scope.policy_service_details = {};
    		$scope.policy_service_details.additional = [{'service_type_id':'','no_of_service_allowed':'','service_provided':'0'}];
    	});
    }

    $scope.renew_policy_details_clicked = function(id,status){
        console.log(status);
        $scope.renew_title = 'Renew Policy';
        if(status == 'non_renew'){
            $scope.renew_msg='Do you want to renew thi policy?';
            $scope.hide_yes = false;
            getPolicyDetailsById({
            id: id
            }).then(function(response){
                $scope.policy_details = response.data[0];
                renew_policy_id = $scope.policy_details.id;
                delete $scope.policy_details.id;
                delete $scope.policy_details.created_at;
                delete $scope.policy_details.updated_at;
                $scope.policy_details.punch_date=$filter('date')(new Date(),'dd/MM/yyyy');
                var days = $scope.policy_details.punch_date.match(/\d/g);
                console.log(days);
                var date = $filter('date')(new Date());
                console.log(date);
                var from_date = new Date(date);
                var to_date = new Date(date);
                console.log(to_date.getFullYear()+1);
                from_date.setDate(from_date.getDate() + parseInt(3));
                //to_date.setDate(to_date.getFullYear() + parseInt(1));
                console.log(to_date.getFullYear());
                $scope.policy_details.validity_from_date = from_date.getDate()+ '/' +(from_date.getMonth()+1)+ '/' +from_date.getFullYear();
                $scope.policy_details.validity_to_date = to_date.getDate()+ '/' +(to_date.getMonth()+1)+ '/' +(to_date.getFullYear()+1);
            });
        }else{
            $scope.hide_yes = true;
            $scope.renew_msg='This policy has been renewed';
        }
        
    }

    $scope.get_policy_service_history = function(id){
        getPolicyServiceHistory({
            policy_rule_id: policy_rule_id,
            service_type_id: id
        }).then(function(response){
            $scope.service_history = response.data;
        })
    }

    $scope.check_approve = function (id,approve_status) {
        policy_approve_id=id;
        $scope.heading_msg='Approve';
        if(approve_status=='deactivated' || approve_status==''){

            $scope.check_approve_msg = "Do you want to approve this policy?";
            $('#approve_msg').modal('show');
            $scope.approve_btn = true;
            $scope.hide_app=true;
        }else{
            $scope.check_approve_msg = "Do you want to dis-approve this policy ?";
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=false;
            //$scope.check_approve_msg = "Already approved";
        }
    };

    $scope.approve = function (tt) {
        $('.loading').show();
        approvePolicyStatus({
            id:policy_approve_id
        }).then(function(response){
            $('.loading').hide();
            console.log(response);
            $scope.get_policy_details();
            $scope.close_add_product();
            $scope.otp_modal_dismiss();
        },function(response){
            console.log(response);

        });
    };

}]);