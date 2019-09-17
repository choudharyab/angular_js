var loginModule = angular.module('loginModule',[]);

loginModule.controller('loginController',['$rootScope','$scope','$location','$route','loginService',
    'getWarehouseListService1','Auth','forgetPassword','getUserManagementService','getUserId',
    'userPermissionMenuService',
function($rootScope,$scope,$location,$route,loginService,getWarehouseListService1,Auth,
    forgetPassword,getUserManagementService,getUserId,userPermissionMenuService){

    $rootScope.hideLeftMenu = true;
    //document.body.style.overflow = 'hidden';
    $('#checkLoginPage').hide();
    $('nav').removeClass('left-menu');
    $('nav').addClass('my_menubar');

    console.log('called');
    $scope.get_company_list = function(){
        console.log('test');
        getWarehouseListService1({}).then(function (response) {
            $scope.warehouse_list = response.data;
            console.log($scope.warehouse_list);
        });
    }
    $scope.get_company_list();

    $scope.get_warehouse = function () {
        $scope.wh_id = JSON.parse($scope.warehouse_id).id;
        $scope.company_name = JSON.parse($scope.warehouse_id).company_name;
        $scope.warehouse_state_id = JSON.parse($scope.warehouse_id).state_id;
        $scope.location=JSON.parse($scope.warehouse_id).company_address+','+JSON.parse($scope.warehouse_id).city;
    };
    $scope.signInFunction = function () {
        console.log($scope.warehouse_id);
        loginService({
            email:$scope.email,
            password:$scope.password,
            warehouse_id : $scope.wh_id
        }).then(function (response) {
            $scope.login_error_msg = '';
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('warehouse_id',$scope.wh_id);
            localStorage.setItem('company_name',$scope.company_name);
            localStorage.setItem('warehouse_info',$scope.warehouse_id);
            localStorage.setItem('company_location',$scope.location);
            sessionStorage.setItem('token',response.data.token);
            //console.log(warehouse_id);
            localStorage.setItem('warehouse_state_id',$scope.warehouse_state_id);
            localStorage.setItem('user_type',response.data.type);
            if(localStorage.getItem('user_type')==='user'){

                localStorage.setItem('user_warehouse',JSON.stringify(response.data.data));
            }
            $route.reload();
            Auth.setUser(localStorage.getItem('token'));
            if(localStorage.getItem('user_type')=='customer'){
                localStorage.setItem('customer_id',response.data.customer_id);
                //$location.path('/customerStatus');
                //console.log('!!!!!!!!!!!',customer_id);

            }
            else{
                $location.path('/home');
            }
           // $location.path('/home');
            $rootScope.hideLeftMenu = false;

            $rootScope.userMenuList = '';
            $rootScope.get_all_menu = '';
            $rootScope.login_usr_type = localStorage.getItem('user_type');
            
            getUserId().then(function(res){
            localStorage.setItem('user_type',res.data.type);
                userPermissionMenuService({
                    user_id: JSON.parse(res.data.user_id)
                }).then(function (res) {
                    $rootScope.userMenuList = res.data.data;
                    localStorage.setItem('user_rights',JSON.stringify(res.data.data));
                })
            })

            // getUserManagementService({}).then(function (res) {

            // getUserId().then(function(res){
            //     userPermissionMenuService({
            //         user_id: res.data
            //     }).then(function (res) {
            //         $rootScope.userMenuList = res.data.data;
            //         localStorage.setItem('user_rights',JSON.stringify(res.data.data));
            //     })
            // })
            // });



        },function (response) {
            $scope.login_error_msg = response.data.error;
        })
    }
	 //$scope.logout = function () {
    // console.log('called logout');     
	// localStorage.clear();
     //$location.path('/login');
    //};
    
    $scope.forget_password = function () {
    console.log($scope.warehouse_id);
    forgetPassword({
        email:$scope.email_id
    }).then(function (response) {
        console.log('response',response);
        $scope.modal_dismiss_two();
        $('#verify_password').modal('show');
    },function (response) {
        //$scope.login_error_msg = response.data.error;
    })
};
$scope.ok_click=function () {
  //  console.log('ok button clicked');
    $('#verify_password').modal('hide');
}


	
}]);