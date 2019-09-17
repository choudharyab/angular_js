account_ledger.factory('getAccLedgerGroupListService',function($http){
    return function (params) {
        return $http.get(appUrl+'ledger_group_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveLedgerGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_ledger_subgroup?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getAccLedgerListService',function($http){
    return function (params) {
        return $http.get(appUrl+'list_ledger_subgroup?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getAccLedgerByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_ledger_subgroup_by_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateLedgerGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_ledger_subgroup?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteAccLedgerByIdService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_ledger_subgroup?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getGroupDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'ledger_group_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveGroupDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'add_ledger_group?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('updateGroupDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_ledger_group?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteGroupDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'ledger_group_remove?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getDateWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_sundrycreditors_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveSubLedgerDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'add_ledger?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getSubLedgerLists',function($http){
    return function (params) {
        return $http.get(appUrl+'list_ledger?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteSubLedgerDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_ledger?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateSubLedgerDetails',function($http){
    return function (params) {
        return $http.post(appUrl+'update_ledger?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getSubLedgerMonthWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_sundrycreditors_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('isSubLedgerAvailable',function($http){
    return function (params) {
        return $http.get(appUrl+'check_ledger_sub_ledger?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getAssetsMonthwise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_sundrydebitors_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getAssetsDatewise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_sundrydebitors_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSubgroupwiseLedgers',function($http){
    return function (params) {
        return $http.get(appUrl+'get_ledger_by_subgroup_id?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getIncomeMonthwise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_output_tax_details_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseMonthwise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_input_tax_details_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getIncomeDatewise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_output_tax_details_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getExpenseDatewise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_input_tax_details_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getPlMonthwise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_subgroupdetails_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getPlDatewise',function($http){
    return function (params) {
        return $http.get(appUrl+'get_subgroupdetails_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTdsRateChartService',function($http){
    return function (params) {
        return $http.get(appUrl+'tds_rate_chart_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSubgroupwiseLedgersForPl',function($http){
    return function (params) {
        return $http.get(appUrl+'get_ledger_by_subgroup_id_for_profit_loss?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveNewLedgerGroupService',function($http){
    return function (params) {
        return $http.post(appUrl+'save_new_ledger?token='+localStorage.getItem('token'),$.param(params),{headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});