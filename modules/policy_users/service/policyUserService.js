policyUserModule.factory('getPolicyUserDetailsService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_policy_user?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePolicyUserService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_policy_user?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('editPolicyUserService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_policy_user?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPolicyUserById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_policy_user_details_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}); 