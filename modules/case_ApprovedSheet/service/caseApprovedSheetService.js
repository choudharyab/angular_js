caseApprovedModule.factory('getAllApprovedList',function($http){
    return function (params) {
		return $http.get(appUrl+'get_approve_sheet?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})/*.factory('movedToScrutinySheet',function($http){
    return function (params) {
        return $http.get(appUrl+'add_case_to_disputed_or_approve?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})*/.factory('searchApprovedList',function($http){
    return function (params) {
        return $http.get(appUrl+'approved_filter?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveBillData',function($http){
    return function (params) {
        return $http.post(appUrl+'store_case_bill?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});