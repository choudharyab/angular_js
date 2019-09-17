var hrmMasterModule = angular.module('hrmMasterModule',[])
hrmMasterModule.controller('hrmMasterController',['$rootScope','$scope','$location','getHrmGeneralDepartmentListing','saveHrmGeneralDepartmentService','getHrmGeneralDesignationListing','saveHrmGeneralDesignationService','getHrmGeneralCategoryListing','saveHrmGeneralCategoryService','getHrmGeneralProbationPeriodListing','saveHrmGeneralProbationPeriodService','getHrmGeneralNoticePeriodListing','saveHrmGeneralNoticePeriodService','getHrmGeneralMaritalStatusListing','saveHrmGeneralMaritalStatusService','getHrmGeneralBloodGroupListing','saveHrmGeneralBloodGroupService','getHrmGeneralReasonTypeListing','saveHrmGeneralReasonTypeService','getHrmGeneralCompanyEmailListing','saveHrmGeneralCompanyEmailService','deleteHRMMasterDetails',function($rootScope,$scope,$location,getHrmGeneralDepartmentListing,saveHrmGeneralDepartmentService,getHrmGeneralDesignationListing,saveHrmGeneralDesignationService,getHrmGeneralCategoryListing,saveHrmGeneralCategoryService,getHrmGeneralProbationPeriodListing,saveHrmGeneralProbationPeriodService,getHrmGeneralNoticePeriodListing,saveHrmGeneralNoticePeriodService,getHrmGeneralMaritalStatusListing,saveHrmGeneralMaritalStatusService,getHrmGeneralBloodGroupListing,saveHrmGeneralBloodGroupService,getHrmGeneralReasonTypeListing,saveHrmGeneralReasonTypeService,getHrmGeneralCompanyEmailListing,saveHrmGeneralCompanyEmailService,deleteHRMMasterDetails){
	
 	$scope.hrm_general_department_listing = function () {
    getHrmGeneralDepartmentListing({}).then(function (response) {
      console.log('res-->', response);
      $scope.hrm_general_department_lists = response.data;
    });
  };
  $scope.hrm_general_department_listing();

	$scope.save_hrm_department = function (){  
		saveHrmGeneralDepartmentService({department:$scope.department_name}).then(function (response) {
      console.log(response);
      $scope.department_name = '';
      $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
      $scope.general_detail_success = JSON.parse(response.data);
      $scope.hrm_general_department_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };

  $scope.delete_hrm_general_master = function(array,index,master_type){
       console.log('master_type--->',master_type);
       deleteHRMMasterDetails({
            id : array[index].id,
            type : master_type
        }).then(function (response) {                   
            console.log('response',response);
            $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.general_detail_success = JSON.parse(response.data);
        },function(res){
            console.log('res',res);
      });
       array.splice(index, 1);        
    };  
 
 	$scope.hrm_general_designation_listing = function () {
    getHrmGeneralDesignationListing({}).then(function (response) {
    	console.log('res-->', response);
      $scope.hrm_general_designation_lists = response.data;
    });
  };
  $scope.hrm_general_designation_listing();

	$scope.save_hrm_designation = function (){  
    saveHrmGeneralDesignationService({designation:$scope.designation_name}).then(function (response) {
      $scope.designation_name = '';
        $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_success = JSON.parse(response.data);
        $scope.hrm_general_designation_listing();
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };

 	$scope.hrm_general_category_listing = function () {
    getHrmGeneralCategoryListing({}).then(function (response) {
   		console.log('res-->', response);
      $scope.hrm_general_category_lists = response.data;
    });
  };
  $scope.hrm_general_category_listing();

	$scope.save_hrm_category = function (){  
        saveHrmGeneralCategoryService({category:$scope.category_name}).then(function (response) {
           $scope.category_name = '';
           $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
           $scope.general_detail_success = JSON.parse(response.data);
           $scope.hrm_general_category_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };
 
	
 	$scope.hrm_general_probation_period_listing = function () {
       getHrmGeneralProbationPeriodListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_general_probation_period_lists = response.data;
       });
   };
   $scope.hrm_general_probation_period_listing();

	$scope.save_hrm_probation_period = function (){  
        saveHrmGeneralProbationPeriodService({probation_period:$scope.probation_period + 'Month(s)'}).then(function (response) {
            $scope.probation_period = '';
            $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.general_detail_success = JSON.parse(response.data);
            $scope.hrm_general_probation_period_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };
 /*Probation Period listing*/

 /*Notice Period listing*/
	
 	$scope.hrm_general_notice_period_listing = function () {
       getHrmGeneralNoticePeriodListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_general_notice_period_lists = response.data;
       });
   };
   $scope.hrm_general_notice_period_listing();

	$scope.save_hrm_notice_period = function (){  
        saveHrmGeneralNoticePeriodService({notice_period:$scope.notice_period + 'Month(s)'}).then(function (response) {
           $scope.notice_period = '';
           $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
           $scope.general_detail_success = JSON.parse(response.data);
           $scope.hrm_general_notice_period_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };
 /*Notice Period listing*/

 /*Company Email listing*/
	
 	$scope.hrm_general_company_email_listing = function () {
       getHrmGeneralCompanyEmailListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_general_company_email_lists = response.data;
       });
   };
   $scope.hrm_general_company_email_listing();

	$scope.save_hrm_company_email = function (){  
        saveHrmGeneralCompanyEmailService({company_email:$scope.company_email}).then(function (response) {
           $scope.company_email = '';
           $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
           $scope.general_detail_success = JSON.parse(response.data);
            $scope.hrm_general_company_email_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };
 /*Company Email listing*/

 /*Marital Status listing*/
	
 	$scope.hrm_general_marital_status_listing = function () {
       getHrmGeneralMaritalStatusListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_general_marital_status_lists = response.data;
       });
   };
   $scope.hrm_general_marital_status_listing();

	$scope.save_hrm_marital_status = function (){  
        saveHrmGeneralMaritalStatusService({marital_status:$scope.marital_status}).then(function (response) {
             $scope.marital_status = '';
            $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
           $scope.general_detail_success = JSON.parse(response.data);
            $scope.hrm_general_marital_status_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };
 /*Marital Status listing*/

 /*Blood Group listing*/
	
 	$scope.hrm_general_blood_group_listing = function () {
       getHrmGeneralBloodGroupListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_general_blood_group_lists = response.data;
       });
   };
   $scope.hrm_general_blood_group_listing();

	$scope.save_hrm_blood_group = function (){  
        saveHrmGeneralBloodGroupService({blood_group:$scope.blood_group}).then(function (response) {
           $scope.blood_group = '';
           $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
           $scope.general_detail_success = JSON.parse(response.data);
           $scope.hrm_general_blood_group_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };
 /*Blood Group listing*/


/*Reason Type listing*/
	
 	$scope.hrm_general_reason_type_listing = function () {
       getHrmGeneralReasonTypeListing({}).then(function (response) {
       		console.log('res-->', response);
            $scope.hrm_general_reason_type_lists = response.data;
       });
   };
   $scope.hrm_general_reason_type_listing();

	$scope.save_hrm_reason_type = function (){  
        saveHrmGeneralReasonTypeService({reason_type:$scope.reason_type}).then(function (response) {
           $scope.reason_type = '';
           $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
           $scope.general_detail_success = JSON.parse(response.data);
            $scope.hrm_general_reason_type_listing();
           
    },function(res){
        console.log(res);
        $('#generalDetailError').fadeIn().delay(5000).fadeOut();
        $scope.general_detail_error = "Error!Try Again.";
    });
  };
 /*Reason Type listing*/


	
}]);



