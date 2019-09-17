warehouseModule.factory('getWarehouseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'company',{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getWarehouseDetailsService',function($http){
    return function (params) {
        return $http.get(appUrl+'company?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveWarehouseService',function($http){
    return function (params) {
        return $http.post(appUrl+'company?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('editWarehouseService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_company?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteWarehouseService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_company?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getStateListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_states?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getWarehouseById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_company_data_by_company_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}); 