var hrmLeaveFeedbackModule=angular.module('hrmLeaveFeedbackModule',[]);
hrmLeaveFeedbackModule.controller('hrmLeaveFeedbackController',['$rootScope','$scope','$location','getHrmLeaveTypeListing','saveHrmLeaveTypeService',
  'getHrmLeaveStatusListing','saveHrmLeaveStatusService','getHrmLeaveFeedbackListing','saveHrmLeaveFeedbackService','getHrmGeneralCategoryListing',
  'getHrmGeneralDesignationListing','getHrmLeaveCrmFeedbackListing','saveHrmLeaveCrmFeedbackService','deleteHRMMasterDetails','saveLeaveConfiguration',
  function($rootScope,$scope,$location,getHrmLeaveTypeListing,saveHrmLeaveTypeService,getHrmLeaveStatusListing,saveHrmLeaveStatusService,getHrmLeaveFeedbackListing,
    veHrmLeaveFeedbackService,getHrmGeneralCategoryListing,getHrmGeneralDesignationListing,getHrmLeaveCrmFeedbackListing,saveHrmLeaveCrmFeedbackService,
    deleteHRMMasterDetails,saveLeaveConfiguration){
	
	
	/*Leave Type Listing*/
 	$scope.hrm_leave_type_listing = function () {
       getHrmLeaveTypeListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_leave_type_lists = response.data;
       });
   };
   $scope.hrm_leave_type_listing();

	$scope.save_hrm_leave_type = function (){  
        saveHrmLeaveTypeService({leave_type:$scope.leave_type}).then(function (response) {
            $scope.leave_type = '';
            $('#leavefeedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.leave_feedback_success = JSON.parse(response.data);
            $scope.hrm_leave_type_listing();
           
    },function(res){
        console.log(res);
        $('#leavefeedbackError').fadeIn().delay(5000).fadeOut();
        $scope.leave_feedback_error = "Error!Try Again.";
    });
  };
 
     $scope.delete_hrm_leave_master = function(array,index,master_type){
       console.log('master_type--->',master_type);
       deleteHRMMasterDetails({
            id : array[index].id,
            type : master_type
        }).then(function (response) {                   
            console.log('response',response);
            $('#leavefeedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.leave_feedback_success = JSON.parse(response.data);
        },function(res){
            console.log('res',res);
      });
       array.splice(index, 1);        
    };  
/*Leave Type Listing*/

/*Leave Status Listing*/
 	$scope.hrm_leave_status_listing = function () {
       getHrmLeaveStatusListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_leave_status_lists = response.data;
       });
   };
   $scope.hrm_leave_status_listing();

	$scope.save_hrm_leave_status = function (){  
        saveHrmLeaveStatusService({leave_status:$scope.leave_status}).then(function (response) {
            $scope.leave_status = '';
            $('#leavefeedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.leave_feedback_success = JSON.parse(response.data);
            $scope.hrm_leave_status_listing();
           
    },function(res){
        console.log(res);
        $('#leavefeedbackError').fadeIn().delay(5000).fadeOut();
        $scope.leave_feedback_error = "Error!Try Again.";
    });
  };
 
/*Leave Status Listing*/

/*Leave Feedback Listing*/
 	$scope.hrm_leave_feedback_listing = function () {
       getHrmLeaveFeedbackListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_leave_feedback_lists = response.data;
       });
   };
   $scope.hrm_leave_feedback_listing();

	$scope.save_hrm_leave_feedback = function (){  
        saveHrmLeaveFeedbackService({feedback:$scope.leave_feedback}).then(function (response) {
            $scope.leave_feedback = '';
            $('#leavefeedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.leave_feedback_success = JSON.parse(response.data);
            $scope.hrm_leave_feedback_listing();
           
    },function(res){
        console.log(res);
        $('#leavefeedbackError').fadeIn().delay(5000).fadeOut();
        $scope.leave_feedback_error = "Error!Try Again.";
    });
  };
 
/*Leave Feedback Listing*/

/*Leave CRM Feedback Listing*/
  $scope.hrm_leave_crm_feedback_listing = function () {
       getHrmLeaveCrmFeedbackListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_leave_crm_feedback_lists = response.data;
       });
   };
   $scope.hrm_leave_crm_feedback_listing();

  $scope.save_hrm_leave_crm_feedback = function (){  
        saveHrmLeaveCrmFeedbackService({crm_feedback:$scope.leave_crm_feedback}).then(function (response) {
            $scope.leave_crm_feedback = '';
            $('#leavefeedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.leave_feedback_success = JSON.parse(response.data);
            $scope.hrm_leave_crm_feedback_listing();           
    },function(res){
        console.log(res);
        $('#leavefeedbackError').fadeIn().delay(5000).fadeOut();
        $scope.leave_feedback_error = "Error!Try Again.";
    });
  };
 
/*Leave CRM Feedback Listing*/


$scope.hrm_general_category_listing = function () {
       getHrmGeneralCategoryListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_category_lists = response.data;
       });
   };
   $scope.hrm_general_category_listing();

    $scope.hrm_general_designation_listing = function () {
       getHrmGeneralDesignationListing({}).then(function (response) {
          console.log('res-->', response);
            $scope.hrm_general_designation_lists = response.data;
       });
   };
   $scope.hrm_general_designation_listing();

   $scope.add_leave_conf_component = {'components':[{'leave_type_id':'','designation_id':'','days':'','emp_type':''}]};
  
 $scope.add_more_component = function () {
  console.log("add called");
        $scope.add_leave_conf_component.components.push({'leave_type_id':'','designation_id':'','days':'','emp_type':''});
    };
    $scope.remove_component =function (index) {
        $scope.add_leave_conf_component.components.splice(index,1);
    };
/*$scope.reset_conf_components = function(){
        $scope.add_leave_conf_component.components=[{'leave_type_id':'','designation_id':'','days':'','emp_type':''}];
    };*/
$scope.save_hrm_leave_configuration=function(){
  saveLeaveConfiguration({
    leave_assign_data:$scope.add_leave_conf_component.components
  }).then(function (response) {
            $('#leavefeedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.leave_feedback_success = JSON.parse(response.data);
            /*for(var i=0;i<$scope.add_leave_conf_component.components.length;i++)
            {
              $scope.add_leave_conf_component.components[i].leave_type_id='';
              $scope.add_leave_conf_component.components[i].designation_id='';
              $scope.add_leave_conf_component.components[i].days='';
              $scope.add_leave_conf_component.components[i].emp_type='';
            }*/
            //$scope.reset_conf_components();
                      
    },function(res){
        console.log(res);
        $('#leavefeedbackError').fadeIn().delay(5000).fadeOut();
        $scope.leave_feedback_error = "Error!Try Again.";
    });
}

}]);



