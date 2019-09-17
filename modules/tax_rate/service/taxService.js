taxRateModule.factory('getTaxRateService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_tax_rate_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addTaxRateService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_tax_rate?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('editTaxRateService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_tax_rate?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteTaxRateService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_tax_rate?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTransportationNameService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_transportation_charge?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addTransportationNameService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_transportation_charge?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteTransportationRateService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_charge?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('get_details_by_chargeid',function($http){
    return function (params) {
        return $http.get(appUrl+'transportation_charge_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editChargesService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_transportation_charge?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});