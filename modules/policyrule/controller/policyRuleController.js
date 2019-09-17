var policyRuleModule= angular.module('policyRuleModule',['ngBootbox']);
policyRuleModule.controller('policyRuleController',['$rootScope','$scope','$location','$route',
    'getPolicyServicesListing','savePolicyServices','getPolicyServiceDetailsById','updatePolicyServices',
    'commonService','getPolicyRuleListing','savePolicyRule','getPolicyRuleDetailsById','updatePolicyRule',
function($rootScope,$scope,$location,$route,getPolicyServicesListing,savePolicyServices,
    getPolicyServiceDetailsById,updatePolicyServices,check_permission,getPolicyRuleListing,savePolicyRule,
    getPolicyRuleDetailsById,updatePolicyRule){
    $scope.policy_rule = {};
     $scope.service_allowed = [{'n':'1'},{'n':'2'},{'n':'3'},{'n':'4'},{'n':'5'},{'n':'6'},{'n':'7'},{'n':'8'},{'n':'9'},{'n':'10'}];
    

    $scope.policy_rule.additional = [{'service_type_id':'','no_of_service_allowed':'','policy_detail':''}];

    $scope.add_more_additional_services = function(){
        $scope.policy_rule.additional.push({'service_type_id':'','no_of_service_allowed':'','policy_detail':''});
    }

    $scope.remove_additional_services = function(index){
        $scope.policy_rule.additional.splice(index,1);
    }
    $scope.add_service_btn_clicked = function(){
        $scope.service_name = '';
        $scope.hide_save = false;
        $scope.hide_edit = true;
    }

    $scope.add_rule_btn_clicked = function(){
        $scope.policy_rule = {};
        $scope.policy_rule.additional = [{'service_type_id':'','no_of_service_allowed':'','policy_detail':''}];
        $scope.hide_save_1 = false;
        $scope.hide_edit_1 = true;
    }

    $scope.get_policy_service_data = function(){
        getPolicyServicesListing({}).then(function(response){
            $scope.policy_service_listing = response.data;
        });
    }
    $scope.get_policy_service_data();

    $scope.save_policy_service = function(){
        savePolicyServices({
            service_name: $scope.service_name
        }).then(function(response){
            $scope.get_policy_service_data();
            $scope.service_name = '';
            $('#add_services').modal('hide');
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Service Added Successfully";
            $scope.service_error = "";
        },function(err){
            $scope.service_success = '';
            $('#serviceError').fadeIn().delay(5000).fadeOut();
            $scope.service_error = response.data.error[0];
        })
    }

    $scope.get_policy_service_data_by_id = function(id){
        getPolicyServiceDetailsById({
            id: id
        }).then(function(response){
            $scope.service_name = response.data[0].service_name;
        })
    }

    $scope.update_policy_service_data = function(){
        updatePolicyServices({
            id: policy_service_id,
            service_name: $scope.service_name
        }).then(function(response){
            $scope.get_policy_service_data();
            $scope.service_name = '';
            $('#add_services').modal('hide');
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Service Updated Successfully";
            $scope.service_error = "";
        },function(err){
            $scope.service_success = '';
            $('#serviceError').fadeIn().delay(5000).fadeOut();
            $scope.service_error = response.data.error[0];
        })
    }

    $scope.service_permission_popup = function (s_id,s_status,s_type) {
        $scope.current_modal="policy_service";
        check_permission.check_status(s_id,s_status,s_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object = {};
    };

    $scope.service_rule_permission_popup = function (sr_id,sr_status,sr_type) {
        $scope.current_modal="policy_rule";
        check_permission.check_status(sr_id,sr_status,sr_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object = {};
    };

    $scope.generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
        $scope.get_policy_rule_data();
        $scope.get_policy_service_data();
    };

    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };

    $scope.$on('updateListing', function (event, data) {
        if(data.model=="policy_service"){
            $scope.action_type = data.type;
            $scope.get_policy_service_data();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
                $scope.service_success = 'Service Deleted Successfully';
            }
        }else if(data.model=="policy_rule"){
            $scope.action_type = data.type;
            $scope.get_policy_rule_data();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
                $scope.service_success = 'Rule Deleted Successfully';
            }
        }
    });

    $scope.$on('CallParentMethod', function (event, data) {
        if(data.model=="policy_service"){
            $scope.action_type = data.type;
            $scope.get_policy_service_data();
            $scope.modal_dismiss_two();
            $scope.get_policy_service_data_by_id(data.id);
            $('#add_services').modal('show');
        }else if(data.model=="policy_rule"){
            $scope.action_type = data.type;
            $scope.get_policy_rule_data();
            $scope.modal_dismiss_two();
            $scope.get_policy_rule_data_by_id(data.id);
            $('#add_services_rules').modal('show');
        }
    });

    $scope.get_policy_rule_data = function(){
        getPolicyRuleListing({}).then(function(response){
            $scope.policy_rule_listing = response.data;
        });
    }
    $scope.get_policy_rule_data();

    $scope.save_policy_rule = function(){
        savePolicyRule({
            policy_rule: $scope.policy_rule
        }).then(function(response){
            $scope.get_policy_rule_data();
            $scope.policy_rule = {};
            $scope.policy_rule.additional = [{'service_type_id':'','no_of_service_allowed':'','policy_detail':''}];
            $('#add_services_rules').modal('hide');
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Rule Added Successfully";
            $scope.service_error = "";
        },function(err){
            $scope.service_success = '';
            $('#serviceError').fadeIn().delay(5000).fadeOut();
            $scope.service_error = response.data.error[0];
        })
    }

    $scope.get_policy_rule_data_by_id = function(id){
        $scope.hide_save_1 = true;
        $scope.hide_edit_1 = false;
        policy_rule_id = id;
        getPolicyRuleDetailsById({
            id: id
        }).then(function(response){
            $scope.policy_rule = response.data[0];
        })
    }

    $scope.update_policy_rule_data = function(){
        updatePolicyRule({
            id: policy_rule_id,
            policy_rule: $scope.policy_rule
        }).then(function(response){
            $scope.get_policy_rule_data();
            $scope.policy_rule = {};
            $scope.policy_rule.additional = [{'service_type_id':'','no_of_service_allowed':'','policy_detail':''}];
            $('#add_services_rules').modal('hide');
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Rule Updated Successfully";
            $scope.service_error = "";
        },function(err){
            $scope.service_success = '';
            $('#serviceError').fadeIn().delay(5000).fadeOut();
            $scope.service_error = response.data.error[0];
        })
    }
}]);