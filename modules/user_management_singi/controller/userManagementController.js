var userManagementModule = angular.module('userManagementModule',[]);
userManagementModule.controller('userManagementController',['$scope','getAllActivatedUsers','getAllModules','saveUserPermission','editUserManagement',function($scope,getAllActivatedUsers,getAllModules,saveUserPermission,editUserManagement) {

    $scope.user_permission = {'action':[]};
    $scope.action_array = [];
    $scope.submenu_array = [];
    $scope.permission_lists = '';

    $scope.onLoadGetAllActivatedUsers=function () {
        getAllActivatedUsers({}).then(function (response) {
            $scope.users_listing=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.onLoadGetAllActivatedUsers();

    $scope.onLoadGetAllModules=function () {
        getAllModules({}).then(function (response) {
          $scope.permission_lists = response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.onLoadGetAllModules();

    $scope.checkAllModules = function(modules){
        if($scope.user_id != undefined ){
        if(document.getElementById('selectAllModules_'+ modules.id).checked == true){
            document.getElementById('selectAllModules_'+ modules.id).checked = true;
            for(var i=0;i<modules.submenu.length;i++){
                document.getElementById('selectedAll_'+ modules.submenu[i].id).checked = true;
                for(var j=0;j<modules.submenu[i].action.length;j++){
                    document.getElementById('selectedAllSubModule_'+ modules.submenu[i].action[j].id).checked = true;
                    if($scope.action_array.indexOf(modules.submenu[i].action[j].id) <= -1) {
                        $scope.action = {
                            'action_id': modules.submenu[i].action[j].id
                        };
                        $scope.user_permission.action.push($scope.action);
                        $scope.action_array.push($scope.action.action_id);
                    }
                }
                if($scope.submenu_array.indexOf(modules.submenu[i].id) <= -1) {
                    $scope.submenu_array.push(modules.submenu[i].id);
                }
            }
            var temp=[];
            for(var k=0;k<modules.submenu.length;k++){
                for(var l=0;l<$scope.submenu_array.length;l++){
                    if(modules.submenu[k].id == $scope.submenu_array[l]){
                        temp.push($scope.submenu_array[l]);
                        if(temp.length == modules.submenu.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = true;
                        }
                        break;
                    }
                }
            }
        }else{
            var temp_reverse=[];
            for(var m=0;m<modules.submenu.length;m++){
                for(var n=0;n<$scope.submenu_array.length;n++){
                    if(modules.submenu[m].id == $scope.submenu_array[n]){
                        temp_reverse.push($scope.submenu_array[m]);
                        if(temp_reverse.length == modules.submenu.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = false;
                        }
                        break;
                    }
                }
            }
            document.getElementById('selectAllModules_'+ modules.id).checked = false;
            for(var o=0;o<modules.submenu.length;o++){
                document.getElementById('selectedAll_'+ modules.submenu[o].id).checked = false;
                for(var p=0;p<modules.submenu[o].action.length;p++){
                    document.getElementById('selectedAllSubModule_'+ modules.submenu[o].action[p].id).checked = false;
                    $scope.user_permission.action.splice($scope.action_array.indexOf(modules.submenu[o].action[p].id),1);
                    $scope.action_array.splice($scope.action_array.indexOf(modules.submenu[o].action[p].id),1);
                }
                $scope.submenu_array.splice($scope.submenu_array.indexOf(modules.submenu[o].id),1);
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
              angular.forEach(data.action, function (item) {
                  item.Selected = true;
              });
              for (var i = 0; i < data.action.length; i++) {
                  if($scope.action_array.indexOf(data.action[i].id) <= -1) {
                      $scope.action = {
                         'action_id': data.action[i].id
                      };
                      $scope.user_permission.action.push($scope.action);
                      $scope.action_array.push($scope.action.action_id);
                      }
                  }
              if($scope.submenu_array.indexOf(data.id) <= -1) {
                  $scope.submenu_array.push(data.id);
              }
              var temp=[];
              for(var j=0;j<obj.submenu.length;j++){
                  for(var k=0;k<$scope.submenu_array.length;k++){
                      if(obj.submenu[j].id == $scope.submenu_array[k]){
                          temp.push($scope.submenu_array[l]);
                          if(temp.length == obj.submenu.length){
                              document.getElementById('selectAllModules_'+ obj.id).checked = true;
                          }
                          break;
                      }
                  }
              }
          }else{
              var temp_reverse=[];
              for(var l=0;l<obj.submenu.length;l++){
                  for(var m=0;m<$scope.submenu_array.length;m++){
                      if(obj.submenu[l].id == $scope.submenu_array[m]){
                          temp_reverse.push($scope.submenu_array[l]);
                          if(temp_reverse.length == obj.submenu.length){
                              document.getElementById('selectAllModules_'+ obj.id).checked = false;
                          }
                          break;
                      }
                  }
              }
              document.getElementById('selectedAll_'+ data.id).checked = false;
              angular.forEach(data.action, function (item) {
                  item.Selected = false;
              });
              for(var n=0;n<data.action.length;n++)
              {
                $scope.user_permission.action.splice($scope.action_array.indexOf(data.action[n].id),1);
                $scope.action_array.splice($scope.action_array.indexOf(data.action[n].id),1);
                document.getElementById('selectedAllSubModule_'+ data.action[n].id).checked = false;
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
            for(var i=0;i<obj.action.length;i++){
                for(var j=0;j<$scope.action_array.length;j++){
                    if(obj.action[i].id == $scope.action_array[j]){
                        temporary.push($scope.action_array[j]);
                        if(temporary.length == obj.action.length){
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
            for(var k=0;k<modules.submenu.length;k++){

                for(var l=0;l<$scope.submenu_array.length;l++){
                    if(modules.submenu[k].id == $scope.submenu_array[l]){
                        temp.push($scope.submenu_array[l]);
                        if(temp.length == modules.submenu.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = true;
                        }
                        break;
                    }
                }
            }
        }else{
            var temp_reverse=[];
            for(var m=0;m<modules.submenu.length;m++){
                for(var n=0;n<$scope.submenu_array.length;n++){
                    if(modules.submenu[m].id == $scope.submenu_array[n]){
                        temp_reverse.push($scope.submenu_array[m]);
                        if(temp_reverse.length == modules.submenu.length){
                            document.getElementById('selectAllModules_'+ modules.id).checked = false;
                        }
                        break;
                    }
                }
            }

            var temporary_reverse = [];
            for(var o=0;o<obj.action.length;o++){
                for(var p=0;p<$scope.action_array.length;p++){
                    if(obj.action[o].id == $scope.action_array[p]){
                        temporary_reverse.push($scope.action_array[p]);
                        if(temporary_reverse.length == obj.action.length){
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
        saveUserPermission({
            user_management : $scope.user_permission
        }).then(function (response) {
            $('#permissionSuccess').fadeIn().delay(5000).fadeOut();
            $scope.permission_success_msg = JSON.parse(response.data);
            $scope.user_permission = {'action':[]};
            $scope.action_array = [];
            $scope.submenu_array = [];
            $scope.user_id = '';
            for(var i=0;i<$scope.permission_lists.length;i++){
                document.getElementById('selectAllModules_' + $scope.permission_lists[i].id).checked = false;
                for(var j=0;j<$scope.permission_lists[i].submenu.length;j++){
                    document.getElementById('selectedAll_'+ $scope.permission_lists[i].submenu[j].id).checked = false;
                for(var k=0;k<$scope.permission_lists[i].submenu[j].action.length;k++){
                    document.getElementById('selectedAllSubModule_'+ $scope.permission_lists[i].submenu[j].action[k].id).checked = false;
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

       for(var i=0;i<$scope.permission_lists.length;i++){
           document.getElementById('selectAllModules_' + $scope.permission_lists[i].id).checked = false;
           for(var j=0;j<$scope.permission_lists[i].submenu.length;j++){
               document.getElementById('selectedAll_' + $scope.permission_lists[i].submenu[j].id).checked = false;
               for(var k=0;k<$scope.permission_lists[i].submenu[j].action.length;k++){
                   document.getElementById('selectedAllSubModule_' + $scope.permission_lists[i].submenu[j].action[k].id).checked = false;
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
                   for(var m=0;m<$scope.permission_lists.length;m++){
                       var temp=[];
                       for(var n=0;n<$scope.permission_lists[m].submenu.length;n++){
                           var temporary = [];

                           for(var p=0;p<$scope.permission_lists[m].submenu[n].action.length;p++){
                               for(var o=0;o<$scope.action_array.length;o++){
                                   if($scope.permission_lists[m].submenu[n].action[p].id == $scope.action_array[o]){
                                       temporary.push($scope.action_array[o]);
                                       if(temporary.length == $scope.permission_lists[m].submenu[n].action.length){
                                           document.getElementById('selectedAll_'+ $scope.permission_lists[m].submenu[n].id).checked = true;
                                           if($scope.submenu_array.indexOf($scope.permission_lists[m].submenu[n].id) <= -1) {
                                               $scope.submenu_array.push($scope.permission_lists[m].submenu[n].id);
                                           }
                                       }
                                       break;
                                   }
                               }
                           }
                           for(var q=0;q<$scope.submenu_array.length;q++){
                               if($scope.permission_lists[m].submenu[n].id == $scope.submenu_array[q]){
                                   temp.push($scope.submenu_array[q]);
                                   if(temp.length == $scope.permission_lists[m].submenu.length){
                                       document.getElementById('selectAllModules_'+ $scope.permission_lists[m].id).checked = true;
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