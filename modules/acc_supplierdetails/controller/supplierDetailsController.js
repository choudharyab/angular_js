var supplierchequedetailsmodule=angular.module('supplierchequedetailsmodule',[]);
supplierchequedetailsmodule.controller('supplierDetailsController',['$rootScope','$scope','$route','$location','getSupplierChequeDetails','deleteSupplierChequeDetails',
    'getSupplierList','getBankList','getInvoiceNoList','getInvoiceDataById','addChequeDetails','editSupplierChequeDetails','getChequeDetailsById','supChequeStatus',
    function($rootScope,$scope,$route,$location,getSupplierChequeDetails,deleteSupplierChequeDetails,getSupplierList,getBankList,getInvoiceNoList,
             getInvoiceDataById,addChequeDetails,editSupplierChequeDetails,getChequeDetailsById,supChequeStatus){
        $scope.add_supplier_cheque_info=[{'select_supplier':'','invoice_id':'','debit_note':'','invoice_date':'','po_number':'','grand_total':'','currency':'','available_amt':''}];
        $scope.add_cheque_info=[{'invoice_id':'','cheque_no':'','cheque_date':'','cheque_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''}];
        //  $scope.add_cheque_info={};
        /*$scope.add_supplier_cheque_details=function () {
            $scope.add_supplier_cheque_info.push({'select_supplier':'','invoice_id':'','debit_note':'','invoice_date':'','po_number':'','grand_total':'','available_amt':''});

        };
        $scope.remove_supplier_cheque_details=function (index) {
            $scope.add_supplier_cheque_info.splice(index,1);

        };*/
          $scope.active_lable = false;
        var cheque_list;
        var var_cheque_id;

        $scope.add_cheque_details=function () {
            $scope.add_cheque_info.push({'cheque_no':'','cheque_date':'','cheque_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''});
        };

        $scope.remove_cheque_details=function (index) {
            $scope.add_cheque_info.splice(index,1);
        };
        $scope.reset_sup_modal = function(){
           /* $scope.add_cheque_info.push({'cheque_no':'','cheque_date':'','cheque_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''});*/
            $scope.add_cheque_info=[{'invoice_id':'','cheque_no':'','cheque_date':'','cheque_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''}];
            $scope.add_supplier_cheque_info=[{'select_supplier':'','invoice_id':'','debit_note':'','invoice_date':'','po_number':'','grand_total':'','currency':'','available_amt':''}];
            $scope.available_amount_list='';
            $route.reload();
        };

        var list;
        $scope.getSupplierChequelist=function () {
            getSupplierChequeDetails({}).then(function (response) {
                console.log(response);
                $scope.cheque_list=response.data;
                list=response.data;
            },function(response){
                console.log(response);
            })
        };
        $scope.getSupplierChequelist();

        $scope.deleteSupplierChequeList=function (id) {

            deleteSupplierChequeDetails({
                cheque_id:id
            }).then(function (response) {
                console.log(response);
                $scope.getSupplierChequelist();
            })
        };
        $scope.getSupplierlist=function () {
            getSupplierList({}).then(function (response) {
                console.log(response);
                $scope.supplier_list=response.data;
            },function(response){
                console.log(response);


            })
        };
        $scope.getSupplierlist();

        $scope.get_selected_supplier_info=function () {
            getInvoiceNoList({
                supplier_id:$scope.add_supplier_cheque_info.select_supplier
            }).then(function (response) {
                console.log(response);
                $scope.invoice_list=response.data;
                
                /*list=response.data;*/
            },function(response){
                console.log(response);
            })
        };
        $scope.getBankAccountlist=function () {
            getBankList({}).then(function (response) {
                console.log(response);
                $scope.bank_list=response.data;
                /*list=response.data;*/
            },function(response){
                console.log(response);
            })
        };
        $scope.getBankAccountlist();

        $scope.get_details_by_invoice=function () {
            getInvoiceDataById({
                invoice_id:$scope.add_supplier_cheque_info.invoice_id
            }).then(function (response) {
                console.log(response);
                $scope.list_by_id=response.data;
                $scope.invoice_data = response.data[0].invoice_data;
                //$scope.currency = $scope.invoice_data[0].currency;
                //console.log("===========================================================",$scope.currency);
                console.log($scope.invoice_data[0].purchase_order_no);

                $scope.add_supplier_cheque_info.po_number=$scope.invoice_data[0].purchase_order_no;
                $scope.add_supplier_cheque_info.debit_note=$scope.invoice_data[0].debit_note_amount;
                $scope.add_supplier_cheque_info.invoice_date=$scope.invoice_data[0].purchase_invoice_date;
                $scope.add_supplier_cheque_info.grand_total=$scope.invoice_data[0].currency + $scope.invoice_data[0].grand_total;
                $scope.available_amount_list=response.data[1].avl_cheque_data;
                //$scope.add_supplier_cheque_info.currency=$scope.invoice_data[0].currency;
                //$scope.add_supplier_cheque_info.available_amt=$scope.invoice_data[0].purchase_order_no;

            },function(response){
                console.log(response);
            })
        };
        $scope.get_details_by_invoice();

        $scope.add_supplier_cheque=function () {
            for(var i=0;i< $scope.add_cheque_info.length;i++){

                $scope.add_cheque_info[i].invoice_id = $scope.add_supplier_cheque_info.invoice_id;
                console.log($scope.add_cheque_info[i]);
            }
            console.log("======================================");
            console.log($scope.add_cheque_info.invoice_id);
            console.log($scope.add_cheque_info);
            /*console.log("JSON");
            console.log(JSON.stringify($scope.add_cheque_info));*/

            addChequeDetails({
                cheque_details:$scope.add_cheque_info
            }).then(function (response) {
                console.log(response);
                $scope.dismiss();
                $scope.getSupplierChequelist();
                $('#chequeDetailSuccess').fadeIn().delay(5000).fadeOut();
                $scope.cheque_detail_success = "Cheque Details Added Successfully";
                $scope.cheque_detail_error = "";
                $scope.add_supplier_cheque_info.select_supplier='';
                $scope.add_supplier_cheque_info.invoice_id='';
                $scope.add_supplier_cheque_info.po_number='';
                $scope.add_supplier_cheque_info.debit_note='';
                $scope.add_supplier_cheque_info.invoice_date='';
                $scope.add_supplier_cheque_info.grand_total='';
                $scope.add_supplier_cheque_info.available_amt='';
                for (var i=0;i < $scope.add_cheque_info.length;i++)
                {
                    $scope.add_cheque_info[i].cheque_no='';
                    $scope.add_cheque_info[i].cheque_date='';
                    $scope.add_cheque_info[i].cheque_amount='';
                    $scope.add_cheque_info[i].bank_name_on_cheque='';
                    $scope.add_cheque_info[i].name_on_cheque='';
                    $scope.add_cheque_info[i].bank_id='';
                }
                $scope.available_amount_list='';

            },function (response) {
                console.log(response);
                $scope.cheque_detail_success = '';
                $('#chequeDetailError').fadeIn().delay(5000).fadeOut();
                $scope.cheque_detail_error = response.data.error[0];
            })
        };

        $scope.edit_cheque_details=function (index,id) {
            console.log($scope.cheque_id);
            var_cheque_id=id;
            getChequeDetailsById({
                cheque_id:id
            }).then(function (response) {
                console.log('response-->',response.data);
                $scope.edit_cheque_info=response.data[0];
                cheque_list=response.data[0];
                  $scope.active_lable = true;
            });
        };

        $scope.update_cheque_details=function () {
            editSupplierChequeDetails({
                cheque_id:var_cheque_id,
                cheque_no:$scope.edit_cheque_info.cheque_no,
                cheque_date:$scope.edit_cheque_info.cheque_date,
                cheque_amount:$scope.edit_cheque_info.cheque_amount,
                name_on_cheque:$scope.edit_cheque_info.name_on_cheque,
                bank_name_on_cheque:$scope.edit_cheque_info.bank_name_on_cheque,
                bank_id:$scope.edit_cheque_info.bank_id,
                invoice_id:cheque_list.invoice_id

            }).then(function (response) {
                console.log(response);
                console.log("===========================================");
                $scope.modal_dismiss_two();
                $scope.getSupplierChequelist();

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
        var ch_id;
        $scope.sup_cheque_status=function (ind,id) {

            ch_id=id;
            $scope.cleared_date=list[ind].cleared_date;
            $scope.comments=list[ind].comments;
            $scope.status=list[ind].cheque_status;
        };

        $scope.save_sup_cheque_status=function () {
            supChequeStatus({
                status:$scope.status,
                cleared_date:$scope.cleared_date,
                comments:$scope.comments,
                cheque_id:ch_id
            }).then(function (response) {
                console.log(response);
                console.log("===========================================");
                $scope.otp_modal_dismiss();
                $scope.getSupplierChequelist();
            },function (response) {
                console.log(response);
            })
        }
    }]);