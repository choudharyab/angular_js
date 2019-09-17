var fleetMaintenanceModule= angular.module('fleetMaintenanceModule',[]);
fleetMaintenanceModule.controller('fleetMaintenanceController',['$rootScope','$scope','$location','$route','$filter','$http','$window','getLocationListing','getFleetMaintenanceListing',
    'vehicleCodeAutoComplete','getFleetMaintenanceDataById','commonService',
    function($rootScope,$scope,$location,$route,$filter,$http,$window,getLocationListing,getFleetMaintenanceListing,vehicleCodeAutoComplete,
        getFleetMaintenanceDataById,check_permission) {

    $scope.fleet_maintenance={};
    var vehicle_arr,maintenance_id;

    $scope.add_btn_clicked=function () {
       
            $scope.hide_save=false;
        $scope.hide_edit=true;
        $scope.fleet_maintenance={};
        $scope.files = [];
        $scope.fleet_code='';
        $scope.fleet_maintenance.date=$filter('date')(new Date(),'dd/MM/yyyy');
        $('#add_fleet_maintenance').modal('show');
        
    };

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log('-------------->>',response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();

    $scope.get_fleet_maintenance_details = function(){
        getFleetMaintenanceListing({}).then(function (response) {
            $scope.maintenance_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_fleet_maintenance_details();

    $scope.files = [];
    //Get Image Files
    $scope.$on("selectedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });

    // $scope.search_vehicle_code = function(){
    //     vehicleCodeAutoComplete({
    //         term:$scope.fleet_code
    //     }).then(function (response) {
    //         /*for(var g=0;g<res.data.length;g++){
    //                res.data[g].value = res.data[g].country_name;
    //           }*/
    //         vehicle_arr=response.data;
    //         $scope.get_data();
    //     },function (response) {
    //         console.log(response);
    //     })
    // };

    // $scope.get_data=function () {
    //     $('#vehicle_code_id').autocomplete({
    //         source:vehicle_arr,
    //         select:function (event,ui) {
    //             //console.log('------------>>',ui.item);
    //             $scope.fleet_maintenance.fleet_id=ui.item.fleet_id;
    //             $scope.fleet_maintenance.fleet_code=ui.item.fleet_code;
    //             $scope.fleet_maintenance.fleet_reg_no=ui.item.fleet_reg_no;
    //             $scope.fleet_maintenance.make=ui.item.make;
    //             $scope.fleet_maintenance.company_id=ui.item.company_id;
    //         }
    //     })
    // };

    var all_data = [];
    $scope.fleet_code_list = [];
    $scope.search_vehicle_code = function () {
        vehicleCodeAutoComplete({term:$scope.fleet_code}).then(function (response) {
            all_data = response.data;
            $scope.all_fleet_code = response.data;
            if(response.data==[]){
                $scope.fleet_maintenance.fleet_id='';
                $scope.fleet_maintenance.fleet_code='';
                $scope.fleet_maintenance.fleet_reg_no='';
                $scope.fleet_maintenance.make='';
                $scope.fleet_maintenance.company_id='';
                $scope.fleet_code_list = [];
            }
        });
    };

    $(document).ready(function() {
        $('#vehicle_code_id').on('input', function() {
            var userText = $(this).val();
            $("#fleet_code_datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_data.findIndex(x => x.value==$(this).val());
                    if($scope.fleet_code_list.findIndex(y => y.value==$(this).val()) == -1){
                        console.log('all_data[index]---',all_data[index]);
                        $scope.fleet_maintenance.fleet_id=all_data[index].fleet_id;
                        $scope.fleet_maintenance.fleet_code=all_data[index].fleet_code;
                        $scope.fleet_maintenance.fleet_reg_no=all_data[index].fleet_reg_no;
                        $scope.fleet_maintenance.make=all_data[index].make;
                        $scope.fleet_maintenance.company_id=all_data[index].company_id;
                        
                        $scope.fleet_code_list.push(all_data[index]);
                        document.getElementById('vehicle_code_id').value = all_data[index].value;
                    }else{
                       alert('Fleet Already Added');
                       document.getElementById('product_code_id').value = '';
                    }

                }
            });

        })
    });
    
    $scope.save_fleet_maintenance=function () {
        var dataObject = {
            fleet_maintenance : $scope.fleet_maintenance
        };
        $http({
            method: 'POST',
            url: appUrl+'store_fleet_maintenance?token='+localStorage.getItem('token'),
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("fleet_maintenance", angular.toJson(data.model));

                for (var i = 0; i < data.files.length; i++) {

                    formData.append('uploadimage', data.files[i]);
                }

                return formData;
            },
            data: {model: dataObject,files: $scope.files}
        }).
        success(function (data, status, headers, config) {
            console.log('JSON-->',JSON.stringify(data));

            console.log("success!");
            $scope.dismiss();
            $scope.fleet_maintenance = {};
            $scope.files = [];
            $scope.fleet_code='';
            console.log("success");
            $('#fleetMaintenanceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.fleet_maintenance_success = 'Details Added Successfully';
            $scope.get_fleet_maintenance_details();
        }).
        error(function (data, status, headers, config) {
            console.log('data---->',data);
            console.log("failed!");
            $('#fleetMaintenanceError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_maintenance_error = "Something Went Wrong... Please Try Again...!!";
        });
    };
    var file;
    $scope.get_maintenance_data_by_id=function (id) {
        $scope.hide_edit=false;
        $scope.hide_save=true;
        maintenance_id=id;
        getFleetMaintenanceDataById({
            id:id
        }).then(function (response) {
           // $scope.fleet_maintenance=response.data[0];
            $scope.fleet_code=response.data[0].fleet_code;
            $scope.fleet_maintenance.date=response.data[0].maintenancedate;
            $scope.fleet_maintenance.fleet_code=response.data[0].fleet_code;
            $scope.fleet_maintenance.fleet_reg_no=response.data[0].fleet_reg_no;
            $scope.fleet_maintenance.make=response.data[0].make;
            $scope.fleet_maintenance.company_id=response.data[0].company_id;
            $scope.fleet_maintenance.tax_type=response.data[0].tax_type;
            $scope.fleet_maintenance.tax_amount=response.data[0].tax_amount;
            $scope.fleet_maintenance.maintenance_type=response.data[0].maintenance_type;
            $scope.fleet_maintenance.amount_spent=response.data[0].amount_spent;
            $scope.filename=response.data[0].bill_name;
            $scope.fleet_maintenance.fleet_id=response.data[0].fleet_id;
            file=response.data[0].bill_name;
            $scope.fleet_maintenance.comment=response.data[0].comment;
        },function (response) {
            console.log(response);
        })
    };

    $scope.current_modal = "fleet_maintenance";
    $scope.fleet_maintenance_permission_popup = function (cm_id,cm_status,cm_type) {
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
            $scope.get_fleet_maintenance_details();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.get_maintenance_data_by_id(data.id);
            $('#add_fleet_maintenance').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_fleet_maintenance_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#fleetMaintenanceSuccess').fadeIn().delay(5000).fadeOut();
                $scope.fleet_maintenance_success = "Details Deleted Successfully";
            }
        }
    });

    $scope.update_fleet_maintenance_details=function () {
        $scope.fleet_maintenance.id=maintenance_id;
        var dataObject = {
            fleet_maintenance : $scope.fleet_maintenance
        };
        $http({
            method: 'POST',
            url: appUrl+'update_fleet_maintenance?token='+localStorage.getItem('token'),
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("fleet_maintenance", angular.toJson(data.model));

                for (var i = 0; i < data.files.length; i++) {

                    formData.append('uploadimage', data.files[i]);
                }

                return formData;
            },
            data: {model: dataObject,files: $scope.files}
        }).
        success(function (data, status, headers, config) {
            console.log('JSON-->',JSON.stringify(data));

            console.log("success!");
            $scope.dismiss();
            $scope.fleet_maintenance = {};
            console.log("success");
            $('#fleetMaintenanceSuccess').fadeIn().delay(5000).fadeOut();
            $scope.fleet_maintenance_success = 'Details Updated Successfully';
            $scope.get_fleet_maintenance_details();
        }).
        error(function (data, status, headers, config) {
            console.log('data---->',data);
            console.log("failed!");
            $('#fleetMaintenanceError').fadeIn().delay(5000).fadeOut();
            $scope.fleet_maintenance_error = "Error!Try Again.";
        });
    };

    $scope.open_file=function(){
       // var file_name=file.split('')
        $window.open('wheelsonroadserver/public/files/'+file);
    }
    $scope.open_pdf_file=function(file){
        $window.open('wheelsonroadserver/public/files/'+file);
    }
}]);