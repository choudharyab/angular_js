expenseSupplierModule.factory('getNextExpenseSupplierCode',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_expense_supplier_code?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseProductsAutocomplete',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_product_autocomplete?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addExpenseSupplierService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_expense_supplier_and_product?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getExpenseSupplierListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_expense_supplier_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseSupplierByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_supplier_details_by_expense_supplier_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateExpenseSupplierService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_expense_supplier?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});