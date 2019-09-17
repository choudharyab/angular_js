var leadManagementModule = angular.module('leadManagementModule',[]);
leadManagementModule.controller('leadManagementController',['$rootScope','$scope','$location','$route','$filter','listLeadManagement','addLeadService','showLeadService',
    'deleteLeadService','editLeadService','commonService','saveFollowSheet','getEmployeeAutocompleteForFollowUpSheet',
    function($rootScope,$scope,$location,$route,$filter,listLeadManagement,addLeadService,showLeadService,deleteLeadService,editLeadService,check_permission,
        saveFollowSheet,getEmployeeAutocompleteForFollowUpSheet){
	var token = localStorage.getItem('token');

    // Variables
    $scope.showLoadmore = true;
    $scope.row = 0;
    $scope.rowperpage = 3;
    $scope.buttonText = "Load More";
    $scope.emp_id='';
    $scope.followup_deal_status=false;
	//Function to show list of lead
    $scope.listLeadManagement=function () {
    	//$('.loading').show();
		listLeadManagement({row:$scope.row,rowperpage:$scope.rowperpage}).then(function (response) {
            $scope.leadData = response.data;
			//console.log($scope.leadData);
          //$('.loading').hide();
           /* if(response.data !='' ){
                // Increment row position
                $scope.row+=$scope.rowperpage;
                if($scope.leadData != undefined){
                 $scope.buttonText = "Loading ...";
                 // Set Delay
                 setTimeout(function() {
                  $scope.$apply(function(){
                   // Append data to $scope.posts
                   angular.forEach(response.data,function(item) {
                    $scope.leadData.push(item);
                   });
                   $scope.buttonText = "Load More";
                  });
                 },500);
             
                }else{
                 $scope.leadData = response.data;
                }
            }else{
                $scope.showLoadmore = false;
            }*/
            

	    },function(response){
	    	console.log(response);
	    })
    };
    $scope.listLeadManagement();

    $scope.get_lead_by1=function(){
        getEmployeeAutocompleteForFollowUpSheet({
            term:$scope.add_lead.lead_by
        }).then(function (res) {
            for(var g=0;g<res.data.length;g++){
                res.data[g].value = res.data[g].value;
            }
            emp_name_arr = res.data;
            $scope.get_lead_name1();
        });
    }
     $scope.get_lead_name1 = function () {
         $('#auto_lead_id1').autocomplete({
             source:emp_name_arr,
             select:function (event,ui) {
                  $scope.add_lead.lead_by_id= ui.item.id;
                  console.log($scope.add_lead.lead_by_id);
                 $scope.add_lead.lead_by=ui.item.value;
                // $scope.basic_salary=ui.item.basic;
                // $scope.gross_salary=ui.item.gross;
                 //$scope.get_customer_status_details();
             }
         });
     };

     $scope.get_lead_by2=function(){
        getEmployeeAutocompleteForFollowUpSheet({
            term:$scope.update_lead.lead_by
        }).then(function (res) {
            for(var g=0;g<res.data.length;g++){
                res.data[g].value = res.data[g].value;
            }
            emp_name_arr = res.data;
            $scope.get_lead_name2();
        });
    }
     $scope.get_lead_name2 = function () {
         $('#auto_lead_id2').autocomplete({
             source:emp_name_arr,
             select:function (event,ui) {
                  $scope.update_lead.lead_by_id= ui.item.id;
                //   console.log('user_id',user_id);
                 $scope.update_lead.lead_by=ui.item.value;
                // $scope.basic_salary=ui.item.basic;
                // $scope.gross_salary=ui.item.gross;
                 //$scope.get_customer_status_details();
             }
         });
     };
    
    
    //Function to add data of lead
    $scope.addLead = function(){
        addLeadService({
            lead_info:$scope.add_lead
        }).then(function (response) {
        	$('#example3').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.listLeadManagement();
            $scope.add_lead = {};
            $('#leadSuccess').fadeIn().delay(5000).fadeOut();
            $scope.lead_success = "Lead Added Successfully";
            $scope.lead_error = "";
        },function (response) {
            $scope.lead_success= '';
            $('#leadError').fadeIn().delay(5000).fadeOut();
            $scope.lead_error = response.data.error[0];
        });
    }

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.listLeadManagement();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#delete_lead').fadeIn().delay(5000).fadeOut();
                $scope.delete_lead_msg = 'Lead Deleted Successfully';
            }
        }
    });

    $scope.current_modal = "production_lead_generation";
    $scope.lead_permission_popup = function (lead_id,lead_status,lead_type) {
        $('#generate_password').modal('show');
        check_permission.check_status(lead_id,lead_status,lead_type,$scope.current_modal);
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
            $scope.modal_dismiss_two();
			$scope.active_lable = true;
            showLeadService({
                lead_id:data.id
            }).then(function (response) {
                $rootScope.update_lead = response.data;
                $('#example2').modal('show');
            },function (response) {
                console.log(response);
            });
        }
    });
    $scope.get_data_by_id=function(id){
        $scope.active_lable = true;
            showLeadService({
                lead_id:id
            }).then(function (response) {
                $rootScope.update_lead = response.data;
            },function (response) {
                console.log(response)
            });
    }
    var lead_id;
    $scope.get_lead_data_by_id=function(id,deal_status){
        if(deal_status=='true'){
            $('#approve_msg').modal('show');
        }else{
            lead_id=id;
            $scope.date=$filter('date')(new Date(),'yyyy-MM-dd');
            $scope.time=$filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss a');
            $scope.time_of_issue=$scope.time.split(' ')[1];
            showLeadService({
                lead_id:id
            }).then(function (response) {
                $scope.lead_data = response.data;
                $scope.auto_lead_code=response.data.lead_number;
                $scope.company_name=response.data.company_name;
            },function (response) {
                console.log(response)
            });
            $('#add_follow_up').modal('show');
        }
        
    }

	//Function to edit single data of lead
	$scope.editLead = function(){
        editLeadService({
            lead_info:$scope.update_lead
        }).then(function (response) {
        	$('#example2').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.listLeadManagement();
            $('#leadSuccess').fadeIn().delay(5000).fadeOut();
            $scope.lead_success = "Lead updated Successfully";
            $scope.lead_error = "";
        },function (response) {
            $scope.lead_success= '';
            $('#leadError').fadeIn().delay(5000).fadeOut();
            $scope.lead_error = response.data.error[0];
        });
    }

    $scope.save_follow_up_sheet=function () {
        //console.log('QQQQQQQQQQQQQQQQQQQ');
        saveFollowSheet({
        date:$scope.date,
       	time:$scope.time_of_issue,
       	lead_no:$scope.auto_lead_code,
       	follow_up_by:$scope.follow_up_by,
       	company_name:$scope.company_name,
       	contact_to:$scope.contacted_to,
       	interation_details:$scope.interaction_details,
        next_scheduled_date:$scope.next_schedule,
        lead_id:lead_id,
        followup_deal_status:$scope.followup_deal_status,
        emp_id:$scope.emp_id,
        type:'lead_followup'
        }).then(function (response) {
            console.log(response);
            $scope.time_of_issue='';
            $scope.auto_lead_code='';
            $scope.follow_up_by='';
            $scope.company_name='';
            $scope.contacted_to='';
            $scope.interaction_details='';
            $scope.next_schedule='';
            $scope.followup_deal_status='';
            $scope.listLeadManagement();
            $scope.modal_dismiss_two();
        },function (response) {
            console.log(response);
        })

    };

    $scope.delete_lead_data=function (id) {
        //console.log('QQQQQQQQQQQQQQQQQQQ');
        deleteLeadService({
        	lead_id:id
        }).then(function (response) {
            console.log(response.data);
            
            $scope.listLeadManagement();
        },function (response) {
            console.log(response);
        })

    };
    var emp_name_arr;

    $scope.get_emp=function(){
        getEmployeeAutocompleteForFollowUpSheet({
            term:$scope.follow_up_by
        }).then(function (res) {
            for(var g=0;g<res.data.length;g++){
                res.data[g].value = res.data[g].value;
            }
            emp_name_arr = res.data;
            $scope.get_emp_name();
        });
    }
     $scope.get_emp_name = function () {
         $('#auto_emp_code_id').autocomplete({
             source:emp_name_arr,
             select:function (event,ui) {
                  $scope.emp_id= ui.item.id;
                //   console.log('user_id',user_id);
                 $scope.follow_up_by=ui.item.value;
                // $scope.basic_salary=ui.item.basic;
                // $scope.gross_salary=ui.item.gross;
                 //$scope.get_customer_status_details();
             }
         });
     };

     

     $scope.check_status=function(){
         console.log($scope.followup_deal_status);
     }

     $scope.view_follow_up_record=function(data){
         $scope.follow_up_data=data;
         $('#follow_up_details').modal('show');
     }
}]);



