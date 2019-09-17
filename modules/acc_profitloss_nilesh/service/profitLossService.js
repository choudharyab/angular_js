accProfitLossModule.factory('getPLPurchaseAccountListService',function($http){
    return function (params) {
        return $http.get(appUrl+'purchase_account_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getPLSaleAccountListService',function($http){
    return function (params) {
        return $http.get(appUrl+'sale_account_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getPurchaseAccMonthWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'purchase_account_data_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getPurchaseAccDateWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'purchase_account_data_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSaleAccMonthWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'sale_account_data_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSaleAccDateWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'sale_account_data_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getDirectExpensesListService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_expenses?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInwordBelowMonthWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_expenses_monthwise_below?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInwordBelowDateWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_expenses_data_datewise_below?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('amountAboveMonthWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_expenses_monthwise_above?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('amountAboveDateWiseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_expenses_data_datewise_above?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('loadingUnloadingMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'loading_unloading_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('loadingUnloadingDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'loading_unloading_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectExpensesListService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_expenses_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectExpensesMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_expenses_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectExpensesDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_expenses_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('directIncomeListService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_incomes_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('directIncomeMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_incomes_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('directIncomeDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'direct_incomes_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectIncomeListService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_incomes_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectIncomeMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_incomes_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectIncomeDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_incomes_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indIncomeServiceBillDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_incomes_service_bill_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indIncomeServiceBillMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_incomes_service_bill_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indIncomeRateDiffMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_incomes_debit_note_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indIncomeRatediffDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_incomes_debit_note_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('openingStockService',function($http){
    return function (params) {
        return $http.get(appUrl+'opening_stock?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('closingStockService',function($http){
    return function (params) {
        return $http.get(appUrl+'closing_stock?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('fixedPurchaseAssetService',function($http){
    return function (params) {
        return $http.get(appUrl+'closing_stock?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectExpensesroundoffMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'roundoff_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectExpensesroundoffDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'roundoff_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectExpensesChargeMonthWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_expense_charge_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('indirectExpensesChargeDateWiseService',function($http){
    return function (params) {
        return $http.get(appUrl+'indirect_expense_charge_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});