logFilesModule.factory('logFilesListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_log_file_content?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});