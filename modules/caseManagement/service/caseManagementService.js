caseManagementModule.factory('getCaseDetailsList',function($http){
    return function (params) {
        return $http.get(appUrl+'get_case_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getClientList',function($http){
    return function (params) {
        return $http.get(appUrl+'get_client_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getServiceList',function($http){
    return function (params) {
        return $http.get(appUrl+'get_service_by_client_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('vehicleAutoComplete',function($http){
    return function (params) {
        return $http.get(appUrl+'fleet_autocomplete?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveCaseManagementData',function($http){
    return function (params) {
        return $http.post(appUrl+'add_case?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getCaseDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_case_details_by_case_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateCaseManagementData',function($http){
    return function (params) {
        return $http.post(appUrl+'update_case?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('approveCaseStatus',function($http){
    return function (params) {
        return $http.get(appUrl+'Approve_unapprove_case?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getClientWiseRules',function($http){
    return function (params) {
        return $http.get(appUrl+'get_rules_by_client_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveCaseClosingData',function($http){
    return function (params) {
        return $http.post(appUrl+'case_closing?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('checkCustomerStatus',function($http){
    return function (params) {
        return $http.get(appUrl+'get_customer_status_in_casemanagement?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('cancelCaseStatus',function($http){
    return function (params) {
        return $http.get(appUrl+'cancel_case?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('chargeListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_transportation_charge?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getClientLocationByClientIdForCase',function($http){
    return function (params) {
        return $http.get(appUrl+'get_client_address_by_client_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTaxIdByChargeId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_client_address_by_client_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('cancelledListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_cancel_case_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});