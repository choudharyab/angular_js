hrmSalaryMasterModule.factory('getHrmSalaryComponentListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_salary?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmSalaryComponentService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_salary?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSalaryConfigurationListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_salary_configuration?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmSalaryConfigurationService',function($http){
    return function (params) {
         console.log('params--->',params.components);        
        return $http.post(appUrl+'add_salary_configuration?token='+localStorage.getItem('token'),$.param(params.components),{headers:{
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        
        }
        )
    }
});