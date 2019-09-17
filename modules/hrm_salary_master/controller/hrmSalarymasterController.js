var hrmSalaryMasterModule = angular.module('hrmSalaryMasterModule',[]);
hrmSalaryMasterModule.controller('hrmSalaryMasterController',['$rootScope','$scope','$location','$http','getHrmSalaryComponentListing','saveHrmSalaryComponentService','saveHrmSalaryConfigurationService','getSalaryConfigurationListing','deleteHRMMasterDetails',function($rootScope,$scope,$location,$http,getHrmSalaryComponentListing,saveHrmSalaryComponentService,saveHrmSalaryConfigurationService,getSalaryConfigurationListing,deleteHRMMasterDetails){
	
  $scope.onLoadGetSalaryConfiguration = function(){
    getSalaryConfigurationListing({}).then(function (response) {
      console.log('res-->', response);   
      $scope.add_salary_component.components = response.data.salary_configuration;
      $scope.add_salary_component.allowances = response.data.allowance;   
    });
  };  
  $scope.onLoadGetSalaryConfiguration();

/*Salary Component listing*/
	$scope.hrm_salary_component_listing = function () {
    getHrmSalaryComponentListing({}).then(function (response) {
    	console.log('res-->', response);
      $scope.hrm_salary_component_lists = response.data;
    });
  };
  $scope.hrm_salary_component_listing();

	$scope.save_hrm_salary_component = function (){  
    saveHrmSalaryComponentService({salary:$scope.salary_component}).then(function (response) {
      $scope.salary_component = '';
      $('#salarySuccess').fadeIn().delay(5000).fadeOut();
      $scope.salary_success = JSON.parse(response.data);
      $scope.hrm_salary_component_listing();           
    },function(res){
      console.log(res);
      $('#salaryError').fadeIn().delay(5000).fadeOut();
      $scope.salary_error = "Error!Try Again.";
    });
  };

   $scope.delete_hrm_salary_master = function(array,index,master_type){
       console.log('master_type--->',master_type);
       deleteHRMMasterDetails({
            id : array[index].id,
            type : master_type
        }).then(function (response) {                   
            console.log('response',response);
             $('#salarySuccess').fadeIn().delay(5000).fadeOut();
             $scope.salary_success = JSON.parse(response.data);
        },function(res){
            console.log('res',res);
      });
       array.splice(index, 1);        
    };  
 /*Salary Component listing*/

  $scope.add_salary_component ={components: [{'salary_type_id':'','salary_rate':'','gross_id':'','type':''}]};
  
  $scope.add_more_component = function () {
        $scope.add_salary_component.components.push({'salary_type_id':'','salary_rate':'','gross_id':'','type':''});
  };

  $scope.remove_component =function (index) {
        $scope.add_salary_component.components.splice(index,1);
  };

  /*$scope.calculate_salary = function(arr,ind){
    $cal_salary = (arr.salary_rate/100)* arr.gross;
    $scope.add_salary_component.components[ind].total = $cal_salary;
  };
*/

/**/
$scope.add_salary_component.allowances = [{'allowance':'','allowance_amount':'','type':''}];  
  $scope.add_more_allowance_component = function () {
        $scope.add_salary_component.allowances.push({'allowance':'','allowance_amount':'','type':''});
  };

  $scope.remove_allowance_component =function (index) {
        $scope.add_salary_component.allowances.splice(index,1);
  };
/**/

  $scope.save_salary_configuration = function(){

   for(var i=0;i<$scope.add_salary_component.allowances.length;i++){
     $scope.add_salary_component.allowances[i].type = 'Earning';
   } 
  
   for(var g=0;g<$scope.add_salary_component.components.length;g++){
      if($scope.add_salary_component.components[g].gross || $scope.add_salary_component.components[g].salary){
          delete $scope.add_salary_component.components[g].gross;
          delete $scope.add_salary_component.components[g].salary;
      }
   }
    console.log('$scope.add_salary_component-->',$scope.add_salary_component);
    console.log(JSON.stringify($scope.add_salary_component));

    saveHrmSalaryConfigurationService({components:$scope.add_salary_component}).then(function (res) {
      console.log(res);
        $('#salarySuccess').fadeIn().delay(5000).fadeOut();
        $scope.salary_success = JSON.parse(res.data);
       $scope.onLoadGetSalaryConfiguration();
    },function (res) {
      console.log(res);
      $('#salaryError').fadeIn().delay(5000).fadeOut();
      $scope.salary_error = "Error!Try Again.";
    })


  /*   saveSalaryConfigurationService({components:$scope.add_salary_component}).then(function (response) {
            $scope.add_salary_component = {};
          /!*  $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.general_detail_success = JSON.parse(response.data);*!/
            $scope.onLoadGetSalaryConfiguration();
           
    },function(res){
        console.log(res);
    });*/
   /*  $scope.demo = $scope.add_salary_component;

     $http.post(appUrl+'add_salary_configuration?token='+localStorage.getItem('token')+'&components='+$scope.add_salary_component)
            .success(function (data, status, headers, config) {
            $scope.add_salary_component = {};
            $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.general_detail_success = JSON.parse(response.data);
            $scope.onLoadGetSalaryConfiguration();
            })
            .error(function (data, status, header, config) {
              console.log(data);
            });*/
   };

  

	
}]);



