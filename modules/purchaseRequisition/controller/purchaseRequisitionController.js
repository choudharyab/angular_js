var purchaseRequisitionModule= angular.module('purchaseRequisitionModule',['ngBootbox']);
purchaseRequisitionModule.controller('purchaseRequisitionController',['$rootScope','$scope','$location','$route','$timeout',
    '$filter','getRequisitionListing','savePurchaseRequisitionData','getRequisitionDataById','updatePurchaseRequisitionData','commonService','getPurchaseCodeAutocomplete',
    'getLocationListing','approvePurchaseRequisition',
    function($rootScope,$scope,$location,$route,$timeout,$filter,getRequisitionListing,savePurchaseRequisitionData,getRequisitionDataById,
             updatePurchaseRequisitionData,check_permission,getPurchaseCodeAutocomplete,getLocationListing,approvePurchaseRequisition){

    $scope.requisition_details={};
    var req_id,product_arr;
    $scope.get_requisition_data=function () {
        getRequisitionListing({}).then(function (resposne) {
            console.log(resposne);
            $scope.requisition_details_list = resposne.data;
        });
    };
    $scope.get_requisition_data();

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();

    $scope.add_btn_clicked=function(){
        // if(localStorage.getItem('warehouse_id')==''){
        //     alert('Please select company first');
        // }else{
            $scope.requisition_details={};
            $scope.hide_save=false;
            $scope.hide_edit=true;
            $scope.hide_req_id=true;
            $scope.requisition_details.company_id=localStorage.getItem('warehouse_id');
            $scope.product_code='';
            $('#add_purchase_requisition').modal('show');
        //}
    };

    // $scope.search_product_code = function(){
    //     getPurchaseCodeAutocomplete({
    //         term:$scope.product_code
    //     }).then(function (response) {
    //         /*for(var g=0;g<res.data.length;g++){
    //                res.data[g].value = res.data[g].country_name;
    //           }*/
    //           product_arr=response.data;
    //         $scope.get_data();
    //     },function (response) {
    //         console.log(response);
    //         $scope.requisition_details.product_id='';
    //         $scope.requisition_details.product_code='';
    //         $scope.requisition_details.product_name='';
    //         $scope.requisition_details.unit='';
    //         $scope.requisition_details.brand_name='';
    //     })
    // };

    // $scope.get_data=function () {
    //     $('#product_code_id').autocomplete({
    //         source:product_arr,
    //         select:function (event,ui) {
    //             //console.log('------------>>',ui.item);
    //             $scope.requisition_details.product_id=ui.item.id;
    //             $scope.requisition_details.product_code=ui.item.value.split('-')[0];
    //             $scope.requisition_details.product_name=ui.item.value.split('-')[1];
    //             $scope.requisition_details.unit=ui.item.measurement_name;
    //             $scope.requisition_details.brand_name=ui.item.grade;
    //         }
    //     })
    // };

    var all_data = [];
    $scope.product_code_list = [];
    $scope.search_product_code = function () {
        getPurchaseCodeAutocomplete({term:$scope.product_code}).then(function (response) {
            all_data = response.data;
            $scope.all_product_code = response.data;
            if(response.data==[]){
                        $scope.requisition_details.product_code='';
                        $scope.requisition_details.product_name='';
                        $scope.requisition_details.unit='';
                        $scope.requisition_details.brand_name='';
                        $scope.product_code_list = [];
                        
            }
        });
    };

    $(document).ready(function() {
        $('#product_code_id').on('input', function() {
            var userText = $(this).val();
            $("#product_code_datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_data.findIndex(x => x.value==$(this).val());
                    if($scope.product_code_list.findIndex(y => y.value==$(this).val()) == -1){
                        console.log('all_data[index]---',all_data[index]);
                        $scope.requisition_details.product_code=all_data[index].value.split('-')[0];
                        $scope.requisition_details.product_name=all_data[index].value.split('-')[1];
                        $scope.requisition_details.unit=all_data[index].measurement_name;
                        $scope.requisition_details.brand_name=all_data[index].grade;
                        $scope.requisition_details.product_id=all_data[index].id;
                        $scope.product_code_list.push(all_data[index]);
                        document.getElementById('product_code_id').value = all_data[index].value;
                    }else{
                       alert('Product Already Added');
                       document.getElementById('product_code_id').value = '';
                    }

                }
            });

        })
    });

    $scope.save_purchase_requisition_data=function () {
        savePurchaseRequisitionData({
            purchase_requisition:$scope.requisition_details
        }).then(function (response) {
            console.log('data--->',response.data);
            $scope.dismiss();
            $scope.requisition_details={};
            $scope.get_requisition_data();
            $('#prSuccess').fadeIn().delay(5000).fadeOut();
            $scope.pr_success = "Requisition Added Successfully";
            $scope.pr_error = "";
        },function (response) {
            console.log(response);
            $scope.pr_success = '';
            $('#prError').fadeIn().delay(5000).fadeOut();
            $scope.pr_error = response.data.error[0];
        })
    };

    $scope.edit_purchase_requisition=function (id) {
        req_id=id;
        $scope.hide_save=true;
        $scope.hide_edit=false;
        $scope.hide_req_id=false;
        getRequisitionDataById({
            id:id
        }).then(function (response) {
            console.log(response);
            //$scope.requisition_details = resposne.data[0];
            $scope.product_code=response.data[0].product_code;
            $scope.requisition_details.product_name=response.data[0].product_name;
            $scope.requisition_details.product_code=response.data[0].product_code;
            $scope.requisition_details.unit=response.data[0].unit;
            $scope.requisition_details.brand_name=response.data[0].brand_name;
            $scope.requisition_details.quantity=response.data[0].quantity;
            $scope.requisition_details.req_by_date=response.data[0].required_date;
            $scope.requisition_details.type=response.data[0].type;
            $scope.requisition_details.date=response.data[0].date1;
            $scope.requisition_details.company_id=response.data[0].company_id;
            $scope.requisition_details.request_code=response.data[0].request_code;
            $scope.requisition_details.product_id=response.data[0].product_id;
        });
    };

    $scope.current_modal = "purchase_requisition";
    $scope.pr_permission_popup = function (cm_id,cm_status,cm_type) {
        check_permission.check_status(cm_id,cm_status,cm_type,$scope.current_modal);
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
            $scope.get_requisition_data();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_purchase_requisition(data.id);
            $('#add_purchase_requisition').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_requisition_data();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#prSuccess').fadeIn().delay(5000).fadeOut();
                $scope.pr_success = "Purchase Requisition Deleted Successfully";
            }
        }
    });

    $scope.update_purchase_requisition_data=function () {
        $scope.requisition_details.id=req_id;
        updatePurchaseRequisitionData({
            purchase_requisition:$scope.requisition_details
        }).then(function (response) {
            console.log('data--->',response.data);
            $scope.dismiss();
            $scope.requisition_details={};
            $scope.get_requisition_data();
            $('#prSuccess').fadeIn().delay(5000).fadeOut();
            $scope.pr_success = "Purchase Requisition Details Successfully";
            $scope.pr_error = "";
        },function (response) {
            console.log(response);
            $scope.pr_success = '';
            $('#prError').fadeIn().delay(5000).fadeOut();
            $scope.pr_error = response.data.error[0];
        })
    };
    
    $scope.check_approve = function (id,approve_status) {
        req_id=id;
        $scope.heading_msg='Approve';
        if(approve_status=='deactivated'){

            $scope.check_approve_msg = "Do you want to approve this purchase request ?";
            //$scope.pi_product_id = pro_id;

            $('#approve_msg').modal('show');
            $scope.approve_btn = true;
        }else{
            $scope.check_approve_msg = "Do you want to dis-approve this purchase request ?";
            $('#approve_msg').modal('show');
            $scope.approve_btn = true;
            //$scope.check_approve_msg = "Already approved";
        }
    };

    $scope.approve = function () {
        approvePurchaseRequisition({
            id:req_id
        }).then(function(response){
            console.log(response);
            $scope.get_requisition_data();
            $scope.close_add_product();
        },function(response){
            console.log(response);

        });
    };
}]);