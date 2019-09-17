var caseApprovedModule= angular.module('caseApprovedModule',[]);
caseApprovedModule.controller('caseApprovedController',['$rootScope','$scope','getAllApprovedList','getCustomerListService','getServiceListing'/*,
'movedToScrutinySheet'*/,'searchApprovedList','getTransportationNameService','movedToApprovedSheet',
'updateDisputedRemark','saveBillData','getClientLocationByClientIdForCase',
    function($rootScope,$scope,getAllApprovedList,getCustomerListService,getServiceListing/*,movedToScrutinySheet*/,searchApprovedList,
        getTransportationNameService,movedToApprovedSheet,updateDisputedRemark,saveBillData,getClientLocationByClientIdForCase){

            var sum=0,tax_sum=0;
        var temp=0,temp1=0,temp2=0;
        $scope.selected_case_array = [];
        $scope.case_array = [];
        $scope.case_data=[];
        $scope.charge_data=[];
        $scope.case_column_array = [];
        $scope.case_total_array=[];
	if(localStorage.getItem('company_location') == undefined || localStorage.getItem('company_location') == 'undefined'){
        $scope.location = '';
	}else{
        $scope.location = localStorage.getItem('company_location');
    }
    $scope.bill={};
    $scope.approved_lists = '';
    $('.loading').hide();
    $scope.onLoadGetAllApprovedList = function(){
        $('.loading').show();
		getAllApprovedList({}).then(function (response) {
            for(var i=0;i<response.data.length;i++){
                response.data[i].ext_km = parseFloat(response.data[i].close_total_service_km) - parseFloat(response.data[i].rules.initials_km);
                if(response.data[i].ext_km < 0){
                    response.data[i].ext_km = 0;
                }
                response.data[i].ext_km_amt = parseFloat(response.data[i].ext_km) * parseFloat(response.data[i].rules.charges_above_initials_km);
            }
			$scope.approved_lists = response.data;
            $('.loading').hide();
		},function (response) {
			console.log(response);
		});
    };
    $scope.onLoadGetAllApprovedList();

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
            $scope.search_approved_list();
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
        $scope.search_approved_list();
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

    

    $scope.search_approved_list = function(){
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
        searchApprovedList({
            service_id: $scope.service_id,
            client_id: $scope.client_id,
           /* location: $scope.location,*/
            fromdate: from,
            todate: to
        }).then(function (response) {
            $scope.approved_lists = response.data;
            $('.loading').hide();
        },function (response) {
            console.log('error');
        });
    };

        $scope.open_approved_modal = function(id){
            $('#example3').modal('show');
            $scope.id = id;
        };

        $scope.update_approved_remark = function(id){
            updateDisputedRemark({
                case_id:id,
                remark: $scope.approved_remark
            }).then(function (res) {
                $scope.product_dismiss();
                $scope.disputed_remark = '';
                $scope.onLoadGetAllApprovedList();
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
                    $scope.onLoadGetAllApprovedList();
                    $scope.selected_case_array = [];
                    $scope.case_array = [];
                },function (response) {
                    console.log('error');
                });
            };*/

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
                $scope.onLoadGetAllApprovedList();
                $scope.selected_case_array = [];
                $scope.case_array = [];
            },function (response) {
                console.log('error');
            });
        };
        $scope.getTransportationName = function () {
        getTransportationNameService({}).then(function (res) {
            $scope.charge_details = res.data;
            $scope.case_column_array=res.data;
            charge = res.data;
           console.log(res.data);
        },function (res) {
            console.log(res);
        })
    };
    $scope.getTransportationName(); 

    $scope.checkAll=function (approved_data) {
        console.log('$scope.selectedAll---->',$scope.selectedAll);
        if ($scope.selectedAll == '' || $scope.selectedAll == false || $scope.selectedAll == undefined) {
                $scope.case_array = [];
                $scope.selected_case_array = [];
                $scope.selectedAll = true;
                $scope.case_array_xl = [];
                angular.forEach($scope.approved_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.approved_lists--------->',$scope.approved_lists);
                for(var i=0;i<approved_data.length;i++){
                   /* $scope.case_obj={
                        'case_id':approved_data[i].case_customer.case_id,
                        'case_no':approved_data[i].case_no,
                        'casedate':approved_data[i].casedate,
                        'vehicle_make':approved_data[i].case_customer.vehicle_make,
                    };*/

                    $scope.case_obj_xl={
                        'case_id':approved_data[i].case_customer.case_id,
                        'casedate':approved_data[i].casedate,
                        'case_no':approved_data[i].case_no,
                        'service_type':approved_data[i].service[0].service_name,
                        'vehicle_make':approved_data[i].case_customer.vehicle_make,
                        'vehicle_no':approved_data[i].case_customer.vehicle_reg_no,
                        'total_km':approved_data[i].close_total_service_km,
                        'base_km':approved_data[i].rules.initials_km,
                        'base_price':approved_data[i].rules.charges_initials_km,
                        'rate_per_km':approved_data[i].rules.charges_above_initials_km,
                        'ext_km':approved_data[i].ext_km,
                        'ext_km_amt':approved_data[i].ext_km_amt,
                        'waiting_charges':approved_data[i].waiting_total_amount,
                        'custody_charges':approved_data[i].custody_total_amount,
                        'grand_total':approved_data[i].total_case_amount,
                        'route_map':approved_data[i].close_route_map,
                        'customer_name':approved_data[i].case_customer.customer_name,
                        'towing_charges':approved_data[i].close_towing_charges,
                        'total_amount':approved_data[i].total_amount,
                        'tax_name': approved_data[i].tax_name,
                        'tax_amount': approved_data[i].total_case_tax,
                        'charge_data': approved_data[i].charge_data,
                        'case_remark': approved_data[i].close_notes,
                        'total': approved_data[i].total
                     };
                    if(approved_data[i].tax_name == 'GST'){
                        $scope.case_obj={
                            'case_id':approved_data[i].case_customer.case_id,
                            'case_no':approved_data[i].case_no,
                            'casedate':approved_data[i].casedate,
                            'vehicle_make':approved_data[i].case_customer.vehicle_make,
                            'route_map':approved_data[i].close_route_map,
                            'customer_name':approved_data[i].case_customer.customer_name,
                            'service_type':approved_data[i].service[0].service_name,
                            'Towing/RSR KM':approved_data[i].close_total_service_km,
                            'Towing Charges':approved_data[i].close_towing_charges,
                            'sgst@9%':approved_data[i].tax_amount/2,
                            'cgst@9%':approved_data[i].tax_amount/2,
                            'igst@18%':'',
                            'Total Amount':approved_data[i].total,
                            'Remark': approved_data[i].remark
                        };
                    }

                    if(approved_data[i].tax_name == 'IGST'){
                        $scope.case_obj={
                            'case_id':approved_data[i].case_customer.case_id,
                            'case_no':approved_data[i].case_no,
                            'casedate':approved_data[i].casedate,
                            'vehicle_make':approved_data[i].case_customer.vehicle_make,
                            'route_map':approved_data[i].close_route_map,
                            'customer_name':approved_data[i].case_customer.customer_name,
                            'service_type':approved_data[i].service[0].service_name,
                            'Towing/RSR KM':approved_data[i].close_total_service_km,
                            'Towing Charges':approved_data[i].close_towing_charges,
                            'sgst@9%':'',
                            'cgst@9%':'',
                            'igst@18%':approved_data[i].tax_amount,
                            'Total Amount':approved_data[i].total,
                            'Remark': approved_data[i].remark
                        };
                    }

                    if(approved_data[i].tax_name == '' || approved_data[i].tax_name == null || approved_data[i].tax_name == undefined){
                        $scope.case_obj={
                            'case_id':approved_data[i].case_customer.case_id,
                            'case_no':approved_data[i].case_no,
                            'casedate':approved_data[i].casedate,
                            'vehicle_make':approved_data[i].case_customer.vehicle_make,
                            'route_map':approved_data[i].close_route_map,
                            'customer_name':approved_data[i].case_customer.customer_name,
                            'service_type':approved_data[i].service[0].service_name,
                            'Towing/RSR KM':approved_data[i].close_total_service_km,
                            'Towing Charges':approved_data[i].close_towing_charges,
                            'sgst@9%':'',
                            'cgst@9%':'',
                            'igst@18%':'',
                            'Total Amount':approved_data[i].total,
                            'Remark': approved_data[i].remark
                        };
                    }



                    angular.forEach($scope.charge_details, function(value, key) {
                        console.log('key----',key);
                        console.log('value----',value);
                        $scope.case_obj[value.transportation_name] = approved_data[i].charge_data[key].charge_amount;
                    });


                    $scope.case_data_obj={
                        'case_id':approved_data[i].case_customer.case_id,
                        'case_no':approved_data[i].case_no,
                        'towing_charges':approved_data[i].close_towing_charges,
                        'tax_amount':approved_data[i].tax_amount,
                        'tax_name':approved_data[i].tax_name,
                        'total':approved_data[i].total,
                        'subtotal':approved_data[i].subtotal,
                        'charge_data':approved_data[i].charge_data,
                        'tax_id':approved_data[i].tax_id,
                        'tax_rate':approved_data[i].tax_rate,
                        'company_id':approved_data[i].company_id,
                        'tax_type':approved_data[i].tax_type,
                        'client_id': approved_data[i].client_id,
                        'service_id': approved_data[i].service_id
                    };
                $scope.charge_data_obj={
                    'charge_data':approved_data[i].charge_data,
                    
                };
                    // for(var j=0;j<approved_data[i].charge_data.length;j++){
                    //     $scope.case_column_array[j]=approved_data[i].charge_data[j].transportation_name;
    
                    // }
                    $scope.case_array.push($scope.case_obj);
                    $scope.selected_case_array.push($scope.case_obj.case_id);
                    $scope.case_data.push($scope.case_data_obj);
                    $scope.charge_data.push($scope.charge_data_obj);
                    $scope.case_array_xl.push($scope.case_obj_xl);
                    // var sum=0,tax_sum=0;
                    // var temp=0,temp1=0,temp2=0;
                    // for(var j=0;j<$scope.case_array.length;j++){
                    //     console.log('in');
                    //     if($scope.case_array[j].towing_charges!=null && $scope.case_array[j].towing_charges!='' && $scope.case_array[j].towing_charges!='undefined'){
                    //         $scope.towing_total=sum + parseFloat($scope.case_array[j].towing_charges);
                    //     }else{
                    //         $scope.towing_total=0;
                    //     }
                    //     if($scope.case_array[j].tax_amount!=null && $scope.case_array[j].tax_amount!='' && $scope.case_array[j].tax_amount!='undefined'){
                    //         $scope.tax_amount_total=tax_sum + parseFloat($scope.case_array[j].tax_amount);
                    //     }else{
                    //         $scope.tax_amount_total=0;
                    //     }
                    //     if($scope.case_array[j].subtotal!=null && $scope.case_array[j].subtotal!='undefined' && $scope.case_array[j].subtotal!=''){
                    //         $scope.subtotal_total=temp1 + parseFloat($scope.case_array[j].subtotal);
                    //     }else{
                    //         $scope.subtotal_total=0;
                    //     }
                    //     if($scope.case_array[j].total!=null && $scope.case_array[j].total!='undefined' && $scope.case_array[j].total!=''){
                    //         $scope.grand_total_total=temp2 + parseFloat($scope.case_array[j].total);
                    //     }else{
                    //         $scope.grand_total_total=0;
                    //     }
                        
                    //     for(var k=0;k<$scope.case_array[j].charge_data.length;k++){
                    //         if($scope.case_array[j].charge_data[k].charge_amount!=null && $scope.case_array[j].charge_data[k].charge_amount!='undefined' && $scope.case_array[j].charge_data[k].charge_amount!=''){
                    //             $scope.case_total_array[k]=temp+parseFloat($scope.case_array[j].charge_data[k].charge_amount);
                    //         }else{
                    //             $scope.case_total_array[k]=0;
                    //         }
                            
                    //     }
                        
                    // }
                }
                $scope.getTransportationName();
                $scope.case_obj = {};
                $scope.column_obj={};
                $scope.case_data_obj={};
                $scope.charge_data_obj={};
                console.log('$scope.selected_case_array--------->',$scope.selected_case_array);

                for(var l=0;l<$scope.approved_lists.length;l++){
                    document.getElementById('case_check_'+$scope.approved_lists[l].case_customer.case_id).checked = true;
                }
            } else {
                $scope.selectedAll = false;
                angular.forEach($scope.approved_lists, function (item) {
                    item.Selected = $scope.selectedAll;
                });
                console.log('$scope.approved_lists--------->',$scope.approved_lists);
                $scope.selected_case_array = [];
                $scope.case_array = [];
                $scope.case_data = [];
                $scope.charge_data = [];

                for(var k=0;k<$scope.approved_lists.length;k++){
                    document.getElementById('case_check_'+$scope.approved_lists[k].case_customer.case_id).checked = false;
                }

            }
        };
        $scope.case_array_xl = [];
        $scope.add_selected_cases = function (data) {
            console.log(data);
            if($scope.selected_case_array.indexOf(data.id) <= -1){
               /* $scope.case_obj={
                    'case_id':data.id,
                    'case_no':data.case_no,
                    'casedate':data.casedate,
                    'vehicle_make':data.case_customer.vehicle_make
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
                        'Remark': data.remark,
                        'client_id': data.client_id,
                        'service_id': data.service_id
                    };
                }

                angular.forEach($scope.charge_details, function(value, key) {
                    $scope.case_obj[value.transportation_name] = data.charge_data[key].charge_amount;
                });


                $scope.case_data_obj={
                    'case_id':data.id,
                    'case_no':data.case_no,
                    'towing_charges':data.close_towing_charges,
                    'tax_amount':data.tax_amount,
                    'tax_name':data.tax_name,
                    'total':data.total,
                    'subtotal':data.subtotal,
                    'charge_data':data.charge_data,
                    'tax_id':data.tax_id,
                    'tax_rate':data.tax_rate,
                    'company_id':data.company_id,
                    'tax_type':data.tax_type,
                    'client_id': data.client_id,
                        'service_id': data.service_id
                };
                $scope.charge_data_obj={
                    'charge_data':data.charge_data
                };
                // for(var i=0;i<data.charge_data.length;i++){
                //     $scope.case_column_array[i]=data.charge_data[i].transportation_name;
                // }
                $scope.getTransportationName();
               $scope.case_data.push($scope.case_data_obj);
                $scope.charge_data.push($scope.charge_data_obj);
              //  $scope.column_obj={};
               // $scope.case_data_obj={};
                //$scope.charge_data_obj={};

                /**/
                if($scope.case_data.indexOf($scope.case_data_obj) <= -1){
                    $scope.case_data.push($scope.case_data_obj);
                    $scope.case_data_obj={};
                    console.log('$scope.case_data==if===',$scope.case_data);
                }/*else{
                    $scope.case_data.splice($scope.case_data.indexOf($scope.case_data_obj),1);
                    console.log('$scope.case_data==else===',$scope.case_data);
                }*/

                /**/
                
                $scope.selected_case_array.push(data.id);
                $scope.case_array.push($scope.case_obj);
                $scope.case_array_xl.push($scope.case_obj_xl);
                $scope.case_obj = {};
                $scope.case_obj_xl={};

                if($scope.approved_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }

            }else{
                console.log('$scope.selected_case_array.indexOf(data.id)-----------',$scope.selected_case_array.indexOf(data.id));
                /**/
                $scope.case_data_obj={
                    'case_id':data.id,
                    'case_no':data.case_no,
                    'towing_charges':data.close_towing_charges,
                    'tax_amount':data.tax_amount,
                    'tax_name':data.tax_name,
                    'total':data.total,
                    'subtotal':data.subtotal,
                    'charge_data':data.charge_data,
                    'tax_id':data.tax_id,
                    'tax_rate':data.tax_rate,
                    'company_id':data.company_id,
                    'tax_type':data.tax_type,
                    'client_id': data.client_id,
                        'service_id': data.service_id
                };
                $scope.getTransportationName();
                if($scope.selected_case_array.indexOf(data.id) > -1){
                    $scope.case_data.splice($scope.case_data.indexOf($scope.case_data_obj),1);
                    console.log('$scope.case_data==else===',$scope.case_data);
                }


                /**/



                $scope.case_array.splice($scope.case_array.indexOf(data.id),1);
                $scope.selected_case_array.splice($scope.selected_case_array.indexOf(data.id),1);
                $scope.case_array_xl.splice($scope.case_array_xl.indexOf(data.case_customer.case_id),1);

                if($scope.approved_lists.length == $scope.selected_case_array.length){
                    $scope.selectedAll = true;
                }else{
                    $scope.selectedAll = false;
                }

            }
            console.log($scope.towing_total);
            console.log($scope.case_array);
            console.log($scope.case_column_array);
        };

        $scope.generate_bill=function(){
            console.log('function called');
             if(($scope.client_id!=null && $scope.client_id!='undefined' && $scope.client_id!='') && ($scope.selected_case_array.length>0)){
                $('#add_bill').modal('show');
                console.log($scope.case_array);
                $scope.towing_total=0;
                $scope.tax_amount_total=0;
                $scope.subtotal_total=0;
                $scope.grand_total_total=0;

                $scope.arr = [];
                console.log('$scope.case_array-------->',$scope.case_array);
                console.log('$scope.case_data-------->',$scope.case_data);
                for(var j=0;j<$scope.case_data.length;j++){

                  

                    console.log($scope.case_data.length);
                    if($scope.case_data[j].towing_charges!=null && $scope.case_data[j].towing_charges!='' && $scope.case_data[j].towing_charges!='undefined'){
                        $scope.towing_total=$scope.towing_total + parseFloat($scope.case_data[j].towing_charges);
                    }else{
                        $scope.towing_total=0;
                    }
                    if($scope.case_data[j].tax_amount!=null && $scope.case_data[j].tax_amount!='' && $scope.case_data[j].tax_amount!='undefined'){
                        $scope.tax_amount_total=$scope.tax_amount_total + parseFloat($scope.case_data[j].tax_amount);
                    }
                    // else{
                    //     $scope.tax_amount_total=0;
                    // }
                    if($scope.case_data[j].subtotal!=null && $scope.case_data[j].subtotal!='undefined' && $scope.case_data[j].subtotal!=''){
                        $scope.subtotal_total=$scope.subtotal_total + parseFloat($scope.case_data[j].subtotal);
                    }else{
                        $scope.subtotal_total=0;
                    }
                    if($scope.case_data[j].total!=null && $scope.case_data[j].total!='undefined' && $scope.case_data[j].total!=''){
                        $scope.grand_total_total=$scope.grand_total_total + parseFloat($scope.case_data[j].total);
                    }else{
                        $scope.grand_total_total=0;
                    }

                    for(var n=0;n<$scope.case_data[j].charge_data.length;n++){
                        console.log('$scope.arr----',$scope.arr);
                        console.log('$scope.arr[n]----',$scope.arr[n]);
                        if($scope.case_data[j].charge_data[n].charge_amount == ''){
                            $scope.case_data[j].charge_data[n].charge_amount = 0;
                        }

                        if($scope.arr[n] == undefined || $scope.arr[n] == 'undefined' || $scope.arr[n] == '' || $scope.arr[n] == null){
                            $scope.arr[n] = 0;
                        }
                        /*if(!$scope.case_data[j].charge_data[n].total){
                            $scope.case_data[j].charge_data[n].total = $scope.case_data[j].charge_data[n].charge_amount;
                        }else{
                            $scope.case_data[j].charge_data[n].total = parseFloat($scope.case_data[j].charge_data[n].total) + parseFloat($scope.case_data[j].charge_data[n].charge_amount);
                        }*/
                        if($scope.arr.length == 0){
                            $scope.arr.push($scope.case_data[j].charge_data[n].charge_amount);
                            console.log('$scope.arr----',$scope.arr);
                        }else{
                            $scope.arr[n] = parseFloat($scope.arr[n]) + parseFloat($scope.case_data[j].charge_data[n].charge_amount);
                            console.log('$scope.arr----',$scope.arr);
                        }
                    }

                    
                }
                console.log('$scope.case_data----',$scope.case_data);
                console.log('$scope.arr----',$scope.arr);
                // $scope.data_array=[];
                // for(var k=0;k<$scope.charge_data.length;k++){
                //     $scope.charge_data[k]=0;
                //     for(var m=0;m<$scope.charge_data[k].charge_data.length;m++){
                //         $scope.data_array[m]=$scope.charge_data[k].charge_data[k].charge_amount;
                //         $scope.charge_data[k].total=parseFloat($scope.charge_data[k].total) + parseFloat($scope.data_array[m]);
                //     }
                // }
                // console.log($scope.charge_data);

            }else{
             $scope.alert_heading = 'Alert';
                $scope.check_alert_msg="Please Select Client and Cases...!!";
                $('#alert_box').modal('show');
                //alert('Please Select Client and Service Type...!!');
            }
            
        };

    $scope.exportData = function () {
        if($scope.selected_case_array.length<= 0 ){
            alert('Please select cases first');
        }else{
            alasql('SELECT * INTO XLSX("Approved_Sheet.xlsx",{headers:true}) FROM ?',[$scope.case_array]);
        }
    };
    
    
    
    $scope.save_bill_data=function(){
        console.log(JSON.stringify($scope.case_array));
        // $scope.case_data=[{'case_id':'','case_no':'','towing_charges':'','tax_amount':'','subtotal':'','total':'','charge_data':[]}];
        // for(var i=0;i<$scope.case_array.length;i++){
        //     $scope.case_data[i].case_id=$scope.case_array[i].case_id;
        //     $scope.case_data[i].case_no=$scope.case_array[i].case_no;
        //     $scope.case_data[i].towing_charges=$scope.case_array[i].towing_charges;
        //     $scope.case_data[i].tax_amount=$scope.case_array[i].tax_amount;
        //     $scope.case_data[i].subtotal=$scope.case_array[i].subtotal;
        //     $scope.case_data[i].total=$scope.case_array[i].total;
        //     $scope.case_data[i].charge_data=$scope.case_array[i].charge_data;
        // }
        //$scope.bill.total_array=$scope.case_total_array;
        saveBillData({
            date:$scope.date,
            invoice_no:$scope.invoice_no,
            invoice_type:$scope.invoice_type,
            description:$scope.description,
            client_id:$scope.client_id,
            service_id:$scope.service_id,
            reverse_charge:$scope.applicable,
            case_data:$scope.case_data,
            note: $scope.note
            //charge_data:$scope.charge_data
            
        }).then(function (res) {
            $scope.modal_dismiss_three();
            $scope.bill = {};
            $scope.onLoadGetAllApprovedList();
            $scope.alert_heading = 'Success';
            $scope.check_alert_msg="Invoice Generated Successfully...!!";
            $('#alert_box').modal('show');
            
        },function (res) {
            console.log(res);
        })
    }
}]);



