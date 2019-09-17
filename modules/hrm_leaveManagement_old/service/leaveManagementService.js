leaveManagementModule.factory('getleavelist',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee_leave_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('leavetype',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_leave_type?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('empdetail',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'employee_autocomplete?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('addLeaveServive',function($http){
    return function (params) {
        return $http.post(appUrl+'add_employee_leave?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getTypeService',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_leave_listing_type_wise?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('getDateService',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_leave_listing_date_wise?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('getLeaveStatus',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_employee_leave_status?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
});