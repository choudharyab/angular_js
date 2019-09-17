userManagementModule.factory('getAllModules',function($http){
    return function (params) {
        return $http.get(appUrl+'get_usermanagement_data?token='+localStorage.getItem('token'),{params:params,headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('saveUserPermission',function($http){
    return function (params) {
        console.log('params--->',params);
        return $http.post(appUrl+'store_userpermission_data?token='+localStorage.getItem('token'),$.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('editUserManagement',function($http){
    return function (params) {
        return $http.get(appUrl+'get_userpermission_data_using_id?token='+localStorage.getItem('token'),{params:params,headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getAllActivatedUsers',function($http){
    return function (params) {
        return $http.get(appUrl+'get_user_details_dropdown?token='+localStorage.getItem('token'),{params:params,headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
});