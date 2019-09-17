leadManagementModule.factory('listLeadManagement',function($http){
    return function (params) {
        return $http.get(appUrl+'get_lead_management?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addLeadService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_lead_management?token='+localStorage.getItem('token'), $.param(params.lead_info),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('showLeadService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_lead_data_by_lead_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteLeadService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_lead_data_by_lead_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('editLeadService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_lead_management?token='+localStorage.getItem('token'), $.param(params.lead_info),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('saveFollowSheet',function($http){
    return function (params) {
        return $http.post(appUrl+'add_followup_details?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getEmployeeAutocompleteForFollowUpSheet',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee_autocomplete_for_followup?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});