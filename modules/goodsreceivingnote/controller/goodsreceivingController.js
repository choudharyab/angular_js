var goodReceivingModule= angular.module('goodReceivingModule',['ngBootbox']);
goodReceivingModule.controller('goodReceivingController',['$rootScope','$scope','$location','$route','$timeout',
    '$filter','$http','$window','getGoodReceivingData','requestCodeAutocomplete','saveGrData','getGoodReceivingDataById','updateGrData',
    'commonService','getTaxRateService',
    function($rootScope,$scope,$location,$route,$timeout,$filter,$http,$window,getGoodReceivingData,requestCodeAutocomplete,saveGrData,
             getGoodReceivingDataById,updateGrData,check_permission,getTaxRateService){

    $scope.gr_details={};
    var req_arr,gr_id;
    $scope.hide_save=false;
    $scope.hide_edit=true;
    $scope.hide_grn_id=true;
    $scope.files = [];
    var file
    //Get Image Files
    $scope.$on("selectedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });
    $scope.get_good_receiving_data=function () {
        getGoodReceivingData({}).then(function (resposne) {
            console.log(resposne);
            $scope.gr_details_list = resposne.data;
        });
    };
    $scope.get_good_receiving_data();

    $scope.add_btn_clicked=function () {
        // if(localStorage.getItem('warehouse_id')==''){
        //     alert('Please select company first');
        // }else{
            $scope.hide_save=false;
            $scope.hide_edit=true;
            $scope.hide_grn_id=true;
            $scope.gr_details={};
            $scope.request_no='';
            $scope.filename='';
            $('#add_gr_note').modal('show');
        //}
    };

    getTaxRateService({}).then(function (resposne) {
        console.log(resposne);
        $scope.tax_list = resposne.data;
    });

    // $scope.search_request_code = function(){
    //     requestCodeAutocomplete({
    //         term:$scope.request_no
    //     }).then(function (response) {
    //         // for(var g=0;g<response.data.length;g++){
    //         //       response.data[g].value = response.data[g].request_code;
    //         //  }
    //         req_arr=response.data;
    //         $scope.get_data();
    //     },function (response) {
    //         console.log(response);
    //     })
    // };

    // $scope.get_data=function () {
    //     $('#request_no_id').autocomplete({
    //         source:req_arr,
    //         select:function (event,ui) {
    //             //console.log('------------>>',ui.item);
    //             $scope.gr_details.purchase_requistion_id=ui.item.id;
    //             $scope.gr_details.request_code=ui.item.request_code;
    //             $scope.gr_details.request_date=ui.item.date;
    //             $scope.gr_details.product_code=ui.item.product_code;
    //             $scope.gr_details.product_group=ui.item.product_group;
    //             $scope.gr_details.unit=ui.item.unit;
    //             $scope.gr_details.brand_name=ui.item.brand_name;
    //             $scope.gr_details.quantity=ui.item.quantity;
    //             $scope.gr_details.product_name=ui.item.product_name;
    //             $scope.gr_details.type=ui.item.type;
    //         }
    //     })
    // };

    var all_data = [];
    $scope.request_code_list = [];
    $scope.search_request_code = function () {
        requestCodeAutocomplete({term:$scope.request_no}).then(function (response) {
            all_data = response.data;
            $scope.all_request_code = response.data;
            if(response.data==[]){
                $scope.gr_details.purchase_requistion_id='';
                $scope.gr_details.request_code='';
                $scope.gr_details.request_date='';
                $scope.gr_details.product_code='';
                $scope.gr_details.product_group='';
                $scope.gr_details.unit='';
                $scope.gr_details.brand_name='';
                $scope.gr_details.quantity='';
                $scope.gr_details.product_name='';
                $scope.gr_details.type='';
                $scope.request_code_list = [];
            }
        });
    };

    $(document).ready(function() {
        $('#request_no_id').on('input', function() {
            var userText = $(this).val();
            $("#request_code_datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_data.findIndex(x => x.value==$(this).val());
                    if($scope.request_code_list.findIndex(y => y.value==$(this).val()) == -1){
                        console.log('all_data[index]---',all_data[index]);
                        $scope.gr_details.purchase_requistion_id=all_data[index].id;
                        $scope.gr_details.request_code=all_data[index].request_code;
                        $scope.gr_details.request_date=all_data[index].date;
                        $scope.gr_details.product_code=all_data[index].product_code;
                        $scope.gr_details.product_group=all_data[index].product_group;
                        $scope.gr_details.unit=all_data[index].unit;
                        $scope.gr_details.brand_name=all_data[index].brand_name;
                        $scope.gr_details.quantity=all_data[index].quantity;
                        $scope.gr_details.product_name=all_data[index].product_name;
                        $scope.gr_details.type=all_data[index].type;
                        
                        $scope.request_code_list.push(all_data[index]);
                        document.getElementById('request_no_id').value = all_data[index].value;
                    }else{
                       alert('Product Already Added');
                       document.getElementById('request_no_id').value = '';
                    }

                }
            });

        })
    });

    $scope.calculate_total = function(tax){
        console.log(tax);
        if(tax != undefined){
            $scope.tax_data = JSON.parse(tax);
            $scope.gr_details.tax_id = $scope.tax_data.id;
            $scope.gr_details.tax_rate = $scope.tax_data.tax_rate;
        }
        $scope.gr_details.amount = parseFloat($scope.gr_details.quantity) * parseFloat($scope.gr_details.rate);
        $scope.gr_details.subtotal = parseFloat($scope.gr_details.quantity) * parseFloat($scope.gr_details.rate);
        if($scope.gr_details.tax_rate != undefined){
            $scope.gr_details.tax_amount = parseFloat($scope.gr_details.amount) * parseFloat($scope.gr_details.tax_rate) / parseFloat(100);
        }else{
            $scope.gr_details.tax_amount = 0;
        }
        
        $scope.gr_details.grand_total = parseFloat($scope.gr_details.amount) + parseFloat($scope.gr_details.tax_amount);
    }
    $scope.save_gr_data=function () {
        $scope.gr_details.company_id=localStorage.getItem('warehouse_id');
        var dataObject = {
            goor_receiving_note : $scope.gr_details
        };
        $http({
            method: 'POST',
            url: appUrl+'store_good_receiving_note?token='+localStorage.getItem('token'),
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("goor_receiving_note", angular.toJson(data.model));

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
            $scope.dismiss();
            $scope.gr_details = {};
            $scope.files = [];
            $scope.product_code='';
            console.log("success");
            $('#grSuccess').fadeIn().delay(5000).fadeOut();
            $scope.gr_success = "GRN Saved Successfully";
            $scope.get_good_receiving_data();
        }).
        error(function (data, status, headers, config) {
            console.log('data---->',data);
            console.log("failed!");
            $scope.gr_success = '';
            $('#grError').fadeIn().delay(5000).fadeOut();
            $scope.gr_error = "Something Went Wrong... Please Try Again...!!";
        });
    };

    // $scope.save_gr_data=function(){
    //     saveGrData({
    //         gr_details:$scope.gr_details
    //     }).then(function (response) {
    //         console.log('data--->',response.data);
    //         $scope.gr_details={};
    //         $scope.dismiss();
    //         $scope.get_good_receiving_data();
    //         $('#grSuccess').fadeIn().delay(5000).fadeOut();
    //         $scope.gr_success = "Good Receiving Note Details Added Successfully";
    //         $scope.gr_error = "";
    //     },function (response) {
    //         console.log(response);
    //         $scope.gr_success = '';
    //         $('#grError').fadeIn().delay(5000).fadeOut();
    //         $scope.gr_error = response.data.error[0];
    //     })
    // };

    $scope.edit_gr_data=function (id) {
        gr_id=id;
        $scope.hide_save=true;
        $scope.hide_edit=false;
        $scope.hide_grn_id=false;
        getGoodReceivingDataById({
            id:id
        }).then(function (response) {
            console.log(response);
           // $scope.gr_details = resposne.data[0];
           $scope.gr_details.grn_code=response.data[0].grn_code;
            $scope.request_no=response.data[0].request_code;
            $scope.gr_details.supplier_name=response.data[0].supplier_name;
            $scope.gr_details.request_code=response.data[0].request_code;
            $scope.gr_details.request_date=response.data[0].requestdate;
            $scope.gr_details.product_code=response.data[0].product_code;
            $scope.gr_details.product_group=response.data[0].product_group;
            $scope.gr_details.product_name=response.data[0].product_name;
            $scope.gr_details.unit=response.data[0].unit;
            $scope.gr_details.brand_name=response.data[0].brand_name;
            $scope.gr_details.quantity=response.data[0].quantity;
            $scope.gr_details.rate=response.data[0].rate;
            $scope.gr_details.received_date=response.data[0].receiveddate;
            $scope.gr_details.type=response.data[0].type;
            $scope.filename=response.data[0].filename;
            $scope.gr_details.amount=response.data[0].amount;
            $scope.gr_details.tax_type=response.data[0].tax_type;
            $scope.gr_details.subtotal=response.data[0].subtotal;
            $scope.gr_details.tax_amount=response.data[0].tax_amount;
            $scope.gr_details.grand_total=response.data[0].grand_total;
            $scope.grn_tax_id=response.data[0].tax_id;
            $scope.gr_details.tax_id=response.data[0].tax_id;
            $scope.gr_details.tax_rate=response.data[0].tax_rate;
            file=$scope.filename;
            console.log($scope.filename);
            $scope.gr_details.remark=response.data[0].remark;
            $scope.gr_details.purchase_requistion_id=response.data[0].purchase_requistion_id;
        });
    };

    $scope.open_file=function(){
        $window.open('wheelsonroadserver/public/files/'+file);
    }
    $scope.current_modal = "good_receiving_note";

    $scope.gr_permission_popup = function (gr_id,gr_status,gr_type) {
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
            $scope.get_good_receiving_data();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_gr_data(data.id);
            $('#add_gr_note').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_good_receiving_data();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#grSuccess').fadeIn().delay(5000).fadeOut();
                $scope.gr_success = "GRN Deleted Successfully";
            }
        }
    });

    $scope.update_gr_data=function () {
        $scope.gr_details.id=gr_id;
        var dataObject = {
            goor_receiving_note : $scope.gr_details
        };
        $http({
            method: 'POST',
            url: appUrl+'update_good_receiving_note?token='+localStorage.getItem('token'),
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("goor_receiving_note", angular.toJson(data.model));

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
            $scope.dismiss();
            $scope.gr_details = {};
            $scope.files = [];
            $scope.product_code='';
            console.log("success");
            $('#grSuccess').fadeIn().delay(5000).fadeOut();
            $scope.gr_success = "GRN Updated Successfully";
            $scope.get_good_receiving_data();
        }).
        error(function (data, status, headers, config) {
            console.log('data---->',data);
            console.log("failed!");
            $scope.gr_success = '';
            $('#grError').fadeIn().delay(5000).fadeOut();
            $scope.gr_error = "Something Went Wrong... Please Try Again...!!";
        });
    };

    // $scope.update_gr_data=function(){
    //     updateGrData({
    //         gr_details:$scope.gr_details
    //     }).then(function (response) {
    //         console.log('data--->',response.data);
    //         $scope.dismiss();
    //         $scope.gr_details={};
    //         $scope.get_good_receiving_data();
    //         $('#grSuccess').fadeIn().delay(5000).fadeOut();
    //         $scope.gr_success = "Good Receiving Note Details Updated Successfully";
    //         $scope.gr_error = "";
    //     },function (response) {
    //         console.log(response);
    //         $scope.gr_success = '';
    //         $('#grError').fadeIn().delay(5000).fadeOut();
    //         $scope.gr_error = response.data.error[0];
    //     })
    //};

    $scope.open_pdf_file=function(file){
        console.log(file);
        if(file == 'undefined' || file == ''){
            $scope.heading_msg = 'GRN';
            $scope.check_approve_msg = 'File not available...!!!';
            $('#approve_msg').modal('show');
        }else{
            $window.open('wheelsonroadserver/public/files/'+file);
        }
    }

}]);