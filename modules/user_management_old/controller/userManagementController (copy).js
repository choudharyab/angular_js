var userManagementModule = angular.module('userManagementModule',[]);
userManagementModule.controller('userManagementController',['$rootScope','$scope','$location','getUserManagementService','getUsersListingService','saveUserPermissionService',function($rootScope,$scope,$location,getUserManagementService,getUsersListingService,saveUserPermissionService){

    var all_modules;

    $scope.cheked_permission = {
        module_permissions:{}
    };

    $scope.add_user_management = {module_permissions:[]};

    getUserManagementService({}).then(function(res) {
        console.log(res);
        $scope.software_all_rights = res.data;

        outer_loop:
        for(var p=0;p<$scope.software_all_rights.length;p++){
            if($scope.software_all_rights[p].modules_name=="Reports"){

                for(var g=0;g<$scope.software_all_rights[p].sub_modules.length;g++){

                    $scope.software_all_rights[p].sub_modules[g].modules_name = $scope.software_all_rights[p].sub_modules[g].sub_module_name + " Reports";

                    //$scope.software_all_rights[p].sub_modules[g].id = $scope.software_all_rights[p].sub_modules[g].module_id;

                    delete $scope.software_all_rights[p].sub_modules[g].sub_module_name;

                    //$scope.software_all_rights[p].sub_modules[g].sub_modules = $scope.software_all_rights[p].sub_modules[g].sub_sub_modules;

                    for(var x=0;x<$scope.software_all_rights[p].sub_modules[g].sub_sub_modules.length;x++){

                        $scope.software_all_rights[p].sub_modules[g].sub_sub_modules[x].sub_module_name = $scope.software_all_rights[p].sub_modules[g].sub_sub_modules[x].sub_sub_module_name;
                        delete $scope.software_all_rights[p].sub_modules[g].sub_sub_modules[x].sub_sub_module_name;

                        var get_sub_sub_mod_id = $scope.software_all_rights[p].sub_modules[g].sub_sub_modules[x].id;

                        $scope.software_all_rights[p].sub_modules[g].sub_sub_modules[x].id = $scope.software_all_rights[p].sub_modules[g].sub_sub_modules[x].sub_module_id;

                        $scope.software_all_rights[p].sub_modules[g].sub_sub_modules[x].sub_sub_module_id = get_sub_sub_mod_id;
                    }
                    $scope.software_all_rights.push($scope.software_all_rights[p].sub_modules[g]);
                }

                for(var t=0;t<$scope.software_all_rights.length;t++){

                    if($scope.software_all_rights[t].sub_sub_modules){

                        for(var h=0;h<$scope.software_all_rights[t].sub_sub_modules.length;h++){

                            $scope.software_all_rights[t].sub_sub_modules[h].sub_module_routes = $scope.software_all_rights[t].sub_sub_modules[h].sub_sub_module_routes;

                            delete $scope.software_all_rights[t].sub_sub_modules[h].sub_sub_module_routes;

                            $scope.software_all_rights[t].sub_modules = $scope.software_all_rights[t].sub_sub_modules;
                        }
                    }
                    if(t==$scope.software_all_rights.length-1){
                        $scope.software_all_rights.splice(p,1);
                    }
                }

                console.log($scope.software_all_rights);

                break outer_loop;
            }
        }

        $scope.add_all_rights = $scope.software_all_rights;
        all_modules = $scope.software_all_rights;
    });

    getUsersListingService({}).then(function (res) {
       $scope.get_all_users = res.data;
    });

    $scope.add_permission_function = function (mod_id,sub_mod_id,type,ssm_id) {

        $scope.modules = {'module_id':mod_id,'sub_modules':[]};
        $scope.sub_modules = {};

        if(ssm_id == undefined) {
            if (document.getElementById(type + '_' + sub_mod_id).checked) {
                if ($scope.add_user_management.module_permissions.length > 0) {

                    check_outer:
                        for (var g = 0; g < $scope.add_user_management.module_permissions.length; g++) {
                            if ($scope.add_user_management.module_permissions[g].module_id == mod_id) {

                                for (var f = 0; f < $scope.add_user_management.module_permissions[g].sub_modules.length; f++) {
                                    if ($scope.add_user_management.module_permissions[g].sub_modules[f].sub_module_id == sub_mod_id) {
                                        $scope.add_user_management.module_permissions[g].sub_modules[f][type] = 'yes';
                                        break check_outer;
                                    } else {
                                        if (f == $scope.add_user_management.module_permissions[g].sub_modules.length - 1 && $scope.add_user_management.module_permissions[g].sub_modules[f].sub_module_id != sub_mod_id) {
                                            $scope.sub_modules.module_id = mod_id;
                                            $scope.sub_modules.sub_module_id = sub_mod_id;
                                            $scope.sub_modules.sub_sub_module_id = '';
                                            $scope.sub_modules.add_option = 'no';
                                            $scope.sub_modules.edit_option = 'no';
                                            $scope.sub_modules.delete_option = 'no';
                                            $scope.sub_modules.received_stock = 'no';
                                            $scope.sub_modules.dispatch_stock = 'no';
                                            $scope.sub_modules.received_option = 'no';
                                            $scope.sub_modules.submodule_option = 'no';

                                            $scope.sub_modules[type] = 'yes';

                                            $scope.add_user_management.module_permissions[g].sub_modules.push($scope.sub_modules);

                                        }
                                    }
                                }
                            } else {
                                if (g == $scope.add_user_management.module_permissions.length - 1) {

                                    $scope.sub_modules.module_id = mod_id;
                                    $scope.sub_modules.sub_module_id = sub_mod_id;
                                    $scope.sub_modules.sub_sub_module_id = '';
                                    $scope.sub_modules.add_option = 'no';
                                    $scope.sub_modules.edit_option = 'no';
                                    $scope.sub_modules.delete_option = 'no';
                                    $scope.sub_modules.received_stock = 'no';
                                    $scope.sub_modules.dispatch_stock = 'no';
                                    $scope.sub_modules.received_option = 'no';
                                    $scope.sub_modules.submodule_option = 'no';
                                    $scope.sub_modules[type] = 'yes';

                                    $scope.modules.sub_modules.push($scope.sub_modules);
                                    $scope.add_user_management.module_permissions.push($scope.modules);
                                }
                            }
                        }
                } else {
                    $scope.sub_modules.module_id = mod_id;
                    $scope.sub_modules.sub_module_id = sub_mod_id;
                    $scope.sub_modules.sub_sub_module_id = '';
                    $scope.sub_modules.add_option = 'no';
                    $scope.sub_modules.edit_option = 'no';
                    $scope.sub_modules.delete_option = 'no';
                    $scope.sub_modules.received_stock = 'no';
                    $scope.sub_modules.dispatch_stock = 'no';
                    $scope.sub_modules.received_option = 'no';
                    $scope.sub_modules.submodule_option = 'no';
                    $scope.sub_modules[type] = 'yes';

                    $scope.modules.sub_modules.push($scope.sub_modules);
                    $scope.add_user_management.module_permissions.push($scope.modules);
                }
            } else {
                for (var r = 0; r < $scope.add_user_management.module_permissions.length; r++) {
                    if ($scope.add_user_management.module_permissions[r].module_id == mod_id) {
                        for (var n = 0; n < $scope.add_user_management.module_permissions[r].sub_modules.length; n++) {
                            if ($scope.add_user_management.module_permissions[r].sub_modules[n].sub_module_id == sub_mod_id) {
                                $scope.add_user_management.module_permissions[r].sub_modules[n][type] = 'no';
                                break;
                            }
                        }
                    }
                }
            }
        }else{


            // -----------------------------------code for report section user management------------------------------//

            console.log(document.getElementById(type + '_' + sub_mod_id+ssm_id).checked);


            if (document.getElementById(type + '_' + sub_mod_id+ssm_id).checked) {
                if ($scope.add_user_management.module_permissions.length > 0) {

                    check_outer:
                        for (var g = 0; g < $scope.add_user_management.module_permissions.length; g++) {
                            if ($scope.add_user_management.module_permissions[g].module_id == mod_id) {

                                console.log('c1');

                                for (var f = 0; f < $scope.add_user_management.module_permissions[g].sub_modules.length; f++) {
                                    if ($scope.add_user_management.module_permissions[g].sub_modules[f].sub_sub_module_id == ssm_id) {

                                        console.log('c2');

                                        $scope.add_user_management.module_permissions[g].sub_modules[f][type] = 'yes';
                                        break check_outer;
                                    } else {
                                        if (f == $scope.add_user_management.module_permissions[g].sub_modules.length - 1) {

                                            console.log('c3');

                                            $scope.sub_modules.module_id = mod_id;
                                            $scope.sub_modules.sub_module_id = sub_mod_id;
                                            $scope.sub_modules.sub_sub_module_id = ssm_id;
                                            $scope.sub_modules.add_option = 'no';
                                            $scope.sub_modules.edit_option = 'no';
                                            $scope.sub_modules.delete_option = 'no';
                                            $scope.sub_modules.received_stock = 'no';
                                            $scope.sub_modules.dispatch_stock = 'no';
                                            $scope.sub_modules.received_option = 'no';
                                            $scope.sub_modules.submodule_option = 'no';

                                            $scope.sub_modules[type] = 'yes';

                                            $scope.add_user_management.module_permissions[g].sub_modules.push($scope.sub_modules);

                                        }
                                    }
                                }
                            } else {
                                if (g == $scope.add_user_management.module_permissions.length - 1) {

                                    console.log('c4');

                                    $scope.sub_modules.module_id = mod_id;
                                    $scope.sub_modules.sub_module_id = sub_mod_id;
                                    $scope.sub_modules.sub_sub_module_id = ssm_id;
                                    $scope.sub_modules.add_option = 'no';
                                    $scope.sub_modules.edit_option = 'no';
                                    $scope.sub_modules.delete_option = 'no';
                                    $scope.sub_modules.received_stock = 'no';
                                    $scope.sub_modules.dispatch_stock = 'no';
                                    $scope.sub_modules.received_option = 'no';
                                    $scope.sub_modules.submodule_option = 'no';
                                    $scope.sub_modules[type] = 'yes';

                                    $scope.modules.sub_modules.push($scope.sub_modules);
                                    $scope.add_user_management.module_permissions.push($scope.modules);
                                }
                            }
                        }
                } else {

                    console.log('c5');

                    $scope.sub_modules.module_id = mod_id;
                    $scope.sub_modules.sub_module_id = sub_mod_id;
                    $scope.sub_modules.sub_sub_module_id = ssm_id;
                    $scope.sub_modules.add_option = 'no';
                    $scope.sub_modules.edit_option = 'no';
                    $scope.sub_modules.delete_option = 'no';
                    $scope.sub_modules.received_stock = 'no';
                    $scope.sub_modules.dispatch_stock = 'no';
                    $scope.sub_modules.received_option = 'no';
                    $scope.sub_modules.submodule_option = 'no';
                    $scope.sub_modules[type] = 'yes';

                    $scope.modules.sub_modules.push($scope.sub_modules);
                    $scope.add_user_management.module_permissions.push($scope.modules);
                }
            } else {

                console.log('c6');

                for (var r = 0; r < $scope.add_user_management.module_permissions.length; r++) {
                    if ($scope.add_user_management.module_permissions[r].module_id == mod_id) {
                        for (var n = 0; n < $scope.add_user_management.module_permissions[r].sub_modules.length; n++) {
                            if ($scope.add_user_management.module_permissions[r].sub_modules[n].sub_sub_module_id == ssm_id) {
                                $scope.add_user_management.module_permissions[r].sub_modules[n][type] = 'no';

                                $scope.add_user_management.module_permissions[r].sub_modules.splice(n,1);

                                if($scope.add_user_management.module_permissions[r].sub_modules==0){
                                    $scope.add_user_management.module_permissions.splice(r,1);
                                }

                                break;
                            }
                        }
                    }
                }

                console.log($scope.add_user_management);

            }

            console.log($scope.add_user_management);

        }
       //console.log($scope.add_user_management);
    };
    $scope.submodule_permission_function = function (mod_id,sub_mod_id,type,ssm_id) {

        if(ssm_id==undefined) {

            if (document.getElementById('submodule_option_' + sub_mod_id).checked) {

                if (type != 'Debit Note' && type != 'Stock Entry' && type != 'Stock List' && type != 'Stock Exit' && type != 'Credit Note' && type != 'Debit Note' && type != 'Balance Sheet' && type != 'Profit & Loss' && type != 'Bank Account' && type != 'Payroll' && type != 'Attendance' && type != 'Otp List' && type != 'Log File' && type != 'Purchase' && type != 'Inventory' && type != 'Sale' && type != 'Daily Report' && type != 'Bank Accounts' && type != 'OTP List' && type != 'Log Files' && type != 'Printable Format' && type != 'Backup Database') {

                    document.getElementById('add_option' + '_' + sub_mod_id).checked = true;
                    document.getElementById('edit_option' + '_' + sub_mod_id).checked = true;
                    document.getElementById('delete_option' + '_' + sub_mod_id).checked = true;

                    for (var e = 0; e < 3; e++) {
                        if (e == 0) {
                            $scope.add_permission_function(mod_id, sub_mod_id, 'add_option');
                        }
                        if (e == 1) {
                            $scope.add_permission_function(mod_id, sub_mod_id, 'edit_option');
                        }
                        if (e == 2) {
                            $scope.add_permission_function(mod_id, sub_mod_id, 'delete_option');
                        }
                    }
                    if (type == 'Purchase Order' || type == 'Sale Purchase Order' || type == 'Invoice') {

                        document.getElementById('received_option' + '_' + sub_mod_id).checked = true;
                        $scope.add_permission_function(mod_id, sub_mod_id, 'received_option');
                    }
                }
                else if (type == 'Stock List') {
                    document.getElementById('edit_option' + '_' + sub_mod_id).checked = true;
                    document.getElementById('delete_option' + '_' + sub_mod_id).checked = true;
                    for (var e = 0; e < 2; e++) {
                        if (e == 0) {
                            $scope.add_permission_function(mod_id, sub_mod_id, 'edit_option');
                        }
                        if (e == 1) {
                            $scope.add_permission_function(mod_id, sub_mod_id, 'delete_option');
                        }
                    }
                }
                else if (type == 'Stock Entry') {
                    document.getElementById('received_stock' + '_' + sub_mod_id).checked = true;
                    $scope.add_permission_function(mod_id, sub_mod_id, 'received_stock');
                }
                else if (type == 'Stock Exit') {
                    document.getElementById('dispatch_stock' + '_' + sub_mod_id).checked = true;
                    $scope.add_permission_function(mod_id, sub_mod_id, 'dispatch_stock');
                }
                else if (type == 'Debit Note' || type == 'Credit Note') {
                    document.getElementById('delete_option' + '_' + sub_mod_id).checked = true;
                    $scope.add_permission_function(mod_id, sub_mod_id, 'delete_option');
                }
                else {
                    $scope.add_permission_function(mod_id, sub_mod_id, 'submodule_option');
                }

                console.log($scope.add_user_management);
            } else {
                if (type != 'Debit Note' && type != 'Stock Entry' && type != 'Stock List' && type != 'Stock Exit' && type != 'Credit Note' && type != 'Debit Note' && type != 'Balance Sheet' && type != 'Profit & Loss' && type != 'Bank Account' && type != 'Payroll' && type != 'Attendance' && type != 'Otp List' && type != 'Log File' && type != 'Purchase' && type != 'Inventory' && type != 'Sale' && type != 'Daily Report') {
                    document.getElementById('add_option' + '_' + sub_mod_id).checked = false;
                    document.getElementById('edit_option' + '_' + sub_mod_id).checked = false;
                    document.getElementById('delete_option' + '_' + sub_mod_id).checked = false;

                    for (var e = 0; e < $scope.add_user_management.module_permissions.length; e++) {
                        if ($scope.add_user_management.module_permissions[e].module_id == mod_id) {
                            for (var b = 0; b < $scope.add_user_management.module_permissions[e].sub_modules.length; b++) {
                                if ($scope.add_user_management.module_permissions[e].sub_modules[b].sub_module_id == sub_mod_id) {
                                    $scope.add_user_management.module_permissions[e].sub_modules.splice(b, 1);
                                    if ($scope.add_user_management.module_permissions[e].sub_modules.length == 0) {
                                        $scope.add_user_management.module_permissions.splice(e, 1);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (type == 'Purchase Order' || type == 'Sale Purchase Order' || type == 'Invoice') {

                        document.getElementById('received_option' + '_' + sub_mod_id).checked = false;
                    }
                }
                else if (type == 'Stock List') {
                    document.getElementById('edit_option' + '_' + sub_mod_id).checked = false;
                    document.getElementById('delete_option' + '_' + sub_mod_id).checked = false;
                    for (var e = 0; e < $scope.add_user_management.module_permissions.length; e++) {
                        if ($scope.add_user_management.module_permissions[e].module_id == mod_id) {
                            for (var b = 0; b < $scope.add_user_management.module_permissions[e].sub_modules.length; b++) {
                                if ($scope.add_user_management.module_permissions[e].sub_modules[b].sub_module_id == sub_mod_id) {
                                    $scope.add_user_management.module_permissions[e].sub_modules.splice(b, 1);
                                    if ($scope.add_user_management.module_permissions[e].sub_modules.length == 0) {
                                        $scope.add_user_management.module_permissions.splice(e, 1);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type == 'Stock Entry') {
                    document.getElementById('received_stock' + '_' + sub_mod_id).checked = false;
                    for (var e = 0; e < $scope.add_user_management.module_permissions.length; e++) {
                        if ($scope.add_user_management.module_permissions[e].module_id == mod_id) {
                            for (var b = 0; b < $scope.add_user_management.module_permissions[e].sub_modules.length; b++) {
                                if ($scope.add_user_management.module_permissions[e].sub_modules[b].sub_module_id == sub_mod_id) {
                                    $scope.add_user_management.module_permissions[e].sub_modules.splice(b, 1);
                                    if ($scope.add_user_management.module_permissions[e].sub_modules.length == 0) {
                                        $scope.add_user_management.module_permissions.splice(e, 1);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type == 'Stock Exit') {
                    document.getElementById('dispatch_stock' + '_' + sub_mod_id).checked = false;
                    for (var e = 0; e < $scope.add_user_management.module_permissions.length; e++) {
                        if ($scope.add_user_management.module_permissions[e].module_id == mod_id) {
                            for (var b = 0; b < $scope.add_user_management.module_permissions[e].sub_modules.length; b++) {
                                if ($scope.add_user_management.module_permissions[e].sub_modules[b].sub_module_id == sub_mod_id) {
                                    $scope.add_user_management.module_permissions[e].sub_modules.splice(b, 1);
                                    if ($scope.add_user_management.module_permissions[e].sub_modules.length == 0) {
                                        $scope.add_user_management.module_permissions.splice(e, 1);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else if (type == 'Debit Note' || type == 'Credit Note') {
                    document.getElementById('delete_option' + '_' + sub_mod_id).checked = false;
                    for (var e = 0; e < $scope.add_user_management.module_permissions.length; e++) {
                        if ($scope.add_user_management.module_permissions[e].module_id == mod_id) {
                            for (var b = 0; b < $scope.add_user_management.module_permissions[e].sub_modules.length; b++) {
                                if ($scope.add_user_management.module_permissions[e].sub_modules[b].sub_module_id == sub_mod_id) {
                                    $scope.add_user_management.module_permissions[e].sub_modules.splice(b, 1);
                                    if ($scope.add_user_management.module_permissions[e].sub_modules.length == 0) {
                                        $scope.add_user_management.module_permissions.splice(e, 1);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    for (var e = 0; e < $scope.add_user_management.module_permissions.length; e++) {
                        if ($scope.add_user_management.module_permissions[e].module_id == mod_id) {
                            for (var b = 0; b < $scope.add_user_management.module_permissions[e].sub_modules.length; b++) {
                                if ($scope.add_user_management.module_permissions[e].sub_modules[b].sub_module_id == sub_mod_id) {
                                    $scope.add_user_management.module_permissions[e].sub_modules.splice(b, 1);
                                    if ($scope.add_user_management.module_permissions[e].sub_modules.length == 0) {
                                        $scope.add_user_management.module_permissions.splice(e, 1);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }else{
            if (document.getElementById('submodule_option_' + sub_mod_id + ssm_id).checked) {

                $scope.add_permission_function(mod_id, sub_mod_id, 'submodule_option',ssm_id);
            }else{
                $scope.add_permission_function(mod_id, sub_mod_id, 'submodule_option',ssm_id);
            }
        }
    };
    $scope.wholeModule = function (mod_id) {

        if(document.getElementById('wholemodule_option_'+mod_id).checked){

            for(var n=0;n<all_modules.length;n++){

                if(all_modules[n].id==mod_id){

                    if(all_modules[n].sub_modules){

                    for(var m=0;m<all_modules[n].sub_modules.length;m++){

                        if(all_modules[n].sub_modules[m].sub_sub_module_id){

                            document.getElementById('submodule_option_'+all_modules[n].sub_modules[m].id + all_modules[n].sub_modules[m].sub_sub_module_id).checked=true;
                        }else{
                            document.getElementById('submodule_option_'+all_modules[n].sub_modules[m].id).checked=true;
                        }
                        $scope.submodule_permission_function(mod_id,all_modules[n].sub_modules[m].id,all_modules[n].sub_modules[m].sub_module_name,all_modules[n].sub_modules[m].sub_sub_module_id);
                    }
                    }else{

                        $scope.modules = {'module_id':mod_id,'sub_modules':[]};
                        $scope.sub_modules = {};

                        $scope.sub_modules.module_id = mod_id;
                        $scope.sub_modules.sub_module_id = '';
                        $scope.sub_modules.sub_sub_module_id = '';
                        $scope.sub_modules.add_option = 'no';
                        $scope.sub_modules.edit_option = 'no';
                        $scope.sub_modules.delete_option = 'no';
                        $scope.sub_modules.received_stock = 'no';
                        $scope.sub_modules.dispatch_stock = 'no';
                        $scope.sub_modules.received_option = 'no';
                        $scope.sub_modules.submodule_option = 'no';
                        $scope.sub_modules.sub_sub_module_id = '';

                        $scope.modules.sub_modules.push($scope.sub_modules);
                        $scope.add_user_management.module_permissions.push($scope.modules);

                        console.log($scope.add_user_management);
                    }
                }
            }
        }else{
            for(var e=0;e<all_modules.length;e++){

                if(all_modules[e].id==mod_id){

                    if(all_modules[e].sub_modules){

                        for(var t=0;t<all_modules[e].sub_modules.length;t++){

                            if(all_modules[e].sub_modules[t].sub_sub_module_id){

                                document.getElementById('submodule_option_'+all_modules[e].sub_modules[t].id + all_modules[e].sub_modules[t].sub_sub_module_id).checked=false;
                            }else{
                                document.getElementById('submodule_option_'+all_modules[e].sub_modules[t].id).checked = false;
                            }
                            $scope.submodule_permission_function(mod_id,all_modules[e].sub_modules[t].id,all_modules[e].sub_modules[t].sub_module_name,all_modules[e].sub_modules[t].sub_sub_module_id);
                        }
                    }else{
                         for(var b=0;b<$scope.add_user_management.module_permissions.length;b++){

                             if(mod_id==$scope.add_user_management.module_permissions[b].module_id){

                                 $scope.add_user_management.module_permissions.splice(b,1);

                                 break;
                             }
                         }
                    }
                }
            }
        }
    };


    $scope.supersub_module_permission = function (mod_id,sub_mod_id,type,ssm_id) {
        if(document.getElementById(type+'_'+ssm_id).checked){

        }
    };

    $scope.save_user_management = function () {
      /*  saveUserPermissionService({permissions:$scope.add_user_management}).then(function (res) {
            $('#permissionSuccess').fadeIn().delay(5000).fadeOut();
            $scope.permission_success_msg = JSON.parse(res.data);
            $scope.add_user_management = {module_permissions:[]};
            $('input:checkbox').removeAttr('checked');
        },function (res) {
            console.log(res);
        })*/

      console.log(JSON.stringify($scope.add_user_management));

    };

    $scope.sub_sub_module_permission = function (mod_id,sub_mod_id,type,ssm_id) {

        if(document.getElementById(type+'_'+ssm_id).checked){

            $scope.modules = {'module_id':mod_id,'sub_modules':[]};
            $scope.sub_modules = {};

           if($scope.add_user_management.module_permissions.length>0){

           }else{
               $scope.sub_modules.module_id = mod_id;
               $scope.sub_modules.sub_module_id = sub_mod_id;
               $scope.sub_modules.sub_sub_module_id = ssm_id;
               $scope.sub_modules.add_option = 'no';
               $scope.sub_modules.edit_option = 'no';
               $scope.sub_modules.delete_option = 'no';
               $scope.sub_modules.received_stock = 'no';
               $scope.sub_modules.dispatch_stock = 'no';
               $scope.sub_modules.received_option = 'no';
               $scope.sub_modules.submodule_option = 'no';
               $scope.sub_modules[type] = 'yes';

               $scope.modules.sub_modules.push($scope.sub_modules);
               $scope.add_user_management.module_permissions.push($scope.modules);
           }

        }
    }

}]);

//



