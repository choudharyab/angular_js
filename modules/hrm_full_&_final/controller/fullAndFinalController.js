var hrmFullNFinalModule = angular.module('hrmFullNFinalModule',[]);
hrmFullNFinalModule.controller('fullAndFinalController',['$rootScope','$scope','$location','$route','$filter','$timeout','getFullNFinalListing','empdetailforfnf',
  'getHrmGeneralReasonTypeListing','saveFullNFinalService','deleteFullNFinalService','editFullNFinalDetails','updateFullNFinalService','commonService',
  function($rootScope,$scope,$location,$route,$filter,$timeout,getFullNFinalListing,empdetailforfnf,getHrmGeneralReasonTypeListing,saveFullNFinalService,deleteFullNFinalService,
    editFullNFinalDetails,updateFullNFinalService,check_permission){
	$scope.full_and_final = {'assets':[]};
	$scope.full_and_final.fnf_date=$filter('date')(new Date(),'yyyy-MM-dd');
	var auto_employee_arr;
//	$scope.asset_details={};
$scope.active_lable = false;
 $scope.empty_form_fields = function(){
    console.log('empty_form_fields called');
    $scope.form_field = true;
    $scope.full_and_final = {'assets':[]};
    $scope.full_and_final.fnf_date=$filter('date')(new Date(),'yyyy-MM-dd');
    $scope.auto_employee_id = '';
    $scope.emp_name='';
    $scope.emp_category='';           
    $scope.emp_deparment='';      
    $scope.emp_designation='';
    $scope.date_of_joining='';
     $route.reload();
  };

	$scope.onLoadGetFullNFinalListing = function(){
        getFullNFinalListing({}).then(function (response) {
            console.log('full_n_final_lists res-->', response);
            $scope.full_n_final_lists = response.data;
       });
    };  
    $scope.onLoadGetFullNFinalListing();
   
   	/*$scope.$watch('auto_employee_id',function () {
        empdetailforfnf({
            term:$scope.auto_employee_id
        }).then(function (res) {
        	for(var g=0;g<res.data.length;g++){
        		res.data[g].value = res.data[g].employee_id; 
        	}
            auto_employee_arr=res.data;
            console.log('auto_employee_arr-->',auto_employee_arr);
            $scope.getId();
        })
        
   });*/

	  /*$scope.getId=function () {
        $('#auto_emp_id').autocomplete({
            source:auto_employee_arr,
            select:function (event,ui) {
                console.log('ui-->',ui);
                $scope.auto_employee_id=ui.item.value;
                $scope.emp_id=ui.item.employee_id;
                $scope.full_and_final.user_id=ui.item.user_id;
                $scope.emp_name=ui.item.user.uname;
               // $scope.add_full_n_final.category_id=ui.item.category.id;
                $scope.emp_category=ui.item.category.category;              
             //   $scope.add_full_n_final.department_id=ui.item.department.id;
                $scope.emp_deparment=ui.item.department.department;            
               // $scope.add_full_n_final.designation_id=ui.item.designation.id;
                $scope.emp_designation=ui.item.designation.designation;
             //   $scope.add_full_n_final.date_of_joining=ui.item.date_of_joining;
                $scope.date_of_joining=ui.item.date_of_joining;
                
                $scope.full_and_final.gross_salary =  ui.item.salaries[0].gross_amount;
                
                $scope.asset_lists = ui.item.assets;
               // console.log('$scope.asset_lists-->',$scope.asset_lists.length);
               // console.log('ui.item.assets.length-->',ui.item.assets.length);
               for(var i=0;i<ui.item.assets.length;i++){
                 console.log('$scope.asset_lists[i]-->',$scope.asset_lists[i]);
                // $scope.asset_details = ui.item.assets[i];
                 $scope.full_and_final.assets.push(ui.item.assets[i]);
               }
               console.log($scope.full_and_final.assets);
            }
        })
    };*/

    $scope.searchEmployee = function(){
      empdetailforfnf({term:$scope.auto_employee_id}).then(function (res) {
            for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].employee_id; 
          }
            auto_employee_arr=res.data;
            $scope.getId();
        },function (res) {
            $scope.emp_name='';
            $scope.emp_category='';
            $scope.emp_deparment='';
            $scope.emp_designation='';
            $scope.date_of_joining='';
            $scope.full_and_final.assets=[];
        });
    }

    //Function to get lead data 
  /*$scope.getLead = function(){
    $('#auto_lead_id').autocomplete({
            source:auto_lead_array,
            select:function (event,ui) {
              //console.log(ui)
            $scope.Lead.company_name = ui.item.company_name;
              $scope.Lead.contact_person = ui.item.contact_person;
              $scope.Lead.contact_number = ui.item.contact_no;
              $scope.Lead.email_id = ui.item.email_id;
              $scope.Lead.lead_id = ui.item.id;
            }
        });
  }*/


    $scope.getId=function () {
            $('#auto_emp_id').autocomplete({
                source:auto_employee_arr,
                select:function (event,ui) {
                    console.log('------------>>',ui);
                    $scope.auto_employee_id=ui.item.employee_id;
                    console.log('~~~~~~~~~~~~~~~~>>',$scope.auto_employee_id);
                    $scope.emp_id=ui.item.employee_id;
                    $scope.full_and_final.user_id=ui.item.user_id;
                    for(var key in ui.item.user){
                      if(key!=null){
                        $scope.emp_name=ui.item.user.uname;
                      }
                      else{
                            $scope.emp_name='';
                      }
                    }
                    for(var key in ui.item.category){
                        if(key!=null){
                          $scope.emp_category=ui.item.category.category;
                            //$scope.full_and_final.category_id=ui.item.category.id;
                        }
                        else{
                            $scope.emp_category=" ";
                        }
                    }
                    for(var key in ui.item.department){
                        if(key!=null){
                          $scope.emp_deparment=ui.item.department.department;
                            //$scope.full_and_final.department_id=ui.item.department.id;
                        }
                        else{
                            $scope.emp_deparment='';
                        }
                    }
                    for(var key in ui.item.designation){
                        if(key!=null){
                          $scope.emp_designation=ui.item.designation.designation;
                            //$scope.full_and_final.designation_id=ui.item.designation.id;
                        }
                        else{
                            $scope.emp_designation='';
                        }
                    }
                    $scope.date_of_joining=ui.item.date_of_joining;
                    
                    for(var i=0;i<ui.item.assets.length;i++){
                 
                 $scope.full_and_final.assets.push(ui.item.assets[i]);
               }
                    for(var key in ui.item.salaries){
                        if(key!=null){

                            $scope.full_and_final.gross_salary=ui.item.salaries[0].gross_amount;
                        }
                        else{
                            $scope.full_and_final.gross_salary='';
                        }
                    }
                }
            })
        };

 	$scope.hrm_general_reason_type_listing = function () {
       getHrmGeneralReasonTypeListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_general_reason_type_lists = response.data;
       });
   };
   $scope.hrm_general_reason_type_listing();

   $scope.save_full_n_final = function(){
       console.log($scope.full_and_final);
       /* saveFullNFinalService({full_n_final : $scope.full_and_final}).then(function (response) { 
        console.log("success");                   
       });*/
       saveFullNFinalService({full_n_final:$scope.full_and_final}).then(function (response) {
          console.log(response);
          $scope.dismiss();
          $scope.full_and_final = {'assets':[]};
          $scope.auto_employee_id = '';
          $scope.emp_name='';
          $scope.emp_category='';           
          $scope.emp_deparment='';      
          $scope.emp_designation='';
          $scope.date_of_joining='';
          $('#fullnfinalDetailSuccess').fadeIn().delay(5000).fadeOut();
          $scope.full_n_final_detail_success = JSON.parse(response.data);
          $scope.onLoadGetFullNFinalListing();
        },function(res){
        console.log(res);
       });
   };

   $scope.delete_full_n_final = function(array,index){
       console.log('array[index].emp_details.user_id',array[index].id);
       deleteFullNFinalService({
            fnf_id : array[index].id         
        }).then(function (response) {                   
            console.log('response',response);
            $('#fullnfinalDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.full_n_final_detail_success = JSON.parse(response.data);
        },function(res){
            console.log('res',res);
      });
       array.splice(index, 1);        
    };  

    $scope.edit_full_n_final_Detail = function(fnf_id){
    $scope.form_field = false;
    console.log('fnf_id-->',fnf_id);    
    $rootScope.fnf_id = fnf_id;
   
    editFullNFinalDetails({fnf_id:fnf_id}).then(function (response) {
       console.log('editFullNFinalDetails-->',response.data);
       $scope.full_and_final = response.data[0];

       for(var key in $scope.full_and_final){
                     if(key!=null){
                       $scope.emp_name=$scope.full_and_final.uname;
                     }
                     else{
                           $scope.emp_name='';
                     }
                   }
                   for(var key in $scope.full_and_final.emp_details.category){
                       if(key!=null){
                         $scope.emp_category=$scope.full_and_final.emp_details.category.category;
                           //$scope.full_and_final.category_id=ui.item.category.id;
                       }
                       else{
                           $scope.emp_category=" ";
                       }
                   }
                   for(var key in $scope.full_and_final.emp_details.department){
                       if(key!=null){
                         $scope.emp_deparment=$scope.full_and_final.emp_details.department.department;
                           //$scope.full_and_final.department_id=ui.item.department.id;
                       }
                       else{
                           $scope.emp_deparment='';
                       }
                   }
                   for(var key in $scope.full_and_final.emp_details.designation){
                       if(key!=null){
                         $scope.emp_designation=$scope.full_and_final.emp_details.designation.designation;
                           //$scope.full_and_final.designation_id=ui.item.designation.id;
                       }
                       else{
                           $scope.emp_designation='';
                       }
                   }
                   $scope.date_of_joining=$scope.full_and_final.emp_details.date_of_joining;
                   $scope.full_and_final.assets = response.data[0].fnf_assets;
                   
                   /*for(var i=0;i<$scope.full_and_final.fnf_assets.length;i++){
               
                $scope.full_and_final.assets.push($scope.full_and_final.fnf_assets[i]);
              }*/

              /*$scope.full_and_final.gross_salary=*/
       /*$scope.auto_employee_id = response.data[0].emp_details.employee_id;
       $scope.emp_name=response.data[0].user.uname;
       $scope.emp_category=response.data[0].emp_details.category.category;          
       $scope.emp_deparment=response.data[0].emp_details.department.department;      
       $scope.emp_designation=response.data[0].emp_details.designation.designation;
       $scope.date_of_joining=response.data[0].emp_details.date_of_joining;
       $scope.full_and_final.assets = response.data[0].fnf_assets;*/
        $scope.active_lable = true;
       /*for(var j=0;j<response.data[0].fnf_assets.length;j++){
         console.log(response.data[0].fnf_assets[j].emp_asset);
         $scope.full_and_final.assets.push(response.data[0].fnf_assets[j].emp_asset);
       }*/
      },function(res){
       console.log(res);        
   });
  };

   $scope.calculate_payable_amount = function(){
     $scope.full_and_final.payable_amount = $scope.full_and_final.gross_salary - $scope.full_and_final.total_deduction;
   };
   //$scope.calculate_payable_amount();
   $scope.update_full_n_final = function(){
       $scope.full_and_final.fnf_id = $rootScope.fnf_id;
      console.log('JSON.stringify-->',JSON.stringify($scope.full_and_final));
       updateFullNFinalService({full_n_final:$scope.full_and_final}).then(function (response) {
          console.log(response);
          $scope.dismiss();
          $scope.full_and_final = {'assets':[]};
          $scope.auto_employee_id = '';
          $scope.emp_name='';
          $scope.emp_category='';           
          $scope.emp_deparment='';      
          $scope.emp_designation='';
          $scope.date_of_joining='';
          $('#fullnfinalDetailSuccess').fadeIn().delay(5000).fadeOut();
          $scope.full_n_final_detail_success = JSON.parse(response.data);
          $scope.onLoadGetFullNFinalListing();
        },function(res){
        console.log(res);
       });
   };
$scope.current_modal = "full_n_final";
    $scope.full_n_final_permission_popup = function (po_id,po_status,po_type) {
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
            $scope.onLoadGetFullNFinalListing();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_full_n_final_Detail(data.id);
            $('#example2').modal('show');
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.onLoadGetFullNFinalListing();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#fullnfinalDetailSuccess').fadeIn().delay(5000).fadeOut();
          $scope.full_n_final_detail_success = JSON.parse(response.data);
            
            }
        }
    });

}]);



