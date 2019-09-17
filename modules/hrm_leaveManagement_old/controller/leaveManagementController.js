var leaveManagementModule =angular.module('leaveManagementModule',[]);
leaveManagementModule.controller('leaveManagementController',['$rootScope','$scope','$location','$filter','getleavelist','leavetype','empdetail',
    'addLeaveServive','getTypeService','getDateService','getLeaveStatus',
	function($rootScope,$scope,$location,$filter,getleavelist,leavetype,empdetail,addLeaveServive,getTypeService,getDateService,getLeaveStatus){
	
	var auto_employee_arr;
	var employee_user_id;
	var employee_department_id;
	var employee_category_id;
	var employee_designation_id;
	$scope.add_leave={};
	$scope.current_date=$filter('date')(new Date(),'yyyy-MM-dd');
	$scope.getleavelisting=function () {
		getleavelist({}).then(function (response) {
			//console.location("sfsd");
			console.log(response);
			$scope.leave_list=response.data;	
	    },function(response){
	    	console.log(response);
	    })
  };
  $scope.getleavelisting();

	$scope.gettype=function(){
		leavetype({}).then(function(response){
			console.log(response);
			$scope.type_list=response.data;

		},function(response){
			console.log(response);
		})
	};
	$scope.gettype();

	/*$scope.$watch('auto_employee_id',function () {
		$scope.reset_all=function(){
			$scope.emp_name='';
			$scope.emp_category='';
			$scope.emp_deparment='';
			$scope.emp_designation='';
		}
        empdetail({
            term:$scope.auto_employee_id
        }).then(function (res) {
        	for(var g=0;g<res.data.length;g++){
        		res.data[g].value = res.data[g].employee_id; 
        	}
            auto_employee_arr=res.data;
            $scope.getId();
        })
       
   });*/

	  $scope.searchEmployee = function(){
      empdetail({term:$scope.auto_employee_id}).then(function (res) {
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
        });
    }

    $scope.getId=function () {
            $('#auto_emp_id').autocomplete({
                source:auto_employee_arr,
                select:function (event,ui) {
                    console.log('------------>>',ui);
                    $scope.auto_employee_id=ui.item.employee_id;
                    console.log('~~~~~~~~~~~~~~~~>>',$scope.auto_employee_id);
                    $scope.emp_id=ui.item.employee_id;
                    $scope.add_leave.user_id=ui.item.user_id;
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
                            $scope.add_leave.category_id=ui.item.category.id;
                        }
                        else{
                            $scope.emp_category=" ";
                        }
                    }
                    for(var key in ui.item.department){
                        if(key!=null){
                        	$scope.emp_deparment=ui.item.department.department;
                            $scope.add_leave.department_id=ui.item.department.id;
                        }
                        else{
                            $scope.emp_deparment='';
                        }
                    }
                    for(var key in ui.item.designation){
                        if(key!=null){
                        	$scope.emp_designation=ui.item.designation.designation;
                            $scope.add_leave.designation_id=ui.item.designation.id;
                        }
                        else{
                            $scope.emp_designation='';
                        }
                    }
                    

                    /*$scope.add_leave.category_id=ui.item.category.id;
                    $scope.emp_category=ui.item.category.category;
                    $scope.add_leave.department_id=ui.item.department.id;
                    $scope.emp_deparment=ui.item.department.department;
                    console.log('`````````````',$scope.emp_deparment);
                    $scope.add_leave.designation_id=ui.item.designation.id;
                    $scope.emp_designation=ui.item.designation.designation;*/
                }
            })
        };


	
$scope.click_leave=function(){
 $scope.add_leave = {};
            $scope.auto_employee_id='';
            $scope.emp_name='';
            $scope.emp_category='';
            $scope.emp_deparment='';
            $scope.emp_designation='';
};

	$scope.applyleave=function(){
		console.log($scope.add_leave);
		addLeaveServive({
			employee_leave:$scope.add_leave
		}).then(function(response){
			 $scope.modal_dismiss_two();
            $scope.getleavelisting();
            $scope.add_leave = {};
            $scope.auto_employee_id='';
            $scope.emp_name='';
            $scope.emp_category='';
            $scope.emp_deparment='';
            $scope.emp_designation='';
             $('#leavesuccess').fadeIn().delay(5000).fadeOut();
            $scope.leave_success = "Leave Added Successfully";
		},function(response){
			console.log(response);
		})
	};

	$scope.statustypeleave =function(){
		getTypeService({
			type:$scope.status_type
		}).then(function(response){
			console.log(response);
			$scope.leave_list=response.data;
		},function(response){
			console.log(response);
		})
	};

	$scope.statusdateleave=function(){
		getDateService({
			from:$scope.select_from,
			to:$scope.select_to
		}).then(function(response){
			console.log(response);
			$scope.leave_list=response.data;
		},function(response){
			console.log(response);
		})
	};

$scope.get_leave_status=function(){
        getLeaveStatus({}).then(function(response){
            console.log(response);
            $scope.leave_status=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.get_leave_status();
}]);



