var fleetDieselRecordModule= angular.module('fleetDieselRecordModule',[]);
fleetDieselRecordModule.controller('fleetDieselRecordController',['$rootScope','$scope','$location','$route','$filter',
'getFleetDieselRecordListing','getLocationListing','saveFleetDieselRecord','getFleetDieselDetailsById',
    'updateFleetDieselDetails','getTaxRateService','commonService','getFleetDetailsByFleetId','getFleetListing',
    function($rootScope,$scope,$location,$route,$filter,getFleetDieselRecordListing,getLocationListing,
        saveFleetDieselRecord,getFleetDieselDetailsById,updateFleetDieselDetails,
             getTaxRateService,check_permission,getFleetDetailsByFleetId,getFleetListing) {

    $scope.diesel={};
    var fleet_diesel_id;
    $scope.hide_fleet_code=true;
    $scope.diesel.previous_reading = 0;
    $scope.add_btn_clicked=function () {
        $scope.hide_save=false;
        $scope.hide_edit=true;
        $scope.diesel={};
        $scope.pop_up_msg='Add New Fuel Record';
        $scope.diesel.previous_reading = 0;
        //$('#add_fleet_details').modal('show');
    };

    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();

    $scope.get_fleet_list = function () {
        getFleetListing({}).then(function (resposne) {
            console.log(resposne);
            $scope.fleet_data = resposne.data;
        });
    };
    $scope.get_fleet_list();

    $scope.get_previous_reading = function(){
        getFleetDetailsByFleetId({
            fleet_id: $scope.diesel.fleet_id
        }).then(function (resposne) {
            $scope.diesel.make = resposne.data.make;
	    console.log(resposne.data.previous_reading);
            if(resposne.data.previous_reading != null && resposne.data.previous_reading != ""){
	        console.log('innn1');
            	$scope.diesel.previous_reading = resposne.data.previous_reading;
	    }else{
	        console.log('innnn2');
	        $scope.diesel.previous_reading = 0;
            }
            $scope.diesel.location = resposne.data.location;
        });
    }
    $scope.set_travelled_km = function(){
        $scope.diesel.travelled_km = (parseFloat($scope.diesel.diesel_time_reading) - parseFloat($scope.diesel.previous_reading)).toFixed(2);
        $scope.diesel.fleet_average = (parseFloat($scope.diesel.travelled_km) / parseFloat($scope.diesel.diesel_quantity)).toFixed(2)
    }

    $scope.get_fleet_diesel_details = function(){
        getFleetDieselRecordListing({}).then(function (response) {
            $scope.fleet_diesel_record_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_fleet_diesel_details();

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();

    $scope.save_fleet_diesel_details = function(){
        saveFleetDieselRecord({
            diesel_record:$scope.diesel
        }).then(function (response) {
            $scope.diesel={};
            $scope.get_fleet_diesel_details();
            console.log(response.data);
	        $scope.dismiss();
            $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
            $scope.fleet_success = "Fuel Record Added Successfully";
            $scope.fleet_error = "";
        },function (response) {
            console.log(response);
            $scope.fleet_success = '';
            $('#fleetError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_error = response.data.error[0];
        })
    };

    $scope.edit_fleet_diesel_details=function(id){
        $scope.pop_up_msg='Edit Fuel Record';
        $scope.hide_save=true;
        $scope.hide_edit=false;
        fleet_diesel_id=id;
        $scope.hide_fleet_code=false;
        getFleetDieselDetailsById({
            id:id
        }).then(function (response) {
            console.log(response.data);
            $scope.diesel = response.data[0];
        },function (response) {
            console.log(response);
        })
    };
    
    $scope.current_modal = "diesel_record";
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
            $scope.get_fleet_diesel_details();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_fleet_diesel_details(data.id);
            $('#example3').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_fleet_diesel_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
                $scope.fleet_success = "Fuel Details Deleted Successfully";
            }
        }
    });

    $scope.update_fleet_diesel_details=function () {
        //$scope.fleet_diesel.fleet_diesel_id=fleet_diesel_id;
        updateFleetDieselDetails({
            id:fleet_diesel_id,
            diesel_record:$scope.diesel
        }).then(function (response) {
            $scope.fleet_details={};
            $scope.get_fleet_diesel_details();
            $scope.dismiss();
            console.log(response.data);
            $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
            $scope.fleet_success = "Fuel Details Updated Successfully";
            $scope.fleet_error = "";
        },function (response) {
            console.log(response);
            $scope.fleet_success = '';
            $('#fleetError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_error = response.data.error[0];
        })
    };
}]);
