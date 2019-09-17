policyRuleModule.factory('getPolicyServicesListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_services?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePolicyServices',function($http){
    return function (params) {
        return $http.post(appUrl+'add_policy_services?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPolicyServiceDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_services_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updatePolicyServices',function($http){
    return function (params) {
        return $http.post(appUrl+'update_policy_services?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPolicyRuleListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_policy_rule?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePolicyRule',function($http){
    return function (params) {
        return $http.post(appUrl+'add_policy_rule?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPolicyRuleDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_policy_rule_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updatePolicyRule',function($http){
    return function (params) {
        return $http.post(appUrl+'update_policy_rule?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getClientLocationByClientId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_client_address_by_client_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});