var otherDetailsModule=angular.module('otherDetailsModule',[]);
otherDetailsModule.controller('otherDetailsController',['$rootScope','$scope','$route','$location','$http','getOtherChequeDetails','getParticularsDetails',
    'addOtherChequeDetails','deleteOtherChequeDetails','getOtherChequeDetailsById','getOtherBankList','editOthersChequeDetails','otherChequeStatus',
    'getBankDetails','getTaxRateService','commonService',
    function($rootScope,$scope,$route,$location,$http,getOtherChequeDetails,getParticularsDetails,addOtherChequeDetails,deleteOtherChequeDetails,
             getOtherChequeDetailsById,getOtherBankList,editOthersChequeDetails,otherChequeStatus,getBankDetails,getTaxRateService,check_permission){

    $scope.add_other_cheque_info=[{'particulars_id':'','particulars':'','vat_terms':'','tax_rate':'','cheque_no':'','cheque_date':'','cheque_amount':'','include_tax_amount':'','tax_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''}];
$scope.ExchangeRateVal = localStorage.getItem('currencyCheckVar');
	$scope.active_lable = false;	
    var list;
    var other_cheque_id,other_cheque_list;
    $scope.getOtherChequelist=function () {
        getOtherChequeDetails({}).then(function (response) {
            console.log(response);
            $scope.other_cheque_list=response.data;
            list=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.getOtherChequelist();

    $scope.add_other_cheque_details=function () {

        $scope.add_other_cheque_info.push({'cheque_no':'','cheque_date':'','cheque_amount':'','include_tax_amount':'','tax_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''});
    };

    $scope.remove_other_cheque_details=function (index) {
        $scope.add_other_cheque_info.splice(index,1);
    };
    $scope.reset_others_modal = function(){
        $scope.add_other_cheque_info=[{'particulars_id':'','particulars':'','vat_terms':'','tax_rate':'','cheque_no':'','cheque_date':'','cheque_amount':'','include_tax_amount':'','tax_amount':'','name_on_cheque':'','bank_name_on_cheque':'','bank_id':''}];
        $scope.particulars='';

        // $route.reload();
    };

    $scope.getParticulars=function () {
        getParticularsDetails({}).then(function (response) {
            console.log(response);
            $scope.particulars_list=response.data;
        },function(response){
            console.log(response);
        })
    };
    $scope.getParticulars();

        $scope.getOtherBankAccountlist=function () {
            getBankDetails({}).then(function (response) {
                console.log(response);
                $scope.other_bank_list=response.data;
            },function(response){
                console.log(response);
            })

        };
        $scope.getOtherBankAccountlist();

        $http.get('http://api.fixer.io/latest?base='+'EUR').then(function(res){
             $scope.cr=res.data.rates.INR;
              $('#rateR').val($scope.cr);
            });
        
        $scope.add_other_cheque=function () {

            console.log('-------',$scope.particulars);
            
            $scope.currencyRate = ($('#rateR').val());
            console.log('############',$scope.currencyRate);
            //$scope.add_other_cheque_info.currency_exchange_rate=$scope.currencyRate;
            var particulars = $scope.particulars;
            for(var i=0;i< $scope.add_other_cheque_info.length;i++){

                //$scope.add_other_cheque_info[i].particulars_id = particulars.id;
                $scope.add_other_cheque_info[i].particulars = particulars;
                $scope.add_other_cheque_info[i].tax_rate = $scope.tax_rate;
                $scope.add_other_cheque_info[i].vat_terms = $scope.vat_terms;
                $scope.add_other_cheque_info[i].inr_cheque_amount=$scope.add_other_cheque_info[i].cheque_amount*$scope.currencyRate;
                //console.log($scope.add_other_cheque_info[i]);
       }
            console.log($scope.add_other_cheque_info.particulars);
            console.log('$scope.add_other_cheque_info---------->',$scope.add_other_cheque_info);
            console.log("JSON");
            console.log(JSON.stringify($scope.add_other_cheque_info));
            //$scope.add_other_cheque_info.particulars=$scope.particulars;
            addOtherChequeDetails({
                cheque_details:$scope.add_other_cheque_info,
                currency_exchange_rate:$scope.currencyRate
            }).then(function (response) {
                console.log(response);
                //alert('data added successfully');
                $scope.dismiss();
                $scope.getOtherChequelist();
                for (var i=0;i<$scope.add_other_cheque_info.length;i++)
                {
                    $scope.add_other_cheque_info[i].cheque_no='';
                    $scope.add_other_cheque_info[i].cheque_date='';
                    $scope.add_other_cheque_info[i].cheque_amount='';
                    $scope.add_other_cheque_info[i].bank_name_on_cheque='';
                    $scope.add_other_cheque_info[i].name_on_cheque='';
                    $scope.add_other_cheque_info[i].bank_id='';
                    $scope.add_other_cheque_info[i].tax_amount='';
                    $scope.add_other_cheque_info[i].include_tax_amount='';
                }
                $scope.particulars='';
                $scope.tax_rate='';
                $scope.vat_terms='';
                $('#chequeDetailSuccess').fadeIn().delay(5000).fadeOut();
                $scope.cheque_detail_success = "Payment Details Added Successfully";
                $scope.cheque_detail_error = "";
            },function (response) {
                console.log(response);
                $scope.cheque_detail_success = '';
                $('#chequeDetailError').fadeIn().delay(5000).fadeOut();
                $scope.cheque_detail_error = response.data.error[0];
            })
        };

        $scope.deleteOtherChequeList=function (id) {

            deleteOtherChequeDetails({
                cheque_id:id
            }).then(function (response) {
                console.log(response);
                $scope.getOtherChequelist();
            })
        };


        $scope.edit_other_cheque_details=function (index,id) {
            console.log($scope.cheque_id);
            other_cheque_id=id;
            getOtherChequeDetailsById({
                cheque_id:id
            }).then(function (response) {
                console.log('response-->',response.data);
                $scope.edit_other_cheque_info=response.data[0];
                other_cheque_list=response.data[0];
				$scope.active_lable = true;
            });
        };

        $scope.update_other_cheque_details=function () {
            editOthersChequeDetails({
                cheque_id:other_cheque_id,
                cheque_no:$scope.edit_other_cheque_info.cheque_no,
                cheque_date:$scope.edit_other_cheque_info.cheque_date,
                cheque_amount:$scope.edit_other_cheque_info.cheque_amount,
                name_on_cheque:$scope.edit_other_cheque_info.name_on_cheque,
                bank_name_on_cheque:$scope.edit_other_cheque_info.bank_name_on_cheque,
                bank_id:$scope.edit_other_cheque_info.bank_id,
                invoice_id:other_cheque_list.invoice_id

            }).then(function (response) {
                console.log(response);
                $scope.modal_dismiss_two();
                $scope.getOtherChequelist();
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
        $scope.other_cheque_status=function (ind,id) {

            ch_id=id;
            $scope.cleared_date=list[ind].cleared_date;
            $scope.comments=list[ind].comments;
            $scope.status=list[ind].cheque_status;

        };

        $scope.save_other_cheque_status=function () {
            otherChequeStatus({
                status:$scope.status,
                cleared_date:$scope.cleared_date,
                comments:$scope.comments,
                cheque_id:ch_id
            }).then(function (response) {
                console.log(response);
                $scope.otp_modal_dismiss();
                $scope.getOtherChequelist();
            },function (response) {
                console.log(response);
            })
        }

        $scope.get_tax_rate_list = function () {
            getTaxRateService({}).then(function (resposne) {
                console.log(resposne);
                $scope.tax_rate_list = resposne.data;
            });
        };
       $scope.get_tax_rate_list();

       $scope.cal_amount=function(amt,ind){
           console.log(amt);
           console.log($scope.tax_rate);
        if($scope.tax_rate){
            $scope.selected_tax = JSON.parse($scope.tax_rate);
         $scope.add_other_cheque_info[ind].tax_amount= parseFloat(amt*$scope.selected_tax.tax_rate)/100;
         $scope.add_other_cheque_info[ind].tax_amount= $scope.add_other_cheque_info[ind].tax_amount.toFixed(2);
         $scope.add_other_cheque_info[ind].include_tax_amount =parseFloat($scope.add_other_cheque_info[ind].tax_amount)+parseFloat(amt);
        }else{
            $scope.add_other_cheque_info[ind].include_tax_amount = amt;
        }
        $scope.add_other_cheque_info[ind].include_tax_amount = $scope.add_other_cheque_info[ind].include_tax_amount.toFixed(2);
    }

    $scope.cal_tax_amount = function(inc_tax_amt,ind){
        if($scope.tax_rate){
            var data;
            $scope.tax = JSON.parse($scope.tax_rate);
            $scope.selected_tax=$scope.tax.tax_rate;
            data=100.00+parseFloat($scope.selected_tax);
            $scope.temp=inc_tax_amt/data;
         $scope.add_other_cheque_info[ind].cheque_amount= $scope.temp*100;
         console.log($scope.temp);
         //$scope.add_other_cheque_info[ind].cheque_amount =parseFloat($scope.temp*$scope.selected_tax);
        }else{
            $scope.add_other_cheque_info[ind].cheque_amount = inc_tax_amt;
        }
        $scope.add_other_cheque_info[ind].cheque_amount = $scope.add_other_cheque_info[ind].cheque_amount.toFixed(2);
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
            $scope.getOtherChequelist();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#delete_logistic').fadeIn().delay(5000).fadeOut();
                $scope.delete_logistic_msg = 'Other payment details deleted Successfully';
            }
        }
    });

}]);



