var crmFollowSheetModule=angular.module('crmFollowSheetModule',[]);
crmFollowSheetModule.controller('crmFollowSheetController',['$rootScope','$scope','$location','$filter','$route','addFollowSheet','leadAutoCompleteService',
	'getFollowSheet','deleteFollowUp','getFollowUpById','EditFollowUp','getEmployeeAutocompleteForFollowUpSheet','leadDataByLeadId',
    function($rootScope,$scope,$location,$filter,$route,addFollowSheet,leadAutoCompleteService,getFollowSheet,deleteFollowUp,getFollowUpById,EditFollowUp,
        getEmployeeAutocompleteForFollowUpSheet,leadDataByLeadId){

var auto_lead_array;
$scope.emp_id='';
$scope.date=$filter('date')(new Date(),'yyyy-MM-dd');
$scope.time=$filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss a');
$scope.time_of_issue=$scope.time.split(' ')[1];
console.log('$scope.time',$scope.time_of_issue);

	$scope.hide_save=false;
	$scope.hide_update=true;
    $scope.payment_status='Pending';
	var follow_id;
	$scope.add_btn_click=function(){
			$scope.hide_save=false;
			$scope.hide_update=true;
            $scope.auto_lead_code='';
            $scope.follow_up_by='';
            $scope.company_name='';
            $scope.contacted_to='';
            $scope.interaction_details='';
            $scope.next_schedule='';
            $scope.time_of_issue=$filter('date')(new Date(),'h:mma');
			//$scope.time_of_issue=$scope.time.split(' ')[1];
}

       $scope.searchLead = function(){
    	leadAutoCompleteService({term:$scope.auto_lead_code}).then(function (res) {
            auto_lead_array = res.data;
            $scope.getLead();
        },function (res) {
            $scope.company_name = '';
           
        });
    }

    //Function to get lead data 
	$scope.getLead = function(){
		$('#auto_lead_id').autocomplete({
            source:auto_lead_array,
            select:function (event,ui) {
                //console.log(ui)
                $scope.lead_id=ui.item.id;
      			$scope.company_name = ui.item.company_name;
            	$scope.contact_person = ui.item.contact_person;
            	$scope.contact_number = ui.item.contact_no;
            	$scope.email_id = ui.item.email_id;
            	$scope.lead_id = ui.item.id;
            }
        });
    };

	$scope.get_follow_up_sheet=function () {
        //console.log('QQQQQQQQQQQQQQQQQQQ');
        getFollowSheet({}).then(function (response) {
            console.log(response.data);
            $scope.follow_up=response.data.followup_listing;
        },function (response) {
            console.log(response);
        })

    };
    $scope.get_follow_up_sheet();

    var lead_id;
    $scope.get_lead_data_by_id=function(id,payment_status){
        console.log('clicked');
        if(payment_status=='Received'){
            $('#approve_msg').modal('show');
        }else{
            lead_id=id;
            $scope.date=$filter('date')(new Date(),'yyyy-MM-dd');
            $scope.time=$filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss a');
            $scope.time_of_issue=$scope.time.split(' ')[1];
            $scope.payment_status=payment_status;
            leadDataByLeadId({
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

   $scope.save_follow_up_sheet=function () {
        //console.log('QQQQQQQQQQQQQQQQQQQ');
        addFollowSheet({
            emp_id:$scope.emp_id,
            lead_id:lead_id,
        date:$scope.date,
       	time:$scope.time_of_issue,
       	lead_no:$scope.auto_lead_code,
       	follow_up_by:$scope.follow_up_by,
       	company_name:$scope.company_name,
       	contact_to:$scope.contacted_to,
       	interation_details:$scope.interaction_details,
           next_scheduled_date:$scope.next_schedule,
           payment_status:$scope.payment_status,
           type:'payment_followup'
        }).then(function (response) {
            console.log(response);
            $scope.get_follow_up_sheet();
            $scope.time_of_issue='';
            $scope.auto_lead_code='';
            $scope.follow_up_by='';
            $scope.company_name='';
            $scope.contacted_to='';
            $scope.interaction_details='';
            $scope.next_schedule='';
            $scope.modal_dismiss_two();
        },function (response) {
            console.log(response);
        })

    };
    $scope.delete_follow_up=function (id) {
        //console.log('QQQQQQQQQQQQQQQQQQQ');
        deleteFollowUp({
        	id:id
        }).then(function (response) {
            console.log(response.data);
            
            $scope.get_follow_up_sheet();
        },function (response) {
            console.log(response);
        })

    };
    $scope.get_follow_up_by_id=function(id){
    	$scope.hide_save=true;
			$scope.hide_update=false;
			follow_id=id;
    	getFollowUpById({
        	id:id
        }).then(function (response) {
            console.log(response.data);
            $scope.get_data=response.data[0];
            $scope.date=$scope.get_data.date;
            $scope.time_of_issue=$scope.get_data.time;
            $scope.auto_lead_code=$scope.get_data.lead_no;
            $scope.follow_up_by=$scope.get_data.follow_up_by;
            $scope.company_name=$scope.get_data.company_name;
            $scope.contacted_to=$scope.get_data.contact_to;
            $scope.interaction_details=$scope.get_data.interation_details;
            $scope.next_schedule=$scope.get_data.next_scheduled_date;
            $scope.payment_status=$scope.get_data.payment_status;
        },function (response) {
            console.log(response);
        })
    };

    $scope.edit_follow_up_sheet=function () {
        
        EditFollowUp({
            emp_id:$scope.emp_id,
        	id:follow_id,
        date:$scope.date,
       	time:$scope.time_of_issue,
       	lead_no:$scope.auto_lead_code,
       	follow_up_by:$scope.follow_up_by,
       	company_name:$scope.company_name,
       	contact_to:$scope.contacted_to,
       	interation_details:$scope.interaction_details,
           next_scheduled_date:$scope.next_schedule,
           payment_status:$scope.payment_status
        }).then(function (response) {
            console.log(response);
            $scope.get_follow_up_sheet();
            $scope.time_of_issue='';
            $scope.auto_lead_code='';
            $scope.follow_up_by='';
            $scope.company_name='';
            $scope.contacted_to='';
            $scope.interaction_details='';
            $scope.next_schedule='';
            $scope.dismiss();
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
                  console.log($scope.emp_id);
                //   console.log('user_id',user_id);
                 $scope.follow_up_by=ui.item.value;
                // $scope.basic_salary=ui.item.basic;
                // $scope.gross_salary=ui.item.gross;
                 //$scope.get_customer_status_details();
             }
         });
     };

     $scope.view_follow_up_record=function(data){
        $scope.follow_up_data=data;
        $('#follow_up_details').modal('show');
    }
}]);