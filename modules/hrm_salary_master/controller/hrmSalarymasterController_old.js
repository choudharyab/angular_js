var hrmSalaryMasterModule = angular.module('hrmSalaryMasterModule',[])
hrmSalaryMasterModule.controller('hrmSalaryMasterController',['$rootScope','$scope','$location','$http','getHrmSalaryComponentListing','saveHrmSalaryComponentService','saveSalaryConfigurationService','getSalaryConfigurationListing',function($rootScope,$scope,$location,$http,getHrmSalaryComponentListing,saveHrmSalaryComponentService,saveSalaryConfigurationService,getSalaryConfigurationListing){
	

   $scope.onLoadGetSalaryConfiguration = function(){
        getSalaryConfigurationListing({}).then(function (response) {
            console.log('res-->', response);
            $scope.add_salary_component.components = response.data;
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
 /*Department listing*/
 $scope.add_salary_component = {'components':[{'salary_type_id':'','salary_rate':'','gross_id':''}]};
  
 $scope.add_more_component = function () {
  console.log("add called");
        $scope.add_salary_component.components.push({'salary_type_id':'','salary_rate':'','gross_id':''});
    };
    $scope.remove_component =function (index) {
        $scope.add_salary_component.components.splice(index,1);
    };


  /*$scope.calculate_salary = function(arr,ind){
    $cal_salary = (arr.salary_rate/100)* arr.gross;
    $scope.add_salary_component.components[ind].total = $cal_salary;
  };
*/

  $scope.save_salary_configuration = function(){
    //console.log('JSON.stringify-->',JSON.stringify($scope.add_salary_component));
    console.log((JSON.parse(JSON.stringify($scope.add_salary_component))).components[0].salary_type_id);
    console.log($scope.add_salary_component);
    console.log($scope.add_salary_component.components);
    console.log($scope.add_salary_component.components[0]);
   /* saveSalaryConfigurationService({components:$scope.add_salary_component.components}).then(function (response) {
            console.log("success");
            $scope.add_salary_component = {};
            $('#generalDetailSuccess').fadeIn().delay(5000).fadeOut();
            $scope.general_detail_success = JSON.parse(response.data);
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

           // $scope.add_salary_component = JSON.parse($scope.add_salary_component);
   
    var res = $http.post(appUrl+'add_salary_configuration?token='+localStorage.getItem('token'),$scope.add_salary_component,{
    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    });
   
    res.success(function(data, status, headers, config) {
    
      $scope.message = data;
      console.log("success");
    });
    res.error(function(data, status, headers, config) {
      console.log("Error");
     
    }); 
   };

  

	
}]);



