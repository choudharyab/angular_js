customerListModule.factory('addCustomerDetailsService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_client?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getCustomerListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_client_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCustomerByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'client_details_by_client_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateCustomerDetailsService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_client?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getNextCustomerCodeService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_customer_code?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateLoginStatus',function($http){
    return function (params) {
        return $http.get(appUrl+'generate_login_status?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});