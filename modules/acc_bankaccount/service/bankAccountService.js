bankAccountModule.factory('getCashInHandDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'cash_in_hand_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankAccountDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_account_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankOccDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_occ_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCashInHandMonthWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'cash_in_hand_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCashInHandDateWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'cash_in_hand_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankAccountMonthWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_account_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankAccountDateWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_account_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankOccMonthWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_occ_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBankOccDateWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'bank_occ_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id')+'&currencyCheckVar='+localStorage.getItem('currencyCheckVar'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
})
;
