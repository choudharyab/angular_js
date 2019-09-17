var attendanceModule= angular.module('attendanceModule',[])
attendanceModule.controller('attendanceController',['$rootScope','$scope','$location','$http','warehouseService','addAttendanceService',
  'attendancelistingService','empnameService','deleteService',
	function($rootScope,$scope,$location,$http,warehouseService,addAttendanceService,attendancelistingService,empnameService,deleteService){
	
	$scope.add_attandance={};
	var auto_emp_arr;
	var employee_department_id;
	var employee_designation_id;
  $scope.attendance=[];
  $scope.hide_year=true;
  $scope.hide_month=true;
  $scope.hide_quater=true;
  $scope.on_type_click=function(){
    if($scope.type=='year'){
      $scope.hide_year=false;
      $scope.hide_month=true;
      $scope.hide_quater=true;
    }
    else if($scope.type=='month'){
      $scope.hide_month=false;
      $scope.hide_year=false;
      $scope.hide_quater=true;
    }
    else if($scope.type=='quater'){
      $scope.hide_quater=false;
      $scope.hide_year=false;
      $scope.hide_month=true;
    }
    else{
      $scope.hide_year=true;
      $scope.hide_month=true;
      $scope.hide_quater=true;
    }
  }
var array=[];
var year,quarter;
$scope.attendance_listing=function(){
  if($scope.select_year!=null){
    console.log('$scope.select_year',$scope.select_year);
    year=$scope.select_year;
    $scope.from_year=year.split('-')[0];
    $scope.to_year=20 + year.split('-')[1];
    console.log('$scope.from_year',$scope.from_year);
    console.log('$scope.to_year',$scope.to_year);
  }/*else{
    $scope.attendance.from_year='';
    $scope.attendance.to_year='';
  }*/
  if($scope.select_quarter!=null){
    quarter=$scope.select_quarter;
    $scope.from_month=quarter.split('-')[0];
    $scope.to_month=quarter.split('-')[1];
    console.log('$scope.from_month',$scope.from_month);
    console.log('$scope.to_month',$scope.to_month);
  }/*else{
    $scope.attendance.from_month='';
    $scope.attendance.to_month='';
  }*/
  if($scope.select_month!=null){
    $scope.month=$scope.select_month;
  }/*else{
    $scope.attendance.month='';
  }*/
  console.log('selected_month',$scope.select_month);
    attendancelistingService({
      from_date:$scope.from_date,
      to_date:$scope.to_date,
      from_month:$scope.from_month,
      to_month:$scope.to_month,
      month:$scope.month,
      from_year:$scope.from_year,
      to_year:$scope.to_year
      /*attendance:$scope.attendance*/
    }).then(function(response){
      console.log(response);
      $scope.attendance_list=response.data;
  },function(response){
    console.log(response);
  })
  };
  $scope.attendance_listing();

	$scope.addattendance=function(){
		console.log($scope.add_attandance);
		addAttendanceService({
			attendance :$scope.add_attandance
		}).then(function(response){
			 $scope.modal_dismiss_two();
			 $scope.attendance_listing();
			$scope.add_attandance='';
		   $scope.emp_deparment='';
            $scope.emp_designation='';
             $('#attendancesuccess').fadeIn().delay(5000).fadeOut();
            $scope.attendance_success = " Added Successfully";
		},function(response){
			console.log(response);
		})
	};

	$scope.click_attendance=function(){
 			$scope.add_attandance = {};
            $scope.auto_emp_name='';
            $scope.emp_deparment='';
            $scope.emp_designation='';
};

    $scope.warehouslist=function(){
		warehouseService({}).then(function(response){
			console.log(response);
			$scope.warehouse_list=response.data;
		},function(response){
			console.log(response);
		})
	};
	$scope.warehouslist();

 $scope.$watch('auto_emp_name',function () {
 	console.log($scope.auto_emp_name);
        empnameService({
            term:$scope.auto_emp_name
        }).then(function (res) {

           for(var r=0;r<res.data.length;r++){
            	res.data[r].value = res.data[r].uname;	
            }
             auto_emp_arr=res.data;
             console.log(res.data);
           // $scope.getname();
           console.log("function called");
        $('#auto_name').autocomplete({
            source:auto_emp_arr,
            select:function (event,ui) {
            	
                $scope.auto_emp_name=ui.item.value;
                $scope.add_attandance.user_id=ui.item.id;
              
                $scope.add_attandance.department_id=ui.item.emp_details.department.id;
                $scope.emp_deparment=ui.item.emp_details.department.department;            
                $scope.add_attandance.designation_id=ui.item.emp_details.designation.id;
                $scope.emp_designation=ui.item.emp_details.designation.designation;
            }
        })
        })
        
   });


 $scope.deleteAttendanceTerm = function (delete_id) {
        deleteService({
            attendance_id:delete_id
        }).then(function (res) {
            console.log(res);
            $scope.attendance_listing();
        },function (res) {
            console.log(res);
        })
    }

    $scope.files = [];
    //Get Image Files
    $scope.$on("selectedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });
    $scope.upload_excel_file=function(){
      $http({
           method: 'POST',
           url: appUrl+'import_attendance?token='+localStorage.getItem('token'),
           headers: { 'Content-Type': undefined },
           transformRequest: function (data) {
               var formData = new FormData();
               //formData.append("employee", angular.toJson(data.model));
               /*formData.append("employee",data.model);*/
               for (var i = 0; i < data.files.length; i++) {
                   //console.log(data.files[i]);
                   formData.append('csv_file', data.files[i]);
               }
               
               return formData;
           },
           data: {files: $scope.files}
       }).
       success(function (data, status, headers, config) {
           console.log('JSON-->',JSON.stringify(data));
           //console.log('data---->',data);
           console.log("success!");
           $scope.dismiss();
       }).
       error(function (data, status, headers, config) {
           console.log('data---->',data);
           console.log("failed!");
       });

   };
    

}]);



