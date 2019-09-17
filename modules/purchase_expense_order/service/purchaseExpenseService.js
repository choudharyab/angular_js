purchaseExpenseModule.factory('expenseSupplierAutoCompleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'supplier_autocomplete?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseSelectedSupplierProductService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_products_from_supplier_id_po?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseNextPurchaseOrderNumberService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_get_next_purchase_order_number?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseGetSupplierMultipleAddressService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_get_supplier_addresses?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseSavePurchaseOrderService',function($http){
    return function (params) {
        return $http.post(appUrl+'expense_add_purchase_order?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('expenseGetPurchaseOrderListService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_get_purchase_order_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseGetPurchaseOrderByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_get_purchase_order_by_purchase_order_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseEditPurchaseOrderService',function($http){
    return function (params) {
        return $http.post(appUrl+'expense_update_purchase_order?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('expenseDeletePurchaseOrderService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_delete_purchase_order?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseApprovePurchaseOrderService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_approved_purchase_order?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseChargeListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_transportation_charge?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseTaxesService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_tax_rate_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseGetBankListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_bank_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseGeneratePoService',function($http){
    return function (params) {
        return $http.get(appUrl+'generate_po?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('expenseAddToSuppProductService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_supplier_products?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});