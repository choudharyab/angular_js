bankDetailsModule.factory('getBankDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_bank_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addBankDetails',function($http){
    return function (params) {
        console.log('params-->',params);
        return $http.post(appUrl+'add_bank?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('deleteBankDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_cheque_details?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankDetailsById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_bank_details_by_bank_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editBankDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_bank?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('country',function($http){
    return function (params) {
        return $http.get(appUrl+'get_countries?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})
;