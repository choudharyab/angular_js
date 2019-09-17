crmLoanModule.factory('getLoanDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'loan_advance_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addLoanDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'add_loan_advance?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getLoanDetailsByRequestId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_loan_details_by_loan_request_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateLoanDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_loan_advance?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteLoanDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_loan_details_by_loan_request_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('approveLoanStatus',function($http){
    return function (params) {
        return $http.get(appUrl+'approve_loan_status?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('employeeNameAutoCompeleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'employee_autocomplete_loan_request?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLastRequestId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_loan_request_number?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});