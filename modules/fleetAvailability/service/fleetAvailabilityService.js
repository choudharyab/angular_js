fleetAvailabilityModule.factory('getAvailableFleetListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_available_fleet_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getAllocatedFleetListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_allocated_fleet_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});