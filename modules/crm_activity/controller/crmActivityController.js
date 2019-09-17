var crmActivityModule=angular.module('crmActivityModule',[]);
crmActivityModule.controller('crmActivityController',['$rootScope','$scope','$location','$filter','$route','getActivityfeedback',
    'getSupplierCustomerActivity','getActivityListing','addActivity','editActivityListing','sendActivityEmails','deleteActivity','updateActivity','commonService',
    function($rootScope,$scope,$location,$filter,$route,getActivityfeedback,getSupplierCustomerActivity,getActivityListing,addActivity,
        editActivityListing,sendActivityEmails,deleteActivity,updateActivity,check_permission){

var list;
var selected_cust,selected_sup;
$scope.active_lable = false;
$scope.supplier_array=[];
$scope.customer_array = [];
 $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };
    $scope.crm_activity={'customer':[],'supplier':[]};
    $scope.edit_active = false;
    $scope.show_save_block=false;
    $scope.show_update_block=false;
    $scope.add_activicty_clicked = function () {
      $scope.edit_active = false;
        $scope.show_update_block=true;
        $scope.show_save_block=false;
        //$scope.crm_activity.activity_date='';
        $scope.crm_activity.activity='';
        $scope.crm_activity.note='';
        $scope.crm_activity.supplier=[];
        $scope.crm_activity.customer=[];
        $scope.supplier_array=[];
        $scope.customer_array = [];
        getSupplierCustomerActivity({}).then(function (response) {
            $scope.customer_list=response.data.customers;
            $scope.supplier_list=response.data.suppliers;
        },function(response){
            console.log(response);
        });
        $scope.selectedAll='';
        $scope.selectedAll2='';
    };


    /*$scope.crm_activity={'customer':[],'supplier':[]};
    $scope.edit_active = false;

    $scope.add_activicty_clicked = function () {
      $scope.edit_active = false;
        getSupplierCustomerActivity({}).then(function (response) {
            $scope.customer_list=response.data.customers;
            $scope.supplier_list=response.data.suppliers;
        },function(response){
            console.log(response);
        });
        $scope.selectedAll='';
        $scope.selectedAll2='';
		$route.reload();
    };*/


    $scope.crm_activity.activity_date=$filter('date')(new Date(),'yyyy-MM-dd');

    $scope.getActivitylist=function () {
        getActivityListing({}).then(function (response) {
            console.log(response);
            $scope.activity_list=response.data;
            list=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.getActivitylist();

    $scope.getSupplierCustomerlist=function () {
        getSupplierCustomerActivity({}).then(function (response) {
            console.log("supplier customer list");
            console.log(response);
            $scope.customer_list=response.data.customers;
            cust_list=response.data.customers;
            $scope.supplier_list=response.data.suppliers;
            sup_list=response.data.suppliers;
            console.log($scope.customer_list);
            console.log($scope.supplier_list);
        },function(response){
            console.log(response);
        })
    };
    $scope.getSupplierCustomerlist();

    /*$scope.checkAll=function (data) {
        if ($scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }
        angular.forEach($scope.supplier_list, function (item) {
            item.Selected = $scope.selectedAll;
        });
        for(var i=0;i<data.length;i++) {
            $scope.supplier = {
                'supplier_id': data[i].id,
                'supplier_code': data[i].supplier_code,
                'supplier_name': data[i].supplier_name,
                'email': data[i].email
            };
            $scope.crm_activity.supplier.push($scope.supplier);
        }

    };

    $scope.checkAll2=function (cust_data) {
        if ($scope.selectedAll2) {
            $scope.selectedAll2 = false;
        } else {
            $scope.selectedAll2 = true;
        }
        angular.forEach($scope.customer_list, function (item) {
            item.Selected = $scope.selectedAll2;
        });
        for(var i=0;i<cust_data.length;i++){
            $scope.customer={
                'customer_id':cust_data[i].id,
                'customer_code':cust_data[i].customer_code,
                'customer_name':cust_data[i].customer_name,
                'email':cust_data[i].email
            };
            $scope.crm_activity.customer.push($scope.customer);
        }
    };*/


    
   $scope.add_selected_supplier= function(s_id,s_code,s_name,s_email) {
      console.log(s_id,s_code,s_name,s_email);
      console.log('##############',$scope.supplier_array);

      if($scope.supplier_array.indexOf(s_id) <= -1){
        /*console.log('##############',$scope.supplier_array);
        console.log('##############',$scope.supplier_array.indexOf(s_id));*/
            $scope.supplier = {
          'supplier_id' : s_id,
          'supplier_code' : s_code,
          'supplier_name' : s_name,
          'email' : s_email
      };
            $scope.supplier_array.push(s_id);
            $scope.crm_activity.supplier.push($scope.supplier);
            console.log('$scope.crm_activity.supplier-->',$scope.crm_activity.supplier);
            $scope.supplier = {};
        }else{
            $scope.crm_activity.supplier.splice($scope.supplier_array.indexOf(s_id),1);
            $scope.supplier_array.splice($scope.supplier_array.indexOf(s_id),1);
            console.log('$scope.crm_activity.supplier-->',$scope.crm_activity.supplier);
            console.log('$scope.supplier_array-->',$scope.supplier_array);
        }
      /*$scope.supplier = {
          'supplier_id' : s_id,
          'supplier_code' : s_code,
          'supplier_name' : s_name,
          'email' : s_email
      };*/
      //$scope.crm_activity.supplier.push($scope.supplier);
    };

    /*$scope.add_selected_customer = function(c_id,c_code,c_name,c_email) {
        $scope.customer = {
            'customer_id' : c_id,
            'customer_code' : c_code,
            'customer_name' : c_name,
            'email' : c_email
        };
        $scope.crm_activity.customer.push($scope.customer);

        
    };*/
    
    $scope.add_selected_customer = function (c_id,c_code,c_name,c_email) {
        if($scope.customer_array.indexOf(c_id) <= -1){
            /*if(document.getElementById('cust_check_'+c_id).checked==true){
                $scope.customer = {
                'customer_id' : c_id,
                'customer_code' : c_code,
                'customer_name' : c_name,
                'email' : c_email
            };
            $scope.customer_array.push(c_id);
            $scope.crm_activity.customer.push($scope.customer);
        }*/
            $scope.customer = {
            'customer_id' : c_id,
            'customer_code' : c_code,
            'customer_name' : c_name,
            'email' : c_email
        };
            $scope.customer_array.push(c_id);
            $scope.crm_activity.customer.push($scope.customer);
            console.log('$scope.crm_activity.customer-->',$scope.crm_activity.customer);
            $scope.customer = {};
        }else{
            $scope.crm_activity.customer.splice($scope.customer_array.indexOf(c_id),1);
            $scope.customer_array.splice($scope.customer_array.indexOf(c_id),1);
            console.log('$scope.crm_activity.customer-->',$scope.crm_activity.customer);
            console.log('$scope.customer_array-->',$scope.customer_array);
        }
    };

    /*$scope.check_selected_supplier = function (sp_id) {
        if($scope.supplier_array.indexOf(sp_id)>-1){
            return true;
        }
    };
    $scope.check_selected_customer = function (sp_id) {
        if($scope.customer_array.indexOf(sp_id)>-1){
            return true;
        }
    };*/
    $scope.add_activity=function (b_type) {
        $scope.crm_activity.type=b_type;
        console.log("JSON");
        console.log(JSON.stringify($scope.crm_activity));

        addActivity({
            activity:$scope.crm_activity
        }).then(function (response) {
            console.log(response);
            $scope.dismiss();
            $scope.getActivitylist();
            $scope.crm_activity.activity='';
            $scope.crm_activity.note='';
            $scope.crm_activity.type='';
            $scope.crm_activity.customer=[];
            $scope.customer_array=[];
            $scope.crm_activity.supplier=[];
            $scope.supplier_array=[];
            $('#activitySuccess').fadeIn().delay(5000).fadeOut();
            $scope.activity_success = "Activity Added Successfully";
            $scope.activity_error = "";

        },function (response) {
            console.log(response);
            $scope.activity_success = '';
            $('#activityError').fadeIn().delay(5000).fadeOut();
            $scope.activity_error = response.data.error[0];
        });
    };
    $scope.check_if_checked=function (select_id) {
    //console.log('$$$$$$$$$$$$$$$$$$',selected);
        if($scope.edit_active){

            for (var i = 0; i <selected_cust.length; i++) {
                if (selected_cust[i].customer_id == select_id) {
                    //$scope.customer_array.push(selected_cust[i].customer_id);
                    return true;
                }
            }
        }

    };
    console.log('AAAAAAAAAAAAa',$scope.customer_array);
    $scope.check_if_checked2=function (select_id) {

        if($scope.edit_active){

            for (var i = 0; i <selected_sup.length; i++) {
                if (selected_sup[i].supplier_id == select_id) {
                    //$scope.supplier_array.push(selected_sup[i].supplier_id);
                    return true;
                }
            }
        }
    };
    $scope.edit_activity=function (id) {
        $scope.edit_active = true;
        $scope.show_save_block=true;
        $scope.show_update_block=false;
        $scope.activity_id=id;
        console.log($scope.activity_id);
        $scope.supplier_array=[];
        $scope.customer_array = [];
        $('#example3').modal('show');
        editActivityListing({
            activity_id:$scope.activity_id
        }).then(function (response) {
              console.log('response----->',response);
            selected_cust=response.data[0].activity_customer;
            $scope.cust=response.data[0].activity_customer;
            selected_sup=response.data[0].activity_supplier;
            $scope.sup=response.data[0].activity_supplier;
            console.log('selected_cust--->>',selected_cust);
            console.log('selected_sup--->>',selected_sup);
            /*for(var i=0;i<selected_cust.length;i++){
                $scope.customer = {
                    'customer_id' : selected_cust[i].customer_id,
                    'customer_code' : selected_cust[i].customer_code,
                    'customer_name' : selected_cust[i].customer_name,
                    'email' : selected_cust[i].email
                };
            }
            $scope.crm_activity.customer.push( $scope.customer);
            for(var j=0;j<selected_sup.length;j++){
                $scope.supplier = {
                    'supplier_id' : selected_sup[j].supplier_id,
                    'supplier_code' : selected_sup[j].supplier_code,
                    'supplier_name' : selected_sup[j].supplier_name,
                    'email' : selected_sup[j].email
                };
            }
            $scope.crm_activity.supplier.push( $scope.supplier);*/

            console.log('$scope.crm_activity.supplier--->>',$scope.crm_activity.supplier);
            console.log('$scope.crm_activity.customer--->>',$scope.crm_activity.customer);
            $scope.crm_activity.supplier=response.data[0].activity_supplier;
            $scope.crm_activity.customer=response.data[0].activity_customer;
            console.log( $scope.crm_activity.supplier);
            $scope.crm_activity.activity_date=response.data[0].activity_date;
            $scope.crm_activity.activity=response.data[0].activity;
            $scope.crm_activity.note=response.data[0].note;
            for(var i=0;i<response.data[0].activity_supplier.length;i++){
                $scope.supplier_array[i]=response.data[0].activity_supplier[i].supplier_id;
            }
            for(var j=0;j<response.data[0].activity_customer.length;j++){
                $scope.customer_array[j]=response.data[0].activity_customer[j].customer_id;
            }
            
            console.log('#############',$scope.supplier_array);
            console.log('#############',$scope.customer_array);

        });
    };


    /* changes by pratik 11/12/2017 */
    $scope.someFunction = function(value,index){

    }

    $scope.send_email=function (id) {
        sendActivityEmails({
            activity_id:id
        }).then(function (response) {
            console.log(response);
            $scope.getActivitylist();
        })
    };
    /*$scope.deleteActivityList=function (id) {
        deleteActivity({
            activity_id:id
        }).then(function (response) {
            console.log(response);
            $scope.getActivitylist();
        })
    };*/

    $scope.update_activity=function (b_type) {
        $scope.crm_activity.activity_id=$scope.activity_id;
        $scope.crm_activity.type=b_type;
        console.log(JSON.stringify($scope.crm_activity));
        updateActivity({
            activity:$scope.crm_activity
        }).then(function (response) {
            console.log(response);
            $scope.dismiss();
            $scope.getActivitylist();
            $scope.crm_activity.customer=[];
            $scope.crm_activity.supplier=[];

        },function (response) {
            console.log(response);
        });
    }



    $scope.current_modal = "crm_activity";
    $scope.crm_activity_permission_popup = function (po_id,po_status,po_type) {
        check_permission.check_status(po_id,po_status,po_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object = {};
    };
    $scope.generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };
    $scope.$on('CallParentMethod', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.getActivitylist();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_activity(data.id);
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.getActivitylist();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#activitySuccess').fadeIn().delay(5000).fadeOut();
            $scope.activity_success = "Activity deleted Successfully";
            
            }
        }
    });

}]);

/*var crmActivityModule=angular.module('crmActivityModule',[]);
crmActivityModule.controller('crmActivityController',['$rootScope','$scope','$location','$filter','$route','getActivityfeedback',
    'getSupplierCustomerActivity','getActivityListing','addActivity','editActivityListing','sendActivityEmails',
    'deleteActivity','updateActivity',
    function($rootScope,$scope,$location,$filter,$route,getActivityfeedback,getSupplierCustomerActivity,
                              getActivityListing,addActivity,editActivityListing,sendActivityEmails,deleteActivity,updateActivity){

var list;
var selected_cust,selected_sup;
$scope.sup=[];
$scope.cust=[];

 $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };

    $scope.crm_activity={'customer':[],'supplier':[]};
    $scope.edit_active = false;
    $scope.show_save_block=false;
    $scope.show_update_block=false;
    $scope.add_activicty_clicked = function () {
      $scope.edit_active = false;
        $scope.show_update_block=true;
        $scope.show_save_block=false;
        //$scope.crm_activity.activity_date='';
        $scope.crm_activity.activity='';
        $scope.crm_activity.note='';
        getSupplierCustomerActivity({}).then(function (response) {
            $scope.customer_list=response.data.customers;
            $scope.supplier_list=response.data.suppliers;
        },function(response){
            console.log(response);
        });
        $scope.selectedAll='';
        $scope.selectedAll2='';
    };

    $scope.crm_activity.activity_date=$filter('date')(new Date(),'yyyy-MM-dd');

    $scope.getActivitylist=function () {
        getActivityListing({}).then(function (response) {
            console.log(response);
            $scope.activity_list=response.data;
            list=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.getActivitylist();

    $scope.getSupplierCustomerlist=function () {
        getSupplierCustomerActivity({}).then(function (response) {
            console.log("supplier customer list");
            console.log(response);
            $scope.customer_list=response.data.customers;
            cust_list=response.data.customers;
            $scope.supplier_list=response.data.suppliers;
            sup_list=response.data.suppliers;
            console.log($scope.customer_list);
            console.log($scope.supplier_list);
        },function(response){
            console.log(response);
        });
    };
    $scope.getSupplierCustomerlist();

    $scope.checkAll=function (data) {
        if ($scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }
        angular.forEach($scope.supplier_list, function (item) {
            item.Selected = $scope.selectedAll;
        });
        for(var i=0;i<data.length;i++) {
            $scope.supplier = {
                'supplier_id': data[i].id,
                'supplier_code': data[i].supplier_code,
                'supplier_name': data[i].supplier_name,
                'email': data[i].email
            };
            $scope.crm_activity.supplier.push($scope.supplier);
        }

    };

    $scope.checkAll2=function (cust_data) {
        if ($scope.selectedAll2) {
            $scope.selectedAll2 = false;
        } else {
            $scope.selectedAll2 = true;
        }
        angular.forEach($scope.customer_list, function (item) {
            item.Selected = $scope.selectedAll2;
        });
        for(var i=0;i<cust_data.length;i++){
            $scope.customer={
                'customer_id':cust_data[i].id,
                'customer_code':cust_data[i].customer_code,
                'customer_name':cust_data[i].customer_name,
                'email':cust_data[i].email
            };
            $scope.crm_activity.customer.push($scope.customer);
        }
    };

    $scope.add_selected_supplier= function(s_id,s_code,s_name,s_email) {
      console.log(s_id,s_code,s_name,s_email);
      $scope.supplier = {
          'supplier_id' : s_id,
          'supplier_code' : s_code,
          'supplier_name' : s_name,
          'email' : s_email
      };
      $scope.crm_activity.supplier.push($scope.supplier);
    };

    $scope.add_selected_customer = function(c_id,c_code,c_name,c_email) {
        $scope.customer = {
            'customer_id' : c_id,
            'customer_code' : c_code,
            'customer_name' : c_name,
            'email' : c_email
        };
        $scope.crm_activity.customer.push($scope.customer);

        
    };

    $scope.add_activity=function (b_type) {
        $scope.crm_activity.type=b_type;
        console.log("JSON");
        console.log(JSON.stringify($scope.crm_activity));

        addActivity({
            activity:$scope.crm_activity
        }).then(function (response) {
            console.log(response);
            $scope.dismiss();
            $scope.getActivitylist();
            $scope.crm_activity.activity='';
            $scope.crm_activity.note='';
            $scope.crm_activity.type='';

            $('#activitySuccess').fadeIn().delay(5000).fadeOut();
            $scope.activity_success = "Activity Added Successfully";
            $scope.activity_error = "";
        },function (response) {
            console.log(response);
            $scope.activity_success = '';
            $('#activityError').fadeIn().delay(5000).fadeOut();
            $scope.activity_error = response.data.error[0];
        });
    };
    $scope.edit_activity=function (index,id) {
        $scope.edit_active = true;
        $scope.show_save_block=true;
        $scope.show_update_block=false;
        $scope.activity_id=id;
        console.log($scope.activity_id);
        editActivityListing({
            activity_id:$scope.activity_id
        }).then(function (response) {
              console.log('response----->',response);
            selected_cust=response.data[0].activity_customer;
            $scope.cust=response.data[0].activity_customer;
            selected_sup=response.data[0].activity_supplier;
            $scope.sup=response.data[0].activity_supplier;
            console.log('selected_cust--->>',selected_cust);
            console.log('selected_sup--->>',selected_sup);
            for(var i=0;i<selected_cust.length;i++){
                $scope.customer = {
                    'customer_id' : selected_cust[i].customer_id,
                    'customer_code' : selected_cust[i].customer_code,
                    'customer_name' : selected_cust[i].customer_name,
                    'email' : selected_cust[i].email
                };
            }
            $scope.crm_activity.customer.push( $scope.customer);
            for(var j=0;j<selected_sup.length;j++){
                $scope.supplier = {
                    'supplier_id' : selected_sup[j].supplier_id,
                    'supplier_code' : selected_sup[j].supplier_code,
                    'supplier_name' : selected_sup[j].supplier_name,
                    'email' : selected_sup[j].email
                };
            }
            $scope.crm_activity.supplier.push( $scope.supplier);
            console.log('$scope.crm_activity.supplier--->>',$scope.crm_activity.supplier);
            console.log('$scope.crm_activity.customer--->>',$scope.crm_activity.customer);
            $scope.crm_activity.supplier=response.data[0].activity_supplier;
            $scope.crm_activity.customer=response.data[0].activity_customer;
            console.log( $scope.crm_activity.supplier);
            $scope.crm_activity.activity_date=list[index].activity_date;
            $scope.crm_activity.activity=list[index].activity;
            $scope.crm_activity.note=list[index].note;

        });
    };

    $scope.check_if_checked=function (select_id) {

        if($scope.edit_active){
            for (var i = 0; i <selected_cust.length; i++) {
                if (selected_cust[i].customer_id == select_id) {
                    return true;
                }
                /!*else{
                    return false;
                }*!/
            }

        }
        if($scope.edit_active){
            for (var i = 0; i <$scope.cust.length; i++) {
                if ($scope.cust[i].customer_id == select_id) {
                    return true;
                }
            }

        }
    };

    $scope.check_if_checked2=function (index,select_id) {

        if($scope.edit_active){

            for (var i = 0; i <selected_sup.length; i++) {
                if (selected_sup[i].supplier_id == select_id) {
                    return true;
                }
                /!*else{
                    return false;
                }*!/
            }
        }
        if($scope.edit_active){
            for (var i = 0; i <$scope.sup.length; i++) {
                if ($scope.sup[i].supplier_id == select_id) {
                    return true;
                }
            }


        }
    };

    $scope.send_email=function (id) {
        sendActivityEmails({
            activity_id:id
        }).then(function (response) {
            console.log(response);
            $scope.getActivitylist();
        })
    };
    $scope.deleteActivityList=function (id) {
        deleteActivity({
            activity_id:id
        }).then(function (response) {
            console.log(response);
            $scope.getActivitylist();
        })
    };

    $scope.update_activity=function (b_type) {
        $scope.crm_activity.activity_id=$scope.activity_id;
        $scope.crm_activity.type=b_type;
        console.log(JSON.stringify($scope.crm_activity));
        updateActivity({
            activity:$scope.crm_activity
        }).then(function (response) {
            console.log(response);
            $scope.dismiss();
            $scope.getActivitylist();
            $scope.crm_activity.customer=[];
            $scope.crm_activity.supplier=[];

        },function (response) {
            console.log(response);
        });
    }

}]);*/