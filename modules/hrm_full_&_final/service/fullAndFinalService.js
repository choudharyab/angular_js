hrmFullNFinalModule.factory('getFullNFinalListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_full_n_final_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('empdetailforfnf',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'employee_autocomplete_for_fnf?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('saveFullNFinalService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_full_n_final?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('deleteFullNFinalService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_full_n_final?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editFullNFinalDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'get_full_n_final_details_by_fnf_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateFullNFinalService',function($http){
	return function (params) {
		return $http.post(appUrl+'update_full_n_final?token='+localStorage.getItem('token'),$.param(params),{headers:{
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		
		})
	}
});