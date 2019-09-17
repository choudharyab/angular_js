/***************************************************************************************************************/
/*                                                Author: Yogita Gawande                                       */
/***************************************************************************************************************/

var homeModule=angular.module('homeModule',['angularCharts']);
homeModule.controller('homeController',['$rootScope','$scope','$location','$interval','$route','$http','$window','$timeout','changePassword',
'getUserManagementService','userPermissionMenuService',
'getWarehouseListService2','getNotifications','getDashboardCaseReportData','getTotalCustomers','getClientList','addTodoList','getTodoList',
'checkTaskDoneStatus','deleteTodoList','getThirdLineData','getEmployeeNameForDashboard',
'getBarGraphData','getProfilePhoto','getUserId',
function ($rootScope,$scope,$location,$interval,$route,$http,$window,$timeout,changePassword,getUserManagementService,userPermissionMenuService,getWarehouseListService2,
    getNotifications,getDashboardCaseReportData,getTotalCustomers,getClientList,addTodoList,getTodoList,checkTaskDoneStatus,deleteTodoList,
    getThirdLineData,getEmployeeNameForDashboard,getBarGraphData,getProfilePhoto,getUserId) {

    var menu_list; 

    $('nav').removeClass('my_menubar');
    $('nav').addClass('left-menu');
    $scope.user_type=localStorage.getItem('user_type');
    /*$scope.new_pass=true;
    $scope.cnfrm_pass=true;*/

    $scope.bar_graph_data = '';
    $scope.income = [];
    $scope.expense = [];
    $scope.hide_loader = true;
    //$scope.hide_content = true;

     $window.overlappingData = [];
     $window.overlappingOptions = [];
     $window.overlappingResponsiveOptions = [];


    getProfilePhoto({}).then(function(response){
        $scope.photo=response.data[0].photo;
    },function(response){
    });
    
    $scope.get_bar_graph_list=function(){
        $scope.purchase_data = '';
            $scope.total_users = '';
            $scope.latest_client_cheque_date = '';
            $scope.total_payable = '';
            $scope.total_received = '';
            $scope.total_pending = '';
            $scope.total_cash_cases_punched = '';
            $scope.total_cash_cases_closed = '';
            $scope.total_grn = '';
            $scope.avg_feedback_rating = '';
            $scope.available_fleet = '';
            $scope.allocated_fleet = '';
            $scope.total_customers = '';
            $scope.closed_cases = '';
            $scope.punched_cases = '';
            $scope.invoice_raised = '';
        $scope.hide_loader = false;
        
        
        //$scope.hide_content = true;
        getBarGraphData({}).then(function(response){
            /*******************************************Dashboard Data**********************************************/
            $scope.bar_graph_data=response.data[0];
            for(var i=0;i<12;i++){
                if( i == 0){
                    if($scope.bar_graph_data[11] != 0){
                        var t = (parseFloat($scope.bar_graph_data[i]) - parseFloat($scope.bar_graph_data[11])) / parseFloat($scope.bar_graph_data[11]);
                        t = t.toFixed(2);
                    }else{
                        var t = 0;
                    }
                    
                    $scope.income.push(t);
                }else{
                    if($scope.bar_graph_data[i-1] != 0){
                        var t = (parseFloat($scope.bar_graph_data[i]) - parseFloat($scope.bar_graph_data[i-1])) / parseFloat($scope.bar_graph_data[i-1]);
                        t = t.toFixed(2);
                    }else{
                        var t = 0;
                    }
                    
                    $scope.income.push(t);
                }
                
            }

            for(var j=0;j<$scope.income.length;j++){
                if($scope.income[j] == 'Infinity'){
                    $scope.income[j] = 0;
                }

                //console.log('income',$scope.income[j]);
            }

            $scope.bar_graph_data1=response.data[1];
            for(var i=0;i<12;i++){
                if( i == 0){
                    if($scope.bar_graph_data1[11] != 0){
                        var t = (parseFloat($scope.bar_graph_data1[i]) - parseFloat($scope.bar_graph_data1[11])) / parseFloat($scope.bar_graph_data1[11]);
                        t = t.toFixed(2);
                    }else{
                        var t = 0;
                    }
                    
                    $scope.expense.push(t);
                }else{
                    if($scope.bar_graph_data1[i-1] != 0){
                        var t = (parseFloat($scope.bar_graph_data1[i]) - parseFloat($scope.bar_graph_data1[i-1])) / parseFloat($scope.bar_graph_data1[i-1]);
                        t = t.toFixed(2);
                    }else{
                        var t = 0;
                    }
                    
                    $scope.expense.push(t);
                }
                
            }
            for(var j=0;j<$scope.expense.length;j++){
                //console.log($scope.expense[j]);
                if($scope.expense[j] == 'Infinity'){
                    $scope.expense[j] = 0;
                }

                //console.log('expenxe',$scope.expense[j]);
            }

            $scope.overlappingData = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                // series: [
                //     [10, 7, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                //     [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                // ]
                series: [
                    $scope.income,
                    $scope.expense
                ]
            };
            $scope.overlappingOptions = {
                seriesBarDistance: 10,
                plugins: [
                    Chartist.plugins.tooltip()
                ]
            };
            $scope.overlappingResponsiveOptions = [
                ["", {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function(value) {
                            return value[0]
                        }
                    }
                }]
            ];

            // $window.overlappingData = $scope.overlappingData;
            // $window.overlappingOptions = $scope.overlappingOptions;
            // $window.overlappingResponsiveOptions = $scope.overlappingResponsiveOptions;
            /*******************************************Dashboard Data**********************************************/

            /*******************************************Case Data**********************************************/
            $scope.purchase_data = response.data.total_purchase;
            $scope.total_users = response.data.total_users;
            $scope.latest_client_cheque_date = response.data.latest_client_cheque_date;
            $scope.total_payable = response.data.total_payable;
            $scope.total_received = response.data.total_received;
            $scope.total_pending = response.data.total_pending;
            $scope.total_cash_cases_punched = response.data.total_cash_cases_punched;
            $scope.total_cash_cases_closed = response.data.total_cash_cases_closed;
            $scope.total_grn = response.data.total_grn;
            $scope.avg_feedback_rating = response.data.avg_feedback_rating;
            $scope.available_fleet = response.data.available_fleet;
            $scope.allocated_fleet = response.data.allocated_fleet;
            $scope.total_customers = response.data.total_customers;
            $scope.closed_cases = response.data.total_cases_closed;
            $scope.punched_cases = response.data.total_cases_punched;
            $scope.invoice_raised = response.data.total_invoice_raised;
            /*********************************************Case Data**********************************************/
            $scope.hide_loader = true;
            //$scope.hide_content = false;

            $window.overlappingData = $scope.overlappingData;
            $window.overlappingOptions = $scope.overlappingOptions;
            $window.overlappingResponsiveOptions = $scope.overlappingResponsiveOptions;
            
            //overlay.style.display = 'none';
        },function(response){
           // console.log(response);
            $scope.purchase_data = '';
            $scope.total_users = '';
            $scope.latest_client_cheque_date = '';
            $scope.total_payable = '';
            $scope.total_received = '';
            $scope.total_pending = '';
            $scope.total_cash_cases_punched = '';
            $scope.total_cash_cases_closed = '';
            $scope.total_grn = '';
            $scope.avg_feedback_rating = '';
            $scope.available_fleet = '';
            $scope.allocated_fleet = '';
            $scope.total_customers = '';
            $scope.closed_cases = '';
            $scope.punched_cases = '';
            $scope.invoice_raised = '';

            $scope.hide_loader = true;
            $scope.hide_content = false;
        })
    };
    $scope.get_bar_graph_list();

    $scope.menu_return = function () {
     if($location.path()=='/login'){
         return false;
     }else{
         return true;
     }
   };

    if(sessionStorage.getItem('token')==null || sessionStorage.getItem('token')==undefined){
        localStorage.clear();
        $location.path('/login');
    }
   
   $scope.menu_return();

    $scope.change_password={};

    $scope.check_login = true;

    $scope.check_cnfrm_pass = function(){
        if($scope.change_password.password!=$scope.cnfrm_password){
            $scope.password_error_msg = true;
        }else{
            $scope.password_error_msg = false;
        }
    };

    $scope.save_password=function () {
        //console.log('Save password controller called');
        changePassword({
            change_password:$scope.change_password
        }).then(function(response){
           // console.log(response);
            //$scope.warehouse_list=response.data;
        },function(response){
            //console.log(response);
            $scope.change_password={};
            $scope.cnfrm_password='';
            $scope.modal_dismiss_two();
        })
    };

	// $rootScope.userMenuList = '';
 //    $rootScope.get_all_menu = '';
 //    $rootScope.login_usr_type = localStorage.getItem('user_type');
 //    getUserId().then(function(r){
 //            userPermissionMenuService({
 //                user_id: r.data
 //            }).then(function (res) {
 //                $rootScope.userMenuList = res.data.data;
 //                localStorage.setItem('user_rights',JSON.stringify(res.data.data));
 //            })
 //        })

    getWarehouseListService2({}).then(function (response) {
        $scope.company_list = response.data;
    });

    $scope.menu_change_warehouse = function (wh) {
        
        localStorage.setItem('warehouse_id',wh.id);
        localStorage.setItem('warehouse_name',wh.warehouse_name);
        localStorage.setItem('warehouse_state_id',wh.state_id);
        localStorage.setItem('warehouse_info',JSON.stringify(wh));
        //localStorage.setItem('warehouse_info',wh);
        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
        
        $rootScope.$broadcast('change_warehouse',wh.id);
        $route.reload();
    };

    
    //var last_count=2;
    $scope.get_notification_data=function () {
        getNotifications({}).then(function(response){
           $scope.notification_data=response.data;
           $scope.count=parseInt(response.data.count_case_activated)+parseInt(response.data.count_case_closed)+parseInt(response.data.count_case_disputed)+parseInt(response.data.count_fitness_expiry)+parseInt(response.data.count_insurance_expiry)+parseInt(response.data.count_nationalpermit_expiry)+parseInt(response.data.count_pollutionpermit_expiry)+parseInt(response.data.count_purchase_requistion)+parseInt(response.data.count_statepermit_expiry)+parseInt(response.data.count_purchase_requistion_approved)+parseInt(response.data.count_loan_statememt);
        },function(response){
            //console.log(response);
        })
    };
    $scope.get_notification_data();

   $interval(function(){
         $scope.get_notification_data();
        // um();
        
        // if($scope.count!=last_count && $scope.count>last_count){
        //     $scope.show=parseInt($scope.count)-parseInt(last_count);
        // }else{
        //     $scope.show=0;
        // }
    },50000); 
    
    var myInterval = $interval(function(){
        um();
    },10000,1)
    .then(function(){
        $interval.cancel(myInterval);
    });

    setTimeout(um,3000);

    $scope.change_to_all=function(){
        localStorage.setItem('warehouse_id','');
        $route.reload();
    }

    $scope.save_todo_list=function(){
        addTodoList({
            todo:$scope.todo
        }).then(function(response){
            //console.log(response);
            $scope.todo = '';
            $scope.get_todo_list_data();
        },function(response){
            //console.log(response);
        })
    };

    $scope.get_todo_list_data = function(){
        getTodoList({}).then(function(response){
            //console.log(response);
            $scope.todo_data = response.data;
        },function(response){
            //console.log(response);
        })
    }
    $scope.get_todo_list_data();

    $scope.task_done=function(id){
        checkTaskDoneStatus({
            id:id
        }).then(function(response){
            //console.log(response);
            $scope.get_todo_list_data();
            //$scope.task_done = response.data;
        },function(response){
           // console.log(response);
        })
    }

    $scope.delete_task=function(id){
        deleteTodoList({
            id:id
        }).then(function(response){
           // console.log(response);
            $scope.get_todo_list_data();
            //$scope.task_done = response.data;
        },function(response){
           // console.log(response);
        })
    }

    // $scope.get_third_line_data=function(){
    //     getThirdLineData({}).then(function(response){
    //         console.log(response);
    //         $scope.purchase_data = response.data.total_purchase;
    //         $scope.total_users = response.data.total_users;
    //         $scope.latest_client_cheque_date = response.data.latest_client_cheque_date;
    //         $scope.total_payable = response.data.total_payable;
    //         $scope.total_received = response.data.total_received;
    //         $scope.total_pending = response.data.total_pending;
    //         $scope.total_cash_cases_punched = response.data.total_cash_cases_punched;
    //         $scope.total_cash_cases_closed = response.data.total_cash_cases_closed;
    //         $scope.total_grn = response.data.total_grn;
    //         $scope.avg_feedback_rating = response.data.avg_feedback_rating;
    //         $scope.available_fleet = response.data.available_fleet;
    //         $scope.allocated_fleet = response.data.allocated_fleet;
    //         $scope.total_customers = response.data.total_customers;
    //     },function(response){
    //         console.log(response);
    //     })
    // }
    // $scope.get_third_line_data();

    $scope.getEmployeeDataForDashboard=function(){
        getEmployeeNameForDashboard({}).then(function(response){
            //console.log(response);
            $scope.employee_name=response.data;
        },function(response){
           // console.log(response);
        })
    };
    $scope.getEmployeeDataForDashboard();

    $scope.getNewsData=function(){
        var url = 'https://newsapi.org/v2/top-headlines?' +getBarGraphData
          'country=in&' +
          'apiKey=ee425924f68a4824ad73f3a36cba7afe';

        //   var req = new Request(url);
        //   fetch(req)
        //       .then(function(response) {
        //           console.log(response.data.articles);
        //           $scope.news_data = response.json();
        //           console.log(response.json());
        //       })

        $http({
            method: 'GET',
            // url: 'https://newsapi.org/v2/top-headlines?' +'country=in&' +'apiKey=ee425924f68a4824ad73f3a36cba7afe',
             url: 'https://newsapi.org/v2/top-headlines?sources=cnbc&apiKey=ee425924f68a4824ad73f3a36cba7afe',
            // url: 'https://newsapi.org/v2/top-headlines?sources=medical-news-today&apiKey=ee425924f68a4824ad73f3a36cba7afe',
            headers: { 'Content-Type': undefined },
        }).
        success(function (data, status, headers, config) {
            
            $scope.news_data = data.articles;
           // console.log(data.articles);
            
        }).
        error(function (data, status, headers, config) {
          //  console.log('data---->',data);
            
        });
    };
    $scope.getNewsData();

    
    function um(){
    $rootScope.login_usr_type = localStorage.getItem('user_type');
console.log('helllloooooooooooo');
console.log(localStorage.getItem('user_type'));
        if(localStorage.getItem('user_type') == 'Admin'){
        console.log('In if part');
            var modules = [];
            modules = JSON.parse(localStorage.getItem('user_rights'));
            $rootScope.menus = modules;
            for(var n=0;n<$rootScope.menus.length;n++){
                for(var o=0;o<$rootScope.menus[n].sub_modules.length;o++){
                    if($rootScope.menus[n].sub_modules[o].sub_module_routes== '#' + $location.path()){
                      for (var l = 0; l < $rootScope.menus[n].sub_modules[o].sub_modules_action.length; l++) {
                        $rootScope.menus[n].sub_modules[o].sub_modules_action[l].status = 'true';
                      }
                        $rootScope.current_module_rights = $rootScope.menus[n].sub_modules[o].sub_modules_action;
                    }
                }
            }
        }else if(localStorage.getItem('user_type')=='user' || localStorage.getItem('user_type') == 'Subadmin'){
        console.log('In else part');
          var modules = [];
            var privilege_listing = JSON.parse(localStorage.getItem('user_rights'));

            console.log('privilege_listing==>>',privilege_listing);
            if(privilege_listing.length>0) {
                for (var j = 0; j < privilege_listing.length; j++) {
                    var temporary = [];
                    for (var k = 0; k < privilege_listing[j].sub_modules.length; k++) {
                        for (var l = 0; l < privilege_listing[j].sub_modules[k].sub_modules_action.length; l++) {
                            if (privilege_listing[j].sub_modules[k].sub_modules_action[l].status == 'true') {
                                temporary.push(privilege_listing[j].sub_modules[k].sub_modules_action[l]);
                                console.log('temporary=>',temporary);
                            }
                        }
                    }
                    

                    if (temporary.length > 0) {
                        if (modules.indexOf(privilege_listing[j].id) <= -1) {
                            modules.push(privilege_listing[j]);
                            console.log('modules=>',modules);
                        }
                    }
                }
            }
            for(var m=0;m<modules.length;m++){
                var temp  = modules[m].sub_modules;
                var temp2 = temp.filter(emptyElement);
                modules[m].sub_modules = [];
                modules[m].sub_modules = temp2;
            }
            $rootScope.menus = modules;

            console.log('heyyyy',$rootScope.menus);


            for(var n=0;n<$rootScope.menus.length;n++){
              console.log('in1');
                for(var o=0;o<$rootScope.menus[n].sub_modules.length;o++){
                  console.log('in2');
                  console.log($rootScope.menus[n].sub_modules[o].sub_module_routes);
                    if($rootScope.menus[n].sub_modules[o].sub_module_routes=='#'+$location.path()){
                      console.log('in3');
                        $rootScope.current_module_rights = $rootScope.menus[n].sub_modules[o].sub_modules_action;
                        console.log($rootScope.current_module_rights);
                    }
                }
            }



            // $rootScope.elephento_user_rights = JSON.parse(localStorage.getItem('user_rights'));

            // for(var g=0;g<$rootScope.elephento_user_rights.length;g++){

            //     for(var p=0;p<$rootScope.elephento_user_rights[g].user_modules[0].user_role_sub_modules.length;p++){

            //         if($rootScope.elephento_user_rights[g].user_modules[0].user_role_sub_modules[p].sub_module.sub_module_routes=='#'+ $location.path()){

            //             $rootScope.current_module_rights = $rootScope.elephento_user_rights[g].user_modules[0].user_role_sub_modules[p];
            //         }
            //     }
            // }
        }

        function emptyElement(element) {
          for (var p in element.sub_modules_action) {
              if (element.sub_modules_action[p].status.toString().toLowerCase() == 'false' || element.sub_modules_action[p].status.toString().toLowerCase() == false ){
                  return false;
              }else{
                  return true;
              }
          }
      };
}
    
}]);
