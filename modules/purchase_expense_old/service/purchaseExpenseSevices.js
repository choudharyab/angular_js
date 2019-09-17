purchaseExpenseModule.factory('ExpSupplierAutoCompleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'supplier_autocomplete_for_purchase_expence?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProductAutocomplete',function($http){
    return function (params) {
        return $http.get(appUrl+'product_autocomplete_for_purchase_expence?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePurchaseExpenseService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_expense?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('ExpListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_purchase_expense?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_purchase_expense_using_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updatePurchaseExpenseService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_purchase_expense?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getStateList',function($http){
    return function (params) {
        return $http.get(appUrl+'get_states?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});