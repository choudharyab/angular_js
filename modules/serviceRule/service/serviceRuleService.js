serviceRuleModule.factory('getServicesListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_service_or_rule_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveServices',function($http){
    return function (params) {
        return $http.post(appUrl+'service_and_rule?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getServiceDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_service_or_rule_details_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateServices',function($http){
    return function (params) {
        return $http.post(appUrl+'update_service_or_rule?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getServiceRuleListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_service_or_rule_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getClientDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_client_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveServicesRules',function($http){
    return function (params) {
        return $http.post(appUrl+'company?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getServiceRuleDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_service_or_rule_details_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateServiceRules',function($http){
    return function (params) {
        return $http.post(appUrl+'company?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getClientLocationByClientId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_client_address_by_client_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});