customerStatusModule.factory('getCustomerStatusService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_customer_status_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('blockCustomerService',function($http){
    return function (params) {
        return $http.get(appUrl+'block_case_customer?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});