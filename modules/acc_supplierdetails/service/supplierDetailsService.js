supplierchequedetailsmodule.factory('getSupplierChequeDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'supplier_cheque_details_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteSupplierChequeDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_cheque_details?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSupplierList',function($http){
    return function (params) {
        return $http.get(appUrl+'supplier_list_accounts?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankList',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_account_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInvoiceNoList',function($http){
    return function (params) {
        return $http.get(appUrl+'invoice_list_by_supplier_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInvoiceDataById',function($http){
    return function (params) {
        return $http.get(appUrl+'invoice_data_by_invoice_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getChequeDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'cheque_details_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editSupplierChequeDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_cheque_details_by_id?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('addChequeDetails',function($http){
    return function (params) {
        console.log('params-->',params);
        return $http.post(appUrl+'add_supplier_cheque_details?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('supChequeStatus',function($http){
    return function (params) {
        console.log('params-->',params);
        return $http.post(appUrl+'change_cheque_status?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
})
;
