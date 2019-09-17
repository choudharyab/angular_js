overallCaseReportModule.factory('getCaseReportData',function($http){
    return function (params) {
		return $http.get(appUrl+'case_report?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});