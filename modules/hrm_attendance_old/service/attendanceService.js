attendanceModule.factory('warehouseService',function($http){
    return function (params) {
        return $http.get(appUrl+'warehouse?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addAttendanceService',function($http){
	return function (params) {
        return $http.post(appUrl+'add_employee_attendance?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
})/*.factory('attendancelistingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee_attendance_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})*/.factory('empnameService',function($http){
    return function (params) {
        return $http.get(appUrl+'employee_autocomplete_for_attendance?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_attendance?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('attendancelistingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_biomatrics_attendance?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});