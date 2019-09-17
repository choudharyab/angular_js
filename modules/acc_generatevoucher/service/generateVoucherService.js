generate_voucher.factory('getVoucherTypeListService',function($http){
    return function (params) {
        return $http.get(appUrl+'voucher_type_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addVoucherTypeService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_voucher_type?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('addGenerateVoucherService',function($http){
    return function (params) {
        return $http.post(appUrl+'store_generate_voucher?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getGenerateVoucherListService',function($http){
    return function (params) {
        return $http.get(appUrl+'generate_voucher_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getVoucherLedgerListService',function($http){
    return function (params) {
        return $http.get(appUrl+'list_ledger_particulars?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteVoucherTypeService',function($http){
    return function (params) {
        return $http.get(appUrl+'voucher_type_delete?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateVoucherTypeService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_voucher_type?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('searchDebitAutocompleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'autosearch_ledger?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteGenerateVoucher',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_generate_voucher?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editGenerateVoucher',function($http){
    return function (params) {
        return $http.get(appUrl+'get_generate_voucher_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateGenerateVoucherService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_generate_voucher_erp?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});