account_ledger.factory('getAccLedgerGroupListService',function($http){
    return function (params) {
        return $http.get(appUrl+'ledger_group_list?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveLedgerGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_ledger?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getAccLedgerListService',function($http){
    return function (params) {
        return $http.get(appUrl+'list_ledger?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getAccLedgerByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_ledger_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateLedgerGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'change_ledger?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteAccLedgerByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_ledger_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTdsRateChartService',function($http){
    return function (params) {
        return $http.get(appUrl+'tds_rate_chart_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTdsRateChartDetailsService',function($http){
    return function (params) {
        return $http.get(appUrl+'tds_rate_chart_details_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveNewLedgerGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'save_new_ledger?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getAccLedgerDetailsByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_ledger_details_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateNewLedgerGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_new_ledger?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});