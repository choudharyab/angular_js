trialBalanceModule.factory('getLedgerBalanceListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_trial_balance_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});