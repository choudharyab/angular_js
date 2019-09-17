caseScrutinyModule.factory('getAllScrutinyList',function($http){
    return function (params) {
        return $http.get(appUrl+'get_scrutiny_sheet?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('movedToApprovedSheet',function($http){
    return function (params) {
        return $http.post(appUrl+'add_case_to_disputed_or_approve?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('searchScrutinyList',function($http){
    return function (params) {
		return $http.get(appUrl+'scrutiny_filter?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getServiceListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_service_or_rule_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});