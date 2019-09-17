var clientchequedetailsmodule=angular.module('clientchequedetailsmodule',[]);
clientchequedetailsmodule.controller('clientDetailsController',['$rootScope','$scope','$route','$location','$filter','getCustomerChequeDetails','getCustomerList',
    'getCustBankList','getInvoiceNoListForCust','getSaleInvoiceDataById','addCustChequeDetails',
    'deleteCustomerChequeDetails','getCustChequeDetailsById','editCustomerChequeDetails',
    'custChequeStatus','getBankDetails','commonService','addClientPayment',
    function($rootScope,$scope,$route,$location,$filter,getCustomerChequeDetails,getCustomerList,
             getCustBankList,getInvoiceNoListForCust,getSaleInvoiceDataById,addCustChequeDetails,
             deleteCustomerChequeDetails,getCustChequeDetailsById,editCustomerChequeDetails,
             custChequeStatus,getBankDetails,check_permission,addClientPayment){
  $scope.active_lable = false;
    $scope.add_cust_cheque_info=[{'invoice_id':'','cheque_no':'','cheque_date':'','cheque_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''}];
$scope.invoice = [];
$scope.selected_inv_array = [];
    $scope.inv_array = [];
    $scope.amount =[{'amount':''}];
    $scope.inv_obj={};
    var t = 0;
    var d;
        $scope.add_cust_cheque_details=function () {
            $scope.add_cust_cheque_info.push({'cheque_no':'','cheque_date':'','cheque_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''});
        };

        $scope.remove_cust_cheque_details=function (index) {
            $scope.add_cust_cheque_info.splice(index,1);
        };

        $scope.reset_cust_modal = function(){
            $scope.add_cust_cheque_info=[{'invoice_id':'','cheque_no':'','cheque_date':'','cheque_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''}];
            $scope.select_client='';
            $scope.invoice_id='';
            $scope.po_number='';
            $scope.debit_note='';
            $scope.available_amount_list='';
            $scope.invoice_date='';
            $scope.grand_total='';
            $scope.due_date='';

             //$route.reload();
        };

        $scope.add_cust_cheque_info.cheque_date=$filter('date')(new Date(),'yyyy-MM-dd');
    var list;
    var cust_cheque_list,cust_cheque_id;
    $scope.getClientChequeList=function () {
        getCustomerChequeDetails({}).then(function (response) {
            console.log(response);
            $scope.client_cheque_list=response.data;
            list=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.getClientChequeList();

    $scope.getClientList=function () {
        getCustomerList({}).then(function (response) {
            console.log(response);
            $scope.client_list_details=response.data;
        },function(response){
            console.log(response);


        })
    };
    $scope.getClientList();

    $scope.getCustBankAccountlist=function () {
        getCustBankList({}).then(function (response) {
            console.log(response);
            $scope.cust_bank_list=response.data;
            },function(response){
                console.log(response);
            })
    };
    $scope.getCustBankAccountlist();

    $scope.getbanklist=function(){
        getBankDetails({}).then(function(response){
            console.log(response);
            $scope.bank_list=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.getbanklist();

    $scope.get_selected_client_info=function () {
        getInvoiceNoListForCust({
            client_id:$scope.select_client
        }).then(function (response) {
            console.log(response);
            $scope.cust_invoice_list=response.data;
        },function(response){
            console.log(response);
        })
    };

    
    $scope.check_if_checked = function(id,grand_total,payable) {
        
        if($scope.selected_inv_array.indexOf(id) <= -1){
                $scope.inv_obj={
                    'invoice_id':id,
                    'grand_total':grand_total,
                    'payable_amount': payable,
                    'balance_amount': ''
                };
                $scope.selected_inv_array.push(id);
                $scope.inv_array.push($scope.inv_obj);

                $scope.inv_obj = {};
                if($scope.cust_invoice_list.length == $scope.selected_inv_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;

                }

            }else{
                $scope.inv_array.splice($scope.inv_array.indexOf(id),1);
                $scope.selected_inv_array.splice($scope.selected_inv_array.indexOf(id),1);

                if($scope.cust_invoice_list.length == $scope.selected_inv_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }

            }
    }

    $scope.check_selected_row = function(ind,id,payable){
        $scope.total_payable_amount = 0;
        console.log(id);
        console.log($scope.inv_array);
        if($scope.inv_array.length == 0){
            alert('no invoice is selected');
            $scope.cust_invoice_list[ind].payable_amount = '';
        }
        if($scope.inv_array[ind].invoice_id != id){
            alert('Please select invoice first');
        }else{
            $scope.inv_array[ind].payable_amount = payable;
            $scope.inv_array[ind].balance_amount = parseFloat($scope.inv_array[ind].grand_total) - parseFloat($scope.inv_array[ind].payable_amount);
            $scope.cust_invoice_list[ind].balance_amount = parseFloat($scope.inv_array[ind].grand_total) - parseFloat($scope.inv_array[ind].payable_amount);
            for(var i=0;i<$scope.inv_array.length;i++){

                $scope.total_payable_amount = parseFloat($scope.total_payable_amount) + parseFloat($scope.inv_array[i].payable_amount);
            }
            $scope.add_cust_cheque_info.total_payable_amount = $scope.total_payable_amount;
        }
        //$scope.add_cust_cheque_info.invoice = $scope.inv_array;
    }

    $scope.get_sale_details_by_invoice=function () {
        // document.getElementById("mySelect").multiple = true;
        console.log($scope.invoice);
        getSaleInvoiceDataById({
            invoice_id:$scope.invoice_id
        }).then(function (response) {
            console.log(response);
            $scope.invoice_data = response.data[0].invoice_data;
            
            $scope.invoice_type=$scope.invoice_data[0].invoice_type;
            $scope.invoice_date=$scope.invoice_data[0].invoicedate;
            $scope.grand_total=$scope.invoice_data[0].grandtotal;
            // $scope.available_amount_list=response.data[1].avl_cheque_data;
            // $scope.due_date=$scope.invoice_data[0].payment_date;
            //$scope.available_amt=$scope.avl_cheque_data;

        },function(response){
            console.log(response);
        })
    };

        // $scope.add_client_cheque=function () {
        //     console.log($scope.add_cust_cheque_info);

        //     addCustChequeDetails({
        //         cheque_details:$scope.add_cust_cheque_info
        //     }).then(function (response) {
        //         console.log(response);
        //         $scope.dismiss();
        //         $scope.getClientChequeList();
        //         $('#chequeDetailSuccess').fadeIn().delay(5000).fadeOut();
        //         $scope.cheque_detail_success = "Cheque Details Added Successfully";
        //         $scope.cheque_detail_error = "";
        //         $scope.select_supplier='';
        //         $scope.invoice_id='';
        //         $scope.po_number='';
        //         $scope.debit_note='';
        //         $scope.invoice_date='';
        //         $scope.grand_total='';
        //         $scope.available_amt='';
        //         $scope.available_amount_list='';
        //         $scope.selected_inv_array = [];
        //         $scope.inv_array = [];

        //     },function (response) {
        //         console.log(response);
        //         $scope.cheque_detail_success = '';
        //         $('#chequeDetailError').fadeIn().delay(5000).fadeOut();
        //         $scope.cheque_detail_error = response.data.error[0];
        //     })
        // };

        $scope.add_client_payment_details = function(){
            console.log($scope.add_cust_cheque_info);
            $scope.aaaa = $scope.add_cust_cheque_info.invoice;
            console.log($scope.aaaa);
            addClientPayment({
                cheque_details: $scope.add_cust_cheque_info,
                invoice: $scope.inv_array,
                client_id: $scope.select_client,
                payment_type : $scope.payment_type,
                total_payable_amount: $scope.total_payable_amount
            })
            .then(function(response){
                console.log(response);
                $scope.dismiss();
                $scope.getClientChequeList();
                $('#chequeDetailSuccess').fadeIn().delay(5000).fadeOut();
                $scope.cheque_detail_success = "Cheque Details Added Successfully";
                $scope.cheque_detail_error = "";
                $scope.select_supplier='';
                $scope.invoice_id='';
                $scope.po_number='';
                $scope.debit_note='';
                $scope.invoice_date='';
                $scope.grand_total='';
                $scope.available_amt='';
                $scope.available_amount_list='';
                $scope.selected_inv_array = [];
                $scope.inv_array = [];
            })
        }

        $scope.edit_cust_cheque_details=function (index,id) {
            console.log($scope.cheque_id);
            cust_cheque_id=id;
            getCustChequeDetailsById({
                cheque_id:id
            }).then(function (response) {
                console.log('response-->',response.data);
                $scope.edit_cust_cheque_info=response.data[0];
                cust_cheque_list=response.data[0];
                  $scope.active_lable = true;
            });
        };

        $scope.update_cheque_details=function () {
            editCustomerChequeDetails({
                cheque_id:cust_cheque_id,
                cheque_no:$scope.edit_cust_cheque_info.cheque_no,
                cheque_date:$scope.edit_cust_cheque_info.cheque_date,
                cheque_amount:$scope.edit_cust_cheque_info.cheque_amount,
                name_on_cheque:$scope.edit_cust_cheque_info.name_on_cheque,
                bank_name_on_cheque:$scope.edit_cust_cheque_info.bank_name_on_cheque,
                bank_id:$scope.edit_cust_cheque_info.bank_id,
                invoice_id:cust_cheque_list.invoice_id


            }).then(function (response) {
                console.log(response);
                $scope.modal_dismiss_three();
                $scope.getClientChequeList();
                $('#chequeDetailSuccess').fadeIn().delay(5000).fadeOut();
                $scope.cheque_detail_success = "Cheque Details Updated Successfully";
                $scope.cheque_detail_error = "";
            },function (response) {
                console.log(response);
                $scope.cheque_detail_success = '';
                $('#chequeDetailError1').fadeIn().delay(5000).fadeOut();
                $scope.cheque_detail_error1 = response.data.error[0];
            })
        };

        $scope.deleteClientChequeList=function (id) {

            deleteCustomerChequeDetails({
                cheque_id:id
            }).then(function (response) {
                console.log(response);
                $scope.getClientChequeList();
            })
        };

        var ch_id;
        $scope.cust_cheque_status=function (ind,id) {

            ch_id=id;
            $scope.cleared_date=list[ind].cleared_date;
            $scope.comments=list[ind].comments;
            $scope.status=list[ind].cheque_status;
        };

        $scope.save_cust_cheque_status=function () {
            custChequeStatus({
                status:$scope.status,
                cleared_date:$scope.cleared_date,
                comments:$scope.comments,
                cheque_id:ch_id
            }).then(function (response) {
                console.log(response);
                console.log("===========================================");
                $scope.otp_modal_dismiss();
                $scope.getClientChequeList();
            },function (response) {
                console.log(response);
            })
        }


    $scope.current_modal = "cheque_details";
    $scope.discharge_permission_popup = function (po_id,po_status,po_type) {
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

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.getClientChequeList();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#delete_logistic').fadeIn().delay(5000).fadeOut();
                $scope.delete_logistic_msg = 'Client payment details deleted Successfully';
            }
        }
    });

}]);



