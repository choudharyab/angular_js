productModule.factory('addProductGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_product_group_and_measurement?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getProductGroupService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_product_group?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getUnitOfMeasureService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_measurement?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getNextProductCodeService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_product_code?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addProductForExpenseOrder',function($http){
    return function (params) {
        return $http.post(appUrl+'add_expense_product?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getProductListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_product_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseProductDataByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_expense_product_details_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editExpenseProductService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_expense_product?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getProductGroupListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_product_group?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getMeasurementGroupListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_measurement?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateProductGroupListService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_product_group_or_measurement?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteProductGroupMeasureService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_product_group_or_measurement?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseProductListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_expense_product_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getVoucherLedgerListService',function($http){
    return function (params) {
        return $http.get(appUrl+'list_ledger_particulars?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});