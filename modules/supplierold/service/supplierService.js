supplierModule.factory('productAutoCompleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'product_autocomplete?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addSupplierService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_supplier?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getSupplierListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_supplier_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProductByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'product_from_product_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSupplierDetailsByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'supplier_from_supplier_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editSupplierService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_supplier?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getNextSupplierCodeService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_supplier_code?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});