crmFollowSheetModule.factory('addFollowSheet',function($http){
    return function (params) {
    	console.log(params);
        return $http.post(appUrl+'add_followup_details?token='+localStorage.getItem('token'), $.param(params),
        	{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('leadAutoCompleteService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_autocompleteLead?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getFollowSheet',function($http){
    return function (params) {
        return $http.get(appUrl+'followup_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteFollowUp',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_followup?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getFollowUpById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_followup_by_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('EditFollowUp',function($http){
    return function (params) {
    	console.log(params);
        return $http.post(appUrl+'update_followup_details?token='+localStorage.getItem('token'), $.param(params),
        	{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('leadDataByLeadId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_lead_data_by_lead_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});
// .factory('getLeadDataById',function($http){
//     return function (params) {
//         return $http.get(appUrl+'get_autocompleteLead?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
//         })
//     }
// })