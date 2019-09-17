balanceSheetModule.factory('getWarehouseListService',function($http){
    return function (params) {
        return $http.get(appUrl+'warehouse?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCaptialAccountDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'capital_account_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCapitalAccountMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'capital_account_monthwise?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCapitalAccountDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'capital_account_datewise?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLoansDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'loans_liabilities_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLoansMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'loans_liabilities_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getLoansDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'loans_liabilities_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCurrentDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'current_liabilities_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCurrentMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'current_liabilities_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCurrentDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'current_liabilities_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTaxDutiesDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'duties_taxes_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTaxDutiesInputOutputwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'duties_taxes_input_output?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTaxDutiesMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'taxes_duties_account_monthwise?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTaxDutiesDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'taxes_duties_datewise?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSuspenseAccountDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'suspense_account_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSuspenseAccountMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'suspense_account_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSuspenseAccountDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'suspense_account_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }   /////////////////////////   Assets ////////////////////////////////////////////


}).factory('getCurrentAssetsDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'current_assets_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCurrentAssetsMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'current_assets_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getCurrentAssetsDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'current_assets_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getFixedAssetsDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'fixed_assets_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getFixedAssetsMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'fixed_assets_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getFixedAssetsDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'fixed_assets_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInvestmentDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'investment_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInvestmentMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'investment_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getInvestmentsDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'investment_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBranchDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'branch_division_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBranchMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'branch_division_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBranchDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'branch_division_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProfitLossDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'profit_loss_account_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProfitLossMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'profit_loss_account_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProfitLosshDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'profit_loss_account_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryCreditorDateService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_creditors_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryDebtorDateService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_debtors_data?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryCreditorMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_creditors_supplierwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryCreditorMonthwiseDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_creditors_supplier_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryCreditorDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_creditors_supplier_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryDebtorsMonthwisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_debtors_customerwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryDebtorsMonthwiseDataService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_debtors_customer_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sundryDebtorsDatewisetService',function($http){
    return function (params) {
        return $http.get(appUrl+'sundry_debtors_customer_datewise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBalanceSheetData',function($http){
    return function (params) {
        return $http.get(appUrl+'get_balancesheet_listing?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProfitAndLossSheetData',function($http){
    return function (params) {
        return $http.get(appUrl+'profit_and_loss?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getMonthWiseDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'current_assets_monthwise?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});


