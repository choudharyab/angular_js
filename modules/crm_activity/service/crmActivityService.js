crmActivityModule.factory('getActivityfeedback',function($http){
    return function (params) {
        return $http.get(appUrl+'get_crm_customer_feedback?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getSupplierCustomerActivity',function($http){
    return function (params) {
        return $http.get(appUrl+'get_supplier_and_customer_for_activity?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getActivityListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_crm_activity_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addActivity',function($http){
    return function (params) {
        return $http.post(appUrl+'add_crm_activity?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('editActivityListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_activity_details_by_activity_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('sendActivityEmails',function($http){
    return function (params) {
        return $http.get(appUrl+'send_activity_emails?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteActivity',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_activity?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateActivity',function($http){
    return function (params) {
        return $http.post(appUrl+'update_crm_activity?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
});