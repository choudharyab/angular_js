loanStatementModule.factory('vehicleCodeAutoComplete',function($http){
    return function (params) {
        return $http.get(appUrl+'fleet_autocomplete_for_loan?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLoanStatementDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_loan_statement_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveLoanDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'store_loan_statement?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getLoanStatementDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_loan_statement_using_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateLoanDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_loan_statement?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});