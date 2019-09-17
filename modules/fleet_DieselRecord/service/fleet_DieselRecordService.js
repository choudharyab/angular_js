fleetDieselRecordModule.factory('getFleetDieselRecordListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_diesel_record?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLocationListing',function($http){
    return function (params) {
        return $http.get(appUrl+'company?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveFleetDieselRecord',function($http){
    return function (params) {
        return $http.post(appUrl+'store_diesel_record?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getFleetDieselDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_diesel_record_by_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateFleetDieselDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_diesel_record?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getFleetDetailsByFleetId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_fleet_reading?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});