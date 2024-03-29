var caseScrutinyModule= angular.module('caseScrutinyModule',[]);
caseScrutinyModule.controller('caseScrutinyController',['$rootScope','$scope','getAllScrutinyList','movedToApprovedSheet','getCustomerListService',
'getServiceListing','searchScrutinyList','getTransportationNameService','getClientLocationByClientIdForCase',
    function($rootScope,$scope,getAllScrutinyList,movedToApprovedSheet,getCustomerListService,
        getServiceListing,searchScrutinyList,getTransportationNameService,getClientLocationByClientIdForCase){

    if(localStorage.getItem('company_location') == undefined || localStorage.getItem('company_location') == 'undefined'){
        $scope.location = '';
    }else{
        $scope.location = localStorage.getItem('company_location');
    }

    $scope.scrutiny_lists = '';
    $scope.client_location_type = '';
    $scope.client_location_id = '';
    $scope.selected_case_array == []
    $scope.onLoadGetAllScrutinyList = function(){
        $('.loading').show();
        getAllScrutinyList({}).then(function (response) {
            for(var i=0;i<response.data.length;i++){
                response.data[i].ext_km = parseFloat(response.data[i].close_total_service_km) - parseFloat(response.data[i].rules.initials_km);
                if(response.data[i].ext_km < 0){
                    response.data[i].ext_km = 0;
                }
                response.data[i].ext_km_amt = parseFloat(response.data[i].ext_km) * parseFloat(response.data[i].rules.charges_above_initials_km);
            }
            $scope.scrutiny_lists = response.data;
            $scope.column_data=response.data.charge_data;
            $('.loading').hide();
        },function (response) {
            console.log(response);
        });
    };
    $scope.onLoadGetAllScrutinyList();
    
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
            $scope.search_scrutiny_list();
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
        $scope.search_scrutiny_list();
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

    /*$scope.generate_scrutiny_sheet_bill = function () {

    };*/

    $scope.search_scrutiny_list = function(){
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
            var to ='';
        }
        $('.loading').show();
        searchScrutinyList({
            service_id: $scope.service_id,
            client_id: $scope.client_id,
           client_location_id:$scope.client_location_id,
            fromdate: from,
            todate: to
        }).then(function (response) {
            $('.loading').hide();
            $scope.scrutiny_lists = response.data;
        },function (response) {
            console.log('error');
        });
    };

    $scope.checkAll=function (scrutiny_data) {
        console.log('$scope.selectedAll---->',$scope.selectedAll);
            if ($scope.selectedAll == '' || $scope.selectedAll == false || $scope.selectedAll == undefined) {
                $scope.case_array = [];
                $scope.case_array_xl = [];
                $scope.selected_case_array = [];
                $scope.selectedAll = true;

                angular.forEach($scope.scrutiny_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.scrutiny_lists--------->',$scope.scrutiny_lists);
                for(var i=0;i<scrutiny_data.length;i++){

                 /*   $scope.case_obj={
                        'case_id':scrutiny_data[i].case_customer.case_id,
                        'case_no':scrutiny_data[i].case_no,
                        'casedate':scrutiny_data[i].casedate,
                        'vehicle_make':scrutiny_data[i].case_customer.vehicle_make,
                        'route_map':scrutiny_data[i].case_customer.close_route_map,
                        'customer_name':scrutiny_data[i].case_customer.customer_name,
                        'service_type':scrutiny_data[i].service[0].service_name,
                        'Towing/RSR KM':scrutiny_data[i].close_total_service_km,
                        'Towing Charges':scrutiny_data[i].close_towing_charges,
                        'Total Amount':scrutiny_data[i].total
                    };*/

                    $scope.case_obj_xl={
                        'case_id':scrutiny_data[i].case_customer.case_id,
                        'casedate':scrutiny_data[i].casedate,
                        'case_no':scrutiny_data[i].case_no,
                        'service_type':scrutiny_data[i].service[0].service_name,
                        'vehicle_make':scrutiny_data[i].case_customer.vehicle_make,
                        'vehicle_no':scrutiny_data[i].case_customer.vehicle_reg_no,
                        'total_km':scrutiny_data[i].close_total_service_km,
                        'base_km':scrutiny_data[i].rules.initials_km,
                        'base_price':scrutiny_data[i].rules.charges_initials_km,
                        'rate_per_km':scrutiny_data[i].rules.charges_above_initials_km,
                        'ext_km':scrutiny_data[i].ext_km,
                        'ext_km_amt':scrutiny_data[i].ext_km_amt,
                        'waiting_charges':scrutiny_data[i].waiting_total_amount,
                        'custody_charges':scrutiny_data[i].custody_total_amount,
                        'grand_total':scrutiny_data[i].total_case_amount,
                        'route_map':scrutiny_data[i].close_route_map,
                        'customer_name':scrutiny_data[i].case_customer.customer_name,
                        
                        
                        'towing_charges':scrutiny_data[i].close_towing_charges,
                        'total_amount':scrutiny_data[i].total_amount,
                        'tax_name': scrutiny_data[i].tax_name,
                        'tax_amount': scrutiny_data[i].total_case_tax,
                        'charge_data': scrutiny_data[i].charge_data,
                        'total': scrutiny_data[i].total
                     };

                    if(scrutiny_data[i].tax_name == 'GST'){
                        $scope.case_obj={
                            'case_id':scrutiny_data[i].case_customer.case_id,
                            'casedate':scrutiny_data[i].casedate,
                            'case_no':scrutiny_data[i].case_no,
                            'service_type':scrutiny_data[i].service[0].service_name,
                            'vehicle_make':scrutiny_data[i].case_customer.vehicle_make,
                            'vehicle_no':scrutiny_data[i].case_customer.vehicle_reg_no,
                            'total_km':scrutiny_data[i].close_total_service_km,
                            'base_km':scrutiny_data[i].rules.initials_km,
                            'base_price':scrutiny_data[i].rules.charges_initials_km,
                            'rate_per_km':scrutiny_data[i].rules.charges_above_initials_km,
                            'ext_km':scrutiny_data[i].ext_km,
                            'ext_km_amt':scrutiny_data[i].ext_km_amt,
                            'waiting_charges':scrutiny_data[i].waiting_total_amount,
                            'custody_charges':scrutiny_data[i].custody_total_amount,
                            'amount':scrutiny_data[i].total_case_amount,
                            'sgst':scrutiny_data[i].total_case_tax/2,
                            'cgst':scrutiny_data[i].total_case_tax/2,
                            'igst':'',
                            'route_map':scrutiny_data[i].close_route_map,
                            'customer_name':scrutiny_data[i].case_customer.customer_name,
                            'service_type':scrutiny_data[i].service[0].service_name,
                            'Towing/RSR KM':scrutiny_data[i].close_total_service_km,
                            'Towing Charges':scrutiny_data[i].close_towing_charges,
                            
                            'Total Amount':scrutiny_data[i].total,
                            'case_remark': scrutiny_data[i].close_notes,
                            'total': scrutiny_data[i].total
                        };
                    }

                    if(scrutiny_data[i].tax_name == 'IGST'){
                        $scope.case_obj={
                            'case_id':scrutiny_data[i].case_customer.case_id,
                            'case_no':scrutiny_data[i].case_no,
                            'casedate':scrutiny_data[i].casedate,
                            'vehicle_make':scrutiny_data[i].case_customer.vehicle_make,
                            'vehicle_no':scrutiny_data[i].case_customer.vehicle_reg_no,
                            'route_map':scrutiny_data[i].close_route_map,
                            'customer_name':scrutiny_data[i].case_customer.customer_name,
                            'service_type':scrutiny_data[i].service[0].service_name,
                            'Towing/RSR KM':scrutiny_data[i].close_total_service_km,
                            'Towing Charges':scrutiny_data[i].close_towing_charges,
                            'sgst@9%':'',
                            'cgst@9%':'',
                            'igst@18%':scrutiny_data[i].total_case_tax,
                            'Total Amount':scrutiny_data[i].total
                        };
                    }

                    if(scrutiny_data[i].tax_name == '' || scrutiny_data[i].tax_name == null || scrutiny_data[i].tax_name == undefined){
                        $scope.case_obj={
                            'case_id':scrutiny_data[i].case_customer.case_id,
                            'case_no':scrutiny_data[i].case_no,
                            'casedate':scrutiny_data[i].casedate,
                            'vehicle_make':scrutiny_data[i].case_customer.vehicle_make,
                            'route_map':scrutiny_data[i].close_route_map,
                            'customer_name':scrutiny_data[i].case_customer.customer_name,
                            'service_type':scrutiny_data[i].service[0].service_name,
                            'Towing/RSR KM':scrutiny_data[i].close_total_service_km,
                            'Towing Charges':scrutiny_data[i].close_towing_charges,
                            'sgst@9%':'',
                            'cgst@9%':'',
                            'igst@18%':'',
                            'Total Amount':scrutiny_data[i].total
                        };
                    }



                    angular.forEach($scope.charge_details, function(value, key) {
                           console.log('key----',key);
                           console.log('value----',value);
                           $scope.case_obj[value.transportation_name] = scrutiny_data[i].charge_data[key].charge_amount;
                           $scope.case_obj_xl[value.transportation_name] = scrutiny_data[i].charge_data[key].charge_amount;
                       });

                    $scope.case_array.push($scope.case_obj);
                    $scope.selected_case_array.push($scope.case_obj.case_id);

                    $scope.case_array_xl.push($scope.case_obj_xl);
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
                $scope.case_array_xl = [];

                for(var k=0;k<$scope.scrutiny_lists.length;k++){
                    document.getElementById('case_check_'+$scope.scrutiny_lists[k].case_customer.case_id).checked = false;
                }

            }
        };

        $scope.selected_case_array = [];
        $scope.case_array = [];

        //$scope.selected_case_array = [];
        $scope.case_array_xl = [];

        $scope.add_selected_cases = function (data) {
            console.log(data);
            if($scope.selected_case_array.indexOf(data.case_customer.case_id) <= -1){
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
                    'routemap':data.close_route_map,
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
                      'sgst@9%':data.total_case_tax/2,
                      'cgst@9%':data.total_case_tax/2,
                      'igst@18%':'',
                      'Total Amount':data.total
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
                        'igst@18%':data.total_case_tax,
                        'Total Amount':data.total
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
                        'Total Amount':data.total
                    };
                }


                angular.forEach($scope.charge_details, function(value, key) {
                    $scope.case_obj[value.transportation_name] = data.charge_data[key].charge_amount;
                });

                angular.forEach($scope.charge_details, function(value, key) {
                    $scope.case_obj_xl[value.transportation_name] = data.charge_data[key].charge_amount;
                });

                $scope.selected_case_array.push(data.case_customer.case_id);
                $scope.case_array.push($scope.case_obj);

                //$scope.selected_case_array_xl.push(data.case_customer.case_id);
                $scope.case_array_xl.push($scope.case_obj_xl);

                console.log($scope.case_obj_xl)
                $scope.case_obj = {};
                $scope.case_obj_xl={};
                if($scope.scrutiny_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }

            }else{
                $scope.case_array.splice($scope.case_array.indexOf(data.case_customer.case_id),1);
                $scope.selected_case_array.splice($scope.selected_case_array.indexOf(data.case_customer.case_id),1);

                $scope.case_array_xl.splice($scope.case_array_xl.indexOf(data.case_customer.case_id),1);
                //$scope.selected_case_array.splice($scope.selected_case_array.indexOf(data.case_customer.case_id),1);

                if($scope.scrutiny_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }

            }
        };

        $scope.moved_to_approved_sheet = function(type){
            $scope.data = [];
            for(var i=0;i< $scope.selected_case_array.length;i++){
               $scope.obj = {};
               $scope.obj.case_id = $scope.selected_case_array[i];
               $scope.data.push($scope.obj);
            }
            movedToApprovedSheet({
                type: type,
                data: $scope.data
            }).then(function (response) {
                console.log('success');
                $scope.onLoadGetAllScrutinyList();
                $scope.selected_case_array = [];
                $scope.case_array = [];
            },function (response) {
                console.log('error');
            });
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
	/*$scope.export = function(){
		var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
		$scope.gridApi.exporter.csvExport( $scope.export_row_type, $scope.export_column_type, myElement );

	};*/
	var print_data;
	$scope.print_array=[];
	$scope.print_id=[];
	console.log('case scrutiny controller called');
	//$scope.print_data=[{'case_id':'','date':'','model':''}];
	/*$scope.scrutiny_lists=[
        {
        	'id':1,
            'case_id':'1',
			'date':'2',
			'model':'3'
		},
		{
			'id':2,
            'case_id':'11',
            'date':'21',
            'model':'31'
		},
		{
			'id':3,
            'case_id':'12',
            'date':'22',
            'model':'32'
		}
	];*/
	/*$scope.get_checked_data=function (data) {
        if($scope.print_id.indexOf(data.id) <= -1) {
            print_data = {
                'case_id': data.case_id,
                'date': data.date,
                'model': data.model
            };
            console.log('print data', print_data);
            $scope.print_id.push(data.id);
            $scope.print_array.push(print_data);
            console.log('print array', $scope.print_array);
            console.log('print id', $scope.print_id);
        }else{
            $scope.print_array.splice($scope.print_id.indexOf(data.id),1);
            $scope.print_id.splice($scope.print_id.indexOf(data.id),1);
            console.log('print array',$scope.print_array);
            console.log('$scope.print_id-->',$scope.print_id);
		}
	};*/

    $scope.exportData = function () {
        console.log($scope.selected_case_array.length);
        if($scope.selected_case_array.length<= 0 ){
            alert('Please select cases first');
        }else{
            alasql('SELECT * INTO XLSX("Scrutiny_Sheet.xlsx",{headers:true}) FROM ?',[$scope.case_array]);
        }
            
    };


}]);



