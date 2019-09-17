var invoiceServiceModule = angular.module('invoiceServiceModule',[]);

invoiceServiceModule.controller('invoiceServiceController',['$scope','$http','$route','$window','$location','$timeout','getAccLedgerListService','taxesService','ExpSupplierAutoCompleteService','ExpSupplierProductByIdService','savePurchaseExpenseService','InvoiceServiceListingService','getNextExpenseSupplierCode','getServicesAutocomplete','getProductByIdService','addExpenseSupplierService','getExpenseByIdService','updatePurchaseExpenseService','commonService','getVoucherLedgerListService','getUnitOfMeasureService','getTaxRateService','addProductForExpenseOrder','getStateListService','getWarehouseListService','getBillFileService',function ($scope,$http,$route,$window,$location,$timeout,getAccLedgerListService,taxesService,ExpSupplierAutoCompleteService,ExpSupplierProductByIdService,savePurchaseExpenseService,InvoiceServiceListingService,getNextExpenseSupplierCode,getServicesAutocomplete,getProductByIdService,addExpenseSupplierService,getExpenseByIdService,updatePurchaseExpenseService,check_permission,getVoucherLedgerListService,getUnitOfMeasureService,getTaxRateService,addProductForExpenseOrder,getStateListService,getWarehouseListService,getBillFileService) {

    var allLedgers,auto_supp_array,auto_product_list,added_supplier_id,pro_auto_array,expense_supp_products;

    $scope.purchase_expense = {};

    $scope.add_supplier = {};

    $scope.supp_not_added_products = {};
	
	$scope.warehouse_name = localStorage.getItem('warehouse_name').substring(0,3);

    getWarehouseListService({}).then(function (response) {
        $scope.warehouse_list = response.data;
    });
	
	$scope.get_po_warehouse = function () {
        localStorage.setItem('warehouse_id',JSON.parse($scope.warehouse_id).id);
        localStorage.setItem('warehouse_name',JSON.parse($scope.warehouse_id).warehouse_name);
        localStorage.setItem('warehouse_state_id',JSON.parse($scope.warehouse_id).state_id);
        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
    };
	
	$scope.$on("selectedBillFile", function (event, args) {
    $scope.$apply(function () {
        $scope.bill_img = args.file;

        console.log($scope.stamp_img);
    });
});

    $scope.selected_product_array = [{'product_id':'','product_code':'','product_name':'','measurement':''}];
	$scope.selected_warehouse = localStorage.getItem('warehouse_id');
    $scope.add_exp_called = function () {
		
		if(localStorage.getItem('warehouse_id')=='undefined'){
            alert("Please Select Warehouse First");
        }else{
            $route.reload();
			$timeout(function () {
				$('#example3').modal('show');
			},700);
        }
        
    };

    //------------------ Purchase expense listing ---------------------

    $scope.exp_list = function () {

        InvoiceServiceListingService({}).then(function (res) {

            $scope.allExpSupp = res.data;
        })
    };

    $scope.exp_list();

    //------------------ Ledger listing ---------------------

    $scope.ledger_list = function () {

        getAccLedgerListService({}).then(function (res) {

            $scope.ledgerList = res.data;

            allLedgers = res.data;
        })
    };
    $scope.ledger_list();

    //------------------ Tax listing ---------------------

    $scope.tax_data =function () {

        taxesService().then(function (response) {

            $scope.tax_list = response.data;
        });
    };

    $scope.tax_data();

    //------------------ Get selected ledger ---------------------

    $scope.get_ledger_info = function (selected_ledger) {

        $scope.selected_ledger = JSON.parse(selected_ledger);

        $scope.purchase_expense.ledger_id = $scope.selected_ledger.id;

        $scope.purchase_expense.ledger_group_id = $scope.selected_ledger.ledger_group_id;

        $scope.purchase_expense.ledger_group_name = $scope.selected_ledger.ledger_group_name;
    };

    //------------------ Supplier autocomplete ---------------------

    $scope.get_auto_supplier = function (supplier_text,supplier_code) {

        if(supplier_text){

            $scope.auto_supplier_code = supplier_code+'-'+supplier_text;
        }

        ExpSupplierAutoCompleteService({term:$scope.auto_supplier_code}).then(function (res) {

            auto_supp_array = res.data;

            $scope.auto_search_supplier_list = res.data;
        });
    };

    $(document).ready(function() {
        $('#auto_supp_code_id').on('input', function() {
            var userText = $(this).val();

            $("#supplier-datalist").find("option").each(function() {

                if ($(this).val() == userText) {

                    var index = auto_supp_array.findIndex( x => x.value==$(this).val());

                    $scope.purchase_expense.expense_supplier_id = auto_supp_array[index].id;

                    ExpSupplierProductByIdService({expense_supplier_id:auto_supp_array[index].id}).then(function (res) {

                        $scope.allExpSuppProducts = res.data;

                        expense_supp_products = res.data;
                    });
                }
            })
        })
    });

    //---------------- Add and get new expense supplier code-----------------

    $scope.add_new_supp = function () {

        $scope.modal_dismiss_two();

        $("#add_supp").modal('show');

        $scope.getNextExpSupplier = function () {

            getNextExpenseSupplierCode({}).then(function (res) {

                $scope.add_supplier.supplier_code = res.data;
				
            });
        };

        $scope.getNextExpSupplier();
    };

    //---------------- Add and get new expense product code-----------------

    $scope.add_new_pro = function () {

        $scope.modal_dismiss_two();

        $("#add_pro").modal('show');
    };

    //------------------- Add remove product ----------------


    $scope.add_more_product = function () {

        $scope.selected_product_array.push({'product_id':'','product_code':'','product_name':'','measurement':''});
    };

    $scope.removeProduct = function(ind){

        $scope.selected_product_array.splice(ind,1);
    };

    //------------------- Multi Product autocomplete --------------------

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

    //------------------- Single product autocomplete ---------------


    $scope.get_auto_product = function () {

        getServicesAutocomplete({term:$scope.auto_product_code}).then(function (res) {
			// $scope.purchase_expense.ledger_id = res.data.id;
            pro_auto_array = res.data;
            $scope.auto_pro_list = res.data;
			$scope.getComposition();
        },function (res) {
           
        });
    };
	
	$scope.data = {
       product:[]
    };
	$scope.clickFunc = function(){
	}
	$scope.getComposition = function(){
        $('#auto_pro_code_id').autocomplete({
            source:pro_auto_array,
            select:function (event,ui) {
				$scope.clickFunc();
				$scope.auto_product_code = "";
				$scope.data.products = {ledger_id:ui.item.id, product_name:ui.item.product_name, sac_code:ui.item.sac_code, tax_rate:ui.item.tax_rate, pro_amount:"", tax_amt:"", total_amt:"",tds_rate:ui.item.tds_rate};
				//console.log($scope.data.products);
				$scope.data.product.push($scope.data.products);
            }
        });
    }   
	$scope.calAmt = function(index){
		
		if($scope.data.product[index].basic_amt != "" ){
			
			
				
				if($scope.data.product[index].tax_rate == null && $scope.data.product[index].tax_rate == ""){
				$scope.data.product[index].tax_rate = 1;
				}
				$scope.data.product[index].tax_amount =  $scope.data.product[index].basic_amt * $scope.data.product[index].tax_rate / 100;
				$scope.data.product[index].tax_amount = $scope.data.product[index].tax_amount.toFixed(2);
				$scope.data.product[index].total_amount =  parseFloat($scope.data.product[index].tax_amount) + parseFloat($scope.data.product[index].basic_amt);
				$scope.data.product[index].total_amount = $scope.data.product[index].total_amount.toFixed(2);
				
				$scope.data.product[index].tds_amount =  $scope.data.product[index].basic_amt * $scope.data.product[index].tds_rate / 100;
				
				$scope.purchase_expense.total_amount = 0;
				var round_off_cal = 0;
				var total_tds_amt = 0;
				for(var v=0;v<$scope.data.product.length;v++){
					$scope.purchase_expense.total_amount +=  parseFloat($scope.data.product[v].total_amount);
					round_off_cal +=  parseFloat($scope.data.product[v].total_amount);
					total_tds_amt +=  parseFloat($scope.data.product[index].tds_amount);
				}
				$scope.purchase_expense.total_amount = Math.round($scope.purchase_expense.total_amount);
				$scope.purchase_expense.tds_amount = total_tds_amt.toFixed(2);
				$scope.purchase_expense.payable_amount = parseFloat($scope.purchase_expense.total_amount) - parseFloat($scope.purchase_expense.tds_amount);
				
				
				$scope.purchase_expense.round_off = $scope.purchase_expense.total_amount - round_off_cal;
				$scope.purchase_expense.round_off =  $scope.purchase_expense.round_off.toFixed(2);
			
		}
	}
	
	$scope.calTaxAmt = function(index){
		
		if($scope.data.product[index].rate != "" && $scope.data.product[index].quantity != ""){
			
			$scope.data.product[index].pro_amount = parseFloat($scope.data.product[index].rate) * parseFloat($scope.data.product[index].quantity);
			
			if($scope.data.product[index].pro_amount != NaN){
				
				$scope.data.product[index].pro_amount = $scope.data.product[index].pro_amount.toFixed(2);
				
				if($scope.data.product[index].tax_rate == null && $scope.data.product[index].tax_rate == ""){
				$scope.data.product[index].tax_rate = 1;
				}
				$scope.data.product[index].tax_amt =  $scope.data.product[index].pro_amount * $scope.data.product[index].tax_rate / 100;
				$scope.data.product[index].tax_amt = $scope.data.product[index].tax_amt.toFixed(2);
				$scope.data.product[index].total_amt =  parseFloat($scope.data.product[index].tax_amt) + parseFloat($scope.data.product[index].pro_amount);
				$scope.data.product[index].total_amt = $scope.data.product[index].total_amt.toFixed(2);
				
				$scope.purchase_expense.total_amount = 0;
				var round_off_cal = 0;
				for(var v=0;v<$scope.data.product.length;v++){
					$scope.purchase_expense.total_amount +=  parseFloat($scope.data.product[v].total_amt);
					round_off_cal +=  parseFloat($scope.data.product[v].total_amt);
				}
				$scope.purchase_expense.total_amount = Math.round($scope.purchase_expense.total_amount);
				$scope.purchase_expense.round_off = $scope.purchase_expense.total_amount - round_off_cal;
				$scope.purchase_expense.round_off =  $scope.purchase_expense.round_off.toFixed(2);
			}
		
		}
	}
	
	$scope.calPaidAmt = function(){ 
		if($scope.purchase_expense.paid_amount <= $scope.purchase_expense.total_amount){
			$scope.purchase_expense.balance_amount = parseFloat($scope.purchase_expense.total_amount) - parseFloat($scope.purchase_expense.paid_amount);
			
			$scope.purchase_expense.balance_amount = Math.round($scope.purchase_expense.balance_amount);
		} else {
			$scope.purchase_expense.balance_amount = "";
			$scope.purchase_expense.paid_amount = "";
			alert('Paid amount should not be greater than paid amount!');
		}
	}
	
	//Function to delete product dynamically
	$scope.deleteMultiProd = function($event,name,index){
		if($scope.data.product[index].total_amt != ''){
			var amtTotal =  parseFloat($scope.purchase_expense.total_amount) - parseFloat($scope.data.product[index].total_amt);
			$scope.purchase_expense.total_amount = Math.round(amtTotal);
			$scope.purchase_expense.balance_amount = "";
			$scope.purchase_expense.paid_amount = "";
		}
		var index = $scope.data.product.indexOf(name);
		//console.log($scope.data.product)
        if($event.which == 1)
           $scope.data.product.splice(index,1);
	}

    /**$(document).ready(function() {

        $('#auto_pro_code_id').on('input', function() {

            var userText = $(this).val();

            $("#product-datalist").find("option").each(function() {

                if ($(this).val() == userText) {

                    var index = pro_auto_array.findIndex( x => x.value==$(this).val());

                    $scope.purchase_expense.expense_product_id = pro_auto_array[index].id;

                    if(expense_supp_products.length>0){

                        for(var g=0;g<expense_supp_products.length;g++){

                            if(expense_supp_products[g].id==pro_auto_array[index].id){

                                break;
                            }else{

                                if(g==expense_supp_products.length-1){

                                    $scope.supp_not_added_products = pro_auto_array[index];
                                }
                            }
                        }
                    }else{
                        $scope.supp_not_added_products = pro_auto_array[index];
                    }
                }
            })
        })
    });**/
	
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
   // $scope.get_state_list();


    //------------------- Save Expense Supplier -------------------

    $scope.save_exp_supplier = function () {

        $scope.add_supplier.expense_supplier_product = $scope.selected_product_array;

        addExpenseSupplierService({

            expense_supplier : $scope.add_supplier
        }).then(function (res) {

            //$scope.dismiss_no_packt();
            $('#example3').modal('show');
			$('#add_supp').modal('hide');
			

            $scope.get_auto_supplier($scope.add_supplier.supplier_name,$scope.add_supplier.supplier_code);

            $scope.exp_supp_pro = [];

            for(var g=0;g<$scope.selected_product_array.length;g++){

                $scope.pro_obj = {id:'',value:''};

                $scope.pro_obj = {id:$scope.selected_product_array[g].product_id,value:$scope.selected_product_array[g].product_code};

                $scope.exp_supp_pro.push($scope.pro_obj);
            }

            $scope.allExpSuppProducts = $scope.exp_supp_pro;

            $scope.add_supplier = {};

            $scope.getNextExpSupplier();

            $scope.selected_product_array = [];

            added_supplier_id = res.data.id;

            $scope.purchase_expense.expense_supplier_id = res.data.id;

        })

    };

    //------------ Reopen expense popup ---------------

    $scope.reopen_expense = function () {

        $scope.dismiss_no_packt();

        $('#example3').modal('show');

    };

    $(document).ready(function() {

        $('#select_ledger').select2();

    });

    //----------------- calculations of purchase expense -----------------
    
    $scope.calculate_exp = function () {

        $scope.purchase_expense.tax_id = JSON.parse($scope.selected_tax).id;

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

    //-------------------- File upload --------------------

    $scope.files = [];

    $scope.$on("selectedFile", function (event, args) {

        $scope.$apply(function () {

            $scope.files = args.file;
        });
    });

    //-------------- Save purchase expense ----------------
    
    $scope.save_service_invoice = function () {
		
		if($scope.purchase_expense.product_description == undefined){
			$scope.purchase_expense.product_description = "";
		} 
		
		if($scope.purchase_expense.bill_date == undefined){
			$scope.purchase_expense.bill_date = "";
		} 
		
		if($scope.purchase_expense.bill_number == undefined){
			$scope.purchase_expense.bill_number = "";
		} 
		if($scope.purchase_expense.autocalculation == undefined){
			$scope.purchase_expense.autocalculation = "";
		} 
		
		var warehouse_data = localStorage.getItem('warehouse_id');
		
       /* savePurchaseExpenseService({
            expense:$scope.purchase_expense,
			product_info:$scope.data.product,
			warehouse_id : warehouse_data
        }).then(function (res) {
            //$scope.modal_dismiss_two();
			$('#example3').modal('hide');
            $scope.exp_list();
            $scope.exp_success = "Purchase Expense Added Successfully";
            $('#expSuccess').fadeIn().delay(5000).fadeOut();
        });*/

        $http({
            method: 'POST',
            url: appUrl+'add_service_invoice?token='+localStorage.getItem('token'),
            headers: { 'Content-Type': undefined },

            transformRequest: function (data) {

                var formData = new FormData();

                formData.append("expense", angular.toJson($scope.purchase_expense));
                formData.append("product_info", angular.toJson($scope.data.product));

                formData.append('bill_file',$scope.bill_img);

                return formData;
            },
            data: {model: $scope.purchase_expense,product_info:$scope.data.product,files: $scope.bill_img}

        }).success(function (res) {

            $scope.modal_dismiss_two();

            $scope.exp_list();
$('#example3').modal('hide');
            $scope.exp_success = "Service invoice Added Successfully";

            $('#expSuccess').fadeIn().delay(5000).fadeOut();

        }).error(function (res) {

            console.log(res);
        })
    };

    //----------------- Get details by expense Id -------------------

    $scope.edit_purchase_expense = function (exp_id) {

        $('#example3').modal('show');

        $scope.show_save = true;
        $scope.show_edit = true;

        getExpenseByIdService({expense_id:exp_id}).then(function (res) {

            //$scope.purchase_expense = res.data[0];

            

            $scope.auto_supplier_code = res.data[0].expense_supplier.supplier_code+'-'+res.data[0].expense_supplier.supplier_name;

            $scope.auto_product_code = res.data[0].expense_product.product_code+'-'+res.data[0].expense_product.product_name;

            ExpSupplierProductByIdService({expense_supplier_id:res.data[0].expense_supplier_id}).then(function (res) {

                $scope.allExpSuppProducts = res.data;
            });

            $scope.purchase_expense.expense_id = exp_id;

            $scope.exp_product = res.data[0].expense_product_id;

            $scope.purchase_expense.expense_product_id = res.data[0].expense_product_id;

            $scope.purchase_expense.expense_supplier_id = res.data[0].expense_supplier_id;

            $scope.purchase_expense.tax_id = res.data[0].tax_id;

            $scope.purchase_expense.amount = res.data[0].amount;

            $scope.purchase_expense.product_description = res.data[0].product_description;

            $scope.purchase_expense.tax_type = res.data[0].tax_type;

            $scope.edit_tax_id = res.data[0].tax_id;

            $scope.purchase_expense.payment_mode = res.data[0].payment_mode;

            $scope.purchase_expense.total_amount = res.data[0].total_amount;

            $scope.purchase_expense.narration = res.data[0].narration;

            $scope.purchase_expense.tax_amount = res.data[0].tax_amount;
            $scope.edit_ledger_id = res.data[0].ledger_id;
            $scope.purchase_expense.ledger_id = res.data[0].ledger_id;
            $scope.purchase_expense.ledger_group_name = res.data[0].ledger_group.ledger_group_name;

        },function (res) {
            console.log(res);
        })
    };
 
    //------------------- Update purchase expense -----------------


    $scope.update_purchase_expense = function () {

		if($scope.purchase_expense.product_description == undefined){
			$scope.purchase_expense.product_description = "";
		} 
		
		if($scope.purchase_expense.bill_date == undefined){
			$scope.purchase_expense.bill_date = "";
		}
		
		if($scope.purchase_expense.bill_number == undefined){
			$scope.purchase_expense.bill_number = "";
		} 
	
        updatePurchaseExpenseService({
            expense:$scope.purchase_expense,
			product_info:$scope.data.product
        }).then(function (res) {

            //$scope.modal_dismiss_two();
			
			$('#example3').modal('hide');
			
            $scope.exp_list();

            $scope.exp_success = "Purchase Expense Updated Successfully";

            $('#expSuccess').fadeIn().delay(5000).fadeOut();
        })
    };


    //------------------ OTP verification -------------------

    $scope.current_modal = 'expense';

    $scope.purchase_expense_permission = function (log_id,log_status,log_type) {

        check_permission.check_status(log_id,log_status,log_type,$scope.current_modal);

        $scope.comment ={};

        $scope.otp_object ={};
    };

    $scope.exp_generate_password = function () {

        check_permission.generate_otp($scope.comment);

        $scope.comment ={};
    };

    $scope.exp_verify_otp = function () {

        check_permission.verify_permission_otp($scope.otp_object, '');

        $scope.otp_object = {};
    };

    $scope.$on('CallParentMethod', function (event, data) {

        $scope.dismiss();


        $('#example3').modal('show');

        $scope.show_save = true;

        $scope.show_edit = true;

        getExpenseByIdService({expense_id:data.id}).then(function (res) {

            //$scope.purchase_expense = res.data[0];

            $scope.edit_ledger_id = res.data[0].ledger_id;

            $scope.auto_supplier_code = res.data[0].expense_supplier.supplier_code+'-'+res.data[0].expense_supplier.supplier_name;

            /**ExpSupplierProductByIdService({expense_supplier_id:res.data[0].expense_supplier_id}).then(function (res) {
                $scope.allExpSuppProducts = res.data;
            });**/

            $scope.purchase_expense.expense_id = data.id;

            //$scope.purchase_expense.ledger_id = res.data[0].ledger_id;

            //$scope.exp_product = res.data[0].expense_product_id;

            //$scope.purchase_expense.expense_product_id = res.data[0].expense_product_id;

            $scope.purchase_expense.expense_supplier_id = res.data[0].expense_supplier_id;

            //$scope.purchase_expense.tax_id = res.data[0].tax_id;

            //$scope.purchase_expense.amount = res.data[0].amount;

            $scope.purchase_expense.product_description = res.data[0].product_description;

            //$scope.purchase_expense.tax_type = res.data[0].tax_type;

            //$scope.edit_tax_id = res.data[0].tax_id;

            $scope.purchase_expense.payment_mode = res.data[0].payment_mode;
            $scope.purchase_expense.total_amount = res.data[0].total_amount;
            $scope.purchase_expense.narration = res.data[0].narration;

            //$scope.purchase_expense.tax_amount = res.data[0].tax_amount;

            //$scope.purchase_expense.ledger_group_name = res.data[0].ledger_group.ledger_group_name;
			
			$scope.purchase_expense.bill_number = res.data[0].bill_number;
			$scope.purchase_expense.paid_amount = res.data[0].paid_amount;
			$scope.purchase_expense.balance_amount = res.data[0].balance_amount;
			
			var expense_data = res.data[0].expense_products;
			if(expense_data.length > 0){
				for(var t=0; t<res.data[0].expense_products.length; t++){
					res.data[0].expense_products[t].product_id = expense_data[t].expense_product_id;
					res.data[0].expense_products[t].product_name = expense_data[t].expense_products.product_name;
					res.data[0].expense_products[t].hsn_code = expense_data[t].hsn_code;
					res.data[0].expense_products[t].tax_rate = expense_data[t].expense_products.tax_rate.tax_rate;
					res.data[0].expense_products[t].pro_amount = expense_data[t].sub_total;
					res.data[0].expense_products[t].tax_amt = expense_data[t].tax_amount;
					res.data[0].expense_products[t].total_amt = expense_data[t].total_amount;
				} 
				$scope.data.product = res.data[0].expense_products;
			}

        },function (res) {
            console.log(res);
        })

    });

    $scope.$on('updateListing', function (event, data) {

        if(data.model==$scope.current_modal){

            $scope.action_type = data.type;

            $scope.exp_list();

            if(data.otp){

                $scope.dismiss();

                $('#delete_exp').fadeIn().delay(5000).fadeOut();

                $scope.delete_msg = 'Expense Deleted Successfully';
            }
        }
    });
	
	$scope.get_ledger_list = function () {
        getVoucherLedgerListService({}).then(function (response) {
            $scope.led_list = response.data;
            for(var f=0;f<$scope.led_list.length;f++){
                $scope.led_list[f].value = $scope.led_list[f].ledger_name;
            }
            led_list = $scope.led_list;
        })
    };
    $scope.get_ledger_list();
	
	var led_list;
	$scope.$watch('add_product.ledger_name',function () {
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
	
	$scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_rate_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();
	
	$scope.save_product = function () {

       // console.log($scope.add_product);

       // console.log(JSON.stringify($scope.add_product));
	   
	   if($scope.add_product.hsn_code == undefined){
		   $scope.add_product.hsn_code = "";
	   }

        addProductForExpenseOrder({
            product_info:$scope.add_product
        }).then(function (response) {
            $scope.modal_dismiss_two();
			 $("#add_pro").modal('hide');
            //$scope.get_product_list();
            $scope.add_product = {};

            //$scope.nextProductCode();

            //$('#productSuccess').fadeIn().delay(5000).fadeOut();
            //$scope.product_success = "Product Added Successfully";
            //$scope.product_error = "";
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
	
	
	$scope.download_bill = function ($id) {
        getBillFileService({id:$id}).then(function (resposne) {
            console.log(resposne);
			 var file_name = resposne.data.filename;
			 $window.open('Elephantoserver/public/expense/'+file_name);
           
        });
    };

}]);