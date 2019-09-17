var warehouseModule= angular.module('warehouseModule',['ngBootbox']);
warehouseModule.controller('warehouseController',['$rootScope','$scope','$location','$route','getWarehouseDetailsService','saveWarehouseService','editWarehouseService','deleteWarehouseService','getStateListService','getWarehouseById','commonService','country',function($rootScope,$scope,$location,$route,getWarehouseDetailsService,saveWarehouseService,editWarehouseService,deleteWarehouseService,getStateListService,getWarehouseById,check_permission,country){


	$scope.active_lable = false;
    $scope.warehouse_details = {};
    $scope.warehouse_details.website = "www.";
    $scope.warehouse_details.phone_code="+";
    $('.loading').hide();
    var warehouse_list;
    var edit_state_id;
    $scope.comment ={};
    $scope.otp_object = {};
	$scope.warehouse_title = "Add New Company Details";
    $scope.add_warehouse_buttton = function () {
        $scope.warehouse_details = {};
        $scope.warehouse_success = '';
        $scope.warehouse_error = '';
        $scope.show_save = false;
        $scope.show_edit = false;
		$route.reload();
       
		
    };
    $scope.getWarehouseDetails = function(){
        getWarehouseDetailsService({}).then(function (response) {
            $scope.warehouseDetails = response.data;
            warehouse_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.getWarehouseDetails();
    $scope.get_state_list = function(){
         getStateListService({}).then(function (response) {
        $scope.state_list = response.data;
        console.log(response.data);
        if(edit_state_id!=''){
            console.log('outer called');
            console.log(edit_state_id);
            for(var f=0;f<$scope.state_list.length;f++){
                console.log($scope.state_list[f]);
                if($scope.state_list[f].id==edit_state_id.id){
                    console.log('inner called');
                    $scope.state_id = $scope.state_list[f];
                    $scope.warehouse_details.state_id = $scope.state_list[f].id;
                }
            }
        }
        
    });
  };
   $scope.get_state_list();

    $scope.save_warehouse = function () {
   
    $scope.warehouse_details.state_id = $scope.state_id;
    $('.loading').show();
        saveWarehouseService({
            add_warehouse:$scope.warehouse_details
        }).then(function (response) {
            $('.loading').hide();
            $scope.warehouse_details = {};
            $scope.dismiss();
            $scope.getWarehouseDetails();
            $('#warehouseSuccess').fadeIn().delay(5000).fadeOut();
            $scope.warehouse_success = "Company Added Successfully";
            //$route.reload();
        },function (response) {
            $('#warehouseError').fadeIn().delay(5000).fadeOut();
            $scope.warehouse_error = response.data.error[0];
        })
    };
    $scope.get_warehouse_details = function (wh_id) {
        /*$scope.warehouse_details = warehouse_list[index];*/
        $scope.warehouse_id = wh_id;
        /*$scope.auto_country=warehouse_list[index].country;*/
        getWarehouseById({company_id:wh_id}).then(function (response) {
            console.log(response);
            $scope.warehouse_details = response.data[0];
            $scope.auto_country=response.data[0].country;
            edit_state_id = response.data[0].state;
            $scope.state_id=response.data[0].state.id;
            $scope.warehouse_details.state_id=response.data[0].state.id;
            $scope.get_state_list();
            $scope.warehouse_details.state_id = response.data[0].state.id;
            $('#example2').modal('show');
            $scope.warehouse_title = "Edit Company Details";
            $scope.active_lable = true;
            $scope.show_save = true;
            $scope.show_edit = true;
        },function (response) {
            console.log(response);
        });
        $scope.show_save = true;
        $scope.show_edit = true;
    };
    $scope.edit_warehouse = function () {
        
        $scope.warehouse_details.state_id = $scope.state_id;
        $('.loading').show();
        editWarehouseService({
            edit_warehouse:$scope.warehouse_details,
            warehouse_id:$scope.warehouse_id
        }).then(function (response) {
            $scope.getWarehouseDetails();
            $scope.dismiss();
            $('.loading').hide();
			 $scope.warehouse_title = "Add Warehouse";
            $('#warehouseSuccess').fadeIn().delay(5000).fadeOut();
            $scope.warehouse_success = JSON.parse(response.data);
            $scope.warehouse_details = {};
            $scope.warehouse_id = '';
        },function (response) {
            $scope.warehouse_success = "";
            $('#warehouseError').fadeIn().delay(5000).fadeOut();
            if(response.data.code==401){
                $scope.warehouse_error = response.data.error;
            }else{
                $scope.warehouse_error = response.data.error[0];
            }
        })
    };
    $scope.deleteWarehouse = function (warehouse_id) {
        deleteWarehouseService({
            company_id:warehouse_id
        }).then(function (response) {
            console.log(response);
            $scope.getWarehouseDetails();
        },function (response) {
            console.log(response);
        })
    };
    $scope.current_modal = "company";
    $scope.warehouse_permission_popup = function (wh_id,wh_status,wh_type) {
        check_permission.check_status(wh_id,wh_status,wh_type,$scope.current_modal);
        $scope.comment ={};
    };
    $scope.generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            console.log(data);
            $scope.getWarehouseDetails();
            if(data.otp){
                $('#wh_delete').fadeIn().delay(5000).fadeOut();
                $scope.delete_warehouse_msg = 'Company deleted Successfully';
            }
        }
    });
    $scope.$on('CallParentMethod', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.warehouse_id = data.id;
            $scope.getWarehouseDetails();
            $scope.get_state_list();
            // getWarehouseById({warehouse_id:data.id}).then(function (response) {
            //    console.log(response);
            //     $scope.warehouse_details = response.data[0];
            //     $scope.auto_country=response.data[0].country;
            //     edit_state_id = response.data[0].state;
            //     $scope.get_state_list();
            //     $scope.warehouse_details.state_id = response.data[0].state.id;
            //     //$('#example2').modal('show');
            //     $scope.warehouse_title = "Edit Company Details";
			// 	$scope.active_lable = true;
            //     $scope.show_save = true;
            //     $scope.show_edit = true;
            // },function (response) {
            //     console.log(response);
            // });
            $scope.get_warehouse_details(data.id);
            $('#example2').modal('show');
        }
    });

    var auto_country_arr;

         $scope.searchCountry = function(){
            $scope.warehouse_details.country=$scope.auto_country;
      country({term:$scope.auto_country}).then(function (res) {
        for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].country_name; 
        }
            auto_country_arr=res.data;
            $scope.getId();
            console.log(auto_country_arr);
        },function (res) {
        });
    }

    $scope.getId=function () {
            $('#country_id').autocomplete({
                source:auto_country_arr,
                select:function (event,ui) {
                    //console.log('------------>>',ui.item);
                    $scope.auto_country=ui.item.country_name;
                    //console.log('~~~~~~~~~~~~~~~~>>',$scope.auto_country);
                    $scope.warehouse_details.country=$scope.auto_country;
                    //$scope.warehouse_details.phone_code=ui.item.telephonic_code;
                    $scope.warehouse_details.country_id=ui.item.id;



                   
                }
            })
        };

}]);



