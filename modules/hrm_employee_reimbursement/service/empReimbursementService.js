empReimbursementModule.factory('getReimbursementData',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee_reimbursement?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addReimbursementDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'store_employee_reimbursement?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getReimbursementDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee_reimbursement_using_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateReimbursementData',function($http){
    return function (params) {
        return $http.post(appUrl+'update_employee_reimbursement?token='+localStorage.getItem('token'),
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
}).factory('empAutocompleteForReimbursement',function($http){
    return function (params) {
        return $http.get(appUrl+'employee_autocomplete_for_reimbursement?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLastRequestId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_loan_request_number?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});