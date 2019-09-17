var bankDetailsModule=angular.module('bankDetailsModule',[]);
bankDetailsModule.controller('bankDetailsController',['$scope','getBankDetails','addBankDetails','deleteBankDetails','editBankDetails','getBankDetailsById','commonService','country',
    function($scope,getBankDetails,addBankDetails,deleteBankDetails,editBankDetails,getBankDetailsById,check_permission,country){

        $scope.active_lable = false;    
        $scope.add_bank={};

        $scope.add_bank_details = function(){
            addBankDetails({bank:$scope.add_bank}).then(function(response){
                console.log(response);
                $scope.modal_dismiss_sr_edit();
                $scope.getbanklist();
                $scope.add_bank={};
                $scope.auto_country='';
                $('#bankDetailSuccess').fadeIn().delay(5000).fadeOut();
                $scope.bank_detail_success = "Bank Details Added Successfully";
                $scope.bank_detail_error = "";
            },function(response){
                console.log(response);
                $scope.cheque_detail_success = '';
                $('#bankDetailError').fadeIn().delay(5000).fadeOut();
                $scope.bank_detail_error = response.data.error[0];
            })
        };



        $scope.getbanklist=function(){
            getBankDetails({}).then(function(response){
                console.log(response);
                $scope.bank_list=response.data;
            },function(response){
                console.log(response);
            })
        };
        $scope.getbanklist();

        $scope.reset_bank_modal=function(){
            $scope.hide_add=false;
            $scope.hide_edit=true;
            $scope.add_bank={};
            $scope.add_bank.country='';
            $scope.auto_country='';
            $scope.auto_country='';

        };


     /*    $scope.deleteBankList=function (id) {

            deleteBankDetails({
                bank_id:id
            }).then(function (response) {
                console.log(response);
                $scope.getbanklist();
            })
        };*/
     
        /*$scope.edit_bank_details=function (index,id) {
            $scope.hide_add=true;
            $scope.hide_edit=false;
            getBankDetailsById({
                bank_id:id
            }).then(function (response) {
                console.log('response-->',response.data);
                $scope.add_bank=response.data[0];
                $scope.auto_country=response.data[0].country;
                console.log($scope.edit_bank);
                $scope.active_lable = true;
            });
        };*/

       

          $scope.current_modal = 'bank';
          $scope.product_permission_popup = function (pro_id,pro_status,pro_type) {
            $scope.hide_add=true;
            $scope.hide_edit=false;
          check_permission.check_status(pro_id,pro_status,pro_type,$scope.current_modal);
           $scope.comment ={};
           $scope.otp_object = {};
       };
          $scope.product_generate_password = function () {
          check_permission.generate_otp($scope.comment);
          $scope.comment ={};
       };
          $scope.product_verify_otp = function () {
          check_permission.verify_permission_otp($scope.otp_object, '');
          $scope.otp_object = {};
       };
    
       $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.getbanklist();
            if(data.otp){
            $scope.dismiss();
            $('#delete_bank').fadeIn().delay(5000).fadeOut();
            $scope.delete_bank_msg = 'Bank Details Deleted Successfully';
            }
        }
    });

        $scope.$on('CallParentMethod', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.bank_id = data.id;
            $scope.getbanklist();
            $scope.dismiss();
            getBankDetailsById({bank_id:data.id}).then(function (response) {
                console.log(response);
                $scope.add_bank = response.data[0];
                $scope.auto_country=response.data[0].country;
                $('#example2').modal('show');
                $scope.active_lable = true;
            },function (response) {
                console.log(response);
            });
        }
    });

         $scope.update_bank_details = function(){
            editBankDetails({bank:$scope.add_bank}).then(function(response){
                console.log(response);
                $scope.modal_dismiss_sr_edit();
                $scope.getbanklist();
                $('#bankDetailSuccess').fadeIn().delay(5000).fadeOut();
                $scope.bank_detail_success = "Bank Details Updated Successfully";
                $scope.bank_detail_error = "";
            },function(response){
                console.log(response);
                 $scope.bank_detail_success = '';
                $('#bankDetailError1').fadeIn().delay(5000).fadeOut();
                $scope.bank_detail_error1 = response.data.error[0];
            })
        };


        var auto_country_arr;

         $scope.searchCountry = function(){
      country({term:$scope.auto_country}).then(function (res) {
            for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].country_name; 
          }
            auto_country_arr=res.data;
            $scope.getId();
            console.log(auto_country_arr);
        },function (res) {
        });
    }

    $scope.getId=function () {
            $('#country_id').autocomplete({
                source:auto_country_arr,
                select:function (event,ui) {
                    //console.log('------------>>',ui.item);
                    $scope.auto_country=ui.item.country_name;
                    //console.log('~~~~~~~~~~~~~~~~>>',$scope.auto_country);
                    $scope.add_bank.country=$scope.auto_country;

                   
                }
            })
        };


}]);



