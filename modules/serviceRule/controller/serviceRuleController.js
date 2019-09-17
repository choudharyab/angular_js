var serviceRuleModule= angular.module('serviceRuleModule',['ngBootbox']);
serviceRuleModule.controller('serviceRuleController',['$rootScope','$scope','$location','$route','getServicesListing','saveServices',
'getServiceDetailsById','updateServices','getServiceRuleListing','getClientDetails','saveServicesRules','getServiceRuleDetailsById',
'updateServiceRules','commonService','getClientLocationByClientId',
function($rootScope,$scope,$location,$route,getServicesListing,saveServices,getServiceDetailsById,updateServices,getServiceRuleListing,
    getClientDetails,saveServicesRules,getServiceRuleDetailsById,updateServiceRules,check_permission,getClientLocationByClientId){

    var ser_id,client_list;
    $scope.rule={};
    $scope.hide_save=false;
    $scope.hide_edit=true;
    $scope.hide_save_1=false;
    $scope.hide_edit_1=true;
    
    $scope.add_service_btn_clicked=function () {

        // if(localStorage.getItem('warehouse_id')==''){
        //     alert('Please select company first');
        // }else{
        //     $scope.hide_save=false;
        //     $scope.hide_edit=true;
        //     $scope.service_name='';
        //     $route.reload();
        //     $('#add_services').modal('show');
        // }
        $route.reload();
        $scope.hide_save=false;
        $scope.hide_edit=true;
        $scope.service_name='';
        //document.getElementById("s_id").focus();
        
        //$('#add_services').modal('show');
      
    };

    $scope.get_service_details = function(){
        getServicesListing({
            type:'service'
        }).then(function (response) {
            $scope.service_details = response.data;
            //warehouse_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_service_details();

    $scope.save_service=function (type) {

        saveServices({
            service_name:$scope.service_name,
            company_id:localStorage.getItem('warehouse_id'),
            type:type
        }).then(function (response) {
            $scope.service_name='';
            $scope.dismiss();
            $scope.get_service_details();
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Service Added Successfully";
            $scope.service_error = "";
        },function (response) {
            //alert(response.data+'\n Please try again');
            $scope.service_success = '';
            $('#serviceError').fadeIn().delay(5000).fadeOut();
            $scope.service_error = response.data.error[0];
        })
    };

    $scope.edit_services=function(id){
        ser_id=id;
        $scope.hide_save=true;
        $scope.hide_edit=false;
        getServiceDetailsById({
            id:id,
            type:'service'
        }).then(function (response) {
            $scope.service_details_by_id = response.data[0];
            //warehouse_list = response.data;
            $scope.service_name=$scope.service_details_by_id.service_name;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };

    $scope.update_service=function () {
        updateServices({
            service_id:ser_id,
            service_name:$scope.service_name,
            type:'service'
        }).then(function (response) {
            $scope.service_name='';
            $scope.dismiss();
            $scope.get_service_details();
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Service Updated Successfully";
            $scope.service_error = "";
        },function (response) {
            //alert(response.data+'\n Please try again');
            $scope.service_success = '';
            $('#serviceError').fadeIn().delay(5000).fadeOut();
            $scope.service_error = response.data.error[0];
        })
    };
    //$scope.current_modal = "service";

    $scope.service_permission_popup = function (s_id,s_status,s_type) {
        $scope.current_modal="services";
        check_permission.check_status(s_id,s_status,s_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object = {};
    };

    $scope.service_rule_permission_popup = function (sr_id,sr_status,sr_type) {
        $scope.current_modal="service_rule";
        check_permission.check_status(sr_id,sr_status,sr_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object = {};
    };

    $scope.generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
        $scope.get_service_rule_details();
    };

    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };

    $scope.$on('updateListing', function (event, data) {
        if(data.model=="services"){
            $scope.action_type = data.type;
            console.log(data);
            $scope.get_service_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
                $scope.service_success = 'Service deleted Successfully';
            }
        }else if(data.model=="service_rule"){
            $scope.action_type = data.type;
            console.log(data);
            $scope.get_service_rule_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
                $scope.service_success = 'Service Rule deleted Successfully';
            }
        }
    });

    $scope.$on('CallParentMethod', function (event, data) {
        if(data.model=="services"){
            $scope.action_type = data.type;
            $scope.get_service_details();
            $scope.modal_dismiss_two();
            $scope.edit_services(data.id);
            $('#add_services').modal('show');
        }else if(data.model=="service_rule"){
            $scope.action_type = data.type;
            $scope.get_service_rule_details();
            $scope.modal_dismiss_two();
            $scope.edit_service_rule(data.id);
            $('#add_services_rules').modal('show');
        }
    });

    $scope.get_service_rule_details = function(){
        getServicesListing({
            type:'rule'
        }).then(function (response) {
            $scope.service_rule_details = response.data;
            //warehouse_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_service_rule_details();

    $scope.get_client_details = function(){
        getClientDetails({}).then(function (response) {
            $scope.client_details = response.data;
            client_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_client_details();

    /*$scope.find_above_initial=function () {

    }*/

    $scope.add_rule_btn_clicked=function () {
        // if(localStorage.getItem('warehouse_id')==''){
        //     alert('Please select company first');
        // }else{
        //     $scope.hide_save_1=false;
        //     $scope.hide_edit_1=true;
        //     $scope.rule={};
        //     $route.reload();
        //     $('#add_services_rules').modal('show');
        // }
        $scope.hide_save_1=false;
        $scope.hide_edit_1=true;
        $scope.rule={};
        $route.reload();
    };
    $scope.get_client_wise_rules=function(client){
        console.log(client);
        
        //console.log($scope.client_data.id);
        
        if(client=='cash')
        {
            $scope.rule.client_id=client;
            $scope.rule.client_name='Cash Client';
        }else{
            $scope.client_data=JSON.parse(client);
            $scope.rule.client_name=$scope.client_data.client_name;
            $scope.rule.client_id=$scope.client_data.id;
        }

        getClientLocationByClientId({
            client_id:$scope.rule.client_id
        }).then(function (response) {
            
            $scope.client_location_details = response.data;
            console.log()
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
        $scope.set_location_id($scope.client_location);
       
    }

    $scope.save_service_rules=function(type){
        //$scope.rule.service_id=$scope.service_id;
        $scope.rule.company_id=localStorage.getItem('warehouse_id');
        saveServices({
            rule:$scope.rule,
            type:type
        }).then(function (response) {
            $scope.rules={};
            $scope.service_id='';
            $scope.dismiss_modal_one();
            $scope.get_service_rule_details();
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Service Rules Added Successfully";
            $scope.service_rule_error = "";
        },function (response) {
            //alert(response.data+'\n Please try again');
            $scope.service_success = '';
            $('#serviceRuleError').fadeIn().delay(5000).fadeOut();
            $scope.service_rule_error = response.data[0];
        })
    };
    $scope.edit_service_rule=function(id){
        ser_rule_id=id;
        $scope.hide_save_1=true;
        $scope.hide_edit_1=false;
        getServiceRuleDetailsById({
            id:id,
            type:'rule'
        }).then(function (response) {
            $scope.service_rule_details_by_id = response.data[0];
            //warehouse_list = response.data;
            $scope.rule.client_id=response.data[0].client_id;
            $scope.rule.charges_above_initials_km=response.data[0].charges_above_initials_km;
            $scope.rule.charges_initials_km=response.data[0].charges_initials_km;
            $scope.rule.initials_km=response.data[0].initials_km;
            $scope.rule.client_id=response.data[0].client_id;
            $scope.rule.client_name=response.data[0].client_name;
            $scope.rule.service_id=response.data[0].service_id;
            getClientLocationByClientId({
                client_id:response.data[0].client_id
            }).then(function (response) {
                
                $scope.client_location_details = response.data;
                console.log()
                console.log(response.data);
            },function (response) {
                console.log(response);
            })
            //$scope.set_location_id($scope.client_location);
            $scope.rule.client_location_id = response.data[0].client_location_id;
            $scope.rule.client_location_type = response.data[0].client_location_type;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };

    $scope.update_service_rule=function () {
        $scope.rule.id=ser_rule_id;
        updateServices({
            rule:$scope.rule,
            type:'rule'
        }).then(function (response) {
            $scope.rule={};
            $scope.get_service_rule_details();
            $scope.dismiss_modal_one();
            $('#serviceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.service_success = "Service Rules Updated Successfully";
            $scope.service_rule_error = "";
        },function (response) {
            //alert(response.data+'\n Please try again');
            $scope.service_success = '';
            $('#serviceRuleError').fadeIn().delay(5000).fadeOut();
            $scope.service_rule_error = response.data.error[0];
        })
    };

    // $scope.check_enter_clicked = function($event){
    //     console.log($scope.hide_save);
    //     if($scope.hide_save==false){
    //         if ($event.keyCode == 13) {
    //             $scope.save_service('service');
    //         }
    //     }
    //     if($scope.hide_save==true){
    //         if ($event.keyCode == 13) {
    //             $scope.update_service();
    //         }
    //     }
    // }

    $scope.set_location_id = function(data){
        $scope.location_data = JSON.parse(data);
        $scope.rule.client_location_id = $scope.location_data.id;
        $scope.rule.client_location_type = $scope.location_data.type;
    }
}]);