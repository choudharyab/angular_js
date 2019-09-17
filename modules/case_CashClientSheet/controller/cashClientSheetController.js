var cashClientSheetModule= angular.module('cashClientSheetModule',[]);
cashClientSheetModule.controller('cashClientSheetController',['$rootScope','$scope','$window','getAllCashClientList',
    'getCustomerListService','getServiceListing','getTransportationNameService','searchCashClientList',
    'updateDisputedRemark','generateCashInvoiceService','commonService',
	function($rootScope,$scope,$window,getAllCashClientList,getCustomerListService,getServiceListing,
        getTransportationNameService,searchCashClientList,updateDisputedRemark,generateCashInvoiceService,check_permission){

        if(localStorage.getItem('company_location') == undefined || localStorage.getItem('company_location') == 'undefined'){
            $scope.location = '';
        }else{
            $scope.location = localStorage.getItem('company_location');
        }

        $scope.disputed_lists = '';

        $('.loading').hide();

        $scope.onLoadGetAllCashClientList = function(){
            $('.loading').show();
            getAllCashClientList({}).then(function (response) {
                $('.loading').hide();
                $scope.disputed_lists = response.data;
            },function (response) {
                console.log(response);
            });
        };
        $scope.onLoadGetAllCashClientList();

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

        $scope.search_cash_client_list = function(){
            if($scope.from_date != undefined){
                var str = $scope.from_date.split('/');
                var from = str[2] +  '-' + str[1] + '-' + str[0];
                console.log('from-------',from);
            }else{
                var from = '';
            }

            if($scope.to_date != undefined){
                var to_str = $scope.to_date.split('/');
                var to = to_str[2] +  '-' +to_str[1] + '-' + to_str[0];
                console.log('to-------',to);
            }else{
                var to = '';
            }
            searchCashClientList({
                service_id: $scope.service_id,
                client_id: $scope.client_id,
                /* location: $scope.location,*/
                fromdate: from,
                todate: to
            }).then(function (response) {
                $scope.disputed_lists = response.data;
            },function (response) {
                console.log('error');
            });
        };

        $scope.open_cash_client_modal = function(id){
            $('#example3').modal('show');
            $scope.id = id;
        };

        $scope.update_cash_client_remark = function(id){
            updateDisputedRemark({
                case_id:id,
                remark: $scope.cash_client_remark
            }).then(function (res) {
                $scope.product_dismiss();
                $scope.cash_client_remark = '';
                $scope.onLoadGetAllCashClientList();
            },function (res) {
                console.log(res);
            })
        };

        /*$scope.moved_to_scrutiny_sheet = function(type){
         $scope.data = [];
            for(var i=0;i< $scope.selected_case_array.length;i++){
                $scope.obj = {};
                $scope.obj.case_id = $scope.selected_case_array[i];
                $scope.data.push($scope.obj);
            }
            movedToScrutinySheet({
                type: type,
                data: $scope.data
            }).then(function (response) {
                console.log('success');
                $scope.onLoadGetAllDisputedList();
                $scope.selected_case_array = [];
        		$scope.case_array = [];
            },function (response) {
                console.log('error');
            });
        };*/

        $scope.checkAll=function (disputed_data) {
            console.log('$scope.selectedAll---->',$scope.selectedAll);
            if ($scope.selectedAll == '' || $scope.selectedAll == false || $scope.selectedAll == undefined) {
                $scope.case_array = [];
                $scope.selected_case_array = [];
                $scope.selectedAll = true;

                angular.forEach($scope.disputed_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.disputed_lists--------->',$scope.disputed_lists);
                for(var i=0;i<disputed_data.length;i++){
                    /*$scope.case_obj={
                        'case_id':disputed_data[i].case_customer.case_id,
                        'case_no':disputed_data[i].case_no,
                        'casedate':disputed_data[i].casedate,
                        'vehicle_make':disputed_data[i].case_customer.vehicle_make
                    };*/

                    $scope.case_obj_xl={
                        'case_id':disputed_data[i].case_customer.case_id,
                        'casedate':disputed_data[i].casedate,
                        'case_no':disputed_data[i].case_no,
                        'service_type':disputed_data[i].service[0].service_name,
                        'vehicle_make':disputed_data[i].case_customer.vehicle_make,
                        'vehicle_no':disputed_data[i].case_customer.vehicle_reg_no,
                        'total_km':disputed_data[i].close_total_service_km,
                        'base_km':disputed_data[i].rules.initials_km,
                        'base_price':disputed_data[i].rules.charges_initials_km,
                        'rate_per_km':disputed_data[i].rules.charges_above_initials_km,
                        'ext_km':disputed_data[i].ext_km,
                        'ext_km_amt':disputed_data[i].ext_km_amt,
                        'waiting_charges':disputed_data[i].waiting_total_amount,
                        'custody_charges':disputed_data[i].custody_total_amount,
                        'grand_total':disputed_data[i].total_case_amount,
                        'route_map':disputed_data[i].close_route_map,
                        'customer_name':disputed_data[i].case_customer.customer_name,
                        
                        
                        'towing_charges':disputed_data[i].close_towing_charges,
                        'total_amount':disputed_data[i].total_amount,
                        'tax_name': disputed_data[i].tax_name,
                        'tax_amount': disputed_data[i].total_case_tax,
                        'charge_data': disputed_data[i].charge_data,
                        'case_remark': disputed_data[i].close_notes,
                        'total': disputed_data[i].total
                     };

                    if(disputed_data[i].tax_name == 'GST'){
                        $scope.case_obj={
                            'case_id':disputed_data[i].case_customer.case_id,
                            'case_no':disputed_data[i].case_no,
                            'casedate':disputed_data[i].casedate,
                            'vehicle_make':disputed_data[i].case_customer.vehicle_make,
                            'route_map':disputed_data[i].close_route_map,
                            'customer_name':disputed_data[i].case_customer.customer_name,
                            'service_type':disputed_data[i].service[0].service_name,
                            'Towing/RSR KM':disputed_data[i].close_total_service_km,
                            'Towing Charges':disputed_data[i].close_towing_charges,
                            'sgst@9%':disputed_data[i].tax_amount/2,
                            'cgst@9%':disputed_data[i].tax_amount/2,
                            'igst@18%':'',
                            'Total Amount':disputed_data[i].total,
                            'Remark': disputed_data[i].remark
                        };
                    }

                    if(disputed_data[i].tax_name == 'IGST'){
                        $scope.case_obj={
                            'case_id':disputed_data[i].case_customer.case_id,
                            'case_no':disputed_data[i].case_no,
                            'casedate':disputed_data[i].casedate,
                            'vehicle_make':disputed_data[i].case_customer.vehicle_make,
                            'route_map':disputed_data[i].close_route_map,
                            'customer_name':disputed_data[i].case_customer.customer_name,
                            'service_type':disputed_data[i].service[0].service_name,
                            'Towing/RSR KM':disputed_data[i].close_total_service_km,
                            'Towing Charges':disputed_data[i].close_towing_charges,
                            'sgst@9%':'',
                            'cgst@9%':'',
                            'igst@18%':disputed_data[i].tax_amount,
                            'Total Amount':disputed_data[i].total,
                            'Remark': disputed_data[i].remark
                        };
                    }

                    if(disputed_data[i].tax_name == '' || disputed_data[i].tax_name == null || disputed_data[i].tax_name == undefined){
                        $scope.case_obj={
                            'case_id':disputed_data[i].case_customer.case_id,
                            'case_no':disputed_data[i].case_no,
                            'casedate':disputed_data[i].casedate,
                            'vehicle_make':disputed_data[i].case_customer.vehicle_make,
                            'route_map':disputed_data[i].close_route_map,
                            'customer_name':disputed_data[i].case_customer.customer_name,
                            'service_type':disputed_data[i].service[0].service_name,
                            'Towing/RSR KM':disputed_data[i].close_total_service_km,
                            'Towing Charges':disputed_data[i].close_towing_charges,
                            'sgst@9%':'',
                            'cgst@9%':'',
                            'igst@18%':'',
                            'Total Amount':disputed_data[i].total,
                            'Remark': disputed_data[i].remark
                        };
                    }


                    angular.forEach($scope.charge_details, function(value, key) {
                        console.log('key----',key);
                        console.log('value----',value);
                        $scope.case_obj[value.transportation_name] = disputed_data[i].charge_data[key].charge_amount;
                    });

                    $scope.case_array.push($scope.case_obj);
                    $scope.selected_case_array.push($scope.case_obj.case_id);
                }

                console.log('$scope.selected_case_array--------->',$scope.selected_case_array);

                for(var j=0;j<$scope.disputed_lists.length;j++){
                    document.getElementById('case_check_'+$scope.disputed_lists[j].case_customer.case_id).checked = true;
                }
            } else {
                $scope.selectedAll = false;
                angular.forEach($scope.disputed_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.disputed_lists--------->',$scope.disputed_lists);
                $scope.selected_case_array = [];
                $scope.case_array = [];

                for(var k=0;k<$scope.disputed_lists.length;k++){
                    document.getElementById('case_check_'+$scope.disputed_lists[k].case_customer.case_id).checked = false;
                }
            }
        };

        $scope.selected_case_array = [];
        $scope.case_array = [];
        $scope.add_selected_cases = function (data) {
            if($scope.selected_case_array.indexOf(data.case_customer.case_id) <= -1){
              /*  $scope.case_obj={
                    'case_id':case_id,
                    'case_no':case_no,
                    'casedate':casedate,
                    'vehicle_make':vehicle_make
                };*/

                $scope.case_obj_xl={
                    'case_id':data.case_customer.case_id,
                    'casedate':data.casedate,
                    'case_no':data.case_no,
                    'service_type':data.service[0].service_name,
                    'vehicle_make':data.case_customer.vehicle_make,
                    'vehicle_no':data.case_customer.vehicle_reg_no,
                    'total_km':data.close_total_service_km,
                    'base_km':data.rules.initials_km,
                    'base_price':data.rules.charges_initials_km,
                    'rate_per_km':data.rules.charges_above_initials_km,
                    'ext_km':data.ext_km,
                    'ext_km_amt':data.ext_km_amt,
                    'waiting_charges':data.waiting_total_amount,
                    'custody_charges':data.custody_total_amount,
                    'route_map':data.close_route_map,
                    'customer_name':data.case_customer.customer_name,
                    'service_type':data.service[0].service_name,
                    'towing_km':data.close_total_service_km,
                    'towing_charges':data.close_towing_charges,
                    'total_amount':data.total_amount,
                    'tax_name': data.tax_name,
                    'tax_amount': data.total_case_tax,
                    'grand_total':data.total_case_amount,
                    'charge_data': data.charge_data,
                    'case_remark': data.close_notes,
                    'total': data.total
                 };

                if(data.tax_name == 'GST'){
                    $scope.case_obj={
                        'case_id':data.case_customer.case_id,
                        'case_no':data.case_no,
                        'casedate':data.casedate,
                        'vehicle_make':data.case_customer.vehicle_make,
                        'route_map':data.close_route_map,
                        'customer_name':data.case_customer.customer_name,
                        'service_type':data.service[0].service_name,
                        'Towing/RSR KM':data.close_total_service_km,
                        'Towing Charges':data.close_towing_charges,
                        'sgst@9%':data.tax_amount/2,
                        'cgst@9%':data.tax_amount/2,
                        'igst@18%':'',
                        'Total Amount':data.total,
                        'Remark': data.remark
                    };
                }

                if(data.tax_name == 'IGST'){
                    $scope.case_obj={
                        'case_id':data.case_customer.case_id,
                        'case_no':data.case_no,
                        'casedate':data.casedate,
                        'vehicle_make':data.case_customer.vehicle_make,
                        'route_map':data.close_route_map,
                        'customer_name':data.case_customer.customer_name,
                        'service_type':data.service[0].service_name,
                        'Towing/RSR KM':data.close_total_service_km,
                        'Towing Charges':data.close_towing_charges,
                        'sgst@9%':'',
                        'cgst@9%':'',
                        'igst@18%':data.tax_amount,
                        'Total Amount':data.total,
                        'Remark': data.remark
                    };
                }

                if(data.tax_name == '' || data.tax_name == null || data.tax_name == undefined){
                    $scope.case_obj={
                        'case_id':data.case_customer.case_id,
                        'case_no':data.case_no,
                        'casedate':data.casedate,
                        'vehicle_make':data.case_customer.vehicle_make,
                        'route_map':data.close_route_map,
                        'customer_name':data.case_customer.customer_name,
                        'service_type':data.service[0].service_name,
                        'Towing/RSR KM':data.close_total_service_km,
                        'Towing Charges':data.close_towing_charges,
                        'sgst@9%':'',
                        'cgst@9%':'',
                        'igst@18%':'',
                        'Total Amount':data.total,
                        'Remark': data.remark
                    };
                }

                angular.forEach($scope.charge_details, function(value, key) {
                    $scope.case_obj[value.transportation_name] = data.charge_data[key].charge_amount;
                });

                $scope.selected_case_array.push(data.case_customer.case_id);
                $scope.case_array.push($scope.case_obj);

                $scope.case_obj = {};
                if($scope.disputed_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }
            }else{
                $scope.case_array.splice($scope.case_array.indexOf(data.case_customer.case_id),1);
                $scope.selected_case_array.splice($scope.selected_case_array.indexOf(data.case_customer.case_id),1);

                if($scope.disputed_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }
            }
        };

        $scope.exportData = function () {
            if($scope.selected_case_array.length<= 0 ){
                alert('Please select cases first');
            }else{
                alasql('SELECT * INTO XLSX("Cash_Client_Sheet.xlsx",{headers:true}) FROM ?',[$scope.case_array]);
            }
        };

        $scope.charge_details = '';
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

        $scope.generate_invoice_pdf = function (id) {
        $('.loading').show();
        generateCashInvoiceService({
            id:id
            }).then(function (response) {
               console.log(response)
              var file_name= JSON.parse(response.data);
                $window.open('wheelsonroadserver/invoices/'+file_name+'.pdf');
                $('.loading').hide();
            },function (res) {
                console.log(res);
            })
       
    };
	 $scope.current_modal = "case_management";
	 $scope.case_permission_popup = function (cm_id,cm_status,cm_type,status) {
        console.log(status);
        if(status == 'Cancel'){
            $scope.heading_msg='Case Closing';
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=true;
            $scope.check_approve_msg = "Case Has Been Canceled";
        }else if(status == 'Bill'){
            $scope.heading_msg='Edit Case Details';
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=true;
            $scope.check_approve_msg = "Invoice Has Been Generated For This Case";
        }else if(status == 'Reopen'){
            $scope.heading_msg='Reopen Case Details';
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=true;
            $scope.check_approve_msg = "Invoice Has Been Generated For This Case";
        }else{
            $('#generate_password').modal('show');
            check_permission.check_status(cm_id,cm_status,cm_type,$scope.current_modal);
            $scope.comment ={};
            $scope.otp_object = {};
        }
        
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
            $scope.onLoadGetAllCashClientList();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#caseSuccess').fadeIn().delay(5000).fadeOut();
				if(data.type == 'Reopen'){
                $scope.case_success = "Case Details Reopened Successfully";
				}else{
					 $scope.case_success = "Case Details Deleted Successfully";
				}
            }
        }
    });
	
}]);



