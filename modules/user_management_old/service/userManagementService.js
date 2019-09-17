userManagementModule.factory('getUserManagementService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_all_modules?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getUsersListingService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_users_listing?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('saveUserPermissionService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_user_permissions?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('updateUserPermissionService',function($http){
    return function (params) {
        return $http.post(appUrl+'update_user_permissions?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});