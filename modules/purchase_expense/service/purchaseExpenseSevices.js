purchaseExpenseController.factory('ExpSupplierAutoCompleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_supplier_autocomplete?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('ExpSupplierProductByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'expense_supplier_products_from_supplier_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePurchaseExpenseService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_expense?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('ExpListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_expense_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_expense_details_by_expense_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updatePurchaseExpenseService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_expense?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getVoucherLedgerListService',function($http){
    return function (params) {
        return $http.get(appUrl+'list_ledger_particulars?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getUnitOfMeasureService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_measurement?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addProductForExpenseOrder',function($http){
    return function (params) {
        return $http.post(appUrl+'add_expense_product?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('taxesService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_tax_rate_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBillFileService',function($http){
    return function (params) {
       return $http.get(appUrl+'get_expense_bill_file?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});