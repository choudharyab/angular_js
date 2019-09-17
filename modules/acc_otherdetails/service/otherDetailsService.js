otherDetailsModule.factory('getOtherChequeDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'other_cheque_details_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getParticularsDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'list_ledger_particulars?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addOtherChequeDetails',function($http){
    return function (params) {
        console.log('params-->',params);
        return $http.post(appUrl+'add_other_cheque_details?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('deleteOtherChequeDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_cheque_details?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getOtherChequeDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'cheque_details_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getOtherBankList',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_account_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editOthersChequeDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_cheque_details_by_id?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('otherChequeStatus',function($http){
    return function (params) {
        console.log('params-->',params);
        return $http.post(appUrl+'change_cheque_status?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
})
;