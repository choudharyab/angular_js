var caseInvoiceModule= angular.module('caseInvoiceModule',[]);
caseInvoiceModule.controller('caseInvoiceController',['$rootScope','$scope','$window','$filter','$http',
    'getCaseInvoiceListing','movedToApprovedSheet','getCustomerListService',
'getServiceListing','searchScrutinyList','getTransportationNameService','getDataById','commonService',
'generateInvoiceService','updateBillData','getLocationListing','getCustomerListService','getTaxRateService',
    function($rootScope,$scope,$window,$filter,$http,getCaseInvoiceListing,movedToApprovedSheet,getCustomerListService,getServiceListing,searchScrutinyList,
        getTransportationNameService,getDataById,check_permission,generateInvoiceService,updateBillData,
        getLocationListing,getCustomerListService,getTaxRateService){


    $('.loading').hide();
    if(localStorage.getItem('company_location') == undefined || localStorage.getItem('company_location') == 'undefined'){
        $scope.location = '';
    }else{
        $scope.location = localStorage.getItem('company_location');
    }
    $scope.case_column_array = [];
    $scope.scrutiny_lists = '';

    $scope.invoice = {};

    var state_id;

    $scope.generate_bill_click = function(){
        $scope.hide_save = false;
        $scope.hide_update = true;
        $scope.invoice = {};
        $scope.invoice.invoice_date = $filter('date')(new Date(),'dd/MM/yyyy');
        $scope.client = {};
        $scope.client_id = '';
    }
    $scope.get_invoice_list = function(){
        getCaseInvoiceListing({}).then(function (response) {
            $scope.invoice_data = response.data;
            
            console.log($scope.charge_data);
            $scope.tax_amount=0;
            $scope.grand_total=0;
            for(var i=0;i<response.data.length;i++){
                for(var j=0;j<response.data[i].case_data.length;j++){
                    if((response.data[i].charge_data[j].tax_amount!='' && response.data[i].charge_data[j].tax_amount!=null && response.data[i].charge_data[j].tax_amount!='undefined') && (response.data[i].charge_data[j].total!='' && response.data[i].charge_data[j].total!=null && response.data[i].charge_data[j].total!='undefined')){
                        $scope.tax_amount=parseFloat($scope.tax_amount)+parseFloat(response.data[i].charge_data[j].tax_amount);
                        $scope.grand_total=parseFloat($scope.grand_total)+parseFloat(response.data[i].charge_data[j].total);
                    }
                    
                }
                response.data[i].tax_total_amount=$scope.tax_amount;
                response.data[i].grand_total_amount=$scope.grand_total;
            }
            console.log(response.data);
        },function (response) {
            console.log(response);
        });
    };
    $scope.get_invoice_list();

    $scope.get_client_listing = function () {
            getCustomerListService({}).then(function (response) {
                console.log(response);
                $scope.client_listing_details = response.data;
            },function (response) {
                console.log(response);
            })
        };
    $scope.get_client_listing();

    $scope.get_service_details = function(){
        getServiceListing({
            type:'service'
        }).then(function (response) {
            $scope.service_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_service_details();

    /*$scope.generate_scrutiny_sheet_bill = function () {

    };*/

    $scope.search_scrutiny_list = function(){
        if($scope.from_date != undefined){
            var str = $scope.from_date.split('/');
            var from = str[2] +  '-' + str[1] + '-' + str[0];
            console.log('from-------',from);
        }

        if($scope.to_date != undefined){
            var to_str = $scope.to_date.split('/');
            var to = to_str[2] +  '-' +to_str[1] + '-' + to_str[0];
            console.log('to-------',to);
        }
        searchScrutinyList({
            search_id: $scope.search_id,
            client_id: $scope.client_id,
           /* location: $scope.location,*/
            fromdate: from,
            todate: to
        }).then(function (response) {
            $scope.scrutiny_lists = response.data;
        },function (response) {
            console.log('error');
        });
    };

    $scope.checkAll=function (scrutiny_data) {
        console.log('$scope.selectedAll---->',$scope.selectedAll);
            if ($scope.selectedAll == '' || $scope.selectedAll == false || $scope.selectedAll == undefined) {
                $scope.case_array = [];
                $scope.selected_case_array = [];
                $scope.selectedAll = true;

                angular.forEach($scope.scrutiny_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.scrutiny_lists--------->',$scope.scrutiny_lists);
                for(var i=0;i<scrutiny_data.length;i++){
                    $scope.case_obj={
                        'case_id':scrutiny_data[i].case_customer.case_id,
                        'case_no':scrutiny_data[i].case_no,
                        'casedate':scrutiny_data[i].casedate,
                        'vehicle_make':scrutiny_data[i].case_customer.vehicle_make
                    };

                    $scope.case_array.push($scope.case_obj);
                    $scope.selected_case_array.push($scope.case_obj.case_id);
                }

                console.log('$scope.selected_case_array--------->',$scope.selected_case_array);

                for(var j=0;j<$scope.scrutiny_lists.length;j++){
                    document.getElementById('case_check_'+$scope.scrutiny_lists[j].case_customer.case_id).checked = true;
                }
            } else {
                $scope.selectedAll = false;
                angular.forEach($scope.scrutiny_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.scrutiny_lists--------->',$scope.scrutiny_lists);
                $scope.selected_case_array = [];
                $scope.case_array = [];

                for(var k=0;k<$scope.scrutiny_lists.length;k++){
                    document.getElementById('case_check_'+$scope.scrutiny_lists[k].case_customer.case_id).checked = false;
                }

            }
        };

        $scope.selected_case_array = [];
        $scope.case_array = [];
        $scope.add_selected_cases = function (case_id,case_no,casedate,vehicle_make) {
            if($scope.selected_case_array.indexOf(case_id) <= -1){
                $scope.case_obj={
                    'case_id':case_id,
                    'case_no':case_no,
                    'casedate':casedate,
                    'vehicle_make':vehicle_make
                };
                $scope.selected_case_array.push(case_id);
                $scope.case_array.push($scope.case_obj);

                $scope.case_obj = {};
                if($scope.scrutiny_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;

                }

            }else{
                $scope.case_array.splice($scope.case_array.indexOf(case_id),1);
                $scope.selected_case_array.splice($scope.selected_case_array.indexOf(case_id),1);

                if($scope.scrutiny_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }

            }
        };

        $scope.getTransportationName = function () {
            getTransportationNameService({}).then(function (res) {
                $scope.charge_details = res.data;
                charge = res.data;
               console.log(res.data);
            },function (res) {
                console.log(res);
            })
        };
        $scope.getTransportationName();

	var print_data;
	$scope.print_array=[];
	$scope.print_id=[];
	console.log('case scrutiny controller called');

    $scope.exportData = function () {
            alasql('SELECT * INTO XLSX("Scrutiny_Sheet.xlsx",{headers:true}) FROM ?',[$scope.case_array]);
    };
var bill_id,client_id,service_id;
    // $scope.get_invoice_data_by_id = function (id) {
    //     bill_id=id;
    //     getDataById({
    //         bill_id:id
    //     }).then(function (res) {
    //         $scope.charge_details = res.data[0];
    //         $scope.date=res.data[0].billdate;
    //         $scope.invoice_no=res.data[0].invoice_no;
    //         $scope.invoice_type=res.data[0].invoice_type;
    //         $scope.applicable=res.data[0].reverse_charge_applicable;
    //         $scope.description=res.data[0].description;
    //         client_id=res.data[0].client_id;
    //         service_id=res.data[0].service_id;
    //         $scope.case_array=res.data.case_data1;
    //         for(var i=0;i<res.data.case_data1.length;i++){
    //             for(var j=0;j<res.data.case_data1[i].charge_data.length;j++){
    //                 $scope.case_column_array[j]=res.data.case_data1[i].charge_data[j].charge_name;
    //             }
    //         }
    //         $scope.towing_total=0;
    //         $scope.tax_amount_total=0;
    //         $scope.subtotal_total=0;
    //         $scope.grand_total_total=0;
    //         $scope.arr = [];
    //         for(var j=0;j<$scope.case_array.length;j++){
    //             console.log($scope.case_array.length);
    //             if($scope.case_array[j].towing_charges!=null && $scope.case_array[j].towing_charges!='' && $scope.case_array[j].towing_charges!='undefined'){
    //                 $scope.towing_total=$scope.towing_total + parseFloat($scope.case_array[j].towing_charges);
    //             }else{
    //                 $scope.towing_total=0;
    //             }
    //             if($scope.case_array[j].tax_amount!=null && $scope.case_array[j].tax_amount!='' && $scope.case_array[j].tax_amount!='undefined'){
    //                 $scope.tax_amount_total=$scope.tax_amount_total + parseFloat($scope.case_array[j].tax_amount);
    //             }
    //             // else{
    //             //     $scope.tax_amount_total=0;
    //             // }
    //             if($scope.case_array[j].subtotal!=null && $scope.case_array[j].subtotal!='undefined' && $scope.case_array[j].subtotal!=''){
    //                 $scope.subtotal_total=$scope.subtotal_total + parseFloat($scope.case_array[j].subtotal);
    //             }else{
    //                 $scope.subtotal_total=0;
    //             }
    //             if($scope.case_array[j].total!=null && $scope.case_array[j].total!='undefined' && $scope.case_array[j].total!=''){
    //                 $scope.grand_total_total=$scope.grand_total_total + parseFloat($scope.case_array[j].total);
    //             }else{
    //                 $scope.grand_total_total=0;
    //             }

    //             for(var n=0;n<$scope.case_array[j].charge_data.length;n++){
    //                 console.log('$scope.arr----',$scope.arr);
    //                 console.log('$scope.arr[n]----',$scope.arr[n]);
    //                 if($scope.case_array[j].charge_data[n].charge_amount == ''){
    //                     $scope.case_array[j].charge_data[n].charge_amount = 0;
    //                 }

    //                 if($scope.arr[n] == undefined || $scope.arr[n] == 'undefined' || $scope.arr[n] == '' || $scope.arr[n] == null){
    //                     $scope.arr[n] = 0;
    //                 }
    //                 /*if(!$scope.case_data[j].charge_data[n].total){
    //                     $scope.case_data[j].charge_data[n].total = $scope.case_data[j].charge_data[n].charge_amount;
    //                 }else{
    //                     $scope.case_data[j].charge_data[n].total = parseFloat($scope.case_data[j].charge_data[n].total) + parseFloat($scope.case_data[j].charge_data[n].charge_amount);
    //                 }*/
    //                 if($scope.arr.length == 0){
    //                     $scope.arr.push($scope.case_array[j].charge_data[n].charge_amount);
    //                     console.log('$scope.arr----',$scope.arr);
    //                 }else{
    //                     $scope.arr[n] = parseFloat($scope.arr[n]) + parseFloat($scope.case_array[j].charge_data[n].charge_amount);
    //                     console.log('$scope.arr----',$scope.arr);
    //                 }
    //             }

                
    //         }
    //         console.log(res.data.case_data1);
    //     },function (res) {
    //         console.log(res);
    //     })
    // };

    $scope.current_modal = "case_bill";
    $scope.invoice_permission_popup = function (cm_id,cm_status,cm_type) {
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
            $scope.get_invoice_list();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.get_invoice_data_by_id(data.id);
            $('#add_bill').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_invoice_list();
            if(data.otp){
                $scope.modal_dismiss_two();
                // $('#fleetSuccess').fadeIn().delay(5000).fadeOut();
                // $scope.fleet_success = "Fleet Details Deleted Successfully";
            }
        }
    });

    $scope.get_client_listing = function () {
        getCustomerListService({}).then(function (response) {
             console.log(response);
             $scope.client_listing_details = response.data;
        },function (response) {
             console.log(response);
        })
    };
    $scope.get_client_listing();

    $scope.generate_invoice_pdf = function (id) {
        $('.loading').show();
        generateInvoiceService({
            bill_id:id
            }).then(function (response) {
               console.log(response)
              var file_name= JSON.parse(response.data);
                $window.open('wheelsonroadserver/invoices/'+file_name+'.pdf');
                $('.loading').hide();
            },function (res) {
                console.log(res);
            })
       
    };
    //$scope.charge_data=[];

    $scope.view_invoice_cases=function(data){
        // $scope.case_array=data;
        // $scope.case_array.charge_data.push(data);
        for(var i=0;i<data.length;i++){
            $scope.case_obj={
                    'case_id':data[i].case_id,
                    'case_no':data[i].case_no,
                    'towing_charges':data[i].towing_charges,
                    'tax_amount':data[i].tax_amount,
                    'tax_name':data[i].tax_name,
                    'total':data[i].total,
                    'charge_data':data,
                    'subtotal':data[i].subtotal,
                    'tax_name':data[i].tax_name
                };
                $scope.case_array.push($scope.case_obj);
        }
        
        
        console.log(data);
        for(var i=0;i<data.length;i++){
            $scope.case_column_array[i]=data[i].charge_name;
        }
        console.log($scope.case_array);
    }

    // $scope.update_bill_data=function(){
    //     console.log(JSON.stringify($scope.case_array));
    //     updateBillData({
    //         bill_id:bill_id,
    //         date:$scope.date,
    //         invoice_no:$scope.invoice_no,
    //         invoice_type:$scope.invoice_type,
    //         description:$scope.description,
    //         client_id:$scope.client_id,
    //         service_id:$scope.service_id,
    //         reverse_charge:$scope.applicable,
    //         client_id:client_id,
    //         service_id:service_id
    //         //case_data:$scope.case_data,
    //         //charge_data:$scope.charge_data
            
    //     }).then(function (res) {
    //         $scope.modal_dismiss_three();
    //         $scope.bill = {};
    //         // $scope.onLoadGetAllApprovedList();
    //         $scope.get_invoice_list();
    //     },function (res) {
    //         console.log(res);
    //     })
    // }

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();

    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();

     $scope.files = [];
    var file
    //Get Image Files
    $scope.$on("selectedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
    });

    $scope.get_client_state = function(client){
        var d = JSON.parse(client);
        $scope.invoice.client_id = d.id;
        state_id = d.state_id;
    }

    $scope.get_tax_type = function(company){
        console.log(JSON.parse(company));
        $scope.company = JSON.parse(company);
        $scope.invoice.tax_id = 31;
        $scope.invoice.tax_rate = 18;
        $scope.company_state_id = $scope.company.state_id;
        $scope.invoice.company_id = $scope.company.id;
        if(parseInt($scope.company_state_id) == parseInt(state_id)){
            $scope.invoice.tax_name='GST';
        }else{
            $scope.invoice.tax_name='IGST';
        }
    }

    $scope.calculate_total = function(){
        $scope.invoice.tds_amount=parseFloat($scope.invoice.tds_amount);
        $scope.invoice.subtotal = parseFloat($scope.invoice.total_service_amount) + parseFloat($scope.invoice.additional_service_amount);
        $scope.invoice.tax_amount = parseFloat($scope.invoice.total_service_amount) * 18 / 100;
        $scope.invoice.grand_total = parseFloat($scope.invoice.subtotal) + parseFloat($scope.invoice.tax_amount);
    }
    $scope.save_bill = function(){
        var dataObject = {
            invoice : $scope.invoice
        };
        $http({
            method: 'POST',
            url: appUrl+'store_case_bill?token='+localStorage.getItem('token'),
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("invoice", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {

                    formData.append('uploadimage', data.files[i]);
                }

                return formData;
            },
            data: {model: dataObject,files: $scope.files}
        }).
        success(function (data, status, headers, config) {
           $scope.invoice = {};
           $scope.invoice.invoice_date = $filter('date')(new Date(),'dd/MM/yyyy');
           $('#add_bill').modal('hide');
           $scope.get_invoice_list();

        }).
        error(function (data, status, headers, config) {
            console.log('data---->',data);
            console.log("failed!");
            $scope.gr_success = '';
        });
    }

    $scope.get_invoice_data_by_id = function (id) {
        bill_id=id;
        $scope.hide_save = true;
        $scope.hide_update = false;
        getDataById({
            bill_id:id
        }).then(function (res) {
            $scope.invoice = res.data[0];
            $scope.client_id = res.data[0].client_id;
        },function (res) {
            console.log(res);
        })
    };

    $scope.update_bill_data=function(){
        var dataObject = {
            invoice : $scope.invoice
        };
        $http({
            method: 'POST',
            url: appUrl+'update_case_bill?token='+localStorage.getItem('token')+'&id='+bill_id,
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("invoice", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {

                    formData.append('uploadimage', data.files[i]);
                }

                return formData;
            },
            data: {model: dataObject,files: $scope.files}
        }).
        success(function (data, status, headers, config) {
           $scope.invoice = {};
           $scope.invoice.invoice_date = $filter('date')(new Date(),'dd/MM/yyyy');
           $('#add_bill').modal('hide');
           $scope.get_invoice_list();

        }).
        error(function (data, status, headers, config) {
            console.log('data---->',data);
            console.log("failed!");
            $scope.gr_success = '';
        });
    }

    $scope.open_pdf_file=function(file){
        console.log(file);
        if(file == 'undefined' || file == ''){
            $scope.heading_msg = 'Bill';
            $scope.check_approve_msg = 'File not available...!!!';
            $('#approve_msg').modal('show');
        }else{
            $window.open('wheelsonroadserver/public/files/'+file);
        }
    }


}]);


