documentationModule.factory('addFolderService',function($http){
    return function (params) {
        return $http.post(appUrl+'add_folder?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getFolderListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_folder?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getfileListService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_user_files?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('copyFileService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_copy_file?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('deletePrivateFileService',function($http){
    return function (params) {
        return $http.get(appUrl+'delete_private_file?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('folderlistFilterService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_folder_listing_for_filtering?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});