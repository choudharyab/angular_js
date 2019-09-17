var generate_voucher = angular.module('generateVoucherModule',[]);
generate_voucher.controller('generateVoucherController',['$rootScope','$scope','$location','$filter',
    '$route','getVoucherTypeListService','addVoucherTypeService','getAccLedgerListService',
    'addGenerateVoucherService','getGenerateVoucherListService','getVoucherLedgerListService',
    'updateVoucherTypeService','deleteVoucherTypeService','searchDebitAutocompleteService',
    'deleteGenerateVoucher','editGenerateVoucher','updateGenerateVoucherService','getSubLedgerLists',
    function($rootScope,$scope,$location,$filter,$route,getVoucherTypeListService,addVoucherTypeService,
        getAccLedgerListService,addGenerateVoucherService,getGenerateVoucherListService,
        getVoucherLedgerListService,updateVoucherTypeService,deleteVoucherTypeService,
        searchDebitAutocompleteService,deleteGenerateVoucher,editGenerateVoucher,
        updateGenerateVoucherService,getSubLedgerLists){

    $scope.show_save = true;
    $scope.show_edit = false;
    $scope.voucher_date = $filter('date')(new Date(), 'dd/MM/yyyy');
    var led_list;

    $scope.hide_invoice = true;
    
    $scope.show_save_voucher_type = true;
        $scope.show_update_voucher_type = false;
    $scope.get_voucher_list = function () {
        getVoucherTypeListService({}).then(function (res) {
            console.log(res);
            $scope.voucher_type_list = res.data;
        });
    };
    $scope.get_voucher_list();

    $scope.create_voucher_function = function () {
        addVoucherTypeService({voucher_type_name:$scope.voucher_name}).then(function (res) {           
            $scope.add_voucher_success = JSON.parse(res.data);
            $('#add_voucher_success').fadeIn().delay(5000).fadeOut();
            $scope.voucher_name = '';
            $scope.get_voucher_list();
        },function (res) {
            console.log(res);
        })
    };

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

    $scope.get_ledger_listing = function () {
        searchDebitAutocompleteService({}).then(function (response) {
            $scope.led_listing = response.data;
        })
    };
    $scope.get_ledger_listing();

    $scope.set_debit_ledger_data = function(d){
        var d1 = JSON.parse(d);
        console.log(d1);
        $scope.debit_type = d1.type;
        $scope.debit_id = d1.id;
    }

    $scope.set_credit_ledger_data = function(d){
        var d1 = JSON.parse(d);
        console.log(d1);
        $scope.credit_type = d1.type;
        $scope.credit_id = d1.id;
    }

    $scope.generate_voucher_list = function () {
        getGenerateVoucherListService({}).then(function (res) {
            $scope.generate_vou_list = res.data;
        })
    };

    $scope.generate_voucher_list();

    // $scope.$watch('debit_autocom',function () {
    //   $scope.get_debit_auto();
    // });

    // $scope.$watch('credit_autocom',function () {
    //     $scope.get_credit_auto();
    // });

    // $scope.get_debit_auto = function () {

    //     $('#debit_autocom').autocomplete({
    //         source:led_list,
    //         select:function (event,ui) {
    //             console.log(ui);
    //             $scope.debit_ledger_ld = ui.item.id;
    //         }
    //     });
    // };

    // $scope.get_credit_auto = function () {

    //     $('#credit_autocom').autocomplete({
    //         source:led_list,
    //         select:function (event,ui) {
    //             $scope.credit_ledger_ld = ui.item.id;
    //         }
    //     });
    // };

    
    $scope.copy_debit_amt = function () {
      $scope.credit_amount=$scope.debit_amount;
    };

    $scope.copy_credit_amt = function () {
        $scope.debit_amount=$scope.credit_amount;
      };

      $scope.show_invoice_no = function(id){
        if(id == 17){
            $scope.hide_invoice = false;
        }else{
            $scope.hide_invoice = true;
        }
      }
    $scope.add_generate_voucher = function () {
        addGenerateVoucherService({
            voucher_type_id:$scope.voucher_type_id,
            voucher_date:$scope.voucher_date,
            debit_particulars_id:$scope.debit_id,
            debit_amount:$scope.debit_amount,
            debit_type:$scope.debit_type,
            credit_particulars_id:$scope.credit_id,
            credit_amount:$scope.credit_amount,
            credit_type:$scope.credit_type,
            narration:$scope.narration,
            invoice_no: $scope.invoice_no
        }).then(function (res) {
            console.log(res);
            $scope.voucher_type_id = '';
            $scope.voucher_date = '';
            $scope.debit_amount = '';
            $scope.credit_amount = '';           
            $scope.search_credit_autocom = '';
            $scope.search_debit_autocom = '';
            $scope.debit_id = '';
            $scope.credit_id = '';
            $scope.narration = '';
            $scope.debit_type = '';
            $scope.credit_type = '';
            $scope.ledger_c = '';
            $scope.ledger = '';
            $('#voucher_type_id').focus();
            $scope.generate_voucher_list();

            $scope.voucher_add_success = JSON.parse(res.data);
            $('#vou_add_success').fadeIn().delay(5000).fadeOut();

        },function (res) {
            console.log(res);
        })
    }

    $scope.clear_voucher_modal = function(){
        $scope.show_save_voucher_type = true;
        $scope.show_update_voucher_type = false;
    };

    $scope.edit_voucher_type = function(ind){
        $scope.id =  $scope.voucher_type_list[ind].id;
        $scope.show_save_voucher_type = false;
        $scope.show_update_voucher_type = true;
        $scope.voucher_name =  $scope.voucher_type_list[ind].voucher_type_name;
    };

    $scope.update_voucher_function = function(){
        updateVoucherTypeService({
            voucher_id:$scope.id,
            voucher_type_name:$scope.voucher_name}).then(function (res) {     
           
            $scope.add_voucher_success = JSON.parse(res.data);
            $('#add_voucher_success').fadeIn().delay(5000).fadeOut();
            
            $scope.voucher_name = '';
            $scope.get_voucher_list();
        },function (res) {
            console.log(res);
        })
    };

    $scope.delete_voucher_type = function(id){
        deleteVoucherTypeService({
            voucher_id:id,
           }).then(function (res) {           
            $scope.add_voucher_success = JSON.parse(res.data);
            $('#add_voucher_success').fadeIn().delay(5000).fadeOut();
            $scope.voucher_name = '';
            $scope.get_voucher_list();
        },function (res) {
            console.log(res);
        })
    };

    var all_searched_ledgers_for_credit;
    $scope.searchCreditAutocompleteService = function(){
        searchDebitAutocompleteService({
        term:$scope.search_credit_autocom
        }).then(function (res) {
            all_searched_ledgers_for_credit=res.data;
            $scope.getCreditId();
            },function (res) {
        });
    };

    $scope.getCreditId=function () {
        $('#credit_autocom').autocomplete({
            source:all_searched_ledgers_for_credit,
            select:function (event,ui) {
                $scope.search_credit_autocom = ui.item.value;
                $scope.credit_id = ui.item.id;
                $scope.credit_type = ui.item.type;
            }
        })
    };

   /* var all_ledgers = [];
    $scope.all_searched_ledgers = '';

    $scope.clear_credit_ledger_drop_down_data = function(){
        $scope.all_searched_ledgers = '';
    };

    $scope.searchCreditAutocompleteService = function () {
        searchDebitAutocompleteService({term:$scope.search_credit_autocom}).then(function (response) {
            all_ledgers = response.data;
            $scope.all_searched_ledgers = response.data;
        });
    };

    $(document).ready(function() {
        $('#credit_autocom').on('input', function() {
            var userText = $(this).val();
            $("#credit-ledger-service-datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_ledgers.findIndex(x => x.value==$(this).val()); 
                        $scope.search_credit_autocom = all_ledgers[index].value;
                        $scope.credit_id = all_ledgers[index].id;
                }
            });

        });
    });*/

    var all_searched_ledgers_for_debit;
    $scope.searchDebitAutocompleteService = function(){
        searchDebitAutocompleteService({
        term:$scope.search_debit_autocom
        }).then(function (res) {
            all_searched_ledgers_for_debit=res.data;
            $scope.getDebitId();
            },function (res) {
        });
    };

    $scope.getDebitId=function () {
        $('#debit_autocom').autocomplete({
            source:all_searched_ledgers_for_debit,
            select:function (event,ui) {
                $scope.search_debit_autocom = ui.item.value;
                $scope.debit_id = ui.item.id;
                $scope.debit_type = ui.item.type;
            }
        })
    };

  /*  var all_products = [];   
    $scope.all_searched_product = '';

    $scope.clear_ledger_drop_down_data = function(){
        $scope.all_searched_product = '';
        var all_products = [];   
    };

    $scope.searchDebitAutocompleteService = function () {
        searchDebitAutocompleteService({term:$scope.search_debit_autocom}).then(function (response) {
            all_products = response.data;
            $scope.all_searched_product = response.data;
        });
    };

    $(document).ready(function() {
        $('#debit_autocom').on('input', function() {
            var userText = $(this).val();
            $("#ledger-service-datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_products.findIndex(x => x.value==$(this).val());                   
                        console.log(all_products[index]);
                        $scope.search_debit_autocom = all_products[index].value;
                        $scope.debit_id = all_products[index].id;
                }
            });

        });
    });*/

    $scope.delete_generate_voucher = function(id){
         $('#approve_action').modal('hide');
        deleteGenerateVoucher({
            common_id:id,
           }).then(function (res) {           
            $scope.vou_add_success = JSON.parse(res.data);
            $('#vou_add_success').fadeIn().delay(5000).fadeOut();      
            $scope.generate_voucher_list();      
        },function (res) {
            console.log(res);
        })
    };

    $scope.enterPressedForVoucherType = function(){
        if($scope.show_save_voucher_type == true){
            $scope.create_voucher_function();
        }else if($scope.show_save_voucher_type == false){
            $scope.update_voucher_function();
        }
    };

    $scope.enterPressedForGenerateVoucher = function(){
        console.log('funccccc calleddddd');
        if($scope.show_save_voucher_type == true){
            $scope.add_generate_voucher();
        }else if($scope.show_save_voucher_type == false){
            $scope.update_generate_voucher();
        }
    };
    
    $scope.edit_generate_voucher = function(id){
        $('#approve_action').modal('hide');
        $scope.common_id = id;
        editGenerateVoucher({
            common_id:id,
           }).then(function (res) {   
            $scope.show_save = false;
            $scope.show_edit = true;    
            console.log('res.data[0][0]==============',res.data[0]);
            $scope.voucher_type_id = res.data[0].voucher_type_id;
            $scope.voucher_date = res.data[0].voucher_date_new;
            $scope.narration = res.data[0].narration;
            $scope.invoice_no = res.data[0].invoice_no;

            for(var i=0;i<res.data.length;i++){
                if(res.data[i].account_mode == 'Debit'){
                    if( res.data[i].ledger_name == null){                   
                        $scope.debit_id = res.data[i].sub_ledger_id;
                        $scope.ledger = res.data[i].subgroup_name;
                        $scope.l = res.data[i].subgroup_name;
                        $scope.debit_amount = res.data[i].debit_amount;
                        $scope.debit_type = res.data[i].debit_type;
                        $scope.debit_singular_id = res.data[i].id;
                    }else{
                        $scope.debit_id = res.data[i].ledger_id;
                        $scope.ledger = res.data[i].ledger_name;
                        $scope.l = res.data[i].ledger_name;
                        $scope.debit_amount = res.data[i].debit_amount;
                        $scope.debit_type = res.data[i].debit_type;
                        $scope.debit_singular_id = res.data[i].id;
                    }
                }else{
                    if( res.data[i].ledger_name == null){                   
                        $scope.credit_id = res.data[i].sub_ledger_id;
                        $scope.ledger_c = res.data[i].subgroup_name;
                        $scope.l1 = res.data[i].subgroup_name;
                        $scope.credit_amount = res.data[i].credit_amount;
                        $scope.credit_type = res.data[i].credit_type;
                        $scope.credit_singular_id = res.data[i].id;
                    }else{
                        $scope.credit_id = res.data[i].ledger_id;
                        $scope.ledger_c = res.data[i].ledger_name;
                        $scope.l1 = res.data[i].ledger_name;
                        $scope.credit_amount = res.data[i].credit_amount;
                        $scope.credit_type = res.data[i].credit_type;
                        $scope.credit_singular_id = res.data[i].id;
                    }
                }
               
            }

        },function (res) {
            console.log(res);
        })
    };

    $scope.update_generate_voucher = function(){
        updateGenerateVoucherService({
            common_id: $scope.common_id,
            voucher_type_id:$scope.voucher_type_id,
            voucher_date:$scope.voucher_date,
            debit_particulars_id:$scope.debit_id,
            debit_amount:$scope.debit_amount,
            debit_type:$scope.debit_type,
            credit_particulars_id:$scope.credit_id,
            credit_amount:$scope.credit_amount,
            credit_type:$scope.credit_type,
            narration:$scope.narration,
            debit_singular_id:$scope.debit_singular_id,
            credit_singular_id:$scope.credit_singular_id,
            invoice_no: $scope.invoice_no
        }).then(function (res) {
            console.log(res);
            $scope.voucher_type_id = '';
            $scope.voucher_date = '';
            $scope.debit_amount = '';
            $scope.credit_amount = '';           
            $scope.search_credit_autocom = '';
            $scope.search_debit_autocom = '';
            $scope.debit_id = '';
            $scope.credit_id = '';
            $scope.narration = '';
            $scope.debit_type = '';
            $scope.credit_type = '';
            $scope.show_save = true;
            $scope.show_edit = false;
            $scope.l1 = '';
            $scope.l = '';
            $scope.ledger = {};
            $scope.ledger_c = {};
            $scope.generate_voucher_list();

            $scope.voucher_add_success = JSON.parse(res.data);
            $('#vou_add_success').fadeIn().delay(5000).fadeOut();

        },function (res) {
            console.log(res);
        })
    };

    $scope.check_edit = function(id){
        $scope.edit_voucher_id = id;
        $scope.heading_msg = 'Edit';
        $scope.check_approve_msg = 'Do you want to edit voucher details?';
        $scope.approve_btn1 = false;
        $scope.approve_btn2 = true;
        $('#approve_action').modal('show');
    }

    $scope.check_delete = function(id){
        $scope.delete_voucher_id = id;
        $scope.heading_msg = 'Delete';
        $scope.check_approve_msg = 'Do you want to delete voucher details?';
        $('#approve_action').modal('show');
        $scope.approve_btn1 = true;
        $scope.approve_btn2 = false;
    }

}]);



