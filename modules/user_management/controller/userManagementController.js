var userManagementModule = angular.module('userManagementModule',[]);

userManagementModule.controller('userManagementController',['$rootScope','$scope','$location',
  'getUserManagementService','getUsersListingService','saveUserPermissionService',
  'userPermissionMenuService','updateUserPermissionService','editUserManagement',
  function($rootScope,$scope,$location,getUserManagementService,getUsersListingService,
    saveUserPermissionService,userPermissionMenuService,updateUserPermissionService,editUserManagement){

    getUsersListingService({}).then(function (res) {
        $scope.get_all_users = res.data;
     });

     getUserManagementService({}).then(function(res){
         $scope.get_modules_data=res.data;
     });
     $scope.user_permission = {'action':[]};
     $scope.action_array = [];
    $scope.submenu_array = [];

     $scope.checkAllModules = function(modules){
        if($scope.user_id != undefined ){
        if(document.getElementById('selectAllModules_'+ modules.id).checked == true){
            document.getElementById('selectAllModules_'+ modules.id).checked = true;
            for(var i=0;i<modules.sub_modules.length;i++){
                document.getElementById('selectedAll_'+ modules.sub_modules[i].id).checked = true;
                for(var j=0;j<modules.sub_modules[i].sub_modules_action.length;j++){
                    document.getElementById('selectedAllSubModule_'+ modules.sub_modules[i].sub_modules_action[j].id).checked = true;
                    if($scope.action_array.indexOf(modules.sub_modules[i].sub_modules_action[j].id) <= -1) {
                        $scope.action = {
                            'action_id': modules.sub_modules[i].sub_modules_action[j].id
                        };
                        $scope.user_permission.action.push($scope.action);
                        $scope.action_array.push($scope.action.action_id);
                    }
                }
                if($scope.submenu_array.indexOf(modules.sub_modules[i].id) <= -1) {
                    $scope.submenu_array.push(modules.sub_modules[i].id);
                }
            }
            var temp=[];
            for(var k=0;k<modules.sub_modules.length;k++){
                for(var l=0;l<$scope.submenu_array.length;l++){
                    if(modules.sub_modules[k].id == $scope.submenu_array[l]){
                        temp.push($scope.submenu_array[l]);
                        if(temp.length == modules.sub_modules.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = true;
                        }
                        break;
                    }
                }
            }
        }else{
            var temp_reverse=[];
            for(var m=0;m<modules.sub_modules.length;m++){
                for(var n=0;n<$scope.submenu_array.length;n++){
                    if(modules.sub_modules[m].id == $scope.submenu_array[n]){
                        temp_reverse.push($scope.submenu_array[m]);
                        if(temp_reverse.length == modules.sub_modules.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = false;
                        }
                        break;
                    }
                }
            }
            document.getElementById('selectAllModules_'+ modules.id).checked = false;
            for(var o=0;o<modules.sub_modules.length;o++){
                document.getElementById('selectedAll_'+ modules.sub_modules[o].id).checked = false;
                for(var p=0;p<modules.sub_modules[o].sub_modules_action.length;p++){
                    document.getElementById('selectedAllSubModule_'+ modules.sub_modules[o].sub_modules_action[p].id).checked = false;
                    $scope.user_permission.action.splice($scope.action_array.indexOf(modules.sub_modules[o].sub_modules_action[p].id),1);
                    $scope.action_array.splice($scope.action_array.indexOf(modules.sub_modules[o].sub_modules_action[p].id),1);
                }
                $scope.submenu_array.splice($scope.submenu_array.indexOf(modules.sub_modules[o].id),1);
            }
        }
        }else{
            alert('Please the user first!!');
            document.getElementById('selectAllModules_'+ modules.id).checked = false;
        }
    };

    $scope.checkAll=function (obj,data) {
        if($scope.user_id != undefined ){
          if(document.getElementById('selectedAll_'+ data.id).checked == true){
              document.getElementById('selectedAll_'+ data.id).checked = true;
              angular.forEach(data.sub_modules_action, function (item) {
                  item.Selected = true;
              });
              for (var i = 0; i < data.sub_modules_action.length; i++) {
                  if($scope.action_array.indexOf(data.sub_modules_action[i].id) <= -1) {
                      $scope.action = {
                         'action_id': data.sub_modules_action[i].id
                      };
                      $scope.user_permission.action.push($scope.action);
                      $scope.action_array.push($scope.action.action_id);
                      }
                  }
              if($scope.submenu_array.indexOf(data.id) <= -1) {
                  $scope.submenu_array.push(data.id);
              }
              var temp=[];
              for(var j=0;j<obj.sub_modules.length;j++){
                  for(var k=0;k<$scope.submenu_array.length;k++){
                      if(obj.sub_modules[j].id == $scope.submenu_array[k]){
                          temp.push($scope.submenu_array[l]);
                          if(temp.length == obj.sub_modules.length){
                              document.getElementById('selectAllModules_'+ obj.id).checked = true;
                          }
                          break;
                      }
                  }
              }
          }else{
              var temp_reverse=[];
              for(var l=0;l<obj.sub_modules.length;l++){
                  for(var m=0;m<$scope.submenu_array.length;m++){
                      if(obj.sub_modules[l].id == $scope.submenu_array[m]){
                          temp_reverse.push($scope.submenu_array[l]);
                          if(temp_reverse.length == obj.sub_modules.length){
                              document.getElementById('selectAllModules_'+ obj.id).checked = false;
                          }
                          break;
                      }
                  }
              }
              document.getElementById('selectedAll_'+ data.id).checked = false;
              angular.forEach(data.sub_modules_action, function (item) {
                  item.Selected = false;
              });
              for(var n=0;n<data.sub_modules_action.length;n++)
              {
                $scope.user_permission.action.splice($scope.action_array.indexOf(data.sub_modules_action[n].id),1);
                $scope.action_array.splice($scope.action_array.indexOf(data.sub_modules_action[n].id),1);
                document.getElementById('selectedAllSubModule_'+ data.sub_modules_action[n].id).checked = false;
              }
              $scope.submenu_array.splice($scope.submenu_array.indexOf(data.id),1);
          }
        }else{
            alert('Please the user first!!');
            document.getElementById('selectedAll_'+ data.id).checked = false;
        }


    };

    $scope.add_selected_privilege= function(modules,obj,action_id) {
        if($scope.user_id != undefined ){
        if($scope.action_array.indexOf(action_id) <= -1){
            $scope.action = {
                'action_id' : action_id
            };
            $scope.action_array.push(action_id);
            $scope.user_permission.action.push($scope.action);
            $scope.action = {};
            var temporary = [];
            for(var i=0;i<obj.sub_modules_action.length;i++){
                for(var j=0;j<$scope.action_array.length;j++){
                    if(obj.sub_modules_action[i].id == $scope.action_array[j]){
                        temporary.push($scope.action_array[j]);
                        if(temporary.length == obj.sub_modules_action.length){
                            document.getElementById('selectedAll_'+ obj.id).checked = true;
                            if($scope.submenu_array.indexOf(obj.id) <= -1) {
                                $scope.submenu_array.push(obj.id);
                            }
                        }
                        break;
                    }
                }
            }

            var temp=[];
            for(var k=0;k<modules.sub_modules.length;k++){

                for(var l=0;l<$scope.submenu_array.length;l++){
                    if(modules.sub_modules[k].id == $scope.submenu_array[l]){
                        temp.push($scope.submenu_array[l]);
                        if(temp.length == modules.sub_modules.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = true;
                        }
                        break;
                    }
                }
            }
        }else{
            var temp_reverse=[];
            for(var m=0;m<modules.sub_modules.length;m++){
                for(var n=0;n<$scope.submenu_array.length;n++){
                    if(modules.sub_modules[m].id == $scope.submenu_array[n]){
                        temp_reverse.push($scope.submenu_array[m]);
                        if(temp_reverse.length == modules.sub_modules.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = false;
                        }
                        break;
                    }
                }
            }

            var temporary_reverse = [];
            for(var o=0;o<obj.sub_modules_action.length;o++){
                for(var p=0;p<$scope.action_array.length;p++){
                    if(obj.sub_modules_action[o].id == $scope.action_array[p]){
                        temporary_reverse.push($scope.action_array[p]);
                        if(temporary_reverse.length == obj.sub_modules_action.length){
                            document.getElementById('selectedAll_'+ obj.id).checked = false;
                        }
                        break;
                    }
                }
            }
            $scope.user_permission.action.splice($scope.action_array.indexOf(action_id),1);
            $scope.action_array.splice($scope.action_array.indexOf(action_id),1);
            $scope.submenu_array.splice($scope.submenu_array.indexOf(obj.id),1);
        }

        }else{
            alert('Please the user first!!');
            document.getElementById('selectedAllSubModule_'+ action_id).checked = false;
        }


    };

    $scope.save_user_permission = function(){
        $scope.user_permission.user_id = $scope.user_id;
        saveUserPermissionService({
            user_management : $scope.user_permission
        }).then(function (response) {
            $('#permissionSuccess').fadeIn().delay(5000).fadeOut();
            $scope.permission_success_msg = JSON.parse(response.data);
            alert(JSON.parse(response.data));
            $scope.user_permission = {'action':[]};
            $scope.action_array = [];
            $scope.submenu_array = [];
            $scope.user_id = '';
            for(var i=0;i<$scope.get_modules_data.length;i++){
                document.getElementById('selectAllModules_' + $scope.get_modules_data[i].id).checked = false;
                for(var j=0;j<$scope.get_modules_data[i].sub_modules.length;j++){
                    document.getElementById('selectedAll_'+ $scope.get_modules_data[i].sub_modules[j].id).checked = false;
                for(var k=0;k<$scope.get_modules_data[i].sub_modules[j].action.length;k++){
                    document.getElementById('selectedAllSubModule_'+ $scope.get_modules_data[i].sub_modules[j].action[k].id).checked = false;
                    }
                }
            }
        },function(response){
            console.log(response);
        })
    };

    $scope.edit_user_management = function(){
        $scope.user_permission = {'action':[]};
        $scope.action_array = [];
        $scope.submenu_array = [];

       for(var i=0;i<$scope.get_modules_data.length;i++){
           document.getElementById('selectAllModules_' + $scope.get_modules_data[i].id).checked = false;
           for(var j=0;j<$scope.get_modules_data[i].sub_modules.length;j++){
               document.getElementById('selectedAll_' + $scope.get_modules_data[i].sub_modules[j].id).checked = false;
               for(var k=0;k<$scope.get_modules_data[i].sub_modules[j].sub_modules_action.length;k++){
                   document.getElementById('selectedAllSubModule_' + $scope.get_modules_data[i].sub_modules[j].sub_modules_action[k].id).checked = false;
               }
           }
       }
        editUserManagement({
            id:$scope.user_id
        }).then(function (response) {
            if(response.data != "\"No Data Found\""){
               $scope.privileges = response.data;
               if( $scope.privileges.length > 0) {
                   for (var l = 0; l < $scope.privileges.length; l++) {
                       document.getElementById('selectedAllSubModule_' + $scope.privileges[l].action_id).checked = true;
                       $scope.action = {
                           'action_id': angular.fromJson($scope.privileges[l].action_id)
                       };
                       $scope.action_array.push($scope.action.action_id);
                       $scope.user_permission.action.push($scope.action);
                       $scope.action = {};
                   }
                   for(var m=0;m<$scope.get_modules_data.length;m++){
                       var temp=[];
                       for(var n=0;n<$scope.get_modules_data[m].sub_modules.length;n++){
                           var temporary = [];

                           for(var p=0;p<$scope.get_modules_data[m].sub_modules[n].sub_modules_action.length;p++){
                               for(var o=0;o<$scope.action_array.length;o++){
                                   if($scope.get_modules_data[m].sub_modules[n].sub_modules_action[p].id == $scope.action_array[o]){
                                       temporary.push($scope.action_array[o]);
                                       if(temporary.length == $scope.get_modules_data[m].sub_modules[n].sub_modules_action.length){
                                           document.getElementById('selectedAll_'+ $scope.get_modules_data[m].sub_modules[n].id).checked = true;
                                           if($scope.submenu_array.indexOf($scope.get_modules_data[m].sub_modules[n].id) <= -1) {
                                               $scope.submenu_array.push($scope.get_modules_data[m].sub_modules[n].id);
                                           }
                                       }
                                       break;
                                   }
                               }
                           }
                           for(var q=0;q<$scope.submenu_array.length;q++){
                               if($scope.get_modules_data[m].sub_modules[n].id == $scope.submenu_array[q]){
                                   temp.push($scope.submenu_array[q]);
                                   if(temp.length == $scope.get_modules_data[m].sub_modules.length){
                                       document.getElementById('selectAllModules_'+ $scope.get_modules_data[m].id).checked = true;
                                   }
                                   break;
                               }
                           }
                       }
                   }
               }
            }
        },function(response){
            console.log(response);
        })
    };


}]);