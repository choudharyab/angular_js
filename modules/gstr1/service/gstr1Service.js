gstr1Module.factory('getGstr1Service',function($http){
    return function (params) {
		return $http.get(appUrl+'get_gstr1_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateJsonGstr1Service',function($http){
    return function (params) {
		return $http.get(appUrl+'downloadJSONFile?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateExcelGstr1Service',function($http){
    return function (params) {
		return $http.get(appUrl+'downloadExcelFile?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});