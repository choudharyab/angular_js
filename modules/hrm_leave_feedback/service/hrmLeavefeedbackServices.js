hrmLeaveFeedbackModule.factory('getHrmLeaveTypeListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_leave_type?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmLeaveTypeService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_leave_type?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmLeaveStatusListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_leave_status?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmLeaveStatusService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_leave_status?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmLeaveFeedbackListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_leave_feedback?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmLeaveFeedbackService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_leave_feedback?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmLeaveCrmFeedbackListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_crm_feedback?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmLeaveCrmFeedbackService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_crm_feedback?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveLeaveConfiguration',function($http){
    return function (params) {
        console.log('params-->',params);
        return $http.post(appUrl+'add_assign_leaves_data?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
});