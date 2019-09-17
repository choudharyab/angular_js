var attendanceModule= angular.module('attendanceModule',[])
attendanceModule.controller('attendanceController',['$rootScope','$scope','$route','$location','$http','$filter','warehouseService','addAttendanceService',
  'attendancelistingService','empnameService','deleteService','getEmployeeData','getAttendanceData',
  function($rootScope,$scope,$route,$location,$http,$filter,warehouseService,addAttendanceService,attendancelistingService,empnameService,
    deleteService,getEmployeeData,getAttendanceData){
	
  $scope.add_attandance={};
  $scope.att_data=[{'emp_id':''}];
  //$scope.att_data.details={'emp_id':''};
  $scope.employee_lists = '';
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

$scope.$watch('get_time_issue',function () {
       console.log($scope.overtime_hrs);
});

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
  $('.loading').show();
  getAttendanceData({
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
      $('.loading').hide();
  },function(response){
    console.log(response);
  })
  };
  $scope.attendance_listing();

	$scope.addattendance=function(){
    console.log($scope.add_attandance);
		addAttendanceService({
      date: $scope.date,
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

	$scope.click_attendance=function()
  {
 			$scope.add_attandance = {};
      $scope.auto_emp_name='';
      $scope.emp_deparment='';
      $scope.emp_designation='';
      $route.reload();
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

$scope.searchEmployee = function()
 /*$scope.$watch('auto_emp_name',function ()*/ {
 	console.log($scope.auto_emp_name);
        empnameService({
            term:$scope.auto_emp_name
        }).then(function (res) {

           for(var r=0;r<res.data.length;r++){
            	res.data[r].value = res.data[r].value;	
            }
             auto_emp_arr=res.data;
             console.log(res.data);
           // $scope.getname();
           console.log("function called");
        $('#auto_name').autocomplete({
            source:auto_emp_arr,
            select:function (event,ui) {
            	
                $scope.auto_emp_name=ui.item.value;
                console.log('@@@@@@@@@@@@@@@@@@@@@@@',ui.item.value);
                $scope.add_attandance.user_id=ui.item.id;
              
                /*$scope.add_attandance.department_id=ui.item.emp_details.department.id;
                $scope.emp_deparment=ui.item.emp_details.department.department;            
                $scope.add_attandance.designation_id=ui.item.emp_details.designation.id;
                $scope.emp_designation=ui.item.emp_details.designation.designation;*/

                for(var key in ui.item.department){
                      if(key!=null){
                        $scope.emp_deparment=ui.item.department.department;
                      }
                      else{
                            $scope.emp_deparment='';
                      }
                    }
                    for(var key in ui.item.designation){
                        if(key!=null){
                          $scope.emp_designation=ui.item.designation.designation;
                            //$scope.full_and_final.category_id=ui.item.category.id;
                        }
                        else{
                            $scope.emp_designation='';
                        }
                    }
            }
        })
        })
        
   };


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
$scope.get_employee_data = function(){
  getEmployeeData({}).then(function (response) {
        console.log('res-->', response);
        // for(var i=0;i<response.data.length;i++){
        //   response.data[i].overtime_hours='';
        //   response.data[i].double_shift='';
        // }
        $scope.employee_lists = response.data;

   });
};  
$scope.get_employee_data();

// $scope.get_attendance_data = function(){
//   getAttendanceData({}).then(function (response) {
//         console.log('res-->', response.data);
//         // for(var i=0;i<response.data.length;i++){
//         //   response.data[i].overtime_hours='';
//         //   response.data[i].double_shift='';
//         // }
//         $scope.attendance_list = response.data;

//    });
// };  
// $scope.get_attendance_data();
   
   $scope.checkAll=function (employee_data) {
    console.log('$scope.selectedAll---->',$scope.selectedAll);
    if ($scope.selectedAll == '' || $scope.selectedAll == false || $scope.selectedAll == undefined) {
        $scope.att_array = [];
        $scope.selected_att_array = [];
        $scope.selectedAll = true;

        angular.forEach($scope.employee_lists, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log('$scope.employee_lists--------->',$scope.employee_lists);
        for(var i=0;i<employee_data.length;i++){
            $scope.att_obj={
                'emp_id':employee_data[i].id,
                // //'emp_code':employee_data[i].emp_details.employee_id,
                // 'emp_name':employee_data[i].first_name,
                // 'overtime_hrs':employee_data[i].overtime_hrs,
                // 'double_shift':employee_data[i].double_shift,
                // 'att_status':'P'
            };
            $scope.att_array.push($scope.att_obj);
            $scope.selected_att_array.push($scope.att_obj.emp_id);
        }

        console.log('$scope.selected_att_array--------->',$scope.selected_att_array);

        for(var j=0;j<$scope.employee_lists.length;j++){
            document.getElementById('att_check_'+$scope.employee_lists[j].id).checked = true;
            if(document.getElementById('att_check_'+$scope.employee_lists[j].id).checked == true){
              $scope.employee_lists[j].att_status='P';
            }else{
              $scope.employee_lists[j].att_status='A';
            }
        }
    } else {
        $scope.selectedAll = false;
        angular.forEach($scope.employee_lists, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log('$scope.employee_lists--------->',$scope.employee_lists);
        $scope.selected_att_array = [];
        $scope.att_array = [];

        for(var k=0;k<$scope.employee_lists.length;k++){
            document.getElementById('att_check_'+$scope.employee_lists[k].id).checked = false;
            if(document.getElementById('att_check_'+$scope.employee_lists[k].id).checked == false){
              $scope.employee_lists[k].att_status='A';
              $scope.employee_lists[k].overtime_hrs='';
              $scope.employee_lists[k].double_shift='';
            }else{
              $scope.employee_lists[k].att_status='P';
            }
        }
        console.log('$scope.selected_att_array--------->',$scope.selected_att_array);

    }
};

$scope.selected_att_array = [];
        $scope.att_array = [];
        $scope.add_selected_att = function (data,index) {
          
            if($scope.selected_att_array.indexOf(data.id) <= -1){

                $scope.att_obj={
                  'emp_id':data.id,
                  // //'emp_code':data.emp_details.employee_id,
                  // 'emp_name':data.first_name,
                  // 'overtime_hrs':data.overtime_hrs,
                  // 'double_shift':data.double_shift,
                  // 'att_status':'P'
              };
                $scope.selected_att_array.push(data.id);
                $scope.att_array.push($scope.att_obj);
                console.log('$scope.att_array--------->',$scope.att_array);
                $scope.att_obj = {};
                if($scope.employee_lists.length == $scope.selected_att_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;

                }

                  if(document.getElementById('att_check_'+$scope.employee_lists[index].id).checked == true){
                    $scope.employee_lists[index].att_status='P';
                  }else{
                    $scope.employee_lists[index].att_status='A';
                  }
              

            }else{
                $scope.att_array.splice($scope.att_array.indexOf(data.id),1);
                $scope.selected_att_array.splice($scope.selected_att_array.indexOf(data.id),1);
                if(document.getElementById('att_check_'+$scope.employee_lists[index].id).checked == false){
                  $scope.employee_lists[index].att_status='A';
                  $scope.employee_lists[index].overtime_hrs='';
                  $scope.employee_lists[index].double_shift='';
                }else{
                  $scope.employee_lists[index].att_status='P';
                }

                if($scope.employee_lists.length == $scope.selected_att_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }

            }
        };
        var emp_id,ind;
        $scope.add_overtime_shift=function(index,id){
          emp_id=id;
          ind=index;
          console.log(ind);
        }

        $scope.save_shift_data=function(){
          console.log($scope.employee_lists[ind]);
          //for(var i=0;i<$scope.employee_lists.length;i++){
            $scope.emp_data=$scope.employee_lists;
            if($scope.emp_data[ind].Selected==true){
              $scope.emp_data[ind].overtime_hrs=$scope.overtime_hrs;
              $scope.emp_data[ind].double_shift=$scope.double_shift;
            }else{
              // $scope.emp_data[ind].overtime_hrs=$scope.overtime_hrs;
              // $scope.emp_data[ind].double_shift=$scope.double_shift;
            }
            
            console.log($scope.employee_lists);
            $scope.employee_lists=$scope.emp_data;
            $scope.modal_dismiss_two();
            //$scope.get_employee_data();
          //}
        }
        
        $scope.save_attendance=function(){
          // for(var j=0;j<$scope.employee_lists.length;j++){
          //   $scope.att_data[j].emp_id=$scope.employee_lists[j].id;
          //   //$scope.att_data.details[j].emp_code=$scope.employee_lists[j].emp_details.employee_id;
          //   $scope.att_data[j].emp_name=$scope.employee_lists[j].first_name;
          //   $scope.att_data[j].overtime_hrs=$scope.employee_lists[j].overtime_hrs;
          //   $scope.att_data[j].double_shift=$scope.employee_lists[j].double_shift;
          //   $scope.att_data[j].att_status=$scope.employee_lists[j].att_status;
          // }
          // for(var i=0;i<$scope.employee_lists.length;i++){

          // }
          addAttendanceService({
            date: $scope.date,
            attendance :$scope.employee_lists
          }).then(function(response){
             $scope.modal_dismiss_two();
             $scope.attendance_listing();
             $location.path('/hrm_attendance');
          },function(response){
            console.log(response);
          })
        }
}]);



