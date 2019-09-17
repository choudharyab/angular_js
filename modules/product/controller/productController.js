var productModule = angular.module('productModule',[]);
productModule.controller('productController',['$rootScope','$scope','$location','$route','getTaxRateService','addProductGroupService','getProductGroupService','getUnitOfMeasureService','getNextProductCodeService','addProductService','getProductListingService','commonService','getProductByIdService','editProductGroupService','getProductGroupListService','getMeasurementGroupListService','updateProductGroupListService','deleteProductGroupMeasureService',function($rootScope,$scope,$location,$route,getTaxRateService,addProductGroupService,getProductGroupService,getUnitOfMeasureService,getNextProductCodeService,addProductService,getProductListingService,check_permission,getProductByIdService,editProductGroupService,getProductGroupListService,getMeasurementGroupListService,updateProductGroupListService,deleteProductGroupMeasureService){

	$scope.active_lable = false;
    $scope.add_product = {};
    $scope.comment ={};
    $scope.otp_object = {};
    $scope.product_title = 'Add Product';
    var pro_group_list;
    $scope.hide_product_code = true;

    $scope.add_product_called = function () {
        $scope.add_product = {};
        $scope.product_success='';
        $scope.product_error='';
        $scope.show_save = false;
        $scope.show_edit = false;
        $scope.nextProductCode();
        $scope.hide_product_code = true;
		$route.reload();
    };

    $scope.click_group = function () {
        $scope.update_btn = false;
        $scope.save_btn = false;
        $scope.updateMethod = false;
        $scope.unit_of_measurement = '';
        $scope.product_group_text = '';
    };

    $scope.get_product_list = function () {
        getProductListingService({}).then(function (response) {
			$scope.product_list = response.data;
            console.log(response.data);
        })
    };
    $scope.get_product_list();

    $scope.save_product_group = function () {
         addProductGroupService({
            group_name:$scope.product_group_text,
            measurement_name:$scope.unit_of_measurement
        }).then(function (response) {
             $scope.product_group_text = '';
             $scope.unit_of_measurement = '';
             $scope.get_product_group();
             $scope.get_measurement_list();
             $scope.get_added_measure();
             $('#productGroupMeasureSuccess').fadeIn().delay(5000).fadeOut();
             $scope.productGroupMeasureSuccess = 'Added Successfully';
        },function (response) {
             $('#productGroupMeasureError').fadeIn().delay(5000).fadeOut();
             $scope.productGroupMeasureError = response.data.error;
         })
    };

     $scope.nextProductCode = function () {
      getNextProductCodeService({}).then(function (response) {
            $scope.add_product.product_code = JSON.parse(response.data);
        },function (response) {
            console.log(response);
        });
    };
    $scope.nextProductCode();
    
    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_rate_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();

    $scope.progroup_list = function(){

        getProductGroupService({
            type:'product_group'
        }).then(function (response) {
            $scope.product_group = response.data;
            pro_group_list = response.data;
        },function (response) {
            console.log(response);
        });
    }
    $scope.progroup_list();
    var measure_list
    $scope.get_added_measure = function () {
        getUnitOfMeasureService({
            type:'measurement'
        }).then(function (response) {
            $scope.measuement_list = response.data;
            measure_list=response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        });
    };

    $scope.get_added_measure();

    $scope.save_product = function () {
        console.log($scope.add_product);
        addProductService({
            product_info:$scope.add_product
        }).then(function (response) {
            $scope.modal_dismiss_two();
            $scope.get_product_list();
            $scope.add_product = {};
            $scope.nextProductCode();
            //$scope.dismiss();
            //$scope.popup_title = "Success";
            //$('#succ_error_popup').modal('show');
            $('#productSuccess').fadeIn().delay(5000).fadeOut();
            $scope.product_success = "Product Added Successfully";
            $scope.product_error = "";
        },function (response) {
            console.log(response);
            //$scope.popup_title = "Error";
            //$('#succ_error_popup').modal('show');
            //$scope.product_error_array = response.data.error;
            //$scope.product_error_array = response.data.error;
            $scope.product_success= '';
            $('#productError').fadeIn().delay(5000).fadeOut();
            $scope.product_error = response.data.error[0];
        })
    };

/*    $('#ttt').scroll( function(){
        //  console.log($(this).scrollTop()+' + '+ $(this).height()+' = '+ ($(this).scrollTop() + $(this).height())   +' _ '+ $(this)[0].scrollHeight  );
        if($(this).scrollTop() + $(this).height() <= $(this)[0].scrollHeight+100 && page_no<=last_page){

            view_purcahse_order_list(page_no);
            page_no++;
        }
    });*/
    //$scope.current_modal = 'product';
    $scope.product_permission_popup = function (pro_id,pro_status,pro_type) {
        $scope.current_modal = 'product';
        check_permission.check_status(pro_id,pro_status,pro_type,$scope.current_modal);
         $scope.comment ={};
    };

    $scope.permission_product_group = function(pg_id,pg_status,pg_type){

        //$scope.dismiss_no_packt();
        $scope.current_modal = 'product_group';
        check_permission.check_status(pg_id,pg_status,pg_type,$scope.current_modal);
        $scope.comment ={};
    }

    $scope.uom_permission_popup = function(pg_id,pg_status,pg_type){

        //$scope.dismiss_no_packt();
        $scope.current_modal = 'measurement';
        check_permission.check_status(pg_id,pg_status,pg_type,$scope.current_modal);
        $scope.comment ={};
    }

    $scope.product_generate_password = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };

    $scope.product_verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };

    $scope.$on('CallParentMethod', function (event, data) {

        console.log(data);

        if(data.model=='product'){
            $scope.hide_product_code = false;
            $scope.action_type = data.type;
            $scope.product_id = data.id;
            $scope.get_product_list();
            $scope.get_tax_rate_list();
            $scope.dismiss();
            getProductByIdService({product_id:data.id}).then(function (response) {
                console.log(response);
                $scope.add_product = response.data[0];
              
                $scope.product_title = 'Edit Product';
                $('#example3').modal('show');
				$scope.active_lable = true;
                $scope.show_save = true;
                $scope.show_edit = true;
                
                //console.log($scope.add_product.tax_rate_id);
            },function (response) {
                console.log(response);
            });
        } else if(data.model=='product_group'){

            for(var h=0;h<pro_group_list.length;h++){

                console.log(pro_group_list[h]);

                if(pro_group_list[h].id==data.id){
                    $scope.dismiss();
                    $scope.progroup_list();
                    $('#group_measure_div').modal('show');
                    $scope.active_lable = true;
                    $scope.save_btn = true;
                    $scope.update_btn = true;
                    $scope.updateMethod = true;
                    $scope.update_type='pro_group';
                    $scope.product_group_id = data.id;
                    $scope.product_group_text = pro_group_list[h].group_name;
                }
            }
        }else if(data.model=='measurement'){

            for(var h=0;h<measure_list.length;h++){

                console.log(measure_list[h]);

                if(measure_list[h].id==data.id){
                    $scope.dismiss();
                    $scope.get_added_measure();
                    $('#group_measure_div').modal('show');
                    $scope.active_lable = true;
                    $scope.save_btn = true;
                    $scope.update_btn = true;
                    $scope.updateMethod = true;
                    $scope.update_type='measure';
                    $scope.measure_id = data.id;
                    $scope.unit_of_measurement = measure_list[h].measurement_name;
                }
            }
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model=='product'){
            $scope.action_type = data.type;
            $scope.get_product_list();
            if(data.otp){
                $scope.dismiss();
                $('#delete_product').fadeIn().delay(5000).fadeOut();
                $scope.delete_product_msg = 'Deleted Successfully';
            }
        }else if(data.model=='product_group'){
            $scope.action_type = data.type;
            $scope.progroup_list();
            if(data.otp){
                $scope.dismiss();
                $('#delete_product').fadeIn().delay(5000).fadeOut();
                $scope.delete_product_msg = 'Deleted Successfully';
            }
        }else if(data.model=='measurement'){
            $scope.action_type = data.type;
            $scope.get_added_measure();
            if(data.otp){
                $scope.dismiss();
                $('#delete_product').fadeIn().delay(5000).fadeOut();
                $scope.delete_product_msg = 'Deleted Successfully';
                $scope.get_added_measure();
            }
        }
    });

    $scope.edit_product = function () {
        console.log($scope.product_id);
        editProductGroupService({
            product_info:$scope.add_product,
            product_id:$scope.product_id
        }).then(function (response) {
			 $scope.product_title = 'Add Product';
            $scope.modal_dismiss_two();
            $('#productSuccess').fadeIn().delay(5000).fadeOut();
            $scope.product_success = "Product Updated Successfully";
            $scope.get_product_list();
            $scope.add_product = {};
            $scope.product_id = '';
        },function (response) {
            $scope.product_success = "";
            $('#productError').fadeIn().delay(5000).fadeOut();
            console.log(response);
            if(response.data.code==401){
                $scope.product_error = response.data.error;
            }else{
                $scope.product_error = response.data.error[0];
            }
        })
    };

    //........product group and measurement listing ..........//

    var pro_group_list,measure_list;
    $scope.get_product_group = function(){
        getProductGroupListService({
            type:'product_group'
        }).then ( function(response){
            $scope.product_group = response.data;
            pro_group_list = response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.get_product_group();

    $scope.get_measurement_list = function(){
        getMeasurementGroupListService({
            type:'measurement'
        }).then ( function(response){
            $scope.get_measurement = response.data;
            measure_list = response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.get_measurement_list();

    $scope.selected_product_group = function (idx,pro_grp_id,type) {
        $scope.update_btn = true;
        $scope.save_btn = true;
        $scope.updateMethod = true;
        if(type=='pro_group'){
            $scope.update_type = type;
            $scope.product_group_text =  pro_group_list[idx].group_name;
            $scope.product_group_id =  pro_grp_id;
        }
        if(type=='measure'){
            $scope.update_type = type;
            $scope.unit_of_measurement = measure_list[idx].measurement_name;
            $scope.measure_id =  pro_grp_id;
        }
    };

    $scope.update_pro_group_measure = function () {
        if($scope.update_type=='pro_group'){
            updateProductGroupListService({
                product_group_id:$scope.product_group_id,
                group_name:$scope.product_group_text,
                type:'product_group'
            }).then(function (res) {
                $scope.get_product_group();
                $scope.product_group_text = '';
                $scope.product_group_id = '';
                $scope.update_btn = false;
                $scope.save_btn = false;
                $scope.updateMethod = false;
                $('#popupSuccess').fadeIn().delay(5000).fadeOut();
                $scope.success_message_show = JSON.parse(res.data);
            });
        }
        if($scope.update_type=='measure'){
            updateProductGroupListService({
                measurement_id:$scope.measure_id,
                measurement_name:$scope.unit_of_measurement,
                type:'measurement'
            }).then(function (response) {
                $scope.get_measurement_list();
                $scope.measure_id = '';
                $scope.unit_of_measurement ='';
                console.log(response);
                $scope.update_btn = false;
                $scope.save_btn = false;
                $scope.updateMethod = false;
                $('#popupSuccess').fadeIn().delay(5000).fadeOut();
                $scope.success_message_show = JSON.parse(response.data);
            })
        }
    };

    $scope.delete_pro_group_measure = function (idex,id,type) {
        if(type=='pro_group'){
            deleteProductGroupMeasureService({
                product_group_id:id,
                type:'product_group'
            }).then(function (response) {
                $scope.get_product_group();
                $('#productGroupMeasureError').fadeIn().delay(5000).fadeOut();
                $scope.productGroupMeasureError = JSON.parse(response.data);
            })
        }
        if(type=='measure'){
            deleteProductGroupMeasureService({
                measurement_id:id,
                type:'measurement'
            }).then(function (response) {
                $scope.get_measurement_list();
                $scope.get_added_measure();
                $('#productGroupMeasureError').fadeIn().delay(5000).fadeOut();
                $scope.productGroupMeasureError = JSON.parse(response.data);
            })
        }
    };
    
}]);



