hrmMasterModule.factory('getHrmGeneralDepartmentListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_department?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralDepartmentService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_department?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralDesignationListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_designation?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralDesignationService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_designation?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralCategoryListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_category?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralCategoryService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_category?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralProbationPeriodListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_probation_period?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralProbationPeriodService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_probation_period?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralNoticePeriodListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_notice_period?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralNoticePeriodService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_notice_period?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralCompanyEmailListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_company_email?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralCompanyEmailService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_company_email?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralMaritalStatusListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_marital_status?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralMaritalStatusService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_marital_status?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralBloodGroupListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_blood_group?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralBloodGroupService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_blood_group?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getHrmGeneralReasonTypeListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_reason_type?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveHrmGeneralReasonTypeService',function($http){
    return function (params) {
        return $http.get(appUrl+'add_reason_type?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteHRMMasterDetails',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_general_details?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});