homeModule.factory('changePassword',function($http){
    return function (params) {
        return $http.post(appUrl+'change_password?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
})
// .factory('userPermissionMenuService',function($http){
//     return function (params) {
//         return $http.get(appUrl+'get_user_permissions?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
//         })
//     }
// })
.factory('userPermissionMenuService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_user_permissions?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getUserId',function($http){
    return function (params) {
        return $http.get(appUrl+'get_user_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getNotifications',function($http){
    return function (params) {
        return $http.get(appUrl+'get_notification?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getDashboardCaseReportData',function($http){
    return function (params) {
		return $http.get(appUrl+'case_report?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getTotalCustomers',function($http){
    return function (params) {
		return $http.get(appUrl+'case_customer?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getWarehouseListService2',function($http){
    return function (params) {
        return $http.get(appUrl+'company',{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('addTodoList',function($http){
    return function (params) {
        return $http.post(appUrl+'add_todo_list?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getTodoList',function($http){
    return function (params) {
        return $http.get(appUrl+'get_todo_list?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('checkTaskDoneStatus',function($http){
    return function (params) {
        return $http.get(appUrl+'check_todo_list_status?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deleteTodoList',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_todo_list?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getThirdLineData',function($http){
    return function (params) {
        return $http.get(appUrl+'get_third_line_data?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getEmployeeNameForDashboard',function($http){
    return function (params) {
        return $http.get(appUrl+'get_employee_list_for_dashboard?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getBarGraphData',function($http){
    return function (params) {
        return $http.get(appUrl+'get_bar_graph_data?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getProfilePhoto',function($http){
    return function (params) {
        return $http.get(appUrl+'get_users_profile_photo?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});
