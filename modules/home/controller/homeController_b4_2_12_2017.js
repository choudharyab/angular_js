var homeModule=angular.module('homeModule',[]);
homeModule.controller('homeController',['$scope','changePassword','getUserManagementService','userPermissionMenuService',function ($scope,changePassword,getUserManagementService,userPermissionMenuService) {
   console.log('home called');
    //document.body.style.overflow = 'auto';
    
    $('nav').removeClass('my_menubar');
    $('nav').addClass('left-menu');
    /*$scope.new_pass=true;
    $scope.cnfrm_pass=true;*/
    $scope.change_password={};
    $scope.check_cnfrm_pass = function(){
        if($scope.change_password.password!=$scope.cnfrm_password){
            $scope.password_error_msg = true;
        }else{
            $scope.password_error_msg = false;
        }
    };
    $scope.save_password=function () {
        console.log('Save password controller called');
        changePassword({
            change_password:$scope.change_password
        }).then(function(response){
            console.log(response);
            //$scope.warehouse_list=response.data;
        },function(response){
            console.log(response);
            $scope.change_password={};
            $scope.cnfrm_password='';
            $scope.modal_dismiss_two();
        })
    };
    
        $rootScope.login_usr_type = localStorage.getItem('user_type');
        
            getUserManagementService({}).then(function (res) {

        if(localStorage.getItem('user_type')=='user'){

            userPermissionMenuService({}).then(function (res) {
                $rootScope.userMenuList = res.data;
                localStorage.setItem('user_rights',JSON.stringify(res.data));
            })
        }else{

            $rootScope.get_all_menu = res.data;
            menu_list = res.data;
            $rootScope.$broadcast("getMenu",$rootScope.get_all_menu);
        }
    });
    
}]);
