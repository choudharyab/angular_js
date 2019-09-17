// var purchaseExpenseModule = angular.module('purchaseExpenseModule',[]);

// purchaseExpenseModule.controller('purchaseExpenseController',['$scope','$http','getAccLedgerListService','supplierAutoCompleteService','taxesService','ExpSupplierAutoCompleteService','ExpSupplierProductByIdService','savePurchaseExpenseService','ExpListingService','getNextExpenseSupplierCode','getExpenseProductsAutocomplete','getProductByIdService','addExpenseSupplierService','getExpenseByIdService','updatePurchaseExpenseService','commonService',function ($scope,$http,getAccLedgerListService,supplierAutoCompleteService,taxesService,ExpSupplierAutoCompleteService,ExpSupplierProductByIdService,savePurchaseExpenseService,ExpListingService,getNextExpenseSupplierCode,getExpenseProductsAutocomplete,getProductByIdService,addExpenseSupplierService,getExpenseByIdService,updatePurchaseExpenseService,check_permission) {

//     var allLedgers,auto_supp_array,auto_product_list,added_supplier_id,pro_auto_array,expense_supp_products;

//     $scope.purchase_expense = {};

//     $scope.add_supplier = {};

//     $scope.supp_not_added_products = {};

//     $scope.selected_product_array = [{'product_id':'','product_code':'','product_name':'','measurement':''}];

//     $scope.add_exp_called = function () {

//         $scope.purchase_expense = {};

//         $scope.ledger_id = "";

//         $scope.auto_supplier_code = "";

//         $scope.selected_tax = "";
//     };

//     //------------------ Purchase expense listing ---------------------

//     $scope.exp_list = function () {

//         ExpListingService({}).then(function (res) {

//             $scope.allExpSupp = res.data;
//         })
//     };

//     $scope.exp_list();

//     //------------------ Ledger listing ---------------------

//     $scope.ledger_list = function () {

//         getAccLedgerListService({}).then(function (res) {

//             $scope.ledgerList = res.data;

//             allLedgers = res.data;
//         })
//     };
//     $scope.ledger_list();

//     //------------------ Tax listing ---------------------

//     $scope.tax_data =function () {

//         taxesService().then(function (response) {

//             $scope.tax_list = response.data;
//         });
//     };

//     $scope.tax_data();

//     //------------------ Get selected ledger ---------------------

//     $scope.get_ledger_info = function (selected_ledger) {

//         $scope.selected_ledger = JSON.parse(selected_ledger);

//         $scope.purchase_expense.ledger_id = $scope.selected_ledger.id;

//         $scope.purchase_expense.ledger_group_id = $scope.selected_ledger.ledger_group_id;

//         $scope.purchase_expense.ledger_group_name = $scope.selected_ledger.ledger_group_name;
//     };

//     //------------------ Supplier autocomplete ---------------------

//     $scope.get_auto_supplier = function (supplier_text,supplier_code) {

//         if(supplier_text){

//             $scope.auto_supplier_code = supplier_code+'-'+supplier_text;
//         }

//         ExpSupplierAutoCompleteService({term:$scope.auto_supplier_code}).then(function (res) {

//             auto_supp_array = res.data;

//             $scope.auto_search_supplier_list = res.data;
//         });
//     };

//     $(document).ready(function() {
//         $('#auto_supp_code_id').on('input', function() {
//             var userText = $(this).val();

//             $("#supplier-datalist").find("option").each(function() {

//                 if ($(this).val() == userText) {

//                     var index = auto_supp_array.findIndex( x => x.value==$(this).val());

//                     $scope.purchase_expense.expense_supplier_id = auto_supp_array[index].id;

//                     ExpSupplierProductByIdService({expense_supplier_id:auto_supp_array[index].id}).then(function (res) {

//                         $scope.allExpSuppProducts = res.data;

//                         expense_supp_products = res.data;
//                     });
//                 }
//             })
//         })
//     });

//     //---------------- Add and get new expense supplier code-----------------

//     $scope.add_new_supp = function () {

//         $scope.modal_dismiss_two();

//         $("#add_supp").modal('show');

//         $scope.getNextExpSupplier = function () {

//             getNextExpenseSupplierCode({}).then(function (res) {

//                 $scope.add_supplier.supplier_code = JSON.parse(res.data);
//             });
//         };

//         $scope.getNextExpSupplier();
//     };

//     //---------------- Add and get new expense product code-----------------

//     $scope.add_new_pro = function () {

//         $scope.modal_dismiss_two();

//         $("#add_pro").modal('show');
//     };

//     //------------------- Add remove product ----------------


//     $scope.add_more_product = function () {

//         $scope.selected_product_array.push({'product_id':'','product_code':'','product_name':'','measurement':''});
//     };

//     $scope.removeProduct = function(ind){

//         $scope.selected_product_array.splice(ind,1);
//     };

//     //------------------- Multi Product autocomplete --------------------

    // $scope.get_product_text = function (index) {

    //     $scope.product_index = index;

    //     getExpenseProductsAutocomplete({term: $scope.selected_product_array[index].product_code}).then(

    //         function (response) {

    //             auto_product_list = response.data;

    //         });

    //     $scope.$watch('selected_product_array[index].product_code',function () {

    //         $("#product_code" + index).autocomplete({

    //             source: auto_product_list,

    //             select: function (event, ui) {

    //                 getProductByIdService({

    //                     product_id:ui.item.id

    //                 }).then(function (response) {

    //                     $scope.selected_product_array[index].product_id = ui.item.id;

    //                     $scope.selected_product_array[index].product_name = response.data[0].product_name;

    //                     $scope.selected_product_array[index].measurement = response.data[0].measurement;

    //                 });
    //             }
    //         })
    //     })
    // };

//     //------------------- Single product autocomplete ---------------


//     $scope.get_auto_product = function () {

//         getExpenseProductsAutocomplete({term:$scope.auto_product_code}).then(function (res) {

//             pro_auto_array = res.data;

//             $scope.auto_pro_list = res.data;
//         });
//     };

//     $(document).ready(function() {

//         $('#auto_pro_code_id').on('input', function() {

//             var userText = $(this).val();

//             $("#product-datalist").find("option").each(function() {

//                 if ($(this).val() == userText) {

//                     var index = pro_auto_array.findIndex( x => x.value==$(this).val());

//                     $scope.purchase_expense.expense_product_id = pro_auto_array[index].id;

//                     if(expense_supp_products.length>0){

//                         for(var g=0;g<expense_supp_products.length;g++){

//                             if(expense_supp_products[g].id==pro_auto_array[index].id){

//                                 break;
//                             }else{

//                                 if(g==expense_supp_products.length-1){

//                                     $scope.supp_not_added_products = pro_auto_array[index];
//                                 }
//                             }
//                         }
//                     }else{
//                         $scope.supp_not_added_products = pro_auto_array[index];
//                     }
//                 }
//             })
//         })
//     });


//     //------------------- Save Expense Supplier -------------------

//     $scope.save_exp_supplier = function () {

//         $scope.add_supplier.expense_supplier_product = $scope.selected_product_array;

//         addExpenseSupplierService({

//             expense_supplier : $scope.add_supplier
//         }).then(function (res) {

//             $scope.dismiss_no_packt ();

//             $('#example3').modal('show');

//             $scope.get_auto_supplier($scope.add_supplier.supplier_name,$scope.add_supplier.supplier_code);

//             $scope.exp_supp_pro = [];

//             for(var g=0;g<$scope.selected_product_array.length;g++){

//                 $scope.pro_obj = {id:'',value:''};

//                 $scope.pro_obj = {id:$scope.selected_product_array[g].product_id,value:$scope.selected_product_array[g].product_code};

//                 $scope.exp_supp_pro.push($scope.pro_obj);
//             }

//             $scope.allExpSuppProducts = $scope.exp_supp_pro;

//             $scope.add_supplier = {};

//             $scope.getNextExpSupplier();

//             $scope.selected_product_array = [];

//             added_supplier_id = res.data.id;

//             $scope.purchase_expense.expense_supplier_id = res.data.id;

//         })

//     };

//     //------------ Reopen expense popup ---------------

//     $scope.reopen_expense = function () {

//         $scope.dismiss_no_packt();

//         $('#example3').modal('show');

//     };

//     $(document).ready(function() {

//         $('#select_ledger').select2();

//     });

//     //----------------- calculations of purchase expense -----------------
    
    // $scope.calculate_exp = function () {

    //     $scope.purchase_expense.tax_id = JSON.parse($scope.selected_tax).id;

    //     $scope.tax_rate = JSON.parse($scope.selected_tax).tax_rate;

    //     if($scope.purchase_expense.amount){

    //         $scope.purchase_expense.tax_amount = parseFloat($scope.purchase_expense.amount)*parseFloat($scope.tax_rate)/100;

    //         $scope.purchase_expense.tax_amount.toFixed(2);

    //         $scope.purchase_expense.total_amount = parseFloat($scope.purchase_expense.amount)+parseFloat($scope.purchase_expense.tax_amount);

    //         if($scope.purchase_expense.paid_amount){

    //             $scope.purchase_expense.balance_amount = parseFloat($scope.purchase_expense.total_amount)-parseFloat($scope.purchase_expense.paid_amount);
    //         }

    //     }else{
    //         $scope.purchase_expense.tax_amount = '';

    //         $scope.purchase_expense.total_amount = '';
    //     }
    // };

//     //-------------------- File upload --------------------

//     $scope.files = [];

//     $scope.$on("selectedFile", function (event, args) {

//         $scope.$apply(function () {

//             $scope.files = args.file;
//         });
//     });

//     //-------------- Save purchase expense ----------------
    
//     $scope.save_purchase_expense = function () {

//        /* savePurchaseExpenseService({

//             expense:$scope.purchase_expense
//         }).then(function (res) {

//             $scope.modal_dismiss_two();

//             $scope.exp_list();

//             $scope.exp_success = "Purchase Expense Added Successfully";

//             $('#expSuccess').fadeIn().delay(5000).fadeOut();

//         })*/

//         $http({
//             method: 'POST',
//             url: appUrl+'add_expense?token='+localStorage.getItem('token'),
//             headers: { 'Content-Type': undefined },

//             transformRequest: function (data) {

//                 var formData = new FormData();

//                 formData.append("expense", angular.toJson(data.model));

//                 formData.append('file',$scope.files);

//                 return formData;
//             },
//             data: {model: $scope.purchase_expense,files: $scope.files}

//         }).success(function (res) {

//             $scope.modal_dismiss_two();

//             $scope.exp_list();

//             $scope.exp_success = "Purchase Expense Added Successfully";

//             $('#expSuccess').fadeIn().delay(5000).fadeOut();

//         }).error(function (res) {

//             console.log(res);
//         })
//     };

//     //----------------- Get details by expense Id -------------------

//     $scope.edit_purchase_expense = function (exp_id) {

//         $('#example3').modal('show');

//         $scope.show_save = true;
//         $scope.show_edit = true;

//         getExpenseByIdService({expense_id:exp_id}).then(function (res) {

//             //$scope.purchase_expense = res.data[0];

//             $scope.edit_ledger_id = res.data[0].ledger_id;

//             $scope.auto_supplier_code = res.data[0].expense_supplier.supplier_code+'-'+res.data[0].expense_supplier.supplier_name;

//             ExpSupplierProductByIdService({expense_supplier_id:res.data[0].expense_supplier_id}).then(function (res) {

//                 $scope.allExpSuppProducts = res.data;
//             });

//             $scope.purchase_expense.expense_id = exp_id;

//             $scope.purchase_expense.ledger_id = res.data[0].ledger_id;

//             $scope.exp_product = res.data[0].expense_product_id;

//             $scope.purchase_expense.expense_product_id = res.data[0].expense_product_id;

//             $scope.purchase_expense.expense_supplier_id = res.data[0].expense_supplier_id;

//             $scope.purchase_expense.tax_id = res.data[0].tax_id;

//             $scope.purchase_expense.ledger_group_name = res.data[0].ledger_group.ledger_group_name;

//             $scope.purchase_expense.amount = res.data[0].amount;

//             $scope.purchase_expense.product_description = res.data[0].product_description;

//             $scope.purchase_expense.tax_type = res.data[0].tax_type;

//             $scope.edit_tax_id = res.data[0].tax_id;

//             $scope.purchase_expense.payment_mode = res.data[0].payment_mode;

//             $scope.purchase_expense.total_amount = res.data[0].total_amount;

//             $scope.purchase_expense.narration = res.data[0].narration;

//             $scope.purchase_expense.tax_amount = res.data[0].tax_amount;

//         },function (res) {
//             console.log(res);
//         })
//     };

//     //------------------- Update purchase expense -----------------


//     $scope.update_purchase_expense = function () {

//         updatePurchaseExpenseService({

//             expense:$scope.purchase_expense

//         }).then(function (res) {

//             $scope.modal_dismiss_two();

//             $scope.exp_list();

//             $scope.exp_success = "Purchase Expense Updated Successfully";

//             $('#expSuccess').fadeIn().delay(5000).fadeOut();
//         })
//     };


//     //------------------ OTP verification -------------------

//     $scope.current_modal = 'expense';

//     $scope.purchase_expense_permission = function (log_id,log_status,log_type) {

//         check_permission.check_status(log_id,log_status,log_type,$scope.current_modal);

//         $scope.comment ={};

//         $scope.otp_object ={};
//     };

//     $scope.exp_generate_password = function () {

//         check_permission.generate_otp($scope.comment);

//         $scope.comment ={};
//     };

//     $scope.exp_verify_otp = function () {

//         check_permission.verify_permission_otp($scope.otp_object, '');

//         $scope.otp_object = {};
//     };

//     $scope.$on('CallParentMethod', function (event, data) {

//         $scope.dismiss();


//         $('#example3').modal('show');

//         $scope.show_save = true;

//         $scope.show_edit = true;

//         getExpenseByIdService({expense_id:data.id}).then(function (res) {

//             //$scope.purchase_expense = res.data[0];

//             $scope.edit_ledger_id = res.data[0].ledger_id;

//             $scope.auto_supplier_code = res.data[0].expense_supplier.supplier_code+'-'+res.data[0].expense_supplier.supplier_name;

//             ExpSupplierProductByIdService({expense_supplier_id:res.data[0].expense_supplier_id}).then(function (res) {

//                 $scope.allExpSuppProducts = res.data;
//             });

//             $scope.purchase_expense.expense_id = data.id;

//             $scope.purchase_expense.ledger_id = res.data[0].ledger_id;

//             $scope.exp_product = res.data[0].expense_product_id;

//             $scope.purchase_expense.expense_product_id = res.data[0].expense_product_id;

//             $scope.purchase_expense.expense_supplier_id = res.data[0].expense_supplier_id;

//             $scope.purchase_expense.tax_id = res.data[0].tax_id;

//             $scope.purchase_expense.ledger_group_name = res.data[0].ledger_group.ledger_group_name;

//             $scope.purchase_expense.amount = res.data[0].amount;

//             $scope.purchase_expense.product_description = res.data[0].product_description;

//             $scope.purchase_expense.tax_type = res.data[0].tax_type;

//             $scope.edit_tax_id = res.data[0].tax_id;

//             $scope.purchase_expense.payment_mode = res.data[0].payment_mode;

//             $scope.purchase_expense.total_amount = res.data[0].total_amount;

//             $scope.purchase_expense.narration = res.data[0].narration;

//             $scope.purchase_expense.tax_amount = res.data[0].tax_amount;

//         },function (res) {
//             console.log(res);
//         })

//     });

//     $scope.$on('updateListing', function (event, data) {

//         if(data.model==$scope.current_modal){

//             $scope.action_type = data.type;

//             $scope.exp_list();

//             if(data.otp){

//                 $scope.dismiss();

//                 $('#delete_exp').fadeIn().delay(5000).fadeOut();

//                 $scope.delete_msg = 'Expense Deleted Successfully';
//             }
//         }
//     });

//     }]);


var purchaseExpenseModule = angular.module('purchaseExpenseModule',[]);

purchaseExpenseModule.controller('purchaseExpenseController',['$scope','$http','$window','getStateList','getTaxRateService','ExpListingService','getExpenseByIdService',
'commonService','getProductAutocomplete','ExpSupplierAutoCompleteService',
function ($scope,$http,$window,getStateList,getTaxRateService,ExpListingService,getExpenseByIdService,check_permission,getProductAutocomplete,ExpSupplierAutoCompleteService) {

        $scope.purchase_expense={};
        $scope.files = [];
        var file
        //Get Image Files
        $scope.$on("selectedFile", function (event, args) {
            $scope.$apply(function () {
                $scope.files.push(args.file);
            });
        });

        $scope.add_btn_clicked=function(){
            if(localStorage.getItem('warehouse_id')==''){
                alert('Please select company first');
            }else{
                $scope.purchase_expense={};              
                $scope.selected_tax='';
                $scope.files=[];
                $scope.show_save=false;
                $scope.show_edit=true;
                $('#example3').modal('show');
            }


          
        }
        $scope.state_list = function () {
            getStateList({}).then(function (response) {
                $scope.state_list = response.data;
            });
        };
        $scope.state_list();

        $scope.get_tax_rate_list = function () {
            getTaxRateService({}).then(function (resposne) {
                console.log(resposne);
                $scope.tax_list = resposne.data;
            });
        };
        $scope.get_tax_rate_list();

        $scope.get_expense_order_data = function () {
            ExpListingService({}).then(function (resposne) {
                console.log(resposne);
                $scope.expense_data = resposne.data;
            });
        };
        $scope.get_expense_order_data();

        $scope.get_tax_type=function(){
            if(localStorage.getItem('state_id')==$scope.purchase_expense.state_id){
                $scope.purchase_expense.tax_type='GST';
            }else{
                $scope.purchase_expense.tax_type='IGST';
            }
        }

    var all_data = [];
    // $scope.supplier_name_list = [];
    // $scope.all_supplier_name='';
    // $scope.search_supplier_name = function () {
    //     ExpSupplierAutoCompleteService({term:$scope.purchase_expense.supplier_name}).then(function (response) {
    //         all_data = response.data;
    //         $scope.all_supplier_name = response.data;
    //         if(response.data==[]){
    //                     $scope.supplier_name_list = [];
    //         }
    //     });
    // };

    // $(document).ready(function() {
    //     $('#auto_supp_code_id').on('input', function() {
    //         var userText = $(this).val();
    //         $("#supplier_name_datalist").find("option").each(function() {
    //             if ($(this).val() == userText) {
    //                 var index = all_data.findIndex(x => x.value==$(this).val());
    //                 if($scope.supplier_name_list.findIndex(y => y.value==$(this).val()) == -1){
    //                     console.log('all_data[index]---',all_data[index]);
    //                     $scope.purchase_expense.supplier_name=all_data[index].value;
    //                     $scope.supplier_name_list.push(all_data[index]);
    //                     all_data = [];
    //                     $scope.supplier_name_list = [];
    //                     $scope.all_supplier_name='';
    //                     document.getElementById('supplier_name_datalist').value = '';
    //                 }else{
    //                     $scope.supplier_name_list = [];
    //                    alert('Supplier Already Added');
    //                    document.getElementById('auto_supp_code_id').value = '';
    //                 }

    //             }
    //         });

    //     })
    // });

    var all_suppliers = [];
    $scope.supplier_name_list = [];
    $scope.search_supplier_name = function () {
        ExpSupplierAutoCompleteService({term:$scope.purchase_expense.supplier_name}).then(function (response) {
            all_suppliers = response.data;
            $scope.all_supplier_name = response.data;
        });
    };

    $(document).ready(function() {
        $('#auto_supp_code_id').on('input', function() {
            var userText = $(this).val();
            $("#supplier_name_datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_suppliers.findIndex(x => x.value==$(this).val());
                    if($scope.supplier_name_list.findIndex(y => y.value==$(this).val()) == -1){
                        console.log(all_suppliers[index]);
                        $scope.supplier_name_list.push(all_suppliers[index]);
                        document.getElementById('auto_supp_code_id').value = all_suppliers[index].value;
                        $scope.purchase_expense.supplier_name=all_suppliers[index].supplier_name;
                        document.getElementById('supplier_name_datalist').value = '';
                        $scope.all_supplier_name={};
                        all_data = [];
                        $scope.supplier_name_list = [];
                        
                    }else{
                        console.log('all_suppliers[index]----',all_suppliers[index]);
                        
                            document.getElementById('auto_supp_code_id').value = '';
                            $scope.all_supplier_name={};
                            all_suppliers = [];
                    }

                }
            });

        })
    });
    var all_supplier_name;
    $scope.search_supplier_name = function () {
        //$scope.product_index = index;
        ExpSupplierAutoCompleteService({
            term: $scope.purchase_expense.supplier_name
        }).then(function (response) 
        {
            all_supplier_name = response.data;
        });

        $scope.$watch('auto_supp_code_id',function () {

            $("#auto_supp_code_id").autocomplete({

                source: all_supplier_name,

                select: function (event, ui) {
                    $scope.purchase_expense.supplier_name=ui.item.value;
                }
            })
        })
    };


    // $scope.product_name_list = [];
    // $scope.search_product_name = function () {
    //     getProductAutocomplete({term:$scope.purchase_expense.product_name}).then(function (response) {
    //         all_data = response.data;
    //         $scope.all_product_name = response.data;
    //         if(response.data==[]){
    //                     $scope.product_name_list = [];
                        
    //         }
    //     });
    // };

    // $(document).ready(function() {
    //     $('#auto_pro_code_id').on('input', function() {
    //         var userText = $(this).val();
    //         $("#product_name_datalist").find("option").each(function() {
    //             if ($(this).val() == userText) {
    //                 var index = all_data.findIndex(x => x.value==$(this).val());
    //                 if($scope.product_name_list.findIndex(y => y.value==$(this).val()) == -1){
    //                     console.log('all_data[index]---',all_data[index]);
    //                     $scope.purchase_expense.product_name=all_data[index].value;
    //                     $scope.product_name_list.push(all_data[index]);
    //                     document.getElementById('auto_pro_code_id').value = all_data[index].value;
    //                 }else{
    //                    alert('product Already Added');
    //                    document.getElementById('auto_pro_code_id').value = '';
    //                 }

    //             }
    //         });

    //     })
    // });
    var all_product_name;
    $scope.search_product_name = function () {
        //$scope.product_index = index;
        getProductAutocomplete({
            term: $scope.purchase_expense.product_name
        }).then(function (response) 
        {
            all_product_name = response.data;
        });

        $scope.$watch('auto_pro_code_id',function () {

            $("#auto_pro_code_id").autocomplete({

                source: all_product_name,

                select: function (event, ui) {
                    $scope.purchase_expense.product_name=ui.item.value;
                }
            })
        })
    };

        $scope.calculate_exp = function () {
            
            $scope.purchase_expense.tax_id = JSON.parse($scope.selected_tax).id;
            console.log($scope.purchase_expense.tax_id);

            $scope.purchase_expense.tax_rate = JSON.parse($scope.selected_tax).tax_rate;
            console.log($scope.purchase_expense.tax_rate);
    
            $scope.tax_rate = JSON.parse($scope.selected_tax).tax_rate;
    
            if($scope.purchase_expense.amount){
    
                $scope.purchase_expense.tax_amount = parseFloat($scope.purchase_expense.amount)*parseFloat($scope.tax_rate)/100;
    
                $scope.purchase_expense.tax_amount.toFixed(2);
    
                $scope.purchase_expense.total_amount = parseFloat($scope.purchase_expense.amount)+parseFloat($scope.purchase_expense.tax_amount);
    
                if($scope.purchase_expense.paid_amount){
    
                    $scope.purchase_expense.balance_amount = parseFloat($scope.purchase_expense.total_amount)-parseFloat($scope.purchase_expense.paid_amount);
                }
    
            }else{
                $scope.purchase_expense.tax_amount = '';
    
                $scope.purchase_expense.total_amount = '';
            }
        };

        $scope.save_purchase_expense_data=function () {
            //$scope.gr_details.company_id=localStorage.getItem('warehouse_id');
            $scope.purchase_expense.company_id = localStorage.getItem('warehouse_id');
            var dataObject = {
                purchase_expense : $scope.purchase_expense
            };
            $http({
                method: 'POST',
                url: appUrl+'store_purchase_expense?token='+localStorage.getItem('token'),
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("purchase_expense", angular.toJson(data.model));
    
                    for (var i = 0; i < data.files.length; i++) {
    
                        formData.append('uploadimage', data.files[i]);
                    }
    
                    return formData;
                },
                data: {model: dataObject,files: $scope.files}
            }).
            success(function (data, status, headers, config) {
                console.log('JSON-->',JSON.stringify(data));
    
                console.log("success!");
                $scope.modal_dismiss_three();
                $scope.purchase_expense = {};
                $scope.files = [];
                $scope.selected_tax='';
                console.log("success");
                $scope.exp_success = "Purchase Expense Added Successfully";
                $('#expSuccess').fadeIn().delay(5000).fadeOut();
                $scope.get_expense_order_data();
            }).
            error(function (data, status, headers, config) {
                console.log('data---->',data);
                console.log("failed!");
                $scope.exp_success = '';
                $('#expError').fadeIn().delay(5000).fadeOut();
                $scope.exp_error = "Something Went Wrong... Please Try Again...!!";
            });
        };
        var expo_id;
        $scope.get_expense_data_by_id=function(id){
            expo_id=id;
            $scope.show_save=true;
            $scope.show_edit=false;
            getExpenseByIdService({
                id:id
            }).then(function (resposne) {
                console.log(resposne);
                $scope.purchase_expense.amount = resposne.data[0].amount;
                $scope.purchase_expense.balance_amount = resposne.data[0].balance_amount;
                $scope.purchase_expense.bill_number = resposne.data[0].bill_number;
                $scope.purchase_expense.contact_person = resposne.data[0].contact_person;
                $scope.purchase_expense.narration = resposne.data[0].narration;
                $scope.purchase_expense.paid_amount = resposne.data[0].paid_amount;
                $scope.purchase_expense.payment_mode = resposne.data[0].payment_mode;
                $scope.purchase_expense.product_name = resposne.data[0].product;
                $scope.purchase_expense.product_description = resposne.data[0].product_description;
                $scope.purchase_expense.state_id = resposne.data[0].state_id;
                $scope.purchase_expense.supplier_name = resposne.data[0].supplier;
                $scope.purchase_expense.tax_amount = resposne.data[0].tax_amount;
                $scope.purchase_expense.tax_type = resposne.data[0].tax_type;
                $scope.purchase_expense.total_amount = resposne.data[0].total_amount;
                $scope.edit_tax_id = resposne.data[0].tax.id;
                $scope.purchase_expense.tax_id=resposne.data[0].tax.id;
            });
        };

        $scope.current_modal = "purchase_expense";
        $scope.expo_permission_popup = function (gr_id,gr_status,gr_type) {
            check_permission.check_status(gr_id,gr_status,gr_type,$scope.current_modal);
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
                $scope.get_expense_order_data();
                $scope.modal_dismiss_two();
                $scope.active_lable = true;
                $scope.get_expense_data_by_id(data.id);
                $('#example3').modal('show');
            }
        });
    
        $scope.$on('updateListing', function (event, data) {
            if(data.model==$scope.current_modal){
                $scope.action_type = data.type;
                $scope.get_expense_order_data();
                if(data.otp){
                    $scope.modal_dismiss_two();
                    $scope.exp_error = "Purchase Expense Deleted Successfully";
                    $('#expError').fadeIn().delay(5000).fadeOut();
                }
            }
        });

        $scope.update_purchase_expense_data=function () {
            //$scope.gr_details.company_id=localStorage.getItem('warehouse_id');
            $scope.purchase_expense.id=expo_id;
            var dataObject = {
                purchase_expense : $scope.purchase_expense
            };
            $http({
                method: 'POST',
                url: appUrl+'update_purchase_expense?token='+localStorage.getItem('token'),
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("purchase_expense", angular.toJson(data.model));
    
                    for (var i = 0; i < data.files.length; i++) {
    
                        formData.append('uploadimage', data.files[i]);
                    }
    
                    return formData;
                },
                data: {model: dataObject,files: $scope.files}
            }).
            success(function (data, status, headers, config) {
                console.log('JSON-->',JSON.stringify(data));
    
                console.log("success!");
                $scope.modal_dismiss_three();
                $scope.purchase_expense = {};
                $scope.files = [];
                $scope.selected_tax='';
                console.log("success");
                $scope.exp_success = "Purchase Expense Updated Successfully";
                $('#expSuccess').fadeIn().delay(5000).fadeOut();
                $scope.get_expense_order_data();
            }).
            error(function (data, status, headers, config) {
                console.log('data---->',data);
                console.log("failed!");
                $scope.exp_success = '';
                $('#expError').fadeIn().delay(5000).fadeOut();
                $scope.exp_error = "Something Went Wrong... Please Try Again...!!";
            });
        };

        $scope.open_file=function(filename){
            $window.open('wheelsonroadserver/public/files/'+filename);
        }
}]);