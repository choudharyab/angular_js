crmfeedbackModule.factory('getcustomerfeedback',function($http){
    return function (params) {
        return $http.get(appUrl+'get_customer_rating?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addCrmComment',function ($http) {
    return function (params) {
        return $http.get(appUrl +'add_crm_comment?token='+ localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('getFeedbackFor',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_crm_feedback?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('getNames',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'get_supplier_or_customer_from_type?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

       })
    }
}).factory('addFeedback',function($http){
    return function (params) {
        return $http.post(appUrl+'add_crm_customer_feedback?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('deleteCrmFeedback',function ($http) {
    return function (params) {
        return $http.get(appUrl + 'delete_crm_customer_feedback?token=' + localStorage.getItem('token'), {
            params: params, header: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}

        })
    }
})
;
