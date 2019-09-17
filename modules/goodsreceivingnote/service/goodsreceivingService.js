goodReceivingModule.factory('getGoodReceivingData',function($http){
    return function (params) {
        return $http.get(appUrl+'get_good_receiving_note?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('requestCodeAutocomplete',function($http){
    return function (params) {
        return $http.get(appUrl+'request_autocomplete_for_good_receiving_note?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveGrData',function($http){
    return function (params) {
        return $http.post(appUrl+'add_client?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getGoodReceivingDataById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_good_receiving_note_using_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateGrData',function($http){
    return function (params) {
        return $http.post(appUrl+'add_client?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});