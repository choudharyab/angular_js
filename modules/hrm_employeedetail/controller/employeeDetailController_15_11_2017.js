var employeeDetailModule = angular.module('employeeDetailModule',[]);
employeeDetailModule.controller('employeeDetailController',['$rootScope','$scope','$location','$route','getHrmGeneralMaritalStatusListing','getHrmGeneralDepartmentListing','getHrmGeneralDesignationListing','getHrmGeneralCategoryListing','saveEmployeeDetailService','getStateListService','getHrmSalaryComponentListing','getHrmGeneralBloodGroupListing','getHrmGeneralCompanyEmailListing','getSalaryConfigurationListing','getEmployeeListing','getWarehouseListService','getHrmGeneralProbationPeriodListing','getHrmGeneralNoticePeriodListing','editEmployeeDetailsService','updateEmployeeDetailService','deleteEmployeeDetails','getSalaryConfigurationListing',function($rootScope,$scope,$location,$route,getHrmGeneralMaritalStatusListing,getHrmGeneralDepartmentListing,getHrmGeneralDesignationListing,getHrmGeneralCategoryListing,saveEmployeeDetailService,getStateListService,getHrmSalaryComponentListing,getHrmGeneralBloodGroupListing,getHrmGeneralCompanyEmailListing,getSalaryConfigurationListing,getEmployeeListing,getWarehouseListService,getHrmGeneralProbationPeriodListing,getHrmGeneralNoticePeriodListing,editEmployeeDetailsService,updateEmployeeDetailService,deleteEmployeeDetails,getSalaryConfigurationListing){
  
  
  $scope.active_lable = false;
  $scope.employee = {'employee_salary_details':{},'employee_asset_details':[],'employee_details':''};  
  //$scope.sameascurrent = false;
  $scope.employee.employee_details.same_current_address = 'no';
  $scope.employee.employee_details.company_email = '';
  $scope.salary_configurations = [];
  $scope.other_allowance = 'Others';
  $scope.others_cal = 0;
  $scope.pt_deduction = 'PT';
  $scope.tds_deduction= 'TDS';
  $scope.other_allowance_earnings = {};
  $scope.pt_tax_deduction = {};
  $scope.tds_tax_deduction = {};
  $scope.employee.employee_salary_details.break_downs = [];
  $scope.employee.employee_salary_details.allowances = [];
  $scope.employee.employee_salary_details.tax_deductions = [];

  $scope.set_form_field_value = function(){
	 $route.reload(); 
    console.log('set_form_field_value called');  
   // $scope.form_field = false;
    $scope.employee = {'employee_salary_details':{},'employee_asset_details':[],'employee_details':''};    
    $scope.other_allowance_earnings = {};
    $scope.pt_tax_deduction = {};
    $scope.tds_tax_deduction = {};
    $scope.employee.employee_salary_details.break_downs = [];
    $scope.employee.employee_salary_details.allowances = [];
    $scope.employee.employee_salary_details.tax_deductions = [];  
    $scope.employee.employee_asset_details = [{'asset_id':'','asset_name':'','description':'','issue_date':''}];   
    $scope.sameascurrent = false;
    $scope.company_email_part_1 = '';
    $scope.gross_amount = '';
    $scope.pt = '';
    $scope.tds = '';
    $scope.others = '';
    for(var i=0;i<$scope.salary_components.length;i++){
      $scope.salary_components[i].salary.id = '';
      $scope.salary_components[i].break_down_amount = '';

    }

    for(var j=0;j<$scope.salary_allowances.length;j++){
      $scope.salary_allowances[j].id = '';  
    }
	
  };
 
  $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };

  getWarehouseListService({}).then(function (response) {
        $scope.warehouse_lists = response.data;
  });

  $scope.onLoadGetEmployeeListing = function(){
        getEmployeeListing({}).then(function (response) {
            console.log('res-->', response);
            $scope.employee_lists = response.data;
       });
  };  
  $scope.onLoadGetEmployeeListing();

  $scope.onLoadGetSalaryConfiguration = function(){
    getSalaryConfigurationListing({}).then(function (response) {
      console.log('res-->', response);
      $scope.salary_components = response.data.salary_configuration;
      $scope.salary_allowances = response.data.allowance;
      console.log('$scope.salary_allowances-->', $scope.salary_allowances);
    });
  };  
  $scope.onLoadGetSalaryConfiguration();

  $scope.hrm_general_probation_period_listing = function () {
       getHrmGeneralProbationPeriodListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_probation_period_lists = response.data;
       });
   };
   $scope.hrm_general_probation_period_listing();

    $scope.hrm_general_notice_period_listing = function () {
       getHrmGeneralNoticePeriodListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_notice_period_lists = response.data;
       });
   };
   $scope.hrm_general_notice_period_listing();

  $scope.hrm_general_company_email_listing = function () {
       getHrmGeneralCompanyEmailListing({}).then(function (response) {
          console.log('response.data[0].company_email-->', response.data[0].company_email);
            $scope.company_email_part_2 = response.data[0].company_email;
       });
   };
  $scope.hrm_general_company_email_listing();

  $scope.hrm_general_marital_status_listing = function () {
       getHrmGeneralMaritalStatusListing({}).then(function (response) {
          console.log('hrm_general_marital_status_lists-->', response);
            $scope.hrm_general_marital_status_lists = response.data;
       });
  };
  $scope.hrm_general_marital_status_listing();

   $scope.hrm_general_department_listing = function () {
       getHrmGeneralDepartmentListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_department_lists = response.data;
       });
   };
   $scope.hrm_general_department_listing();

   $scope.hrm_general_designation_listing = function () {
       getHrmGeneralDesignationListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_designation_lists = response.data;
       });
   };
   $scope.hrm_general_designation_listing();

   $scope.hrm_general_category_listing = function () {
       getHrmGeneralCategoryListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_category_lists = response.data;
       });
   };
   $scope.hrm_general_category_listing(); 

   $scope.hrm_general_blood_group_listing = function () {
       getHrmGeneralBloodGroupListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_blood_group_lists = response.data;
       });
   };
   $scope.hrm_general_blood_group_listing();

    $scope.get_state_list = function(){
         getStateListService({}).then(function (response) {
        $scope.state_lists = response.data;
        console.log(response.data);    
    });
  }
   $scope.get_state_list();

    $scope.change = function () {
     console.log('$scope.sameascurrent-->',$scope.sameascurrent);
     if ($scope.sameascurrent) {
         $scope.sameascurrent = true;
         $scope.employee.employee_details.same_current_address = 'yes';
          console.log('$scope.employee.employee_details.same_current_address-->',$scope.employee.employee_details.same_current_address);
         $scope.employee.employee_details.permanent_address_line_1 = $scope.employee.employee_details.current_address_line_1;
        console.log('$scope.employee.employee_details.permanent_address_line_1-->',$scope.employee.employee_details.permanent_address_line_1);
        
         $scope.employee.employee_details.permanent_address_line_2 = $scope.employee.employee_details.current_address_line_2;
     }else{
         $scope.sameascurrent = false;
         $scope.employee.employee_details.same_current_address = 'no';
         $scope.employee.employee_details.permanent_address_line_1 = '';
         $scope.employee.employee_details.permanent_address_line_2 = '';
     }
   }

    $scope.hrm_salary_component_listing = function () {
       getHrmSalaryComponentListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_salary_component_lists = response.data;
       });
   };
   $scope.hrm_salary_component_listing();
  
   $scope.onLoadGetSalaryConfiguration = function(){
        getSalaryConfigurationListing({}).then(function (response) {
            console.log('salary_configuration_lists res-->', response);
            $scope.salary_configuration_lists = response.data;
       });
   };  
   $scope.onLoadGetSalaryConfiguration();
   $scope.employee.employee_asset_details = [{'asset_id':'','asset_name':'','description':'','issue_date':''}];
  
    $scope.add_more_asset_component = function () {
        console.log("add called");
        $scope.employee.employee_asset_details.push({'asset_id':'','asset_name':'','description':'','issue_date':''});
    };

    $scope.remove_asset_component =function (index) {    
        $scope.employee.employee_asset_details.splice(index,1);
    };
  
   $scope.save_employee_details = function(){    
    $scope.employee.employee_details.company_email = $scope.company_email_part_1 + $scope.company_email_part_2;
 
    for(var i=0;i<$scope.salary_components.length;i++){
      console.log($scope.salary_components[i]);
      if($scope.salary_components[i].break_down_amount){

      }else{
        $scope.salary_components[i].break_down_amount = 0;
      }
    }   
    

    for(var y=0;y<$scope.salary_allowances.length;y++){       
       if($scope.salary_allowances[y].status == 'active'){

       }else{
         $scope.salary_allowances[y].status = 'inactive';
       }
    }
    
  
    console.log('$scope.salary_components-->',$scope.salary_components);
    $scope.employee.gross_amount = $scope.gross_amount;
    

    console.log('employee_salary_details.break_downs',$scope.employee.employee_salary_details);

    //$scope.employee.employee_salary_details = $scope.salary_components;

      $scope.employee.employee_salary_details.break_downs = $scope.salary_components;     

      $scope.other_allowance_earnings.allowance = $scope.other_allowance;
      $scope.other_allowance_earnings.allowance_amount = $scope.others;
      $scope.other_allowance_earnings.type = 'Earning';
      $scope.other_allowance_earnings.status = 'active';
      $scope.salary_allowances.push($scope.other_allowance_earnings);
      $scope.employee.employee_salary_details.allowances = $scope.salary_allowances;

      $scope.pt_tax_deduction.deduction = $scope.pt_deduction;
      $scope.pt_tax_deduction.deduction_amount = $scope.pt;
      console.log('$scope.pt_tax_deduction-->',$scope.pt_tax_deduction);
      $scope.employee.employee_salary_details.tax_deductions.push($scope.pt_tax_deduction);

      $scope.tds_tax_deduction.deduction = $scope.tds_deduction;
      $scope.tds_tax_deduction.deduction_amount = $scope.tds;
      $scope.employee.employee_salary_details.tax_deductions.push($scope.tds_tax_deduction);
    //$scope.employee.employee_salary_details =  $scope.salary_components;

    console.log('$scope.employee.employee_salary_details-->',$scope.employee.employee_salary_details);
    
    console.log(JSON.stringify($scope.employee));
   // $scope.pt_tax_deduction ={};
    saveEmployeeDetailService({employee:$scope.employee}).then(function (response) {
            $scope.dismiss();
            $scope.employee = {};
            $scope.sameascurrent = false;           
            $scope.company_email_part_1 = '';
            $scope.gross_amount = '';
            console.log("success");
            $('#employeeDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.employee_detail_success = JSON.parse(response.data);
            $scope.onLoadGetEmployeeListing();
           
    },function(res){
        console.log(res);
         $('#employeeDetailError').fadeIn().delay(5000).fadeOut();
         $scope.general_detail_error = "Error!Try Again.";
    });
   };

   $scope.edit_employee_Detail = function(emp_id){
     $scope.temporary = 0;
     $scope.form_field = true;
     console.log('emp id-->',emp_id);     
    //$scope.employee.employee_id = emp_id;
     editEmployeeDetailsService({employee_id:emp_id}).then(function (response) {
            console.log('editEmployeeDetailsService-->', response.data[0]);
			
			$scope.active_lable = true;
            $scope.employee.employee_details = response.data[0].emp_details;
            $scope.employee.employee_details.employee_name = response.data[0].uname;

            var company_email_part_1 = response.data[0].emp_details.company_email.split('@');
            $scope.company_email_part_1 = company_email_part_1[0];
            if(response.data[0].emp_details.same_current_address == 'yes'){
              $scope.sameascurrent = true;
            }else{
              $scope.sameascurrent = false;
            }

            $scope.employee.personal_details = response.data[0].emp_personal_detail;
            $scope.employee.bank_account_details = response.data[0].emp_bank_detail;
           // $scope.employee.employee_salary_details = response.data[0].emp_salary_details;
            $scope.employee.employee_asset_details = response.data[0].emp_assets;

            $scope.employee.user_id = response.data[0].id;
            $scope.employee.employee_details.id = response.data[0].emp_details.id;
            $scope.employee.personal_details.id = response.data[0].emp_personal_detail.id;
            $scope.employee.bank_account_details.id = response.data[0].emp_bank_detail.id;

            $scope.employee.warehouse_id = response.data[0].emp_details.warehouse.id;
            $scope.gross_amount = response.data[0].emp_salary_details[0].gross_amount;
            console.log('response.data[0].emp_salary_details-->',response.data[0].emp_salary_details.length);
      
            for(var i=0;i<response.data[0].emp_salary_details.length;i++){
              for(var l=0;l<$scope.salary_components.length;l++){
                if(response.data[0].emp_salary_details[i].salary.salary == $scope.salary_components[l].salary.salary && response.data[0].emp_salary_details[i].salary.salary == 'BASIC' ){
                  console.log('BASIC get');                  
                   $scope.salary_components[l].salary.id = true;
                   $scope.salary_components[l].index = l;
                   $scope.salary_components[l].break_down_amount = response.data[0].emp_salary_details[i].break_down_amount;
                   $scope.salary_configurations.push($scope.salary_components[l]);
                   angular.element(document.getElementById('salary_id_'+ l))[0].disabled = true;
                }else if(response.data[0].emp_salary_details[i].salary.salary == $scope.salary_components[l].salary.salary  && response.data[0].emp_salary_details[i].break_down_amount != 0){
                  $scope.salary_components[l].salary.id = true;
                  $scope.salary_components[l].index = l;
                  $scope.salary_components[l].break_down_amount = response.data[0].emp_salary_details[i].break_down_amount;
                  $scope.salary_configurations.push($scope.salary_components[l]);
                  console.log('$scope.salary_configurations--------------------------------------------- -->',$scope.salary_configurations);
                }
                /*if(response.data[0].emp_salary_details[i].salary.salary == $scope.salary_components[l].salary.salary && response.data[0].emp_salary_details[i].salary.salary == 'BASIC' ){
                  console.log('BASIC get');
                   angular.element(document.getElementById('salary_id_'+ l))[0].disabled = true;
                   $scope.salary_components[l].break_down_amount = response.data[0].emp_salary_details[i].break_down_amount;
                }else if(response.data[0].emp_salary_details[i].salary.salary == $scope.salary_components[l].salary.salary && response.data[0].emp_salary_details[i].break_down_amount != 0){
                   console.log('response.data[0].emp_salary_details[i].salary.salary--->',response.data[0].emp_salary_details[i].salary.salary);
                   $scope.salary_components[l].salary.id = true;
                   $scope.salary_components[l].break_down_amount = response.data[0].emp_salary_details[i].break_down_amount;
                }else{
                  console.log('else');
                  console.log('response.data[0].emp_salary_details[i].salary.salary--->',response.data[0].emp_salary_details[i].salary.salary);
                  $scope.salary_components[l].break_down_amount = 0;
                }*/
              }

              if($scope.salary_configurations.length>0){
                         for(var m=0;m<$scope.salary_configurations.length;m++){
                           if($scope.salary_configurations[m].type == 'Earning'){
                             $scope.temporary =  parseFloat($scope.temporary) +  parseFloat($scope.salary_configurations[m].break_down_amount);                            
                            }
                         }
                        }else{
                          $scope.others_cal = 0;
                        }

                          $scope.others_cal = $scope.gross_amount - $scope.temporary;
                           if($scope.salary_allowances.length > 0){
                            for(var x=0;x<$scope.salary_allowances.length;x++){
                            console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                             if($scope.salary_allowances[x].status == 'active'){
                               $scope.others_cal = $scope.others_cal - parseInt($scope.salary_allowances[x].allowance_amount);
                               console.log('$scope.others_cal-->',$scope.others_cal);
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }else{
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }
                          }
                           }else{
                             if($scope.others_cal > 0){
                                    $scope.others = $scope.others_cal;
                                 }else{
                                   $scope.others = 0;
                                 }
                          }
             /* if(response.data[0].emp_salary_details[i].salary.salary == 'BASIC'){
                console.log('BASIC');
                angular.element(document.getElementById('salary_id_'+ i))[0].disabled = true;
              }*/

              /*if(response.data[0].emp_salary_details[i].break_down_amount != 0){
                 $scope.salary_components[i].salary.id = true;
                 $scope.salary_configurations.push(response.data[0].emp_salary_details[i]);
              }else{
                $scope.salary_components[i].salary.id = false;
              }
               $scope.salary_components[i].break_down_amount = response.data[0].emp_salary_details[i].break_down_amount;*/
              }
           
              for(var k=0;k<response.data[0].allowances.length;k++){
                 if(response.data[0].allowances[k].allowance == 'Others'){
                    $scope.others = response.data[0].allowances[k].allowance_amount;
                    $scope.others_cal = response.data[0].allowances[k].allowance_amount;
                 }else{
                    if(response.data[0].allowances[k].allowance != 'Others' && response.data[0].allowances[k].status == 'active'){
                        $scope.salary_allowances[k].id = true;
                        $scope.salary_allowances[k].allowance_amount = response.data[0].allowances[k].allowance_amount;
                      }else{
                        $scope.salary_allowances[k].id = false;
                        $scope.salary_allowances[k].allowance_amount = response.data[0].allowances[k].allowance_amount;
                      }
                 }
              }

              for(var j=0;j<response.data[0].tax_deduction.length;j++){
                 if(response.data[0].tax_deduction[j].deduction == 'PT'){
                  $scope.pt = response.data[0].tax_deduction[j].deduction_amount;                   
                 }else if(response.data[0].tax_deduction[j].deduction == 'TDS'){
                  $scope.tds = response.data[0].tax_deduction[j].deduction_amount;
                 }else{

                 }
              }             
           
       },function(res){
        console.log(res);        
    });
   };


   $scope.update_employee_details = function(){
   /* $scope.other_allowance_earnings = {};
    $scope.pt_tax_deduction = {};
    $scope.tds_tax_deduction = {};
    $scope.employee.employee_salary_details.break_downs = [];
    $scope.employee.employee_salary_details.allowances = [];
    $scope.employee.employee_salary_details.tax_deductions = [];*/
   // $scope.employee.employee_salary_details.tax_deductions = [];
    $scope.employee.employee_details.company_email = $scope.company_email_part_1 + $scope.company_email_part_2;
     for(var i=0;i<$scope.salary_components.length;i++){
      console.log($scope.salary_components[i]);
      if($scope.salary_components[i].break_down_amount){

      }else{
        $scope.salary_components[i].break_down_amount = 0;
      }
    }   

    for(var y=0;y<$scope.salary_allowances.length;y++){       
       if($scope.salary_allowances[y].status == 'active'){

       }else{
         $scope.salary_allowances[y].status = 'inactive';
       }
    }

    console.log('$scope.salary_components-->',$scope.salary_components);
    $scope.employee.gross_amount = $scope.gross_amount;
   // $scope.employee.employee_salary_details = $scope.salary_components;
  //    console.log('$scope.employee.employee_salary_details-->',$scope.employee.employee_salary_details);
    

      $scope.employee.employee_salary_details.break_downs = $scope.salary_components; 
        

      $scope.other_allowance_earnings.allowance = $scope.other_allowance;
      $scope.other_allowance_earnings.allowance_amount = $scope.others;
      $scope.other_allowance_earnings.type = 'Earning';
      $scope.other_allowance_earnings.status = 'active';
      $scope.salary_allowances.push($scope.other_allowance_earnings);
      console.log(' $scope.salary_allowances-->', $scope.salary_allowances);
       
      $scope.employee.employee_salary_details.allowances = $scope.salary_allowances;
      console.log(' $scope.employee.employee_salary_details-->', $scope.employee.employee_salary_details);

      $scope.pt_tax_deduction.deduction = $scope.pt_deduction;
      $scope.pt_tax_deduction.deduction_amount = $scope.pt;
       console.log('$scope.employee.employee_salary_details.tax_deductions-->',$scope.employee.employee_salary_details.tax_deductions);

    //  $scope.employee.employee_salary_details.tax_deductions = [];
      $scope.employee.employee_salary_details.tax_deductions.push($scope.pt_tax_deduction);


      $scope.tds_tax_deduction.deduction = $scope.tds_deduction;
      $scope.tds_tax_deduction.deduction_amount = $scope.tds;
      $scope.employee.employee_salary_details.tax_deductions.push($scope.tds_tax_deduction);
      console.log('$scope.employee.employee_salary_details.tax_deductions-->',$scope.employee.employee_salary_details.tax_deductions);
      console.log('$scope.employee.employee_salary_details-->',$scope.employee.employee_salary_details);
      console.log('$scope.employee-->',$scope.employee);
      console.log(JSON.stringify($scope.employee));

     updateEmployeeDetailService({employee:$scope.employee}).then(function (response) {
            $scope.dismiss();
            $scope.employee = {};
            $scope.sameascurrent = false;
          
            $scope.company_email_part_1 = '';
            console.log("success");
            $('#employeeDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.employee_detail_success = JSON.parse(response.data);
            $scope.onLoadGetEmployeeListing();
           
    },function(res){
        console.log(res);
         $('#employeeDetailError').fadeIn().delay(5000).fadeOut();
         $scope.general_detail_error = "Error!Try Again.";
    });
   };

/*
   $scope.update_employee_details = function(){
    $scope.employee.employee_details.company_email = $scope.company_email_part_1 + $scope.company_email_part_2;
     for(var i=0;i<$scope.salary_components.length;i++){
      console.log($scope.salary_components[i]);
      if($scope.salary_components[i].break_down_amount){

      }else{
        $scope.salary_components[i].break_down_amount = 0;
      }
    }   
    console.log('$scope.salary_components-->',$scope.salary_components);
    $scope.employee.gross_amount = $scope.gross_amount;
    $scope.employee.employee_salary_details = $scope.salary_components;
    console.log('$scope.employee.employee_salary_details-->',$scope.employee.employee_salary_details);
    
    console.log(JSON.stringify($scope.employee));

    updateEmployeeDetailService({employee:$scope.employee}).then(function (response) {
            $scope.dismiss();
            $scope.employee = {};
            $scope.sameascurrent = false;
          
            $scope.company_email_part_1 = '';
            console.log("success");
            $('#employeeDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.employee_detail_success = JSON.parse(response.data);
            $scope.onLoadGetEmployeeListing();
           
    },function(res){
        console.log(res);
         $('#employeeDetailError').fadeIn().delay(5000).fadeOut();
         $scope.general_detail_error = "Error!Try Again.";
    });
   };*/

  $scope.delete_employee_detail = function(array,index){
       console.log('array[index].emp_details.user_id',array[index].emp_details.user_id);
       deleteEmployeeDetails({
            user_id : array[index].emp_details.user_id
         
        }).then(function (response) {                   
            console.log('response',response);
              $('#employeeDetailSuccess').fadeIn().delay(5000).fadeOut();
          $scope.employee_detail_success = JSON.parse(response.data);
        },function(res){
            console.log('res',res);
      });
       array.splice(index, 1);        
    };  

    $scope.add_employee_salary_brk_down = function(arr,ind){  
      console.log('arr--->',arr);
      console.log('ind--->',ind);
     // console.log('$scope.salary_components[ind].salary.id  ----------->',$scope.salary_components[ind].salary.id );
      $scope.temporary = 0;
        if($scope.gross_amount != '' && $scope.gross_amount != undefined){
          if(arr[ind].salary.salary == 'BASIC'){
            if($scope.salary_components[ind].salary.id == true){              
              $scope.salary_components[ind].salary.id = true; 
              angular.element(document.getElementById('salary_id_'+ ind))[0].disabled = true;
              $scope.salary_components[ind].index = ind;
              $scope.salary_components[ind].break_down_amount = (arr[ind].salary_rate/100) *  $scope.gross_amount;
              console.log('$scope.salary_components[ind].break_down_amount--->',$scope.salary_components[ind].break_down_amount);
              $scope.salary_configurations.push($scope.salary_components[ind]);            
              console.log('$scope.others_calllllllllllllllllllllllll-------------->',$scope.others_cal);
              if($scope.salary_configurations.length>0){
                for(var j=0;j<$scope.salary_configurations.length;j++){
                   if($scope.salary_configurations[j].type == 'Earning'){
                     $scope.others_cal = $scope.gross_amount - $scope.salary_configurations[j].break_down_amount;
                     }
                }
              }else{
                $scope.others_cal = 0;
              }

              if($scope.salary_allowances.length > 0){
              for(var x=0;x<$scope.salary_allowances.length;x++){
                console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                 if($scope.salary_allowances[x].status == 'active'){
                   $scope.others_cal = (parseFloat($scope.others_cal) - parseFloat($scope.salary_allowances[x].allowance_amount)).toFixed(2); 

                   if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                       console.log('$scope.others_cal-->',$scope.others_cal);
                   }else{
                      $scope.others = 0;
                   }
                 }else{
                   if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                   }else{
                     $scope.others = 0;
                   }
                 }
              } 
            }else{
               if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                   }else{
                     $scope.others = 0;
                   }
            }
             /*Tax Deduction Calculation starts here*/ 

             if($scope.gross_amount<=7500){            
                $scope.pt = 0;
                 $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.pt); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }else if($scope.gross_amount>7500 && $scope.gross_amount<=10000 && $scope.employee.personal_details.gender == 'Female'){
               $scope.pt = 0;
               $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.pt); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }else if($scope.gross_amount>7500 && $scope.gross_amount<=10000 && $scope.employee.personal_details.gender == 'Male'){
                $scope.pt = 175;
                $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.pt); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }else{             
                $scope.pt = 200;
                $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.pt); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }            

             $scope.package = $scope.gross_amount * 12;
             if(0<$scope.package && $scope.package<=250000){             
                $scope.tds = 0;
                $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.tds); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }else if(250000<$scope.package && $scope.package<=500000){               
                $scope.package_under_5 = $scope.package - 250000;
                $scope.tds = (parseFloat((5/100)* $scope.package_under_5)/12).toFixed(2);
                 $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.tds); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }else if(500000<$scope.package && $scope.package<=1000000){                
                $scope.package_under_10 = $scope.package - 250000;
                $scope.package_under_10_part_1 = $scope.package_under_10 - 250000;
              //  $scope.temp = (5/100) * ($scope.package_under_10 - 250000);
                $scope.temp = (5/100) * 250000;
                $scope.temp_1 = (20/100) * $scope.package_under_10_part_1;
                $scope.tds = (parseFloat($scope.temp + $scope.temp_1)/12).toFixed(2);
                 $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.tds); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }else if(1000000<$scope.package){               
                $scope.package_above_10 = $scope.package - 250000;
                console.log(' $scope.package_above_10-->', $scope.package_above_10);
                $scope.package_above_10_part_1 = $scope.package_above_10 - 250000;
                 console.log(' $scope.package_above_10_part_1-->', $scope.package_above_10_part_1);
                $scope.package_above_10_part_2 = $scope.package_above_10_part_1 - 250000;
                 console.log(' $scope.package_above_10_part_2-->', $scope.package_above_10_part_2);
               // $scope.temp = parseFloat((5/100) * ($scope.package_above_10 - 250000)).toFixed(2);
                $scope.temp = parseFloat((5/100) * 250000).toFixed(2);
                console.log(' $scope.temp--->', $scope.temp);
               // $scope.temp_1 = parseFloat((20/100) * ($scope.package_above_part_1 - 250000)).toFixed(2);
                $scope.temp_1 = parseFloat((20/100) * 250000).toFixed(2);
                console.log('$scope.temp_1----->',$scope.temp_1);
              //  $scope.package_above_10_parst_3 = $scope.package_above_part_2 - 250000;
               // $scope.temp_2 = parseFloat((30/100) * ($scope.package_above_part_2 - 250000)).toFixed(2);
                $scope.temp_2 = parseFloat((30/100) * $scope.package_above_10_part_2).toFixed(2);
                console.log('$scope.temp_2 ------>',$scope.temp_2 );
                $scope.tds = ((parseFloat($scope.temp) + parseFloat($scope.temp_1) + parseFloat($scope.temp_2))/12).toFixed(2);
                console.log('$scope.tds------->',$scope.tds);
                 $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.tds); 
                 if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                      console.log('$scope.others_cal-->',$scope.others_cal);
                  }else{
                      $scope.others = 0;
                   }
             }

             /*Tax Deduction Calculation ends here*/
   
        

            }else{
              console.log("false");
              $scope.salary_components[ind].salary.id = false; 
              $scope.salary_components[ind].break_down_amount = 0;
              //$scope.others = 0;              
              var index = $scope.salary_configurations.indexOf($scope.salary_components[ind]);
              $scope.salary_configurations.splice(index, 1);
              console.log('eeeeeeeeeeeeeeeeeee--------',$scope.salary_configurations);
             /* $scope.others_cal = 0;
              console.log('sal_conf length---------------------->',$scope.salary_configurations.length);
              for(var x=0;x<$scope.salary_allowances.length;x++){
                console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                 if($scope.salary_allowances[x].status == 'active'){
                   $scope.others_cal = $scope.others_cal - parseInt($scope.salary_allowances[x].allowance_amount); 
                   console.log('$scope.others_cal-->',$scope.others_cal);
                   if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                   }else{
                     $scope.others = 0;
                   }
                 }else{
                   if($scope.others_cal > 0){
                      $scope.others = $scope.others_cal;
                   }else{
                     $scope.others = 0;
                   }
                 }
              }  */
            }             
            
   
            
          }else{
            if($scope.salary_configurations.length>0){
              console.log('$scope.salary_configurations-->',$scope.salary_configurations);
              console.log('$scope.salary_configurations.length-->',$scope.salary_configurations.length);
              for (var i = 0; i < $scope.salary_configurations.length; i++) {
                  console.log('$scope.salary_configurations[i].salary.salary-->',$scope.salary_configurations[i].salary.salary);

                  console.log('salary component ------->',$scope.salary_components[ind].gross.salary);
                
                    if($scope.salary_configurations[i].salary.salary==$scope.salary_components[ind].gross.salary){
                    
                        if($scope.salary_components[ind].salary.id == true){
                          console.log("true");
                          $scope.salary_components[ind].salary.id = true; 
                          $scope.salary_components[ind].index = ind;
                          $scope.salary_components[ind].break_down_amount =   (parseFloat(arr[ind].salary_rate)/100) * $scope.salary_configurations[i].break_down_amount;
                          $scope.salary_configurations.push($scope.salary_components[ind]);

                          console.log('dddddddddddddddddd--------',$scope.salary_configurations);
                        
                        if($scope.salary_configurations.length>0){
                         for(var j=0;j<$scope.salary_configurations.length;j++){
                           if($scope.salary_configurations[j].type == 'Earning'){
                             $scope.temporary =  parseFloat($scope.temporary) +  parseFloat($scope.salary_configurations[j].break_down_amount);                            
                            }
                         }
                        }else{
                          $scope.others_cal = 0;
                        }

                          $scope.others_cal = (parseFloat($scope.gross_amount) - parseFloat($scope.temporary) - parseFloat($scope.pt) - parseFloat($scope.tds)).toFixed(2);
                          console.log('$scope.others_cal--->',$scope.others_cal);
                           if($scope.salary_allowances.length > 0){
                            for(var x=0;x<$scope.salary_allowances.length;x++){
                            console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                             if($scope.salary_allowances[x].status == 'active'){
                               $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.salary_allowances[x].allowance_amount);
                               console.log('$scope.others_cal-->',$scope.others_cal);
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }else{
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }
                          }
                           }else{
                             if($scope.others_cal > 0){
                                    $scope.others = $scope.others_cal;
                                 }else{
                                   $scope.others = 0;
                                 }
                          }
                          break;
                        }else{
                          console.log('$scope.others_cal------->',$scope.others_cal);
                        //  $scope.others_cal = parseFloat($scope.others_cal) +  parseFloat($scope.salary_components[ind].break_down_amount);
                           console.log('$scope.others_cal------->',$scope.others_cal);
                          console.log("false");
                          console.log('$scope.salary_configurations-->',$scope.salary_configurations);
                          console.log('$scope.salary_components-->',$scope.salary_components[ind]);
                          var index = $scope.salary_configurations.indexOf($scope.salary_components[ind]);
                          console.log('index------>',index);
                          $scope.salary_configurations.splice(index, 1);
                          $scope.salary_components[ind].salary.id = false; 
                          $scope.salary_components[ind].break_down_amount = 0;
                          console.log('eeeeeeeeeeeeeeeeeee--------',$scope.salary_configurations); 
                          console.log('temporary------>',$scope.temporary);
                          if($scope.salary_configurations.length>0){
                              for(var k=0;k<$scope.salary_configurations.length;k++){
                               if($scope.salary_configurations[k].type == 'Earning'){
                                 $scope.temporary =  parseFloat($scope.temporary) +  parseFloat($scope.salary_configurations[k].break_down_amount);                            
                                }
                             }
                          }else{
                             $scope.others_cal = 0;
                          }
                           console.log('temporary------>',$scope.temporary);
                        //  $scope.others_cal = $scope.gross_amount - $scope.temporary;
                            $scope.others_cal = (parseFloat($scope.gross_amount) - parseFloat($scope.temporary) - parseFloat($scope.pt) - parseFloat($scope.tds)).toFixed(2);
                         
                           console.log('others_cal------>',$scope.others_cal);

                          if($scope.salary_allowances.length>0){
                           for(var x=0;x<$scope.salary_allowances.length;x++){
                            console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                             if($scope.salary_allowances[x].status == 'active'){
                               $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.salary_allowances[x].allowance_amount); 
                               console.log('$scope.others_cal-->',$scope.others_cal);
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }else{
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }
                          }
                          }else{
                             if($scope.others_cal > 0){
                                    $scope.others = $scope.others_cal;
                                 }else{
                                   $scope.others = 0;
                                 }
                          }
                          break;
                        }
                         
                    }else if($scope.salary_components[ind].gross.salary == 'Gross'){
                      if($scope.salary_components[ind].salary.id == true){
                          console.log("true");
                          $scope.salary_components[ind].salary.id = true; 
                          $scope.salary_components[ind].index = ind;
                          $scope.salary_components[ind].break_down_amount =   (parseFloat(arr[ind].salary_rate)/100) * $scope.gross_amount;
                          $scope.salary_configurations.push($scope.salary_components[ind]);
                          console.log('dddddddddddddddddd--------',$scope.salary_configurations);
                          if($scope.salary_configurations.length>0){
                          for(var j=0;j<$scope.salary_configurations.length;j++){
                           if($scope.salary_configurations[j].type == 'Earning'){
                             $scope.temporary =  parseFloat($scope.temporary) +  parseFloat($scope.salary_configurations[j].break_down_amount);     
                             console.log('$scope.temporary--->',$scope.temporary);                       
                            }
                         }
                         }else{
                             $scope.others_cal = 0;
                          }
                          //$scope.others_cal = $scope.gross_amount - $scope.temporary;
                           $scope.others_cal = (parseFloat($scope.gross_amount) - parseFloat($scope.temporary) - parseFloat($scope.pt) - parseFloat($scope.tds)).toFixed(2);
                          
                            if($scope.salary_allowances.length>0){
                            console.log('$scope.others_cal--->',$scope.others_cal);
                            for(var x=0;x<$scope.salary_allowances.length;x++){
                            console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                             if($scope.salary_allowances[x].status == 'active'){
                               $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.salary_allowances[x].allowance_amount); 
                               console.log('$scope.others_cal-->',$scope.others_cal);
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }else{
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }
                          }
                           }else{
                             if($scope.others_cal > 0){
                                    $scope.others = $scope.others_cal;
                                 }else{
                                   $scope.others = 0;
                                 }
                          }
                          break;
                        }else{
                          console.log("false");
                          console.log('$scope.salary_components[ind].break_down_amount-->',$scope.salary_components[ind].break_down_amount);
                          var index = $scope.salary_configurations.indexOf($scope.salary_components[ind]);
                          $scope.salary_configurations.splice(index, 1);
                          $scope.salary_components[ind].salary.id = false; 
                          $scope.salary_components[ind].break_down_amount = 0;
                          console.log('eeeeeeeeeeeeeeeeeee--------',$scope.salary_configurations); 
                          console.log($scope.salary_components);
                          for(var j=0;j<$scope.salary_configurations.length;j++){
                           if($scope.salary_configurations[j].type == 'Earning'){
                             $scope.temporary =  parseFloat($scope.temporary) +  parseFloat($scope.salary_configurations[j].break_down_amount);                            
                            }
                         }
                        //  $scope.others_cal = $scope.gross_amount - $scope.temporary;
                           $scope.others_cal = (parseFloat($scope.gross_amount) - parseFloat($scope.temporary) - parseFloat($scope.pt) - parseFloat($scope.tds)).toFixed(2);
                          
                            for(var x=0;x<$scope.salary_allowances.length;x++){
                            console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                             if($scope.salary_allowances[x].status == 'active'){
                               $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.salary_allowances[x].allowance_amount); 
                               console.log('$scope.others_cal-->',$scope.others_cal);
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }else{
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }
                          }
                          break;
                        }
                    }else if($scope.salary_components[ind].salary.salary == 'PF'){
                      if($scope.salary_components[ind].salary.id == true){
                         $scope.cal = 0;
                         var str = $scope.salary_components[ind].gross.salary.split('+'); 
                           for(var l=0;l<str.length;l++){                              
                              var str_trim = str[l].trim();
                              console.log('str_trim-->',str_trim);
                              console.log('str_trim-->',angular.isString(str_trim));
                             
                              for(var m=0;m<$scope.salary_configurations.length;m++){
                                console.log('$scope.salary_configurations--->',$scope.salary_configurations[m].salary.salary);
                                console.log('$scope.salary_configurations--->',angular.isString($scope.salary_configurations[m].salary.salary));
                                
                                if(str_trim == $scope.salary_configurations[m].salary.salary){
                                  console.log('matched---------------',str_trim);   

                                   $scope.cal = parseFloat($scope.cal) + parseFloat($scope.salary_configurations[m].break_down_amount);
                                   console.log(' $scope.cal -->', $scope.cal );  
                                   $scope.salary_components[ind].index = ind;    
                                   $scope.salary_components[ind].break_down_amount = (arr[ind].salary_rate/100) *  $scope.cal;
                                   if(m==0){
                                    $scope.salary_configurations.push($scope.salary_components[ind]);
                                   }
                                  // console.log(JSON.stringify($scope.salary_configurations));
                                   console.log('ppppppppppppppppp--------',$scope.salary_configurations); 

                                   for(var z=0;z<$scope.salary_configurations.length;z++){
                                      if($scope.salary_configurations[z].salary.salary == 'DA'){
                                         angular.element(document.getElementById('salary_id_'+ $scope.salary_configurations[z].index))[0].disabled = true;
                                      }
                                   }     


                                              
                                   break;
                                }else{    
                                    
                                    console.log('not matched-------------',str_trim); 

                                    console.log(JSON.stringify($scope.salary_configurations));
                                      console.log('dddddddddddddddddd--------',$scope.salary_configurations);

                                    if(m==$scope.salary_configurations.length-1){
                                       $scope.cal = 0;
                                       $scope.salary_components[ind].salary.id = false; 
                                       $scope.salary_components[ind].break_down_amount = 0;
                                       var index = $scope.salary_configurations.indexOf($scope.salary_components[ind]);
                                       $scope.salary_configurations.splice(index, 1);
                                       alert("Select "+ str_trim +" First.");

                                    }

                                    //break;
                                }
                              }

                                                if(l==str.length-1){
                                    console.log('parseFloat($scope.salary_components[ind].break_down_amount)---------',parseFloat($scope.salary_components[ind].break_down_amount));
                                      if($scope.salary_configurations.length>0){
                                        for(var j=0;j<$scope.salary_configurations.length;j++){
                                         if($scope.salary_configurations[j].type == 'Earning'){
                                           $scope.temporary =  parseFloat($scope.temporary) +  parseFloat($scope.salary_configurations[j].break_down_amount);     
                                           console.log('$scope.temporary--->',$scope.temporary);                       
                                          }
                                       }
                                     }else{
                                         $scope.others_cal = 0;
                                      }
                                       console.log('$scope.others_cal------------------------------>',$scope.others_cal);
                                      $scope.others_cal = parseFloat($scope.gross_amount) - parseFloat($scope.temporary) - parseFloat($scope.pt) - parseFloat($scope.tds) - parseFloat($scope.salary_components[ind].break_down_amount);
                                      console.log('$scope.others_cal------------------------------>',$scope.others_cal);
                                      // $scope.others_cal = (parseFloat($scope.gross_amount) - parseFloat($scope.temporary) - parseFloat($scope.pt) - parseFloat($scope.tds)).toFixed(2);
                          
                                        if($scope.salary_allowances.length>0){
                                        console.log('$scope.others_cal--->',$scope.others_cal);
                                        for(var x=0;x<$scope.salary_allowances.length;x++){
                                        console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                                         if($scope.salary_allowances[x].status == 'active'){
                                           $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.salary_allowances[x].allowance_amount); 
                                           console.log('$scope.others_cal-->',$scope.others_cal);
                                           if($scope.others_cal > 0){
                                              $scope.others = $scope.others_cal;
                                           }else{
                                             $scope.others = 0;
                                           }
                                         }else{
                                           if($scope.others_cal > 0){
                                              $scope.others = $scope.others_cal;
                                           }else{
                                             $scope.others = 0;
                                           }
                                         }
                                      }
                                       }else{
                                         if($scope.others_cal > 0){
                                                $scope.others = $scope.others_cal;
                                             }else{
                                               $scope.others = 0;
                                             }
                                      }  
                                   }
                           }




                           /*if($scope.cal > 0){  
                              $scope.salary_components[ind].break_down_amount = (arr[ind].salary_rate/100) *  $scope.cal;
                              $scope.salary_configurations.push($scope.salary_components[ind]);
                              console.log('ppppppppppppppppp--------',$scope.salary_configurations);                             
                          }*/
                         /* for(var l=0;l<str.length;l++){
                            console.log("str---",str[l]);
                           for(var m=0;m<$scope.salary_configurations.length;m++){
                                 console.log("inner loop--",m);
                                 console.log("$scope.salary_configurations--",$scope.salary_configurations);
                                if(str[l].trim()==$scope.salary_configurations[m].salary.salary){
                                   console.log(str[l]);
                                   $scope.cal = $scope.cal + $scope.salary_configurations[m].break_down_amount;
                                   break;
                                }else{
                                  console.log(str[l]);
                                    $scope.cal = false;
                                    alert("Select "+ str[l] +" First.");
                                    $scope.salary_components[ind].salary.id = false; 
                                    $scope.salary_components[ind].break_down_amount = 0;
                                    break;
                                }
                             }
                         }
*/
                         /* if($scope.cal != false){  
                              $scope.salary_components[ind].salary.id = true;              
                              $scope.salary_components[ind].break_down_amount = (arr[ind].salary_rate/100) *  $scope.cal;
                              $scope.salary_configurations.push($scope.salary_components[ind]);        
                              break;
                          }*/
                          break;
                        }else{
                         // $scope.pf_amt =  parseFloat($scope.salary_components[ind].break_down_amount);
                         
                          var index = $scope.salary_configurations.indexOf(arr[ind]);
                          $scope.salary_configurations.splice(index, 1);
                          $scope.salary_components[ind].salary.id = false;
                          $scope.salary_components[ind].break_down_amount = 0;
                           console.log('ppppppppppppppppp--------',$scope.salary_configurations); 
                           for(var z=0;z<$scope.salary_configurations.length;z++){
                                      if($scope.salary_configurations[z].salary.salary == 'DA'){
                                         angular.element(document.getElementById('salary_id_'+ $scope.salary_configurations[z].index))[0].disabled = false;
                                      }
                                   } 
                                   for(var j=0;j<$scope.salary_configurations.length;j++){
                           if($scope.salary_configurations[j].type == 'Earning'){
                             $scope.temporary =  parseFloat($scope.temporary) +  parseFloat($scope.salary_configurations[j].break_down_amount);                            
                            }
                         }
                         console.log(' $scope.others_cal pf uncheck--------------->', $scope.others_cal);
                          //$scope.others_cal = $scope.gross_amount - $scope.temporary;
                           $scope.others_cal = (parseFloat($scope.gross_amount) - parseFloat($scope.temporary) - parseFloat($scope.pt) - parseFloat($scope.tds)).toFixed(2);
                           console.log(' $scope.others_cal pf uncheck--------------->', $scope.others_cal);
                            for(var x=0;x<$scope.salary_allowances.length;x++){
                            console.log('$scope.salary_allowances.length-->',$scope.salary_allowances.length);
                             if($scope.salary_allowances[x].status == 'active'){
                               $scope.others_cal = parseFloat($scope.others_cal) - parseFloat($scope.salary_allowances[x].allowance_amount); 
                               console.log('$scope.others_cal-->',$scope.others_cal);
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }else{
                               if($scope.others_cal > 0){
                                  $scope.others = $scope.others_cal;
                               }else{
                                 $scope.others = 0;
                               }
                             }
                          }   
                           break;
                        }

                    }else{
                      console.log('$scope.salary_components[ind].gross.salary-->',$scope.salary_components[ind].gross.salary);
                      console.log('$scope.salary_configurations[i].salary.salary-->',$scope.salary_configurations[i].salary.salary);

                       if(i==$scope.salary_configurations.length-1){
                        alert("Select "+ $scope.salary_components[ind].gross.salary +" First.");
                        $scope.salary_components[ind].salary.id = false; 
                       } 
       
                      
                      
                    }
                  }
            }else{
              alert("Please Select the BASIC First.");
              $scope.salary_components[ind].salary.id = false;
              console.log("error");
            }
          }       
       }else{
          $scope.salary_components[ind].salary.id = false;
          alert("Please Enter the Gross Salary of the Employee.");
       }
    };

    $scope.allowance_cal = 0;
    $scope.add_employee_salary_allowance = function(arr,ind){
      console.log('arr----------------------------------->',arr);
      console.log('ind----------------------------------->',ind);
     // console.log('document.getElementById(arr[ind].id).checked----------------------->',document.getElementById(arr[ind].id).checked);
       if($scope.gross_amount != '' && $scope.gross_amount != undefined){ 
       console.log("checkbox value---------->",arr[ind].id);   
         if(arr[ind].id == true){
          // $scope.salary_allowances[ind].id = arr[ind].id;
           console.log('if called');
            arr[ind].status = "active";
             console.log('others_cal' , $scope.others_cal);
            if($scope.others_cal == 0){
                  $scope.allowance_cal = parseFloat($scope.gross_amount) - parseFloat(arr[ind].allowance_amount);
                 if($scope.allowance_cal > 0){
                          $scope.others = $scope.allowance_cal;
                          $scope.others_cal = $scope.allowance_cal;
                       }else{
                         $scope.others = 0;
                       }
            }else{
              $scope.others_cal = parseFloat($scope.others_cal) - parseFloat(arr[ind].allowance_amount);
             if($scope.others_cal > 0){
                          $scope.others = $scope.others_cal;
                       }else{
                         $scope.others = 0;
                       }
            }

         }else{
          console.log('else called');
          arr[ind].status = "inactive";
          if($scope.others_cal == 0){
             $scope.others=0;
          }else{
                
              $scope.others_cal = parseFloat($scope.others_cal) + parseFloat(arr[ind].allowance_amount);
              if($scope.others_cal > 0){
                $scope.others = $scope.others_cal;
              }else{
                $scope.others = 0;
             }
           }          
        }
       }else{
          arr[ind].id = false;
          alert("Please Enter the Gross Salary of the Employee.");
       }
       
    };

    $scope.reset_employee_salary_details = function(){
         $scope.salary_configurations = [];
         $scope.others = '';
         $scope.pt = '';
         $scope.tds = '';

         for(var i=0;i<$scope.salary_components.length;i++){
           $scope.salary_components[i].salary.id = '';
           $scope.salary_components[i].break_down_amount = '';
           if($scope.salary_components[i].salary.salary == 'BASIC'){
                console.log('BASIC');
                angular.element(document.getElementById('salary_id_'+ i))[0].disabled = false;
            }else if($scope.salary_components[i].salary.salary == 'DA'){
                console.log('BASIC');
                angular.element(document.getElementById('salary_id_'+ i))[0].disabled = false;
            }        
       }

       for(var j=0;j<$scope.salary_allowances.length;j++){
            $scope.salary_allowances[j].id = '';
       }
    };
}]);