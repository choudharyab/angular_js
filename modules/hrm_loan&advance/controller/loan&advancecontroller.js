var crmLoanModule=angular.module('crmLoanModule',[]);
crmLoanModule.controller('crmLoanController',['$rootScope','$scope','$location','getLoanDetails','addLoanDetails','getLoanDetailsByRequestId',
    'updateLoanDetails','deleteLoanDetails','approveLoanStatus','employeeNameAutoCompeleteService','commonService','getLastRequestId',
	function($rootScope,$scope,$location,getLoanDetails,addLoanDetails,getLoanDetailsByRequestId,updateLoanDetails,deleteLoanDetails,
        approveLoanStatus,employeeNameAutoCompeleteService,check_permission,getLastRequestId){
		console.log('CRM LOAN controller called');
 $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };
    //$scope.loan=[];
var loan_id;
var loan_approve_id;
var emp_name_arr;
var req_id,user_id;
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
    $scope.get_last_request_id();
}
    $scope.get_last_request_id=function(){
      getLastRequestId({}).then(function(response){
          
          req_id=response.data;
          $scope.request_id=req_id;
          console.log(req_id);
        },function(response){
            console.log(response);
        });
    };
    //$scope.get_last_request_id();

    //$scope.request_id=req_id;

    $scope.get_loan_details=function(){
    	getLoanDetails({}).then(function(response){
          console.log(response);
          $scope.loan_details=response.data;
          console.log('~~~~~~~~~~~~',$scope.loan_details)
          //$scope.loan=responce.data;
        },function(response){
            console.log(response);
        });
    };
    $scope.get_loan_details();     

     /*$scope.searchEmployeeSalary = function(){
      employeeNameAutoCompeleteService({term:$scope.employee_name}).then(function (res) {
            for(var g=0;g<res.data.length;g++){
                res.data[g].value = res.data[g].employee_id; 
            }
            emp_name_arr = res.data;
            $scope.getcustomername();
        },function (res) {
            $scope.basic_salary='';
                $scope.gross_salary='';
        });
    }*/

    $scope.get_emp=function(){
       employeeNameAutoCompeleteService({
           term:$scope.employee_name
       }).then(function (res) {
           for(var g=0;g<res.data.length;g++){
               res.data[g].value = res.data[g].value;
           }
           emp_name_arr = res.data;
           $scope.getcustomername();
       });
   }
    $scope.getcustomername = function () {
        $('#auto_emp_code_id').autocomplete({
            source:emp_name_arr,
            select:function (event,ui) {
                 user_id= ui.item.user_id;
                 console.log('user_id',user_id);
               $scope.employee_name=ui.item.value;
               $scope.basic_salary=ui.item.basic;
               $scope.gross_salary=ui.item.gross;
                //$scope.get_customer_status_details();
            }
        });
    };

    $scope.save_loan=function(){
    	addLoanDetails({
    		request_id:$scope.request_id,
            user_id:user_id,
    		employee_id:$scope.employee_name,
    		basic_salary:$scope.basic_salary,
    		gross_salary:$scope.gross_salary,
    		interest_rate:$scope.interest_rate,
    		loan_amount:$scope.loan_amount,
    		no_of_instollments:$scope.no_of_instollments,
    		month_instollment_amount:$scope.month_instollment_amount
    	}).then(function(response){
            $scope.dismiss();
            $scope.get_loan_details();
            $('#loanSuccess').fadeIn().delay(5000).fadeOut();
            $scope.loan_success = "Loan Details Added Successfully";
            $scope.loan_error = "";
        },function(response){
            console.log(response);
            $scope.loan_success='';
            $('#loanError').fadeIn().delay(5000).fadeOut();
            $scope.loan_error=response.data.error[0];
        });
    };

    $scope.loan_details_by_request_id=function(id){
        $scope.hide_save=true;
        $scope.hide_update=false;
        loan_id=id;
        
    	getLoanDetailsByRequestId({
    		id:id
    	}).then(function(response){
          console.log(response);
          $scope.loan_details_by_id=response.data;
          //$scope.loan=$scope.loan_details_by_id;
          $scope.request_id=$scope.loan_details_by_id[0].request_id;
          //$scope.employee_name=$scope.loan_details_by_id[0].emp_details.employee_name;
          
          $scope.basic_salary=$scope.loan_details_by_id[0].basic_salary;
          $scope.gross_salary=$scope.loan_details_by_id[0].gross_salary;
          $scope.interest_rate=$scope.loan_details_by_id[0].interest_rate;
          $scope.loan_amount=$scope.loan_details_by_id[0].loan_amount;
          $scope.no_of_instollments=$scope.loan_details_by_id[0].no_of_instollments;
          $scope.month_instollment_amount=$scope.loan_details_by_id[0].month_instollment_amount;
        },function(response){
            console.log(response);
            
        });
    };

    $scope.update_loan_details=function(){
    	updateLoanDetails({
    		request_id:$scope.request_id,
    		employee_id:$scope.employee_name,
    		basic_salary:$scope.basic_salary,
    		gross_salary:$scope.gross_salary,
    		interest_rate:$scope.interest_rate,
    		loan_amount:$scope.loan_amount,
    		no_of_instollments:$scope.no_of_instollments,
    		month_instollment_amount:$scope.month_instollment_amount,
            id:loan_id
    	}).then(function(response){
            $scope.modal_dismiss_two();
            $scope.get_loan_details();
            $scope.request_id='';
            $scope.emp_name='';
            $scope.basic_salary='';
            $scope.gross_salary='';
            $scope.interest_rate='';
            $scope.loan_amount='';
            $scope.no_of_instollments='';
            $scope.month_instollment_amount='';
            $('#loanSuccess').fadeIn().delay(5000).fadeOut();
            $scope.loan_success = "Loan Details Updated Successfully";
            $scope.loan_error = "";
        },function(response){
            console.log(response);
            $scope.loan_success='';
            $('#loanError').fadeIn().delay(5000).fadeOut();
            $scope.loan_error=response.data.error[0];
        });
    };

    /*$scope.delete_loan_details=function(id){
    	deleteLoanDetails({
    		id:id
    	}).then(function(response){
          console.log(response);
          $scope.get_loan_details();
          $('#loanSuccess').fadeIn().delay(5000).fadeOut();
            $scope.loan_success = "Loan Details Updated Successfully";
            $scope.loan_error = "";
        },function(response){
            console.log(response);
            $scope.loan_success='';
            $('#loanError').fadeIn().delay(5000).fadeOut();
            $scope.loan_error=response.data.error[0];
        });
    };*/
    $scope.current_modal = "loan_advance";
    $scope.loan_advance_permission_popup = function (po_id,po_status,po_type) {
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
            $scope.get_loan_details();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.loan_details_by_request_id(data.id);
            $('#example3').modal('show');
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_loan_details();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#loanSuccess').fadeIn().delay(5000).fadeOut();
                $scope.loan_success = "Loan Details Deleted Successfully";
            
            }
        }
    });

    $scope.get_approve_id=function(id){
        loan_approve_id=id;
    };

    $scope.approve_loan_details=function(){
    	approveLoanStatus({
    		id:loan_approve_id
    	}).then(function(response){
          console.log(response);
          $scope.get_loan_details();
          $scope.dismiss();
        },function(response){
            console.log(response);
            
        });
    };

    $scope.on_click_no=function(){
        $scope.dismiss();
    };

$scope.check_approve = function (id,approve_status) {

       if(approve_status=='inactive'){

           $scope.check_approve_msg = "Do you want to approve this loan ?";
           //$scope.pi_product_id = pro_id;
        
           $('#approve_msg').modal('show');
           $scope.approve_btn = true;
       }else{
           $('#approve_msg').modal('show');
           $scope.approve_btn = false;
           $scope.check_approve_msg = "Already approved";
       }
   };
   $scope.approve = function () {
       approveLoanStatus({
            id:loan_approve_id
        }).then(function(response){
          console.log(response);
          $scope.get_loan_details();
          $scope.modal_dismiss_sr_edit();
        },function(response){
            console.log(response);
            
        });
    }
}]);