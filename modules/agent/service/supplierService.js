supplierModule.factory('productAutoCompleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'product_autocomplete?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addSupplierService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_agent?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getAgentListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_agent_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProductByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'product_from_product_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSupplierDetailsByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'agent_details_from_agent_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editSupplierService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_agent?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getNextSupplierCodeService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_supplier_code?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('country',function($http){
    return function (params) {
        return $http.get(appUrl+'get_countries?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});