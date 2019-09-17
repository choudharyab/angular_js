disputedSheetModule.factory('getAllDisputedList',function($http){
    return function (params) {
		return $http.get(appUrl+'get_disputed_sheet?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('searchDisputedList',function($http){
    return function (params) {
        return $http.get(appUrl+'disputed_filter?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateDisputedRemark',function($http){
    return function (params) {
        return $http.post(appUrl+'store_remark?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});
