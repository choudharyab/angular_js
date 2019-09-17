var fleetListModule= angular.module('fleetListModule',[]);
fleetListModule.controller('fleetListController',['$rootScope','$scope','$location','$route','$filter','getFleetListing','getLocationListing','saveFleetDetails','getFleetDetailsById',
    'updateFleetDetails','getTaxRateService','commonService',
    function($rootScope,$scope,$location,$route,$filter,getFleetListing,getLocationListing,saveFleetDetails,getFleetDetailsById,updateFleetDetails,
             getTaxRateService,check_permission) {

    $scope.fleet_details={};
    var fleet_id;
    $scope.hide_fleet_code=true;

    $scope.add_btn_clicked=function () {
       
            $scope.hide_save=false;
        $scope.hide_edit=true;
        $scope.fleet_details={};
        $scope.pop_up_msg='Add New Fleet';
        $scope.hide_fleet_code=true;
        $('#add_fleet_details').modal('show');
        
        
    };

    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();

    $scope.get_fleet_details = function(){
        getFleetListing({}).then(function (response) {
            $scope.fleet_details_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_fleet_details();

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();

    $scope.set_fitness_date=function () {
      $scope.get_date=$scope.fleet_details.fleet_purchase_date.split('/')[0];
      $scope.get_month=$scope.fleet_details.fleet_purchase_date.split('/')[1];
      $scope.get_year=parseInt($scope.fleet_details.fleet_purchase_date.split('/')[2])+2;
      $scope.fleet_details.fitness=$scope.get_date+'/'+$scope.get_month+'/'+$scope.get_year;
      console.log($scope.get_year);
    };

    $scope.save_fleet_details = function(){
        saveFleetDetails({
            fleet_object:$scope.fleet_details
        }).then(function (response) {
            $scope.fleet_details={};
            $scope.get_fleet_details();
            console.log(response.data);
	        $scope.dismiss();
            $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
            $scope.fleet_success = "Fleet Details Added Successfully";
            $scope.fleet_error = "";
        },function (response) {
            console.log(response);
            $scope.fleet_success = '';
            $('#fleetError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_error = response.data.error[0];
        })
    };

    $scope.edit_fleet_details=function(id){
        $scope.pop_up_msg='Edit Fleet';
        $scope.hide_save=true;
        $scope.hide_edit=false;
        fleet_id=id;
        $scope.hide_fleet_code=false;
        getFleetDetailsById({
            fleet_id:id
        }).then(function (response) {
            //$scope.fleet_details_by_id = response.data[0];
            //$scope.fleet_details=$scope.fleet_details_by_id;
            $scope.fleet_details.fleet_code=response.data[0].fleet_code;
            $scope.fleet_details.fleet_reg_no=response.data[0].fleet_reg_no;
            $scope.fleet_details.make=response.data[0].make;
            $scope.fleet_details.company_id=response.data[0].company_id;
            $scope.fleet_details.tax=response.data[0].tax;
            $scope.fleet_details.insurance_from_date=response.data[0].insurance_fromdate;
            $scope.fleet_details.insurance_to_date=response.data[0].insurance_todate;
            $scope.fleet_details.fleet_purchase_date=response.data[0].fleet_purchase_date;
            $scope.fleet_details.fitness=response.data[0].fitness_date;
            $scope.fleet_details.state_permit=response.data[0].state_permit_date;
            $scope.fleet_details.national_permit=response.data[0].national_permit_date;
            $scope.fleet_details.pollution=response.data[0].pollution_date;
            $scope.fleet_details.initial_reading=response.data[0].initial_reading;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    
    $scope.current_modal = "fleet";
    $scope.fleet_list_permission_popup = function (cm_id,cm_status,cm_type) {
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
            $scope.get_fleet_details();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_fleet_details(data.id);
            $('#add_fleet_details').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_fleet_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
                $scope.fleet_success = "Fleet Details Deleted Successfully";
            }
        }
    });

    $scope.update_fleet_details=function () {
        $scope.fleet_details.fleet_id=fleet_id;
        updateFleetDetails({
            fleet_object:$scope.fleet_details
        }).then(function (response) {
            $scope.fleet_details={};
            $scope.get_fleet_details();
            $scope.dismiss();
            console.log(response.data);
            $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
            $scope.fleet_success = "Fleet Details Updated Successfully";
            $scope.fleet_error = "";
        },function (response) {
            console.log(response);
            $scope.fleet_success = '';
            $('#fleetError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_error = response.data.error[0];
        })
    };
}]);
