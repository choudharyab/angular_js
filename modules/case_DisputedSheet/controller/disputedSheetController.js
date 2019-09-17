var disputedSheetModule= angular.module('disputedSheetModule',[]);
disputedSheetModule.controller('disputedSheetController',['$rootScope','$scope','getAllDisputedList',
'getCustomerListService','getServiceListing',/*'movedToScrutinySheet',*/'searchDisputedList',
'movedToApprovedSheet','getTransportationNameService','updateDisputedRemark','getClientLocationByClientIdForCase',
    function($rootScope,$scope,getAllDisputedList,getCustomerListService,
        getServiceListing/*,movedToScrutinySheet*/,searchDisputedList,movedToApprovedSheet,
        getTransportationNameService,updateDisputedRemark,getClientLocationByClientIdForCase){

        if(localStorage.getItem('company_location') == undefined || localStorage.getItem('company_location') == 'undefined'){
            $scope.location = '';
        }else{
            $scope.location = localStorage.getItem('company_location');
        }

        $scope.disputed_lists = '';
        $('.loading').hide();
        $scope.onLoadGetAllDisputedList = function(){
            $('.loading').show();
            getAllDisputedList({}).then(function (response) {

                for(var i=0;i<response.data.length;i++){
                    response.data[i].ext_km = parseFloat(response.data[i].close_total_service_km) - parseFloat(response.data[i].rules.initials_km);
                    if(response.data[i].ext_km < 0){
                        response.data[i].ext_km = 0;
                    }
                    response.data[i].ext_km_amt = parseFloat(response.data[i].ext_km) * parseFloat(response.data[i].rules.charges_above_initials_km);
                }
                $scope.disputed_lists = response.data;
                $('.loading').hide();
            },function (response) {
                console.log(response);
            });
        };
        $scope.onLoadGetAllDisputedList();

        $scope.get_client_listing = function () {
            getCustomerListService({}).then(function (response) {
                console.log(response);
                $scope.client_listing_details = response.data;
            },function (response) {
                console.log(response);
            })
        };
        $scope.get_client_listing();

        $scope.get_client_location_listing = function (id) {
            getClientLocationByClientIdForCase({
                client_id:id
            }).then(function (response) {
                $scope.client_location_details = response.data;
                $scope.search_disputed_list();
            },function (response) {
                console.log(response);
            })
        };
    $scope.get_client_location_listing();
    
        $scope.set_location_id = function(data){
            $scope.location_data = JSON.parse(data);
            console.log($scope.location_data);
            $scope.client_location_id = $scope.location_data.id;
            $scope.client_location_type = $scope.location_data.type;
            $scope.search_disputed_list();
            $scope.get_service_details($scope.client_id,$scope.client_location_id,$scope.client_location_type);
        }
        
        $scope.get_service_details = function(client_id,client_location_id,client_location_type){
            getServiceListing({
                type:'service',
                client_id: client_id,
                client_location_id: client_location_id,
                client_location_type: client_location_type
            }).then(function (response) {
                $scope.service_details = response.data;
                console.log(response.data);
            },function (response) {
                console.log(response);
            })
        };
        $scope.get_service_details();

        $scope.search_disputed_list = function(){
            console.log('form date ------', $scope.from_date);
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
            $('.loading').show();
            searchDisputedList({
				service_id: $scope.service_id,
				client_id: $scope.client_id,
				/*location: $scope.location,*/
                fromdate: from,
				todate: to
            }).then(function (response) {
                $('.loading').hide();
                $scope.disputed_lists = response.data;
            },function (response) {
                console.log('error');
            });
		};

        $scope.moved_to_approved_sheet = function(type){
            $scope.data = [];
            for(var i=0;i< $scope.selected_case_array.length;i++){
                $scope.obj = {};
                $scope.obj.case_id = $scope.selected_case_array[i];
                $scope.data.push($scope.obj);
            }
            $('.loading').show();
            movedToApprovedSheet({
                type: type,
                data: $scope.data
            }).then(function (response) {
                $('.loading').hide();
                console.log('success');
                $scope.onLoadGetAllDisputedList();
                $scope.selected_case_array = [];
                $scope.case_array = [];
            },function (response) {
                console.log('error');
            });
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
                $scope.case_array_xl = [];
                angular.forEach($scope.disputed_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.disputed_lists--------->',$scope.disputed_lists);
                for(var i=0;i<disputed_data.length;i++){
                   /* $scope.case_obj={
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
                    $scope.case_array_xl.push($scope.case_obj_xl);
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
        $scope.case_array_xl = [];
        $scope.add_selected_cases = function (data) {
            if($scope.selected_case_array.indexOf(data.case_customer.case_id) <= -1){
               /* $scope.case_obj={
                    'case_id':data.case_customer.case_id,
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
                $scope.case_array_xl.push($scope.case_obj_xl);
                $scope.case_obj = {};
                $scope.case_obj_xl={};
                if($scope.disputed_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;

                }

            }else{
                $scope.case_array.splice($scope.case_array.indexOf(data.case_customer.case_id),1);
                $scope.selected_case_array.splice($scope.selected_case_array.indexOf(data.case_customer.case_id),1);
                $scope.case_array_xl.splice($scope.case_array_xl.indexOf(data.case_customer.case_id),1);
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
                alasql('SELECT * INTO XLSX("Disputed_Sheet.xlsx",{headers:true}) FROM ?',[$scope.case_array]);
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

        $scope.open_disputed_modal = function(id){
          $('#example3').modal('show');
          $scope.id = id;
        };

        $scope.update_disputed_remark = function(id){
            updateDisputedRemark({
                case_id:id,
                remark: $scope.disputed_remark
            }).then(function (res) {
                $scope.product_dismiss();
                $scope.disputed_remark = '';
                $scope.onLoadGetAllDisputedList();
            },function (res) {
                console.log(res);
            })
        };
	
}]);



