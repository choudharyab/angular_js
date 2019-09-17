accountLedgerAccModule.factory('getAccLedgerAcountListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_ledger_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getAccLedgerAcountDetailsService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_ledger_list_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});