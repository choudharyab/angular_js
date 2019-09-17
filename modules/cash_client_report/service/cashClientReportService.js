overallCaseReportModule.factory('getCashClientReportData',function($http){
    return function (params) {
		return $http.get(appUrl+'cash_client_report?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});