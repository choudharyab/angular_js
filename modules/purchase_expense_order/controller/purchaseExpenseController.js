var purchaseExpenseModule = angular.module('purchaseExpenseModule',[]);
purchaseExpenseModule.controller('purchaseExpenseController',['$rootScope','$scope','$location','$timeout','$sce','$q','$route','$http','$window','expenseSupplierAutoCompleteService',
    'expenseSelectedSupplierProductService','expenseNextPurchaseOrderNumberService','expenseGetSupplierMultipleAddressService','expenseSavePurchaseOrderService',
    'expenseGetPurchaseOrderListService','expenseGetPurchaseOrderByIdService','expenseEditPurchaseOrderService','expenseDeletePurchaseOrderService','expenseApprovePurchaseOrderService',
    'expenseChargeListService','expenseTaxesService','expenseGetBankListing','expenseGeneratePoService','getTaxRateService','getMeasurementGroupListService','getProductByIdService',
    'getWarehouseListService','getPaymentTermService','commonService','getNextProductCodeService','getProductGroupService','getUnitOfMeasureService','expenseAddToSuppProductService',
    function($rootScope,$scope,$location,$timeout,$sce,$q,$route,$http,$window,expenseSupplierAutoCompleteService,expenseSelectedSupplierProductService,expenseNextPurchaseOrderNumberService,
        expenseGetSupplierMultipleAddressService,expenseSavePurchaseOrderService,expenseGetPurchaseOrderListService,expenseGetPurchaseOrderByIdService,expenseEditPurchaseOrderService,
        expenseDeletePurchaseOrderService,expenseApprovePurchaseOrderService,expenseChargeListService,expenseTaxesService,expenseGetBankListing,expenseGeneratePoService,
        getTaxRateService,getMeasurementGroupListService,getProductByIdService,getWarehouseListService,getPaymentTermService,check_permission,getNextProductCodeService,getProductGroupService,getUnitOfMeasureService,expenseAddToSuppProductService){

    $scope.active_lable = false;
    $scope.purchase_order_title = "Add Purchase Order";
    $scope.purchase_order = {'products':[],'order':{'supplier_id':'','payment_term_id':''}};
    $scope.po_product_array = [];
    $scope.prod_obj = {'product_id':'','quantity':'','rate':'','sub_total':'','tax_amount':'','tax_id':'','total_amount':''};
    var auto_supp_array;
    var supp_prod_array,edit_supp_add_id,all_po_data,outer_array=[],unit_meas;
    $scope.currencyRate;

    $scope.add_product = {};

    //purchase_order_title
    //Check exchange rate globally
    
    $scope.currencycode='EUR';
    $scope.symbolCode='€';

    $scope.ExchangeRateVal = localStorage.getItem('currencyCheckVar');

    $(function() {
        $( "#exp_date").datepicker();
    });

    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_rate_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();

    $scope.check_user_warehouse = function (ind,warehouse) {

      if(localStorage.getItem('user_type')=='user'){

          $scope.login_person = localStorage.getItem('user_type');

          $scope.login_person_warehouse = JSON.parse(localStorage.getItem('user_warehouse'));

          for(var r=0;r<$scope.login_person_warehouse.length;r++){

              if(warehouse.id == $scope.login_person_warehouse[r].warehouse_id){

                  return false;
                }else{
                    if(r==$scope.login_person_warehouse.length-1){

                      return true;
                    }
                }
            }
        }
    };

    getMeasurementGroupListService({type:'measurement'}).then(function(res){
        $scope.unit_of_meas = res.data;
        unit_meas = res.data;
    });

    $scope.data = {
       transportaion:[{ charge_id:"",tax_rate: "",charge_amt: "",tax_total:""}]
    };

    $scope.addRow = function(index){
        var charge = {charge_id:"",tax_rate: "",charge_amt: "",tax_total:""};
        if($scope.data.transportaion.length <= index+1){
            $scope.data.transportaion.splice(index+1,0,charge);
        }
    };

    $scope.deleteRow = function($event,name){
        var removeAmt = Math.round(name.tax_total);
        $timeout(function () {
            var total_amt = $scope.purchase_order.order.po_total_amount;
            var prod_tax_val = $('#hidden_total_val').val();
            var remove_tax = prod_tax_val - removeAmt;
            $('#hidden_total_val').val(remove_tax);
            var new_total_amt = parseInt(total_amt) - removeAmt;
            $scope.purchase_order.order.po_total_amount = parseFloat(new_total_amt).toFixed(2);
            $scope.purchase_order.order.grand_total = Math.round(new_total_amt);
        }, 500);
        var index = $scope.data.transportaion.indexOf(name);
        if($event.which == 1)
           $scope.data.transportaion.splice(index,1);
    };

    $scope.add_charge_amt = function (index) {

        $scope.data.transportaion[index].total_charge = $scope.data.transportaion[index].charge_amt;

        var tax_rate = $scope.data.transportaion[index].tax_rate;
        var charge_amt = $scope.data.transportaion[index].charge_amt;
        if(charge_amt.length > 0 && tax_rate.length > 0){
            var tax_total = (tax_rate / 100) * charge_amt;
            var total_amt = parseFloat(charge_amt) + parseFloat(tax_total);
            $scope.data.transportaion[index].total_charge =  parseFloat(total_amt).toFixed(2);
            $scope.data.transportaion[index].tax_total = parseFloat(tax_total).toFixed(2);

        } else {
            $scope.data.transportaion[index].tax_total = 0;
        }
        $timeout(function () {
            var all_tax_total = 0;
            
            $(".total_taxes").each(function(index){
                    all_tax_total +=parseFloat($(this).val());
            });
            
            $('#hidden_total_val').val(all_tax_total);
            var edit_val_total = $("#edit_total_val").val();
            if(edit_val_total.length > 0 && edit_val_total != '' && edit_val_total != 'NaN'){
                all_new_tax_total = all_tax_total - edit_val_total;
            } else {
                all_new_tax_total = all_tax_total;
            }
            var old_total_amt = $('#total_amt').val();
            var new_total_amt = parseFloat(old_total_amt) + all_new_tax_total;
            $scope.purchase_order.order.po_total_amount = parseFloat(new_total_amt).toFixed(2);
            $scope.purchase_order.order.round_off = parseFloat(new_total_amt-Math.round(new_total_amt)).toFixed(2);
            $scope.purchase_order.order.grand_total = Math.round(new_total_amt);
        },500);
    }

    $scope.chargeListing = function(){
        expenseChargeListService({}).then(function (response) {
            $scope.transportation_charges = response.data;
            console.log('data--->',$scope.transportation_charges);
        });
    }
    $scope.chargeListing();

    $scope.bankList = function(){
        expenseGetBankListing({}).then(function (response) {
            $scope.bank_list = response.data;
            console.log('$scope.bank_list--->',$scope.bank_list);
        });
    }
    $scope.bankList();

    $scope.tax_data =function (index) {
        expenseTaxesService().then(function (response) {
             $scope.tax_list = response.data;
           console.log($scope.tax_list);
        },function (response) {
            alert(response.data.error);
        });
    };
    $scope.tax_data();

    $scope.add_purchase_click = function () {
        edit_supp_add_id = '';
        $scope.auto_supplier_code = '';
        $scope.po_supplier_name = '';
        $scope.po_product_array = [];
        //$scope.purchase_order.order.supplier_address_id = '';
        $scope.purchase_order.order.payment_term_id = '';
        $scope.purchase_order.order.total_commission = '';
        $scope.purchase_order.order.transportation_charges = '';
        $scope.purchase_order.order.expected_delivery_date = '';
        $scope.purchase_order.order.inr_round_off='';
        $scope.purchase_order.order.inr_grand_total='';
        $scope.currency_exchange_Rate='';
        $scope.europe_exchange_rate='';

        if(localStorage.getItem('warehouse_state_id')=='undefined'){
            alert("Please Select Warehouse First");
        }else{
            $route.reload();
            $timeout(function () {
                $('#example2').modal('show');
            },700);
        }
    };
    $scope.selected_warehouse = localStorage.getItem('warehouse_id');

    $scope.get_po_warehouse = function () {

        if($scope.warehouse_id){
            localStorage.setItem('warehouse_id',JSON.parse($scope.warehouse_id).id);
            localStorage.setItem('warehouse_name',JSON.parse($scope.warehouse_id).warehouse_name);
            localStorage.setItem('warehouse_state_id',JSON.parse($scope.warehouse_id).state_id);
            localStorage.setItem('warehouse_info',$scope.warehouse_id);
            localStorage.setItem('warehouse_info',$scope.warehouse_id);
            $scope.selected_warehouse = localStorage.getItem('warehouse_id');
        }else{
              $scope.warehouse_id = null;
              localStorage.setItem('warehouse_id',$scope.warehouse_id);
              $scope.get_PO_list();
        }        
    };

    $scope.get_PO_list = function () {
        expenseGetPurchaseOrderListService({}).then(function (res) {
            $scope.expense_po_listing = res.data;
            console.log('purchase order-->>',res.data);
        })
    };
    $scope.get_PO_list();

    getWarehouseListService({}).then(function (response) {
        $scope.warehouse_list = response.data;
    });

    $scope.getProductBySupplier = function (i) {
        getProductByIdService({
            product_id:i
        }).then(function (resp) {

            console.log(resp);

            resp.data[0].quantity = '';
            resp.data[0].rate = '';
            resp.data[0].sub_total = '';
            resp.data[0].tax_amount = '';
            resp.data[0].total_amount = '';
            resp.data[0].commission = '';

            if($scope.purchase_order.order.supplier_address_id){

                if($scope.purchase_order.order.supplier_address_id.state_id==localStorage.getItem('warehouse_state_id')){
                    resp.data[0].tax_type = 'VAT';
                    $scope.po_product_array.push(resp.data[0]);
                }else{
                    resp.data[0].tax_type = 'VAT';
                    $scope.po_product_array.push(resp.data[0]);
                }
            }else{
                $scope.search_product_text = '';
                alert('Please Select Supplier Location');
            }
            $scope.search_product_text = '';

        },function (resp) {
            console.log(resp);
        })
    };

    $scope.delete_selected_product = function (ind) {
        $scope.po_product_array.splice(ind,1);
        $scope.po_total_amount =0;
        $scope.po_total_commission =0;
        for(var t=0;t<$scope.po_product_array.length;t++){
            $scope.po_total_amount = $scope.po_total_amount+parseFloat($scope.po_product_array[t].total_amount);
            $scope.po_total_commission = $scope.po_total_commission+parseFloat($scope.po_product_array[t].commission);
        }
        $scope.purchase_order.order.po_total_amount = parseFloat($scope.po_total_amount);
        $scope.purchase_order.order.total_commission = parseFloat($scope.po_total_commission);
        $scope.purchase_order.order.round_off = parseFloat($scope.po_total_amount-Math.round($scope.po_total_amount)).toFixed(2);
        $scope.purchase_order.order.grand_total = Math.round($scope.po_total_amount);
        $scope.purchase_order.order.total_commission = parseFloat($scope.po_total_commission);
    };

    expenseNextPurchaseOrderNumberService({}).then(function (res) {
        $scope.purchase_order.order.purchase_order_no = res.data;
    });
    getPaymentTermService({}).then(function (res) {
        $scope.payment_term_list = res.data;
        console.log(res.data);
    },function (res) {
        console.log(res);
    });

    $scope.$watch('auto_supplier_code',function () {
        expenseSupplierAutoCompleteService({term:$scope.auto_supplier_code}).then(function (res) {
            auto_supp_array = res.data;
            $scope.getsupplier();
        });
    });

    $scope.get_supp_mult_add = function (sup_id) {
        expenseGetSupplierMultipleAddressService({supplier_id:sup_id}).then(function (resp) {
            resp.data[0].supplier_multiple_addresses.push(resp.data[0].main_address);
            $scope.purchase_order.order.supplier_address_id = resp.data[0].main_address;
            $scope.supplier_multiple_address = resp.data[0].supplier_multiple_addresses;
            if(edit_supp_add_id!=''){
                //$scope.purchase_order.order.supplier_address_id =  edit_supp_add_id;

                for(var d=0;d<resp.data[0].supplier_multiple_addresses.length;d++){
                    if(resp.data[0].supplier_multiple_addresses[d].id==edit_supp_add_id){
                        $scope.purchase_order.order.supplier_address_id = resp.data[0].supplier_multiple_addresses[d];
                    }
                }

                $scope.selected_option = $scope.purchase_order.order.supplier_address_id;
                console.log(edit_supp_add_id);
            }
        })
    };
    $scope.get_supp_mup_pro = function (sup_id) {
        expenseSelectedSupplierProductService({supplier_id:sup_id}).then(function (res) {
            supp_prod_array = res.data;
            console.log('supplier_ product',res);
        });
    };
    $scope.getsupplier = function () {
        $('#auto_supp_code_id').autocomplete({
            source:auto_supp_array,
            select:function (event,ui) {
                $scope.purchase_order.order.supplier_id = ui.item.id;
                $scope.po_supplier_name = ui.item.value;
                $scope.po_supplier_name = ui.item.value.slice(6);
                $scope.get_supp_mup_pro(ui.item.id);
                $scope.get_supp_mult_add(ui.item.id);
            }
        });
    };
    $scope.$watch('search_product_text',function () {
        console.log($scope.search_product_text);
        $('#search_product_id').autocomplete({
            source:supp_prod_array,
            select:function (event,ui) {
                $scope.getProductBySupplier(ui.item.id);
            }
        })
    });
    $scope.product_calculation = function (idx,tax) {

        if($scope.currency_exchange_Rate != null){
            $scope.inrconversion=$scope.currency_exchange_Rate;
            $scope.eurconversion =$scope.europe_exchange_rate;
            $scope.symbolCode=$scope.currency_symbole;
        }else{
            $scope.inrconversion = ($('#rateR').val());
            $scope.eurconversion = ($('#rateER').val());
            $scope.symbolCode= ($('#symbolR').val());
        }
        
        //console.log($scope.inrconversion);

        console.log('syyyyyyy----',$scope.symbolCode);

        console.log('sym code----',$scope.symbolCode);

        $scope.po_product_array[idx].sub_total = ($scope.po_product_array[idx].quantity*$scope.po_product_array[idx].rate).toFixed(2);
         $scope.po_product_array[idx].inr_sub_total=(($scope.po_product_array[idx].quantity*$scope.po_product_array[idx].rate)*$scope.inrconversion).toFixed(2);

        var f = $scope.po_product_array[idx].tax_rate.tax_rate;
            //f = parseInt(f.substring(0,f.length-1));
        f = parseInt(f);
        
        $scope.selected_tax = JSON.parse(tax);
        $scope.po_product_array[idx].tax_id = $scope.selected_tax.id;
        $scope.po_product_array[idx].tax_amount = ($scope.po_product_array[idx].sub_total*$scope.selected_tax.tax_rate)/100;
        $scope.po_product_array[idx].inr_tax_amount=parseFloat($scope.po_product_array[idx].tax_amount*$scope.inrconversion).toFixed(2);
        $scope.po_product_array[idx].tax_amount = parseFloat($scope.po_product_array[idx].tax_amount).toFixed(2);
        $scope.po_product_array[idx].total_amount = parseFloat($scope.po_product_array[idx].sub_total)+parseFloat($scope.po_product_array[idx].tax_amount);
        $scope.po_product_array[idx].inr_total_amount=parseFloat($scope.po_product_array[idx].total_amount*$scope.inrconversion).toFixed(2);
        $scope.po_product_array[idx].inr_tax_amount=parseFloat($scope.po_product_array[idx].tax_amount*$scope.inrconversion).toFixed(2);
        $scope.po_product_array[idx].total_amount = parseFloat($scope.po_product_array[idx].total_amount).toFixed(2);
        $scope.po_product_array[idx].currency_exchange_rate=$scope.inrconversion;
        $scope.po_product_array[idx].europe_exchange_rate=$scope.eurconversion;
        $scope.po_product_array[idx].currency=$scope.symbolCode;

        $scope.po_total_amount =0;
        $scope.po_total_quantity =0;
        $scope.po_total_commission =0;
        $scope.all_product_subtotal = 0;

        for(var t=0;t<$scope.po_product_array.length;t++){
            $scope.po_total_amount = $scope.po_total_amount+parseFloat($scope.po_product_array[t].total_amount);
            $scope.po_total_quantity = $scope.po_total_quantity+parseFloat($scope.po_product_array[t].quantity);
            $scope.po_total_commission = $scope.po_total_commission+parseFloat($scope.po_product_array[t].commission);
            $scope.all_product_subtotal = $scope.all_product_subtotal+parseFloat($scope.po_product_array[t].total_amount);
        }

        var total_tax_val = $('#edit_total_val').val();       
        $timeout(function () {
            total_tax_val = $('#edit_total_val').val();
        }, 300);    

        if(total_tax_val.length > 0 && total_tax_val != ''){
            var max_value = $("#hidden_total_val").val();
            $scope.po_total_amount = parseFloat(max_value) + parseFloat($scope.po_total_amount);
            $scope.purchase_order.order.po_total_amount = parseFloat($scope.po_total_amount).toFixed(2);
            $('#total_amt').val($scope.po_total_amount);
            $scope.purchase_order.order.round_off = parseFloat($scope.po_total_amount-Math.round($scope.po_total_amount)).toFixed(2);
            $scope.purchase_order.order.grand_total = Math.round($scope.po_total_amount);
            $scope.purchase_order.order.inr_round_off=parseFloat(($scope.po_total_amount*$scope.inrconversion)-Math.round($scope.po_total_amount*$scope.inrconversion)).toFixed(2);
            $scope.purchase_order.order.inr_grand_total=Math.round($scope.po_total_amount*$scope.inrconversion);
        } else {
            $scope.data ={
                transportaion:[{ charge_id:"",tax_rate: "",charge_amt: "",tax_total:""}]
            };
            $('#total_amt').val($scope.po_total_amount);
            $scope.purchase_order.order.po_total_amount = parseFloat($scope.po_total_amount).toFixed(2);
            $scope.purchase_order.order.round_off = parseFloat($scope.po_total_amount-Math.round($scope.po_total_amount)).toFixed(2);
            $scope.purchase_order.order.grand_total = Math.round($scope.po_total_amount);
            $scope.purchase_order.order.inr_round_off=parseFloat(($scope.po_total_amount*$scope.inrconversion)-Math.round($scope.po_total_amount*$scope.inrconversion)).toFixed(2);
            $scope.purchase_order.order.inr_grand_total=Math.round($scope.po_total_amount*$scope.inrconversion);
        }

        $scope.purchase_order.order.quantity = parseFloat($scope.po_total_quantity);
        $scope.purchase_order.order.total_commission = parseFloat($scope.po_total_commission);
        console.log('commission--->',$scope.purchase_order.order.total_commission);
        $scope.purchase_order.order.currency_exchange_rate=$scope.inrconversion;
        $scope.purchase_order.order.europe_exchange_rate=$scope.eurconversion;
        $scope.purchase_order.order.currency=$scope.symbolCode;
        //$scope.purchase_order.order.commission = parseFloat($scope.po_total_commission);
    };
    $scope.get_new_calculation = function () {
      $timeout(function () {
          $scope.product_calculation();
      },700);
    };
    //var attachfile_name=[];
    $scope.save_purchase_order = function () {
        $scope.purchase_order.products = $scope.po_product_array;
        $scope.purchase_order.order.supplier_address_id = $scope.purchase_order.order.supplier_address_id.id;
        $scope.purchase_order.products = $scope.po_product_array;
        $scope.purchase_order.order.warehouse_id = localStorage.getItem('warehouse_id');
        //console.log('note----> ',tinyMCE.editors);
        //console.log('note----> ',tinyMCE.activeEditor.getContent());
        //$scope.purchase_order.attach_file=attachfile_name;
      
        all_po_data = $scope.purchase_order;

        console.log(JSON.stringify($scope.purchase_order));

        expenseSavePurchaseOrderService({
            transportation_charges : $scope.data.transportaion,
            purchase_order:$scope.purchase_order,
            //attach_file:attachfile_name1.concat(attachfile_name2)
            attach_file:attachfile_name
        }).then(function (res) {
            $scope.dismiss();
            $scope.get_PO_list();
            //$scope.po_add_success = JSON.parse(res.data);
            $('#po_add_success').fadeIn().delay(3000).fadeOut();
            setGetDataService.set_module_data($scope.purchase_order);
            $scope.purchase_order = {'products':[],'order':{'supplier_id':'','payment_term_id':''}};
            $scope.po_product_array = [];
            attachfile_name=[];
            $scope.get_PO_list();
            $('#edit_total_val').val('');
            //$timeout(function () {
              //  $location.path('/po_pdf');
            //},700);
            
           for(var g=0;g<7;g++){
           
           for(var r=0;r<all_po_data.products.length;r++){
               if(g==0){
                   $scope.data_obj['srno'+r] = r+1;
                   if(r==all_po_data.products.length-1){
                       outer_array.push($scope.data_obj);
                       $scope.data_obj = {};
                   }
               }
               if(g==1){
                   $scope.data_obj['item_dec'+r] = all_po_data.products[r].product_name;
                   if(r==all_po_data.products.length-1){
                       outer_array.push($scope.data_obj);
                       $scope.data_obj = {};
                   }
               }
               if(g==2){
                   $scope.data_obj['uom'+r] = all_po_data.products[r].measurement.measurement_name;
                   if(r==all_po_data.products.length-1){
                       outer_array.push($scope.data_obj);
                       $scope.data_obj = {};
                   }
               }
               if(g==3){
                   $scope.data_obj['qty'+r] = all_po_data.products[r].quantity;
                   if(r==all_po_data.products.length-1){
                       outer_array.push($scope.data_obj);
                       $scope.data_obj = {};
                   }
               }
               if(g==4){
                   $scope.data_obj['rate'+r] = all_po_data.products[r].rate;
                   if(r==all_po_data.products.length-1){
                       outer_array.push($scope.data_obj);
                       $scope.data_obj = {};
                   }
               }
               if(g==5){
                   $scope.data_obj['amount'+r] = all_po_data.products[r].total_amount;
                   if(r==all_po_data.products.length-1){
                       outer_array.push($scope.data_obj);
                       $scope.data_obj = {};
                   }
               }
               if(g==6){
                   $scope.data_obj['hsn'+r] = all_po_data.products[r].$$hashKey;
                   if(r==all_po_data.products.length-1){
                       outer_array.push($scope.data_obj);
                       $scope.data_obj = {};
                   }
               }
           }
        }
        
        //$scope.print_po_pdf($scope.purchase_order);
       
            
        },function (res) {
            $scope.po_add_success = '';
            $scope.po_add_error = 'Error in adding Purchase Order';
            $('#po_error').fadeIn().delay(5000).fadeOut();
        });
    };
    $scope.current_modal = "purchase_order";
    $scope.supplier_permission_popup = function (po_id,po_status,po_type) {
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
         $scope.show_save = true;
         $scope.show_edit = true;
        if(data.model==$scope.current_modal){
            $scope.get_PO_list();
            $scope.modal_dismiss_two();
            $scope.purchase_order_title = "Edit Purchase Order";
            $scope.po_id = data.id;
                $scope.active_lable = true;
                getPurchaseOrderByIdService({purchase_order_id:data.id}).then(function (response) {
                console.log(response);
                $('#example2').modal('show');
                $scope.get_supp_mult_add(response.data[0].supplier_id);
                $scope.get_supp_mup_pro(response.data[0].supplier_id);

                $scope.purchase_order.order.purchase_order_no = response.data[0].purchase_order_no;
                $scope.auto_supplier_code = response.data[0].supplier.supplier_code;
                $scope.po_supplier_name = response.data[0].supplier.supplier_name;
                $scope.purchase_order.order.total_commission = parseInt(response.data[0].total_commission);
                var po_pro = response.data[0].products;
                for(var z=0;z<response.data[0].products.length;z++){
                    response.data[0].products[z].product_code = po_pro[z].product.product_code;
                    response.data[0].products[z].product_name = po_pro[z].product.product_name;
                    response.data[0].products[z].grade = po_pro[z].product.grade;
                    response.data[0].products[z].productgroup = po_pro[z].product.productgroup;
                }
                //$scope.purchase_order.order.supplier_address_id = JSON.parse(response.data[0].supplier_address_id);

                var attachfile_name = response.data[0].po_files;
                localStorage.setItem('attachFileDataCOA',JSON.stringify(attachfile_name));

                /**if(attachfile_name.length > 0){
                    for(var f=0;f<response.data[0].po_files.length;f++){
                        response.data[0].po_files[f].file_name=attachfile_name[f];
                    }
                } else{
                    attachfile_name=[];
                }**/

                edit_supp_add_id = JSON.parse(response.data[0].supplier_address_id);

                var transp_data = response.data[0].transportation_charges;
                 if(transp_data.length > 0){
                    for(var t=0; t<response.data[0].transportation_charges.length; t++){
                        response.data[0].transportation_charges[t].charge_id = transp_data[t].transportation.id;
                        response.data[0].transportation_charges[t].tax_rate = transp_data[t].tax_rate;
                        response.data[0].transportation_charges[t].charge_amt = transp_data[t].charge_amount
                        response.data[0].transportation_charges[t].tax_total = transp_data[t].tax_total;
                    }
                    $scope.data.transportaion = response.data[0].transportation_charges;
                } else {
                    $scope.data = {
                       transportaion:[{ charge_id:"",tax_rate: "",charge_amt: "",tax_total:""}]
                    };
                }
                $scope.po_product_array = response.data[0].products;
                console.log('tax_data-->',response.data[0].products[0].tax_rate);
                $scope.tax_data_id=response.data[0].products[0].tax_rate_id;
                console.log('tax_data_id-->',$scope.tax_data_id);

                $scope.purchase_order.order.commission = response.data[0].commission;
                $scope.purchase_order.order.transportation_charges = response.data[0].transportation_charges;
                $scope.purchase_order.order.terms_and_condition = response.data[0].terms_and_condition;
                $scope.purchase_order.order.note = response.data[0].note;
                $scope.purchase_order.order.expected_delivery_date = response.data[0].expected_delivery_date;
                $scope.purchase_order.order.payment_term_id = response.data[0].payment_term_id;
                $scope.purchase_order.order.grand_total = parseFloat(response.data[0].grand_total);
                $('#total_amt').val(parseFloat(response.data[0].grand_total));
                $scope.purchase_order.order.po_total_amount = response.data[0].po_total_amount;
                $scope.purchase_order.order.round_off = parseFloat(response.data[0].round_off).toFixed(2);;
                $scope.purchase_order.order.supplier_id = response.data[0].supplier_id;
                $scope.purchase_order.order.purchase_order_id = response.data[0].id;
                $scope.purchase_order.order.inr_grand_total=response.data[0].inr_grand_total;
                $scope.purchase_order.order.inr_round_off=response.data[0].inr_round_off;
                $scope.purchase_order.order.bank_id=response.data[0].bank_id;
                $scope.purchase_order.order.currency_exchange_rate=response.data[0].currency_exchange_rate;
                $scope.purchase_order.order.currency=response.data[0].currency;
                $scope.currency_exchange_Rate=response.data[0].products[0].currency_exchange_rate;
                $scope.currency_symbole=response.data[0].products[0].currency;

                $scope.purchase_order.order.europe_exchange_rate=response.data[0].europe_exchange_rate;
                $scope.europe_exchange_rate=response.data[0].products[0].europe_exchange_rate;


                //$scope.currencycode=response.data[0].products[0].currency;
                if($scope.currency_symbole == '$')
                $scope.currencycode ='USD';
            else if($scope.currency_symbole == '€')
                $scope.currencycode='EUR'; 
            else if($scope.currency_symbole == '£')
                $scope.currencycode='GBP'; 
            else if($scope.currency_symbole == '₹')
                $scope.currencycode='INR'; 

               $timeout(function () {
                    var all_tax_total = 0;
                    $(".total_taxes").each(function(index){
                        all_tax_total +=parseFloat($(this).val());
                    });
                    $('#edit_total_val').val(all_tax_total);
                    $('#hidden_total_val').val(all_tax_total);
                }, 500); 

               
            },function (res) {
                console.log(res);
            });
        }
    });

    $scope.edit_po=function(id){
        console.log('inside function',id);
        $scope.show_save = true;
         $scope.show_edit = true;
        expenseGetPurchaseOrderByIdService({purchase_order_id:id}).then(function (response) {
                console.log(response);
                $('#example2').modal('show');
                $scope.get_supp_mult_add(response.data[0].supplier_id);
                $scope.get_supp_mup_pro(response.data[0].supplier_id);

                $scope.purchase_order.order.purchase_order_no = response.data[0].purchase_order_no;
                $scope.auto_supplier_code = response.data[0].supplier.supplier_code;
                $scope.po_supplier_name = response.data[0].supplier.supplier_name;
                $scope.purchase_order.order.total_commission = parseInt(response.data[0].total_commission);
                var po_pro = response.data[0].products;
                for(var z=0;z<response.data[0].products.length;z++){
                    response.data[0].products[z].product_code = po_pro[z].product.product_code;
                    response.data[0].products[z].product_name = po_pro[z].product.product_name;
                    response.data[0].products[z].grade = po_pro[z].product.grade;
                    response.data[0].products[z].productgroup = po_pro[z].product.productgroup;
                }
                //$scope.purchase_order.order.supplier_address_id = JSON.parse(response.data[0].supplier_address_id);

                var attachfile_name = response.data[0].po_files;
                localStorage.setItem('attachFileDataCOA',JSON.stringify(attachfile_name));
                /**if(attachfile_name.length > 0){
                    for(var f=0;f<response.data[0].po_files.length;f++){
                        response.data[0].po_files[f].file_name=attachfile_name[f];
                    }
                } else{
                    attachfile_name=[];
                }**/


                edit_supp_add_id = JSON.parse(response.data[0].supplier_address_id);

                var transp_data = response.data[0].transportation_charges;
                 if(transp_data.length > 0){
                    for(var t=0; t<response.data[0].transportation_charges.length; t++){
                        response.data[0].transportation_charges[t].charge_id = transp_data[t].transportation.id;
                        response.data[0].transportation_charges[t].tax_rate = transp_data[t].tax_rate;
                        response.data[0].transportation_charges[t].charge_amt = transp_data[t].charge_amount
                        response.data[0].transportation_charges[t].tax_total = transp_data[t].tax_total;
                    }
                    $scope.data.transportaion = response.data[0].transportation_charges;
                } else {
                    $scope.data = {
                       transportaion:[{ charge_id:"",tax_rate: "",charge_amt: "",tax_total:""}]
                    };
                }
                $scope.po_product_array = response.data[0].products;
                console.log('tax_data-->',response.data[0].products[0].tax_rate);
                $scope.tax_data=response.data[0].products;
                $scope.tax_data_id=response.data[0].products[0].tax_rate_id;
                console.log('tax_data_id-->',$scope.tax_data_id);
                $scope.purchase_order.order.commission = response.data[0].commission;
                $scope.purchase_order.order.transportation_charges = response.data[0].transportation_charges;
                $scope.purchase_order.order.terms_and_condition = response.data[0].terms_and_condition;
                $scope.purchase_order.order.note = response.data[0].note;
                $scope.purchase_order.order.expected_delivery_date = response.data[0].expected_delivery_date;
                $scope.purchase_order.order.payment_term_id = response.data[0].payment_term_id;
                $scope.purchase_order.order.grand_total = parseFloat(response.data[0].grand_total);
                $('#total_amt').val(parseFloat(response.data[0].grand_total));
                $scope.purchase_order.order.po_total_amount = response.data[0].po_total_amount;
                $scope.purchase_order.order.round_off = parseFloat(response.data[0].round_off).toFixed(2);;
                $scope.purchase_order.order.supplier_id = response.data[0].supplier_id;
                $scope.purchase_order.order.purchase_order_id = response.data[0].id;
                $scope.purchase_order.order.inr_grand_total=response.data[0].inr_grand_total;
                $scope.purchase_order.order.inr_round_off=response.data[0].inr_round_off;
                $scope.purchase_order.order.bank_id=response.data[0].bank_id;
                $scope.purchase_order.order.currency_exchange_rate=response.data[0].currency_exchange_rate;
                $scope.purchase_order.order.currency=response.data[0].currency;
                $scope.currency_exchange_Rate=response.data[0].products[0].currency_exchange_rate;
                $scope.currency_symbole=response.data[0].products[0].currency;

                $scope.purchase_order.order.europe_exchange_rate=response.data[0].europe_exchange_rate;
                $scope.europe_exchange_rate=response.data[0].products[0].europe_exchange_rate;


                //$scope.currencycode=response.data[0].products[0].currency;
                if($scope.currency_symbole == '$')
                $scope.currencycode ='USD';
            else if($scope.currency_symbole == '€')
                $scope.currencycode='EUR'; 
            else if($scope.currency_symbole == '£')
                $scope.currencycode='GBP'; 
            else if($scope.currency_symbole == '₹')
                $scope.currencycode='INR'; 

               $timeout(function () {
                    var all_tax_total = 0;
                    $(".total_taxes").each(function(index){
                        all_tax_total +=parseFloat($(this).val());
                    });
                    $('#edit_total_val').val(all_tax_total);
                    $('#hidden_total_val').val(all_tax_total);
                }, 500); 

               
            },function (res) {
                console.log(res);
            });
    };
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_PO_list();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#po_delete_success').fadeIn().delay(5000).fadeOut();
                $scope.po_delete_success = 'Purchase Order deleted Successfully';
            }
        }
    });
    $scope.update_purchase_order = function () {
        $scope.purchase_order.order.supplier_address_id = $scope.purchase_order.order.supplier_address_id.id;
        $scope.purchase_order.products = $scope.po_product_array;
        expenseEditPurchaseOrderService({
            transportation_charges : $scope.data.transportaion,
            purchase_order:$scope.purchase_order,
            attach_file:attachfile_name
        }).then(function (response) {
            $scope.po_add_success = JSON.parse(response.data);
            $('#po_add_success').fadeIn().delay(5000).fadeOut();
            $scope.purchase_order = {'products':[],'order':{'supplier_id':'','payment_term_id':''}};
            $scope.po_product_array = [];
            $scope.dismiss();
            $scope.get_PO_list();
            $('#edit_total_val').val('');
        },function (res) {
            console.log(res);
        });
    };

    $scope.delete_purchase_order = function (pur_odr_id) {
        deletePurchaseOrderService({purchase_order_id:pur_odr_id}).then(function (res) {
            $scope.po_delete_success = JSON.parse(res.data);
            $('#po_delete_success').fadeIn().delay(3000).fadeOut();
            $scope.get_PO_list();
        })
    };
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };
    $scope.approve_purchase_order = function (po_id,supp_id,supp_email,status){
        if(status=='pending'){
            approvePurchaseOrderService({
                purchase_order_id:po_id,supplier_id:supp_id,supplier_email:supp_email
            }).then(function (response) {
                $scope.modal_dismiss_sr_edit();
                $('#po_add_success').fadeIn().delay(5000).fadeOut();
                $scope.po_add_success = JSON.parse(response.data);
                $scope.get_PO_list();
            },function (res) {
                console.log(res);
            })
        }else{
            alert('Purchase Order already approved');
        }
    };
    
    $scope.check_approve_purchase_order = function (po_id,supp_id,supp_email,status) {
        if(status=='pending' || status=='unapproved'){
            $('#approve_msg').modal('show');
            $scope.pop_title = "Approve";
            $scope.check_approve_msg = "Do you want to approve this Purchase Order ?";
            $scope.pop_po_id = po_id;
            $scope.pop_supp_id = supp_id;
            $scope.pop_supp_email = supp_email;
            $scope.pop_status = status;
            $scope.approve_btn = true;
            $scope.unapprove_btn = false;
        }else{
            $scope.pop_po_id = po_id;
            $('#approve_msg').modal('show');
            $scope.pop_title = "unapproved";
            $scope.approve_btn = false;
            $scope.unapprove_btn = true;
            $scope.check_approve_msg = "Already approved Purchase Order.Click below button to unapprove purchase order.";
        }
    };

    $scope.get_supp_add = function () {
        console.log($scope.purchase_order.order.supplier_address_id);
        if($scope.purchase_order.order.supplier_address_id){
            if($scope.po_product_array.length>0){
                for(var g=0;g<$scope.po_product_array.length;g++){
                    if($scope.purchase_order.order.supplier_address_id){
                        if($scope.purchase_order.order.supplier_address_id.state_id==localStorage.getItem('warehouse_state_id')){
                            $scope.po_product_array[g].tax_type = 'VAT';
                        }else{
                            $scope.po_product_array[g].tax_type = 'VAT';
                        }
                    }
                }
            }
        }else{
            $scope.search_product_text = '';
            alert('Please Select Supplier Location');
        }
    };

    $scope.onCurrencyChange = function(){
        //Symbol Conversion 
        var code=$scope.currencycode;         
        if(code == 'USD'){
            $scope.symbolCode='$';
            $http.get('http://api.fixer.io/latest?base='+'USD').then(function(res){
                $scope.currencyRate=res.data.rates.INR;
                $scope.currencyRateER=res.data.rates.EUR;
                $('#rateR').val($scope.currencyRate);
                $('#rateER').val($scope.currencyRateER);
            });
        }else if(code == 'GBP'){
             $scope.symbolCode='£';
             $http.get('http://api.fixer.io/latest?base='+'GBP').then(function(res){
                $scope.currencyRate=res.data.rates.INR;
                $scope.currencyRateER=res.data.rates.EUR;
                $('#rateR').val($scope.currencyRate);
                $('#rateER').val($scope.currencyRateER);
            });
        }else if(code == 'EUR'){
            $scope.symbolCode='€';
            $http.get('http://api.fixer.io/latest?base='+'EUR').then(function(res){
                $scope.currencyRate=res.data.rates.INR;
                $('#rateR').val($scope.currencyRate);
                $('#rateER').val('1');
            });
        } else {
            $http.get('http://api.fixer.io/latest?base='+'INR').then(function(res){
                $scope.currencyRateER=res.data.rates.EUR;
                $('#rateER').val($scope.currencyRateER);
            });
            $scope.symbolCode='₹';
            $scope.currencyRate='1';
            $('#rateR').val($scope.currencyRate);
        }
        $('#symbolR').val($scope.symbolCode);
    };
        console.log($('#rateR').val);
      
        var attachfile_name=[];
            
        $scope.$on('selected_file1',function(event,data){
            attachfile_name=JSON.parse(data);
            console.log('!!!!!!!!!!!',attachfile_name);
            console.log('filename-->',data); 
        });

        /*$scope.unapprove_purchase_order = function(po_id){

        unapprovedPoService({purchase_order_id:po_id}).then(function(res){
            $scope.modal_dismiss_sr_edit();
            $('#po_add_success').fadeIn().delay(5000).fadeOut();
            $scope.po_add_success = JSON.parse(res.data);
            $scope.get_PO_list();
        })
    };
    $scope.check_cancel_po = function(p_pi,p_status){
     
        $scope.cancel_po_id = p_pi;
        $scope.cancel_po_status = p_status;   
        $('#cancel_po').modal('show');
        
        if(p_status=='cancel'){
            $('#cancel_po').modal('show');
            $scope.check_cancel_msg = "Already canceled purchase order";
            $scope.cancel_btn = false;
        }else{
            $('#cancel_po').modal('show');
            $scope.check_cancel_msg = "Are you sure to cancel purchase order";
            $scope.cancel_btn = true;
        }
    }     
    
    $scope.cancel_purchase_order = function(id,status){

        cancelPoService({purchase_order_id:id}).then(function(res){
            $scope.modal_dismiss_sr_edit();
            $('#po_add_success').fadeIn().delay(5000).fadeOut();
            $scope.po_add_success = JSON.parse(res.data);
            $scope.get_PO_list();
        })
    }*/

    //----------------Addons-----------------

    $scope.purchase_order_type = "expense";
    
        $scope.change_purchase_order_type = function(){
            if($scope.purchase_order_type=='principle'){
                $location.path('purchaseorder');
            }
        }

    $scope.add_btn_clicked = function(){

        if($scope.purchase_order.order.supplier_id){

            $scope.add_product.supplier_id = $scope.purchase_order.order.supplier_id;       
            $scope.close_add_product();
            $('#add_pro').modal('show');
        }else{
            alert('Please Select Supplier First');
        }

            getNextProductCodeService({}).then(function (response) {
                    $scope.add_product.product_code = JSON.parse(response.data);
                },function (response) {
                    console.log(response);
                });

            getProductGroupService({
                type:'product_group'
            }).then(function (response) {
                $scope.product_group = response.data;
            },function (response) {
                console.log(response);
            });  
            getUnitOfMeasureService({
                type:'measurement'
            }).then(function (response) {
                $scope.measuement_list = response.data;
                console.log(response.data);
            },function (response) {
                console.log(response);
            });    
    } 
    
    $scope.save_supplier_product = function(){

        expenseAddToSuppProductService({product_info:$scope.add_product}).then(function(res){
            
            $scope.dismiss_no_packt ();
            $('#example2').modal('show');
            $scope.getProductBySupplier(res.data.id);
        })
    }

}]);