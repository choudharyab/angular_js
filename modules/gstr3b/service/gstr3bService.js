gstr3bModule.factory('getGstr3bService',function($http){
    return function (params) {
		return $http.get(appUrl+'get_gst3b_data?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateJsonGstr3bService',function($http){
    return function (params) {
		return $http.get(appUrl+'downloadJSONFile?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateExcelGstr3bService',function($http){
    return function (params) {
		return $http.get(appUrl+'ExportGSTR3BExcelFile?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});