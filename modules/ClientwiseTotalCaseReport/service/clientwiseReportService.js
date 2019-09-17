clientwiseTotalCaseReportModule.factory('getClientWiseTotalCaseReport',function($http){
    return function (params) {
        return $http.get(appUrl+'get_clientwise_total_case_report?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getClientWiseTotalCaseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_case_details_by_client_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});