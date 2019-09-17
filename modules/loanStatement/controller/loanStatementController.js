var loanStatementModule= angular.module('loanStatementModule',[]);
loanStatementModule.controller('loanStatementController',['$rootScope','$scope','$location','$route','vehicleCodeAutoComplete','getLocationListing',
    'saveLoanDetails','getLoanStatementDetails','getLoanStatementDetailsById','updateLoanDetails','commonService',
    function($rootScope,$scope,$location,$route,vehicleCodeAutoComplete,getLocationListing,saveLoanDetails,getLoanStatementDetails,
             getLoanStatementDetailsById,updateLoanDetails,check_permission) {

    var vehicle_arr,loan_id;
    $scope.loan_details={};

    $scope.add_btn_clicked=function () {
        // if(localStorage.getItem('warehouse_id')==''){
        //     alert('Please select company first');
        // }else{
            $scope.hide_save=false;
        $scope.hide_edit=true;
        $scope.loan_details={};
        $scope.fleet_code='';
       // $scope.loan_details.location=localStorage.getItem('warehouse_id');
        console.log(localStorage.getItem('warehouse_id'));
        $('#add_loan_statement').modal('show');
        //}
    };

    // $scope.search_vehicle_code = function(){
    //     vehicleCodeAutoComplete({
    //         term:$scope.fleet_code
    //     }).then(function (response) {
    //         /*for(var g=0;g<res.data.length;g++){
    //             res.data[g].value = res.data[g].country_name;
    //         }*/
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
    //             $scope.loan_details.fleet_id=ui.item.fleet_id;
    //             $scope.loan_details.fleet_code=ui.item.fleet_code;
    //             $scope.loan_details.fleet_reg_no=ui.item.fleet_reg_no;
    //             $scope.loan_details.make=ui.item.make;
    //             $scope.loan_details.company_id=ui.item.company_id;
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
                $scope.loan_details.fleet_id='';
                $scope.loan_details.fleet_code='';
                $scope.loan_details.fleet_reg_no='';
                $scope.loan_details.make='';
                $scope.loan_details.company_id='';
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
                        $scope.loan_details.fleet_id=all_data[index].fleet_id;
                        $scope.loan_details.fleet_code=all_data[index].fleet_code;
                        $scope.loan_details.fleet_reg_no=all_data[index].fleet_reg_no;
                        $scope.loan_details.make=all_data[index].make;
                        $scope.loan_details.company_id=all_data[index].company_id;
                        
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

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();

    $scope.get_loan_statement_details = function(){
        getLoanStatementDetails({}).then(function (response) {
            $scope.loan_statement_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_loan_statement_details();

    $scope.calculate_premium=function(){
        $scope.loan_details.premium=parseFloat($scope.loan_details.loan_amount)/parseFloat($scope.loan_details.no_of_installments);
        $scope.loan_details.premium=$scope.loan_details.premium.toFixed(2);
    }
    $scope.save_loan_statement = function(){
        saveLoanDetails({
            loan_statement:$scope.loan_details
        }).then(function (response) {
            $scope.loan_details={};
            $scope.fleet_code='';
            $scope.dismiss();
            $('#loanSuccess').fadeIn().delay(5000).fadeOut();
            $scope.loan_success = "Loan Details Added Successfully";
            $scope.loan_error = "";
            $scope.get_loan_statement_details();
        },function (response) {
            console.log(response);
            $scope.loan_success = '';
            $('#loanError').fadeIn().delay(5000).fadeOut();
            $scope.loan_error = response.data.error[0];
        })
    };

    $scope.edit_loan_statement_details = function(id){
        loan_id=id;
        $scope.hide_save=true;
        $scope.hide_edit=false;
        getLoanStatementDetailsById({
            id:id
        }).then(function (response) {
            $scope.loan_statement_details_by_id = response.data[0];
           // $scope.loan_details=response.data[0];
           $scope.fleet_code=response.data[0].fleet_code;
            $scope.loan_details.fleet_code=response.data[0].fleet_code;
            $scope.loan_details.fleet_reg_no=response.data[0].fleet_reg_no;
            $scope.loan_details.make=response.data[0].make;
            $scope.loan_details.company_id=response.data[0].company_id;
            $scope.loan_details.loan_ac_no=response.data[0].loan_ac_no;
            $scope.loan_details.no_of_installments=response.data[0].no_of_installments;
            $scope.loan_details.loan_amount=response.data[0].loan_amount;
            $scope.loan_details.premium=response.data[0].premium;
            $scope.loan_details.loan_premium_date=response.data[0].loan_premium_date;
            
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.current_modal = "loan_statement";
    $scope.loan_permission_popup = function (cm_id,cm_status,cm_type) {
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
            $scope.get_loan_statement_details();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_loan_statement_details(data.id);
            $('#add_loan_statement').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_loan_statement_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#loanSuccess').fadeIn().delay(5000).fadeOut();
                $scope.case_success = "Loan Statement Details Deleted Successfully";
            }
        }
    });

    $scope.update_loan_statement = function(){
        $scope.loan_details.id=loan_id;
        updateLoanDetails({
            loan_statement:$scope.loan_details
        }).then(function (response) {
            $scope.fleet_code='';
            $scope.loan_details={};
            $scope.dismiss();
            $('#loanSuccess').fadeIn().delay(5000).fadeOut();
            $scope.loan_success = "Loan Details Updated Successfully";
            $scope.loan_error = "";
            $scope.get_loan_statement_details();
        },function (response) {
            console.log(response);
            $scope.loan_success = '';
            $('#loanError').fadeIn().delay(5000).fadeOut();
            $scope.loan_error = response.data.error[0];
        })
    };

}]);