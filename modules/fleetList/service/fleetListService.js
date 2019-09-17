fleetListModule.factory('getFleetListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_fleet_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLocationListing',function($http){
    return function (params) {
        return $http.get(appUrl+'company?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveFleetDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'add_fleet?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getFleetDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_fleet_details_by_fleet_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateFleetDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_fleet?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});