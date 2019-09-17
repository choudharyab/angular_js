var expenseProductModule = angular.module('expenseProductModule',[]);
expenseProductModule.controller('expenseProductController',['$rootScope','$scope','$location','$route','getTaxRateService','addProductGroupService','getProductGroupService','getUnitOfMeasureService','getNextProductCodeService','addProductForExpenseOrder','getProductListingService','commonService','getExpenseProductDataByIdService','editExpenseProductService','getProductGroupListService','getMeasurementGroupListService','updateProductGroupListService','deleteProductGroupMeasureService','getExpenseProductListingService','getVoucherLedgerListService',
function($rootScope,$scope,$location,$route,getTaxRateService,addProductGroupService,getProductGroupService,getUnitOfMeasureService,getNextProductCodeService,addProductForExpenseOrder,getProductListingService,check_permission,getExpenseProductDataByIdService,editExpenseProductService,getProductGroupListService,getMeasurementGroupListService,updateProductGroupListService,deleteProductGroupMeasureService,getExpenseProductListingService,getVoucherLedgerListService){

	$scope.active_lable = false;
    $scope.add_product = {};
    $scope.comment ={};
    $scope.otp_object = {};
     $scope.product_title = 'Add Product';
     $scope.product_id = '';
     $scope.hide_save = false;
     $scope.hide_edit = true;

    $scope.add_product_called = function () {
        $scope.add_product = {};
        $scope.product_success='';
        $scope.product_error='';
        $scope.hide_save = false;
        $scope.hide_edit = true;
        $('#example3').modal('show');
    };
	
	$scope.get_ledger_list = function () {
        getVoucherLedgerListService({}).then(function (response) {
            $scope.led_list = response.data;
            for(var f=0;f<$scope.led_list.length;f++){
                $scope.led_list[f].value = $scope.led_list[f].subgroup_name;
            }
            led_list = $scope.led_list;
        })
    };
    $scope.get_ledger_list();
	
	var led_list;
	$scope.$watch('add_product.subgroup_name',function () {
      $scope.get_debit_auto();
    });
	
	$scope.get_debit_auto = function () {
        $('#particular_id').autocomplete({
            source:led_list,
            select:function (event,ui) {
                console.log(ui);
                $scope.add_product.ledger_id = ui.item.id;
            }
        });
    };

    $scope.click_group = function () {
        $scope.update_btn = false;
        $scope.save_btn = false;
        $scope.updateMethod = false;
        $scope.unit_of_measurement = '';
        $scope.product_group_text = '';
    };
    $scope.get_product_list = function () {
        getExpenseProductListingService({}).then(function (response) {
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

/*     $scope.nextProductCode = function () {
      getNextProductCodeService({}).then(function (response) {
            $scope.add_product.product_code = JSON.parse(response.data);
        },function (response) {
            console.log(response);
        });
    };
    $scope.nextProductCode();*/

    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_rate_list = resposne.data;
        });
    };

    $scope.get_tax_rate_list();
    getProductGroupService({
        type:'product_group'
    }).then(function (response) {
        $scope.product_group = response.data;
    },function (response) {
        console.log(response);
    });
    $scope.get_added_measure = function () {
        getUnitOfMeasureService({
            type:'measurement'
        }).then(function (response) {
            $scope.measuement_list = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        });
    };
    $scope.get_added_measure();

    $scope.save_product = function () {

		if($scope.add_product.hsn_code == undefined){
		   $scope.add_product.hsn_code = "";
	    }

        addProductForExpenseOrder({
            product_info:$scope.add_product
        }).then(function (response) {
            $scope.modal_dismiss_two();
            $scope.get_product_list();
            $scope.add_product = {};

            //$scope.nextProductCode();

            $('#productSuccess').fadeIn().delay(5000).fadeOut();
            $scope.product_success = "Product Added Successfully";
            $scope.product_error = "";
        },function (response) {
            $scope.product_success= '';

            if(response.data.error){
                $scope.product_error = response.data.error[0];
            }

            if(response.status==500){

                $scope.product_error = "Internal Server Error";
            }

            $('#productError').fadeIn().delay(5000).fadeOut();
        })
    };
/*    $('#ttt').scroll( function(){
        //  console.log($(this).scrollTop()+' + '+ $(this).height()+' = '+ ($(this).scrollTop() + $(this).height())   +' _ '+ $(this)[0].scrollHeight  );
        if($(this).scrollTop() + $(this).height() <= $(this)[0].scrollHeight+100 && page_no<=last_page){

            view_purcahse_order_list(page_no);
            page_no++;
        }
    });*/

    $scope.get_product_data_by_id=function(id){
        $scope.hide_save = true;
        $scope.hide_edit = false;
        $scope.product_id=id;
        getExpenseProductDataByIdService({expense_product_id:id}).then(function (response) {
                console.log(response);
                $scope.add_product = response.data[0];
                $scope.add_product.tax_rate_id = response.data[0].tax_rate_id;
                $scope.product_title = 'Edit Product';
                //$('#example3').modal('show');
				$scope.active_lable = true;
                
                console.log($scope.add_product.tax_rate_id);
            },function (response) {
                console.log(response);
            });
    }

    $scope.product_permission_popup = function (pro_id,pro_status,pro_type,pro) {
        if(pro){
            $scope.current_modal = 'expense_product';
        }
        check_permission.check_status(pro_id,pro_status,pro_type,$scope.current_modal);
    };
    $scope.product_generate_password = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.product_verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };
    $scope.$on('CallParentMethod', function (event, data) {

        $scope.update_btn = true;
        $scope.save_btn = true;
        $scope.updateMethod = true;

        $scope.dismiss();
        if(data.model=='expense_product_model'){
            $scope.action_type = data.type;
            $scope.product_id = data.id;
            $scope.get_product_list();
            $scope.get_tax_rate_list();

            getExpenseProductDataByIdService({expense_product_id:data.id}).then(function (response) {
                console.log(response);
                $scope.add_product = response.data[0];
                $scope.add_product.tax_rate_id = response.data[0].tax_rate_id;
                $scope.product_title = 'Edit Product';
                $('#example3').modal('show');
				$scope.active_lable = true;
                $scope.hide_save = true;
                $scope.hide_edit = false;
                console.log($scope.add_product.tax_rate_id);
            },function (response) {
                console.log(response);
            });
        }else if(data.model=='measurement'){

            $scope.get_measurement_list();
            $('#exampleuom').modal('show');

            for(var mes=0;mes<measure_list.length;mes++){

                console.log(measure_list[mes]);

                if(data.id==measure_list[mes].id){
                    $scope.unit_of_measurement = measure_list[mes].measurement_name;
                    break;
                }
            }
        }else{
            $scope.get_product_group();
            $('#example2').modal('show');

            for(var mes=0;mes<pro_group_list.length;mes++){

                console.log(pro_group_list[mes]);

                if(data.id==pro_group_list[mes].id){
                    $scope.product_group_text = pro_group_list[mes].group_name;
                    break;
                }
            }
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model=='expense_product_model'){

            $scope.action_type = data.type;
            $scope.get_product_list();
            if(data.otp){
                $scope.dismiss();
                $('#delete_product').fadeIn().delay(5000).fadeOut();
                $scope.delete_product_msg = 'Product Deleted Successfully';
            }
        }else if(data.model=='measurement'){

            $scope.get_measurement_list();
            if(data.otp){
                $scope.dismiss();
                $('#exampleuom').modal('show');
                $('#uom_MeasureError').fadeIn().delay(5000).fadeOut();
                $scope.uom_productGroupMeasureError = 'Measurement Deleted Successfully';
            }
        }else{
            $scope.get_product_group();
            if(data.otp){
                $scope.dismiss();
                $('#example2').modal('show');
                $('#productGroupMeasureError').fadeIn().delay(5000).fadeOut();
                $scope.productGroupMeasureError = 'Group Deleted Successfully';
            }
        }
    });
    $scope.edit_product = function () {
        console.log($scope.product_id);
        $scope.add_product.expense_product_id=$scope.product_id;
		if($scope.add_product.hsn_code == undefined){
		   $scope.add_product.hsn_code = "";
	   }
        editExpenseProductService({
            product_info:$scope.add_product,
            //expense_product_id:$scope.product_id
        }).then(function (response) {
			 $scope.product_title = 'Add Product';
            $scope.modal_dismiss_two();
            $('#productSuccess').fadeIn().delay(5000).fadeOut();
            $scope.product_success = JSON.parse(response.data);
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
        }).then( function(response){
            $scope.get_measurement = response.data;
            measure_list = response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.get_measurement_list();

    $scope.selected_product_group = function (idx,pro_grp_id,type,status,otp_type) {
        //$scope.update_btn = true;
        //$scope.save_btn = true;
        //$scope.updateMethod = true;
        if(type=='pro_group'){
            $scope.update_type = type;
            //$scope.product_group_text =  pro_group_list[idx].group_name;
            $scope.product_group_id =  pro_grp_id;
            $scope.close_add_product();
            $scope.current_modal = "product_group";
            $('#generate_password').modal('show');
            $scope.product_permission_popup(pro_grp_id,status,otp_type);
        }
        if(type=='measure'){
            $scope.update_type = type;
            //$scope.unit_of_measurement = measure_list[idx].measurement_name;
            $scope.dismiss_no_packt();
            $('#generate_password').modal('show');
            $scope.measure_id =  pro_grp_id;
            $scope.current_modal = "measurement";
            $scope.product_permission_popup(pro_grp_id,status,otp_type);
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
            },function (res) {

                $('#productGroupMeasureError').fadeIn().delay(5000).fadeOut();

                $scope.productGroupMeasureError = res.data.error[0];
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
                $('#uom_popupSuccess').fadeIn().delay(5000).fadeOut();
                $scope.uom_success_message_show = JSON.parse(response.data);
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



