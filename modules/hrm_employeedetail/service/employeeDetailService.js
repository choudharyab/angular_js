employeeDetailModule.factory('getEmployeeListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveEmployeeDetailService',function($http){
	return function (params) {
		return $http.post(appUrl+'add_employee?token='+localStorage.getItem('token'),$.param(params),{headers:{
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		
		})
	}
}).factory('editEmployeeDetailsService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee_details_by_employee_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateEmployeeDetailService',function($http){
	return function (params) {
		return $http.post(appUrl+'update_employee?token='+localStorage.getItem('token'),$.param(params),{headers:{
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		
		})
	}
}).factory('deleteEmployeeDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_employee?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLeaveStatus',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'leave_status_by_designation_id?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
});  