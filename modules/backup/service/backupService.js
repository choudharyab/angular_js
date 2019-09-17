backupModule.factory('getBackupService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_db_backup?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('backupListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_database_backup_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});