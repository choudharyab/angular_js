policyDetailsModule.factory('getPolicyDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_policy_details?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePolicyDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'add_policy_details?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPolicyDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_policy_details_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updatePolicyDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_policy_details?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPolicyDetailsByIdForService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_policy_details_rule_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generatePolicyPdf',function($http){
    return function (params) {
        return $http.get(appUrl+'generate_policy_pdf?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePolicyServiceDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'add_policy_details_rule?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPolicyServiceHistory',function($http){
    return function (params) {
        return $http.get(appUrl+'get_date_by_service_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('approvePolicyStatus',function($http){
    return function (params) {
        return $http.get(appUrl+'activate_unactivate_policy?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});