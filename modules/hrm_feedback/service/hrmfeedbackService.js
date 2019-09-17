hrmfeedbackModule.factory('getHrmFeedback',function($http) {
    return function (params) {
        return $http.get(appUrl + 'get_employee_feedback_listing?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})   .factory('addHrmComment',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'add_feedback_comment?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

        })
    }
}).factory('addHrmFeedback',function($http){
    return function (params) {
        return $http.post(appUrl+'add_employee_feedback?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getEmployeeNames',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_employee_for_add_feedback?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

        })
    }
}).factory('getHrmFeedbackFor',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_leave_feedback?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

        })
    }
}).factory('deleteHrmFeedback',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'delete_hrm_employee_feedback?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

        })
    }
})
;