var empReimbursementModule=angular.module('empReimbursementModule',[]);
empReimbursementModule.controller('empReimbursementController',['$rootScope','$scope','$location','getReimbursementData','addReimbursementDetails','getReimbursementDetailsById',
    'updateReimbursementData','deleteLoanDetails','approveLoanStatus','commonService','getLastRequestId','getLocationListing',
    'empAutocompleteForReimbursement',
	function($rootScope,$scope,$location,getReimbursementData,addReimbursementDetails,getReimbursementDetailsById,updateReimbursementData,deleteLoanDetails,
        approveLoanStatus,check_permission,getLastRequestId,getLocationListing,empAutocompleteForReimbursement){
		console.log('CRM LOAN controller called');
 $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };
    //$scope.loan=[];
var rem_id;
var loan_approve_id;
var emp_name_arr;
var req_id,user_id;
$scope.details={};

$scope.add_btn_clicked=function(){
    $scope.hide_save=false;
    $scope.hide_update=true;
    $scope.request_id='';
    $scope.employee_name='';
    $scope.basic_salary='';
    $scope.gross_salary='';
    $scope.interest_rate='';
    $scope.loan_amount='';
    $scope.no_of_instollments='';
    $scope.month_instollment_amount='';
}

$scope.get_location_details = function(){
    getLocationListing({}).then(function (response) {
        $scope.location_details = response.data;
        console.log(response.data);
    },function (response) {
        console.log(response);
    })
};
$scope.get_location_details();

    $scope.get_reimbursement_data=function(){
    	getReimbursementData({}).then(function(response){
          console.log(response);
          $scope.reimbursement_details=response.data;
        },function(response){
            console.log(response);
        });
    };
    $scope.get_reimbursement_data();

    // $scope.get_emp=function(){
    //     empAutocompleteForReimbursement({
    //        term:$scope.emp_code
    //    }).then(function (res) {
    //     //    for(var g=0;g<res.data.length;g++){
    //     //        res.data[g].value = res.data[g].value;
    //     //    }
    //        emp_name_arr = res.data;
    //        $scope.getempname();
    //    });
    // };

    // $scope.getempname = function () {
    //     $('#emp_id').autocomplete({
    //         source:emp_name_arr,
    //         select:function (event,ui) {
    //              //$scope.details.emp_id=ui.item.id;
    //              $scope.details.employee_code=ui.item.value.split('-')[0];
    //            $scope.details.employee_name=ui.item.value.split('-')[1];
    //         }
    //     });
    // };

    var all_data = [];
    $scope.emp_code_list = [];
    $scope.get_emp = function () {
        empAutocompleteForReimbursement({term:$scope.emp_code}).then(function (response) {
            all_data = response.data;
            $scope.all_emp_code = response.data;
            if(response.data==[]){
                $scope.details.employee_code='';
                $scope.emp_code_list = [];
            }
        });
    };

    $(document).ready(function() {
        $('#emp_id').on('input', function() {
            var userText = $(this).val();
            $("#emp_code_datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_data.findIndex(x => x.value==$(this).val());
                    if($scope.emp_code_list.findIndex(y => y.value==$(this).val()) == -1){
                        console.log('all_data[index]---',all_data[index]);
                        $scope.details.employee_code=all_data[index].value.split('-')[0];
                        $scope.details.employee_name=all_data[index].value.split('-')[1];
                        $scope.request_code_list.push(all_data[index]);
                        document.getElementById('emp_id').value = all_data[index].value;
                    }else{
                       alert('employee Already Added');
                       document.getElementById('emp_id').value = '';
                    }

                }
            });

        })
    });

    $scope.save_reimburesment_data=function(){
    	addReimbursementDetails({
    		employee_reimbursement:$scope.details
    	}).then(function(response){
            $scope.dismiss();
            $scope.get_reimbursement_data();
            $('#empReimbursementSuccess').fadeIn().delay(5000).fadeOut();
            $scope.emp_reimbursement_success = "Details Added Successfully";
            $scope.emp_reimbursement_error = "";
        },function(response){
            console.log(response);
            $scope.emp_reimbursement_success='';
            $('#empRimbursementError').fadeIn().delay(5000).fadeOut();
            $scope.emp_reimbursement_error='Something Went Wrong. Please Try Again...!!!';
        });
    };

    $scope.reimbursement_data_by_id=function(id){
        $scope.hide_save=true;
        $scope.hide_update=false;
        rem_id=id;
        
    	getReimbursementDetailsById({
    		id:id
    	}).then(function(response){
          console.log(response);
          $scope.emp_code=response.data[0].employee_code;
          $scope.details.employee_name=response.data[0].employee_name;
          $scope.details.employee_code=response.data[0].employee_code;
          $scope.details.clearing_date=response.data[0].reimbursement_date;
          $scope.details.company_id=response.data[0].company_id;
          $scope.details.reimbursement_amount=response.data[0].reimbursement_amount;
          $scope.details.payment_mode=response.data[0].payment_mode;
        },function(response){
            console.log(response);
            
        });
    };

    $scope.update_reimbursement_details=function(){
    	updateReimbursementData({
            id:rem_id,
            reimbursement_data:$scope.details
    	}).then(function(response){
            $scope.dismiss();
            $scope.get_reimbursement_data();
            $scope.details={};
            $scope.emp_code='';
            $('#empReimbursementSuccess').fadeIn().delay(5000).fadeOut();
            $scope.emp_reimbursement_success = "Details Updated Successfully";
            $scope.emp_reimbursement_error = "";
        },function(response){
            console.log(response);
            $scope.emp_reimbursement_success='';
            $('#empRimbursementError').fadeIn().delay(5000).fadeOut();
            $scope.emp_reimbursement_error='Something Went Wrong. Please Try Again...!!!';
        });
    };

    $scope.current_modal = "employee_reimbursement";
    $scope.emp_rem_permission_popup = function (po_id,po_status,po_type) {
        check_permission.check_status(po_id,po_status,po_type,$scope.current_modal);
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
            $scope.get_reimbursement_data();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.reimbursement_data_by_id(data.id);
            $('#add_request').modal('show');
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_reimbursement_data();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#empReimbursementSuccess').fadeIn().delay(5000).fadeOut();
            $scope.emp_reimbursement_success = "Details Deleted Successfully";
            
            }
        }
    });

    
}]);