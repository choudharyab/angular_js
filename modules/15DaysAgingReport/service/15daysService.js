agingReportModule.factory('getAgingReportData',function($http){
    return function (params) {
        return $http.get(appUrl+'aging_report?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});