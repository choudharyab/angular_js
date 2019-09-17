loginModule.factory('loginService',function($http){
    return function (params) {
        return $http.post(appUrl+'authenticate', $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('registerService',function($http){
	return function (params) {
		return $http.post(appUrl+'registration',$.param(params),{headers:{
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		
		})
	}
}).factory('forgetPassword',function($http){
    return function (params) {
        return $http.get(appUrl+'verify_email_for_forget_password',{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getWarehouseListService1',function($http){
    return function (params) {
        return $http.get(appUrl+'company',{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('userPermissionMenuService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_user_permissions?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getUserId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_user_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});

