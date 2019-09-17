fleetMaintenanceModule.factory('getFleetMaintenanceListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_fleet_maintenance_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getFleetMaintenanceDataById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_fleet_maintenance_using_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});