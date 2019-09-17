var expenseSupplierModule = angular.module('expenseSupplierModule',[]);

expenseSupplierModule.controller('expenseSupplierController',['$scope','productAutoCompleteService','getProductByIdService','getNextExpenseSupplierCode','getExpenseProductsAutocomplete','addExpenseSupplierService','getExpenseSupplierListing','commonService','getExpenseSupplierByIdService','updateExpenseSupplierService','getStateListService',function ($scope,productAutoCompleteService,getProductByIdService,getNextExpenseSupplierCode,getExpenseProductsAutocomplete,addExpenseSupplierService,getExpenseSupplierListing,check_permission,getExpenseSupplierByIdService,updateExpenseSupplierService,getStateListService) {

    var auto_product_list,edit_state_id;

    $scope.add_supplier = {};

    $scope.selected_product_array = [{'product_id':'','product_code':'','product_name':'','measurement':''}];

    $scope.add_exp_supp_clicked = function () {

        $scope.selected_product_array = [{'product_id':'','product_code':'','product_name':'','measurement':''}];

        $scope.add_supplier = {};

        $scope.show_save = false;

        //$scope.getNextExpSupplier();
    };

/*    $scope.getNextExpSupplier = function () {

        getNextExpenseSupplierCode({}).then(function (res) {

            $scope.add_supplier.supplier_code = JSON.parse(res.data);
        });
    };

    $scope.getNextExpSupplier();*/

    $scope.get_all_expense_supplier = function () {

        getExpenseSupplierListing({}).then(function (res) {

            $scope.expense_supplier_listing_data = res.data;
        })
    };

    $scope.get_all_expense_supplier();

    $scope.get_product_text = function (index) {

        $scope.product_index = index;

        getExpenseProductsAutocomplete({term: $scope.selected_product_array[index].product_code}).then(

            function (response) {

                auto_product_list = response.data;

            });

        $scope.$watch('selected_product_array[index].product_code',function () {

            $("#product_code" + index).autocomplete({

                source: auto_product_list,

                select: function (event, ui) {

                    getProductByIdService({

                        product_id:ui.item.id

                    }).then(function (response) {

                        $scope.selected_product_array[index].product_id = ui.item.id;

                        $scope.selected_product_array[index].product_name = response.data[0].product_name;

                        $scope.selected_product_array[index].measurement = response.data[0].measurement;

                    });
                }
            })
        })
    };

    $scope.add_more_product = function () {

        $scope.selected_product_array.push({'product_id':'','product_code':'','product_name':'','measurement':''});
    };

    $scope.removeProduct = function(ind){

        $scope.selected_product_array.splice(ind,1);
    };

    $scope.save_exp_supplier = function () {

        $scope.add_supplier.expense_supplier_product = $scope.selected_product_array;

        addExpenseSupplierService({

            expense_supplier : $scope.add_supplier
        }).then(function (res) {

            $scope.get_all_expense_supplier();

            $scope.modal_dismiss_two();

            console.log(res.data);

            console.log(JSON.parse(res.data));


            $scope.suc_msg = JSON.parse(res.data);

            $('#suc_msg').fadeIn().delay(5000).fadeOut();
        })

    };

    // Get expense supplier from id

    $scope.expSupplier_get = function (id) {

        $('#example3').modal('show');

        $scope.show_save = true;

        getExpenseSupplierByIdService({

            expense_supplier_id:id
        }).then(function (res) {

            $scope.add_supplier.expense_supplier_id = id;

            $scope.add_supplier.supplier_code = res.data[0].supplier_code;

            $scope.add_supplier.supplier_name = res.data[0].supplier_name;

            $scope.add_supplier.gst_no = res.data[0].gst_no;

            $scope.add_supplier.mobile_number = res.data[0].mobile_number;

            $scope.selected_product_array = [];

            for(var e=0;e<res.data[0].expense_products.length;e++){

                $scope.carry_supplier = {'product_id':'','product_code':'','product_name':'','measurement':''};

                $scope.carry_supplier.product_id = res.data[0].expense_products[e].product.id;

                $scope.carry_supplier.product_code = res.data[0].expense_products[e].product.product_code;

                $scope.carry_supplier.product_name = res.data[0].expense_products[e].product.product_name;

                $scope.carry_supplier.measurement = res.data[0].expense_products[e].product.editmeasurement;

                $scope.selected_product_array.push($scope.carry_supplier);
            }

        },function (res) {
            console.log(res);
        })
    };


    //-------------------- Update expense supplier -------------------


    $scope.update_exp_supplier = function () {

        $scope.add_supplier.expense_supplier_product = $scope.selected_product_array;

        updateExpenseSupplierService({ expense_supplier: $scope.add_supplier}).then(function (res) {

            $scope.modal_dismiss_two();

            $scope.suc_msg = JSON.parse(res.data);

            $('#suc_msg').fadeIn().delay(5000).fadeOut();

            $scope.get_all_expense_supplier();

        })
    };


    //------------------ OTP verification -------------------

    $scope.current_modal = 'expense_supplier';

    $scope.expSupplier_permission = function (log_id,log_status,log_type) {

        check_permission.check_status(log_id,log_status,log_type,$scope.current_modal);

        $scope.comment ={};

        $scope.otp_object ={};
    };

    $scope.expSupplier_generate_password = function () {

        check_permission.generate_otp($scope.comment);

        $scope.comment ={};
    };

    $scope.expSupplier_verify_otp = function () {

        check_permission.verify_permission_otp($scope.otp_object, '');

        $scope.otp_object = {};
    };


    $scope.$on('CallParentMethod', function (event, data) {

        $scope.dismiss();

        $('#example3').modal('show');

        $scope.show_save = true;

        getExpenseSupplierByIdService({

            expense_supplier_id:data.id
        }).then(function (res) {

            $scope.add_supplier.expense_supplier_id = data.id;

            $scope.add_supplier.supplier_code = res.data[0].supplier_code;

            $scope.add_supplier.supplier_name = res.data[0].supplier_name;

            $scope.add_supplier.gst_no = res.data[0].gst_no;

            $scope.add_supplier.mobile_number = res.data[0].mobile_number;

            $scope.selected_product_array = [];

            for(var e=0;e<res.data[0].expense_products.length;e++){

                $scope.carry_supplier = {'product_id':'','product_code':'','product_name':'','measurement':''};

                $scope.carry_supplier.product_id = res.data[0].expense_products[e].product.id;

                $scope.carry_supplier.product_code = res.data[0].expense_products[e].product.product_code;

                $scope.carry_supplier.product_name = res.data[0].expense_products[e].product.product_name;

                $scope.carry_supplier.measurement = res.data[0].expense_products[e].product.editmeasurement;

                $scope.selected_product_array.push($scope.carry_supplier);
            }

        },function (res) {
            console.log(res);
        })
    });

    $scope.$on('updateListing', function (event, data) {

        if(data.model==$scope.current_modal){

            $scope.action_type = data.type;

            $scope.get_all_expense_supplier();

            if(data.otp){

                $scope.dismiss();

                $('#delete').fadeIn().delay(5000).fadeOut();

                $scope.delete_msg = 'Expense Supplier Deleted Successfully';
            }
        }
    });


    //--------------------- changes (8-03-2018 --> add state )

    $scope.get_state_list = function(){

        getStateListService({}).then(function (response) {
            $scope.state_list = response.data;

            if(edit_state_id!=''){

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

    $scope.get_state = function () {

        $scope.add_supplier.state_id = $scope.state_id.id;
    }

}]);