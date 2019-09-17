payrollModule.factory('generatePayroll',function($http){
    return function (params) {
        return $http.post(appUrl+'generate_payroll?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPayrollListing',function($http){
    return function (params) {
        return $http.get(appUrl+'payroll_generate_processed_datewise_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})/*.factory('getSalaryService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_salary_configuration?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})*/.factory('getPayrollGenerateListing',function($http){
    return function (params) {
        return $http.get(appUrl+'payroll_generate_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getpayrollService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_payroll_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});