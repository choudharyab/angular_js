trialBalanceModule.factory('getLedgerBalanceListService',function($http){
    return function (params) {
        return $http.get(appUrl+'trial_balance_account_data?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateExcelTrialBalanceMicroService',function($http){
    return function (params) {
        return $http.get(appUrl+'trial_balance_micro_generate_excel?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateExcelTrialBalanceService',function($http){
    return function (params) {
        return $http.get(appUrl+'trial_balance_generate_excel?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});

