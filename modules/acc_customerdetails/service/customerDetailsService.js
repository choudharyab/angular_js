clientchequedetailsmodule.factory('getCustomerChequeDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'customer_cheque_details_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCustomerList',function($http){
    return function (params) {
        return $http.get(appUrl+'customer_list_accounts?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCustBankList',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_account_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInvoiceNoListForCust',function($http){
    return function (params) {
        return $http.get(appUrl+'invoice_list_by_customer_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSaleInvoiceDataById',function($http){
    return function (params) {
        return $http.get(appUrl+'sale_invoice_data_by_invoice_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteCustomerChequeDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_cheque_details?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCustChequeDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'cheque_details_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editCustomerChequeDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_cheque_details_by_id?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('custChequeStatus',function($http){
    return function (params) {
        console.log('params-->',params);
        return $http.post(appUrl+'change_cheque_status?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('addCustChequeDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'add_customer_cheque_details?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
})
.factory('addClientPayment',function($http){
    return function (params) {
        return $http.post(appUrl+'add_customer_cheque_details?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
})
;