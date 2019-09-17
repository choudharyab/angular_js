awpTollReportModule.factory('getAwpTollReportData',function($http){
    return function (params) {
		return $http.get(appUrl+'awp_toll_tax_report?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getAwpLocationDetails',function($http){
    return function (params) {
		return $http.get(appUrl+'get_awp_client_address?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});