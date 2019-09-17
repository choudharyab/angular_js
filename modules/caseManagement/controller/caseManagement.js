var caseManagementModule= angular.module('caseManagementModule',['ngBootbox']);
caseManagementModule.controller('caseManagementController',['$rootScope','$scope','$location','$route','$timeout',
    '$filter','$window','getClientList','getServiceList','getStateListService','vehicleAutoComplete','chargeListService',
    'getTaxRateService','saveCaseManagementData','getCaseDetailsById','updateCaseManagementData','getCaseDetailsList','approveCaseStatus','commonService',
    'saveCaseClosingData','getClientWiseRules','checkCustomerStatus','cancelCaseStatus','getLocationListing',
    'getClientLocationByClientIdForCase','getTaxIdByChargeId',
    function($rootScope,$scope,$location,$route,$timeout,$filter,$window,getClientList,getServiceList,getStateListService,
             vehicleAutoComplete,chargeListService,getTaxRateService,saveCaseManagementData,getCaseDetailsById,updateCaseManagementData,
             getCaseDetailsList,approveCaseStatus,check_permission,saveCaseClosingData,getClientWiseRules,checkCustomerStatus,
             cancelCaseStatus,getLocationListing,getClientLocationByClientIdForCase,getTaxIdByChargeId){
    console.log('controller called');
    console.log($rootScope.current_module_rights);
    console.log(localStorage.getItem('warehouse_state_id'));
    $scope.case_details={};
    $scope.case_closing={};
    $scope.case={};
    var total_charge_amt=0;
    var case_id,case_approve_id,case_close_id;
    var initial_km,initial_charge,above_charge;
    var state,c_id;
    $scope.check_charge_total = '';
    $scope.waiting_tax = '';
    $scope.custody_tax = '';
    $scope.tax_data = {};
    $scope.tax_data.tax_rate = 18;
    $('.loading').hide();
    /*$scope.add_more_charges=function () {
        console.log('function called');
        $scope.case_details.charges_details.push({'charge_id':'','charge_amt':'','tax_rate':'','tax_total':'','total_charge':''});
    };*/

    $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };

    $scope.hide_tab1=false;
    $scope.hide_tab2=false;
    $scope.hide_tab3=true;

    $scope.add_btn_clicked=function(){
        
            $scope.case_details={};
            $scope.client = '';
            $scope.tax_data.tax_rate = 18;
            $scope.case_details.case_date=$filter('date')(new Date(),'dd/MM/yyyy');
            $scope.time=$filter('date')(new Date(),'dd/MM/yyyy HH:mm');
            $scope.case_details.case_time=$scope.time.split(' ')[1] ;
            console.log($scope.case_details.case_date);
            $scope.hide_case_no=true;
            $scope.case_details.company_id=localStorage.getItem('warehouse_id');
            $('#add_case_details').modal('show');
            $('#1').tab('show');
            var temp1 = $filter('date')(new Date(),'dd/MM/yyyy HH:mm'); 
            $('#case_activation_time').val(temp1);
    };

    $scope.get_location_details = function(){
        getLocationListing({}).then(function (response) {
            $scope.location_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_location_details();



    $scope.data = {
        transportaion:[{ transportation_charge_id:"",tax_id: "",charge_amount: "",tax_total:"",total_charge_amount:""}]
    };
    $scope.case_details.company_id=localStorage.getItem('warehouse_id');
    $scope.get_case_details = function () {
        console.log($location.url().split("/")[1]);
        $scope.url = $location.url().split("/")[1];
        getCaseDetailsList({
            type: $location.url().split("/")[1]
        }).then(function (resposne) {
            console.log(resposne);
            $scope.case_details_list = resposne.data;
        });
    };
    $scope.get_case_details();

    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();

    $scope.get_client_data = function () {
        getClientList({}).then(function (resposne) {
            console.log(resposne);
            $scope.client_company = resposne.data;
        });
    };
    $scope.get_client_data();

    $scope.get_tax_name=function(client){
        console.log(client);
        if(client=='cash'){
            $scope.case_details.client_id=client;
            $scope.case_details.client_name='Cash Client';  
            $scope.get_service_data('cash');          
        }else{
            $scope.client_data=JSON.parse(client);
            console.log($scope.client_data);
            state=$scope.client_data.state_id;
            console.log(state);
            $scope.get_service_data($scope.client_data.id);
            $scope.case_details.client_id=$scope.client_data.id;
            $scope.case_details.client_name=$scope.client_data.client_name;
            if(state==localStorage.getItem('warehouse_state_id')){
                $scope.case_details.tax_name='GST';
            }else{
                $scope.case_details.tax_name='IGST';
            }

            getClientLocationByClientIdForCase({
                client_id: $scope.case_details.client_id
            }).then(function (resposne) {
                console.log(resposne);
                $scope.client_location_details = resposne.data;
            });

            $scope.set_location_id($scope.client_location);

        }
        console.log($scope.case_details.client_id);
        console.log($scope.case_details.client_name);
        console.log($scope.case_details.tax_name);
    };

    // $scope.check_tax_type=function(type){
    //     console.log(type);
    //     console.log(state);

    //     if(type=='inclusive'){
    //         console.log('in');
    //         if(state==localStorage.getItem('warehouse_state_id')){
    //             $scope.case_details.tax_name='GST';
    //         }else{
    //             $scope.case_details.tax_name='IGST';
    //         }
    //     }
    //     // else{
    //     //     $scope.case_details.tax_name='';
    //     //     $scope.case_details.tax_name='';
    //     // }
    // }

    $scope.get_service_data = function (id,location_id,location_type) {
        getServiceList({
            client_id: id,
            client_location_id: location_id,
            client_location_type: location_type
        }).then(function (resposne) {
            console.log(resposne);
            $scope.service_data = resposne.data;
        });
    };
    

    $scope.state_list = function () {
        getStateListService({}).then(function (response) {
            $scope.state_list = response.data;
        });
    };
    $scope.state_list();

    $scope.addRow = function(index){
        var charge = {transportation_charge_id:"",tax_id: "",charge_amount: "",tax_total:"",total_charge_amount:""};
        if($scope.data.transportaion.length <= index+1){
            $scope.data.transportaion.splice(index+1,0,charge);
        }
    };

    $scope.deleteRow = function($event,name){
        var removeAmt = Math.round(name.tax_total);
        $timeout(function () {
            var prod_tax_val = $('#hidden_total_val').val();
            var remove_tax = prod_tax_val - removeAmt;
            $('#hidden_total_val').val(remove_tax);
            var new_total_amt = parseInt(total_amt) - removeAmt;
            
        }, 500);
        var index = $scope.data.transportaion.indexOf(name);
        if($event.which == 1)
            $scope.data.transportaion.splice(index,1);
    };

    // var vehicle_arr;
    // $scope.search_vehicle_code = function(){
    //     vehicleAutoComplete({
    //         term:$scope.case_details.fleet_code
    //     }).then(function (response) {
    //         /*for(var g=0;g<res.data.length;g++){
    //                res.data[g].value = res.data[g].country_name;
    //         }*/
    //         vehicle_arr=response.data;
    //         $scope.get_data();
    //     },function (response) {
    //         console.log(response);
    //         $scope.case_details.fleet_make='';
    //     })
    // };

    // $scope.get_data=function () {
    //     $('#vehicle_code_id').autocomplete({
    //         source:vehicle_arr,
    //         select:function (event,ui) {
    //             console.log('------------>>',ui.item);
    //             $scope.case_details.fleet_id=ui.item.fleet_id;
    //             $scope.case_details.fleet_make=ui.item.value.split('-')[1];
    //         }
    //     })
    // };

    var all_data = [];
    $scope.fleet_msg = '';
    $scope.fleet_code_list = [];
    $scope.search_vehicle_code = function () {
        vehicleAutoComplete({term:$scope.case_details.fleet_code}).then(function (response) {
            if(response.data==[]){
                console.log('innnn');
                $scope.case_details.fleet_make='';
                $scope.fleet_msg = 'Fleet is not available. Please check the fleet availability status.'
                $('#s_msg').fadeIn().delay(5000).fadeOut();
            }
            all_data = response.data;
            $scope.all_fleet_code = response.data;
        },function (response) {
            console.log(response);
            $scope.case_details.fleet_make='';
            $scope.fleet_msg = '';
        });
    };

    $(document).ready(function() {
        $('#vehicle_code_id').on('input', function() {
            var userText = $(this).val();
            $("#vehicle_code_datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_data.findIndex(x => x.value==$(this).val());
                     console.log('all_data[index]---',all_data[index]);
                        $scope.case_details.fleet_id=all_data[index].fleet_id;
                        $scope.case_details.fleet_make = all_data[index].value.split('-')[1];
                        $scope.fleet_code_list.push(all_data[index]);
                        document.getElementById('vehicle_code_id').value = all_data[index].value;
                    /*if($scope.fleet_code_list.findIndex(y => y.value==$(this).val()) == -1){
                        console.log('all_data[index]---',all_data[index]);
                        $scope.case_details.fleet_id=all_data[index].fleet_id;
                        $scope.case_details.fleet_make = all_data[index].value.split('-')[1];
                        $scope.fleet_code_list.push(all_data[index]);
                        document.getElementById('vehicle_code_id').value = all_data[index].value;
                    }else{
                       alert('Fleet Already Added');
                       document.getElementById('vehicle_code_id').value = '';
                    }*/

                }
            });

        })
    });

    $scope.search_vehicle_code1 = function () {
        vehicleAutoComplete({term:$scope.case_details.fleet_code}).then(function (response) {
            all_data = response.data;
            $scope.all_fleet_code = response.data;
            if(response.data==[]){
                $scope.case_details.fleet_make='';
            }
        });
    };

    $(document).ready(function() {
        $('#vehicle_code_id1').on('input', function() {
            var userText = $(this).val();
            $("#vehicle_code_datalist").find("option").each(function() {
                if ($(this).val() == userText) {
                    var index = all_data.findIndex(x => x.value==$(this).val());
                    if($scope.fleet_code_list.findIndex(y => y.value==$(this).val()) == -1){
                        $scope.case_details.fleet_id=all_data[index].fleet_id;
                        $scope.case_details.fleet_make = all_data[index].value.split('-')[1];
                        $scope.fleet_code_list.push(all_data[index]);
                        document.getElementById('vehicle_code_id1').value = all_data[index].value;
                    }else{
                       alert('Fleet Already Added');
                       document.getElementById('vehicle_code_id1').value = '';
                    }

                }
            });

        })
    });

    // $scope.search_vehicle_code1 = function(){
    //     vehicleAutoComplete({
    //         term:$scope.case_details.fleet_code
    //     }).then(function (response) {
    //         /*for(var g=0;g<res.data.length;g++){
    //                res.data[g].value = res.data[g].country_name;
    //         }*/
    //         vehicle_arr=response.data;
    //         $scope.get_data1();
    //     },function (response) {
    //         console.log(response);
    //         $scope.case_details.fleet_make='';
    //     })
    // };

    // $scope.get_data1=function () {
    //     $('#vehicle_code_id1').autocomplete({
    //         source:vehicle_arr,
    //         select:function (event,ui) {
    //             console.log('------------>>',ui.item);
    //             $scope.case_details.fleet_id=ui.item.fleet_id;
    //             $scope.case_details.fleet_make=ui.item.value.split('-')[1];
    //         }
    //     })
    // };

    $scope.chargeListing = function(){
        chargeListService({}).then(function (response) {
            $scope.transportation_charges = response.data;
            console.log('data--->',$scope.transportation_charges);
        });
    };
    $scope.chargeListing();
    $scope.tax=[];

    $scope.route_validate=function(){
        
        if($scope.case_closing.close_total_service_km >= 150)
        {
            return true;
        }
    }

    $scope.save_case_management_data=function () {
        //$scope.case_details.company_id=localStorage.getItem('warehouse_id');
        console.log(JSON.stringify($scope.case_details));
        $scope.case_details.case_activation_time = $('#case_activation_time').val(); 
       // $('.loading').show();
        saveCaseManagementData({
            case:$scope.case_details,
            //transportation_charges:$scope.data
        }).then(function (response) {
            $('.loading').hide();
            console.log('data--->',response.data);
            $scope.get_case_details();
            $scope.case_details={};
            $scope.dismiss();
            $('#caseSuccess').fadeIn().delay(5000).fadeOut();
            $scope.case_success = "Case Details Added Successfully";
            $scope.case_error = "";
        },function (response) {
            console.log(response);
            $scope.case_success = '';
            $('#caseError').fadeIn().delay(5000).fadeOut();
            $scope.case_error = response.data.error[0];
        })
    };
    
    $scope.click_case_closing=function (id,client_id,service_id,status,type,case_status,location_id,location_type) {
        console.log(status);
        c_id = client_id;
        $scope.tax_data = {};
        $scope.tax_data.tax_rate = 18;
        if(case_status=='deactivated'){
            alert('Case is not activated, Please activate the case first');
        }else{
            case_close_id=id;
        console.log(status);
        console.log(type);
        if(client_id=='cash'){
            $scope.hide_tax_name=true;
            $scope.hide_tax_rate=true;
            $scope.hide_tax_amount=true;
        }
        // if(status=='Cancel'){
        //     $scope.heading_msg='Case Closing';
        //     $('#approve_msg').modal('show');
        //     $scope.approve_btn = false;
        //     $scope.hide_app=true;
        //     $scope.check_approve_msg = "Case Has Been Canceled";
        // }
        if(status=='closed' || status=='Approved' || status=='Disputed' || status == 'Bill'){
            $scope.heading_msg='Case Closing';
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=true;
            $scope.check_approve_msg = "Case Has Been Closed";
        }else if(status=='Cancel'){
            $scope.heading_msg='Case Closing';
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=true;
            $scope.check_approve_msg = "Case Has Been Canceled";
        }else{
            getClientWiseRules({
                client_id:client_id,
                service_id:service_id,
                case_id:id,
                client_location_id: location_id,
                client_location_type: location_type
            }).then(function (response) {
                initial_km=response.data[0].initials_km;
                initial_charge=response.data[0].charges_initials_km;
                above_charge=response.data[0].charges_above_initials_km;
                $scope.case_details.tax_type=response.data[0].tax_type;
                $scope.case_details.tax_name=response.data[0].tax_name;
                $scope.case_closing.waiting_no_of_hour = 0;
                $scope.case_closing.waiting_base_amount = response.data[0].waiting_base_amount;
                $scope.case_closing.waiting_total_amount = parseFloat($scope.case_closing.waiting_no_of_hour) * parseFloat(response.data[0].waiting_base_amount);
                $scope.case_closing.custody_no_of_hour = 0;
                $scope.case_closing.custody_base_amount = response.data[0].custody_base_amount;
                $scope.case_closing.custody_total_amount =  parseFloat($scope.case_closing.custody_no_of_hour) * parseFloat(response.data[0].custody_base_amount);
                $scope.case_closing.custody_total = $scope.case_closing.custody_total_amount;
                $scope.case_closing.waiting_total = $scope.case_closing.waiting_total_amount;
                $scope.data.transportaion = response.data[0].client_charges;
                $scope.case_closing.waiting_tax_id = response.data[0].waiting_tax_rate.id;
                $scope.waiting_tax_rate = response.data[0].waiting_tax_rate;
                $scope.waiting_tax = response.data[0].waiting_tax_rate;
                $scope.custody_tax = response.data[0].custody_tax_rate;
                $scope.case_closing.custody_tax_id = response.data[0].custody_tax_rate.id;
                $scope.custody_tax_rate = response.data[0].custody_tax_rate;
                console.log(initial_km);
                console.log(initial_charge);
                console.log(above_charge);
                // if($scope.case_details.tax_type=='inclusive'){
                //     $scope.hide_tax_name=false;
                //     $scope.hide_tax_rate=false;
                //     $scope.hide_tax_amount=false;
                //     // if(state==localStorage.getItem('warehouse_state_id')){
                //     //     $scope.case_details.tax_name='GST';
                //     // }else{
                //     //     $scope.case_details.tax_name='IGST';
                //     // }
                // }
            
                // if($scope.case_details.tax_type=='exclusive'){
                //     $scope.hide_tax_name=true;
                //     $scope.hide_tax_rate=true;
                //     $scope.hide_tax_amount=true;
                // }
                if($scope.case_details.tax_name=='' && $scope.case_details.tax_name=='undefined' && $scope.case_details.tax_name==null){
                    $scope.hide_tax_name=false;
                    $scope.hide_tax_rate=false;
                    $scope.hide_tax_amount=false;
                }
            });
            if(type=='case_close'){
                $('#add_case_closing').modal('show');
            }
            
        }
        }
        
    };
    
    $scope.total_charge=function(){
        for(var i=0;i<$scope.data.transportaion.length;i++){
            total_charge_amt=parseFloat($scope.data.transportaion[i].total_charge_amount+parseFloat(total_charge_amt));
        }
    }
    $scope.calculate_towing_charges=function (close_total_service_km) {
        console.log('clicked',$scope.tax);
        console.log(close_total_service_km);
        if(parseFloat(close_total_service_km) < parseFloat(initial_km)){
            console.log('less');
            $scope.case_closing.close_towing_charges=parseFloat(initial_charge);
        }
        if(parseFloat(close_total_service_km) > parseFloat(initial_km)){
            console.log('above');
            $scope.rem=parseFloat(close_total_service_km) - parseFloat(initial_km);
            console.log($scope.rem);
            $scope.temp_total= parseFloat($scope.rem) * parseFloat(above_charge);
            $scope.case_closing.close_towing_charges=parseFloat(initial_charge)+parseFloat($scope.temp_total);
        }
        if($scope.case_closing.waiting_total){
            $scope.case_closing.subtotal=$scope.case_closing.close_towing_charges;
            $scope.total = parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.waiting_total) + parseFloat($scope.case_closing.custody_total);
            $scope.case_closing.total=$scope.total;
        }else{
            $scope.case_closing.subtotal=$scope.case_closing.close_towing_charges;
            $scope.total=$scope.case_closing.close_towing_charges;
            $scope.case_closing.total=$scope.total;
        }
        console.log($scope.tax);
        if($scope.tax_data.tax_rate != null && $scope.tax_data.tax_rate != undefined && $scope.tax_data.tax_rate != ''){
            console.log('innnn');
            console.log($scope.tax_data);
            $scope.calculate_tax_amount($scope.tax,$scope.tax_data.id);
        }
        
        console.log($scope.case_closing.close_towing_charges);
        console.log($scope.total);
        //$scope.total_amt=parseFloat($scope.case_closing.close_towing_charges)+parseFloat(charge_amt);
        //$scope.case_closing.towing_charges=$scope.close_total_service_km

        
    }

    $scope.calculate_tax_amount=function(data,id){
        console.log(id);
        $scope.case_closing.tax_id = 31;
        $scope.case_closing.tax_rate = 18;
        if(data != null && data != undefined && data != ''){
            $scope.tax_data=JSON.parse(data);
        }
        console.log('====================>>>',$scope.tax_data);
        console.log($scope.case_closing.close_towing_charges);
        $scope.case_closing.tax_amount=parseFloat($scope.tax_data.tax_rate)/100 * parseFloat($scope.case_closing.close_towing_charges);
        $scope.case_closing.tax_amount=$scope.case_closing.tax_amount.toFixed(2);
        console.log($scope.case_closing.tax_amount);
        if($scope.case_closing.tax_amount!=null && $scope.case_closing.tax_amount!='' && $scope.case_closing.tax_amount!='undefined'){
            $scope.case_closing.subtotal=parseFloat($scope.case_closing.tax_amount)+parseFloat($scope.case_closing.close_towing_charges);
            $scope.case_closing.subtotal=$scope.case_closing.subtotal.toFixed(2);
        }
        if($scope.case_closing.waiting_total != null && $scope.case_closing.waiting_total != undefined && $scope.case_closing.waiting_total != ''){
            $scope.case_closing.subtotal=parseFloat($scope.case_closing.tax_amount)+parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.waiting_total) + parseFloat($scope.case_closing.custody_total) ;
            $scope.case_closing.subtotal=$scope.case_closing.subtotal.toFixed(2);
        }

        if($scope.check_charge_total != '' && $scope.check_charge_total != null && $scope.check_charge_total!=undefined){
            $scope.case_closing.subtotal = parseFloat($scope.case_closing.subtotal) + parseFloat($scope.check_charge_total);
            $scope.case_closing.subtotal=$scope.case_closing.subtotal.toFixed(2);
        }
        $scope.total=$scope.case_closing.subtotal;
        $scope.case_closing.total=$scope.total;
    }


    $scope.add_charge_amt = function (index) {
        
        total_charge_amt=0;
        console.log($scope.data.transportaion[index].tax_id[0]);
        $scope.data.transportaion[index].total_charge_amount = $scope.data.transportaion[index].charge_amt;
        console.log($scope.data.transportaion[index].total_charge_amount);
        if($scope.data.transportaion[index].tax_id[0]!=null && $scope.data.transportaion[index].tax_id[0]!='' && $scope.data.transportaion[index].tax_id[0]!= 'undefined'){
            // var tax = JSON.parse($scope.data.transportaion[index].tax_id);
            var tax = $scope.data.transportaion[index].tax_id[0];
            var tax_rate=tax.tax_rate;
        }
        else{
            var tax_rate=0;
        }
        console.log(tax_rate);
        var charge_amt = $scope.data.transportaion[index].charge_amount;
        console.log(charge_amt);
        if(charge_amt.length > 0 || tax_rate.length > 0){
            var tax_total = (tax_rate / 100) * charge_amt;
            console.log(tax_total);
            var total_amt = parseFloat(charge_amt) + parseFloat(tax_total);
            console.log(total_amt);
            $scope.data.transportaion[index].total_charge_amount =  parseFloat(total_amt).toFixed(2);
            $scope.data.transportaion[index].tax_total = parseFloat(tax_total).toFixed(2);

        } else {
            $scope.data.transportaion[index].total_charge_amount = 0;
        }

        for(var i=0;i<$scope.data.transportaion.length;i++){
            total_charge_amt=parseFloat($scope.data.transportaion[i].total_charge_amount)+parseFloat(total_charge_amt);
            console.log(total_charge_amt);
        }
        if(total_charge_amt!=null && total_charge_amt!='' && total_charge_amt!='undefined'){
            console.log($scope.case_closing.waiting_total);
            if($scope.case_closing.waiting_total != null && $scope.case_closing.waiting_total!= undefined && $scope.case_closing.waiting_total != ''){
                console.log('in 1');
                $scope.t1 = parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount)
                $scope.total=(parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount)+parseFloat(total_charge_amt) + parseFloat($scope.case_closing.waiting_total) + parseFloat($scope.case_closing.custody_total)).toFixed(2);
            }else{
                $scope.t1 = parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount)
                console.log('in 2');
                $scope.total=parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount)+parseFloat(total_charge_amt);
            }
            
        }else{
            if($scope.case_closing.waiting_total != null){
                console.log('in 3');
                $scope.t1 = parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount)
                $scope.total=(parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount) + parseFloat($scope.case_closing.waiting_total) + parseFloat($scope.case_closing.custody_total)).toFixed(2);
            }else{
                console.log('in 4');
                $scope.total=$scope.case_closing.subtotal;
            }
            
        }
        console.log(total_charge_amt);
        console.log($scope.total);
        $scope.check_charge_total = total_charge_amt;
        $scope.case_closing.total=$scope.total;
    };

    $scope.set_charge_tax_id = function(id,index){
        getTaxIdByChargeId({
            c_id:c_id,
            charge_id:id
        }).then(function(response){
            $scope.data.transportaion[$index].tax_id = response.data[0];
        },function(response){
            console.log(response);

        });
    }

    $scope.save_case_closing_data=function(){
        $scope.case_closing.service_reached_on = $('#timepickerc1').val();
        $scope.case_closing.service_end_time = $('#timepickerc2').val();
        if($scope.data.transportaion!=null && $scope.data.transportaion!='' && $scope.data.transportaion!='undefined'){
            $scope.case_closing.transportation_charges=$scope.data.transportaion;
            $scope.tax_data=[];
            for(var i=0;i<$scope.case_closing.transportation_charges.length;i++){
                if($scope.case_closing.transportation_charges[i].tax_id){
                    $scope.tax_data[i]=$scope.case_closing.transportation_charges[i].tax_id;
                    $scope.case_closing.transportation_charges[i].tax_id=$scope.tax_data[i].id;
                    $scope.case_closing.transportation_charges[i].tax_rate=$scope.tax_data[i].tax_rate;
                }
            }
        }
        if($scope.tax!=null && $scope.tax!='' && $scope.tax!='undefined'){
            var tax_data=JSON.parse($scope.tax);
            $scope.case_closing.tax_id=tax_data.id;
            $scope.case_closing.tax_rate=tax_data.tax_rate;
        }
        $scope.case_closing.case_id=case_close_id;
        console.log(JSON.stringify($scope.case_closing));
        $('.loading').show();
        saveCaseClosingData({
            case_closing:$scope.case_closing,
            //transportation_charges:$scope.data
        }).then(function (response) {
            $('.loading').hide();
            console.log('data--->',response.data);
            $scope.get_case_details();
            $scope.modal_dismiss_three();
            $scope.case_closing={};
            $scope.data = {
                transportaion:[{ transportation_charge_id:"",tax_id: "",charge_amount: "",tax_total:"",total_charge_amount:""}]
            };
            $scope.check_charge_total = '';
            $scope.total = '';
            $scope.temp_total = '';
            $scope.rem = '';
            $('#caseSuccess').fadeIn().delay(5000).fadeOut();
            $scope.case_success = "Case Closing Details Added Successfully";
            $scope.case_error = "";
            
        },function (response) {
            console.log(response);
            $scope.case_success = '';
            $scope.case_closing={};
            $('#caseError').fadeIn().delay(5000).fadeOut();
            $scope.case_error = response.data.error[0];

        })
    };
    

    $scope.reload_modal = function(){
        // $scope.case_closing={};
        // $scope.check_charge_total = '';
        // $scope.total = '';
        // $scope.temp_total = '';
        // $scope.rem = '';
        // $scope.case_details={};
        // $scope.dismiss_modal_one();
        $window.location.reload();
        
    }
    $scope.edit_case_details=function (id,type) {
        //$route.reload();
        
        case_id=id;
        getCaseDetailsById({
            case_id:id
        }).then(function (response) {
            //$scope.case_details = response.data[0];
            if(response.data[0].process_status=='closed' || response.data[0].process_status=='Approved' || response.data[0].process_status=='Disputed'){
                $scope.hide_case_closing=false;
                $scope.hide_next=false;
                $scope.hide_update=true;
                if(type == 'edit'){
                    $scope.hide_last_update=false;
                }else{
                    $scope.hide_last_update=true;
                }
            }else{
                $scope.hide_case_closing=true;
                $scope.hide_next=true;
                $scope.hide_update=false;
                
                if(type == 'edit'){
                    $scope.hide_last_update=false;
                }else{
                    $scope.hide_last_update=true;
                    $scope.hide_update = true;
                }
            }
            //$scope.case_details.case_activation_time = response.data[0].case_activation_time;
            $('#case_activation_time1').val(response.data[0].case_activation_time); 
            $scope.case_details.fleet_id=response.data[0].fleet_id;
            $scope.case_details.case_date=response.data[0].casedate;
            $scope.case_details.case_time=response.data[0].case_time;
            $scope.case_details.case_no=response.data[0].case_no;
            $scope.case_details.ticket_no=response.data[0].ticket_no;
            $scope.case_details.customer_name=response.data[0].case_customer.customer_name;
            $scope.case_details.vehicle_make=response.data[0].case_customer.vehicle_make;
            $scope.case_details.vehicle_reg_no=response.data[0].case_customer.vehicle_reg_no;
            $scope.case_details.breakdown_location=response.data[0].breakdown_location;
            $scope.case_details.asp_contact_no=response.data[0].asp_contact_no;
            $scope.case_details.client_id=response.data[0].client_id;
            $scope.get_service_data(response.data[0].client_id,response.data[0].client_location_id,response.data[0].client_location_type);
            $scope.case_details.service_id=response.data[0].service_id;
            $scope.case_details.mobile_no=response.data[0].case_customer.mobile_no;
            $scope.case_details.nature_of_breakdown=response.data[0].nature_of_breakdown;
            $scope.case_details.asp_location=response.data[0].asp_location;
            $scope.case_details.asp_state_id=response.data[0].asp_state_id;
            if(response.data[0].fleet != null){
                $scope.case_details.fleet_make=response.data[0].fleet.make;
                $scope.case_details.fleet_code=response.data[0].fleet.fleet_code;
            }
            
            $scope.case_details.driver_name=response.data[0].driver_name;
            $scope.case_closing.service_reached_on=response.data[0].service_reached_on;
            $scope.case_closing.service_end_time=response.data[0].service_end_time;
            $scope.case_details.dealership_name=response.data[0].dealership_name;
            $scope.case_details.dealership_address=response.data[0].dealership_address;
            $scope.case_closing.handover_to=response.data[0].handover_to;
            $scope.case_details.comments=response.data[0].comments;
            $scope.case_closing.close_notes=response.data[0].close_notes;
            $scope.case_closing.close_total_service_km=response.data[0].close_total_service_km;
            $scope.case_closing.close_towing_charges=response.data[0].close_towing_charges;
            $scope.case_closing.close_route_map=response.data[0].close_route_map;
            $scope.case_closing.subtotal=response.data[0].subtotal;
            $scope.case_closing.tax_amount=response.data[0].tax_amount;
            $scope.case_closing.subtotal=response.data[0].subtotal;
            $scope.case_closing.total=response.data[0].total;
            $scope.case_closing.waiting_no_of_hour=response.data[0].waiting_no_of_hour;
            $scope.case_closing.waiting_base_amount=response.data[0].waiting_base_amount;
            $scope.case_closing.waiting_tax_amount=response.data[0].waiting_tax_amount;
            $scope.case_closing.waiting_tax_id=response.data[0].waiting_tax_id;
            $scope.case_closing.waiting_total=response.data[0].waiting_total;
            $scope.case_closing.waiting_total_amount=response.data[0].waiting_total_amount;
            $scope.case_closing.waiting_tax_rate=response.data[0].waiting_tax_rate;
            $scope.case_closing.custody_no_of_hour=response.data[0].custody_no_of_hour;
            $scope.case_closing.custody_base_amount=response.data[0].custody_base_amount;
            $scope.case_closing.custody_tax_amount=response.data[0].custody_tax_amount;
            $scope.case_closing.custody_tax_id=response.data[0].custody_tax_id;
            $scope.case_closing.custody_total=response.data[0].custody_total;
            $scope.case_closing.custody_total_amount=response.data[0].custody_total_amount;
            $scope.case_closing.custody_tax_rate=response.data[0].custody_tax_rate;
            $scope.total=response.data[0].total;
            $scope.case_details.tax_id=response.data[0].tax_id;
            $scope.case_details.tax_rate=response.data[0].tax_rate;
            $scope.service_tax_id=response.data[0].tax_id;
            $scope.case_details.tax_name=response.data[0].tax_name;
            $scope.case_details.tax_type=response.data[0].tax_type;
            $scope.case_details.company_id=response.data[0].company_id;
            $scope.case_details.driver_contact=response.data[0].driver_contact;
            $scope.case_details.client_location_id=response.data[0].client_location_id;
            $scope.case_details.client_location_type=response.data[0].client_location_type;
			  $scope.case_details.customer_remark=response.data[0].customer_remark;
			  $scope.case_details.technician_remark=response.data[0].technician_remark;
            getClientLocationByClientIdForCase({
                client_id:response.data[0].client_id
            }).then(function (response) {
                
                $scope.client_location_details = response.data;
            },function (response) {
                console.log(response);
            })
            $scope.case_details.client_location_id=response.data[0].client_location_id;
            $scope.case_details.client_location_type=response.data[0].client_location_type;
            if(response.data[0].case_transportation_charges!=[] && response.data[0].case_transportation_charges!='' && response.data[0].case_transportation_charges!='undefined'){
                $scope.data.transportaion=response.data[0].case_transportation_charges;
            }
            if(response.data[0].client_id=='cash'){
                $scope.hide_tax_name=true;
                $scope.hide_tax_rate=true;
                $scope.hide_tax_amount=true;
            }       
            $scope.click_case_closing(id,response.data[0].client_id);
            //$scope.data.transportaion=response.data[0].case_transportation_charges;
        });
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

    $scope.$on('CallParentMethod', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.get_case_details();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_case_details(data.id,'edit');
            $('#edit_case_details').modal('show');
        }
    });

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_case_details();
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

    $scope.update_case_management_data=function () {
        $scope.case_closing.service_reached_on = $('#timepickerc6').val();
        $scope.case_closing.service_end_time = $('#timepickerc5').val();
        $scope.case_details.case_activation_time = $('#case_activation_time1').val(); 
        console.log($scope.data.transportaion);
        
        $scope.case_closing.transportation_charges=$scope.data.transportaion;
        console.log(JSON.stringify($scope.case_closing));
        if($scope.case_closing.transportation_charges!=null && $scope.case_closing.transportation_charges!='' && $scope.case_closing.transportation_charges!='undefined'){
            $scope.case_closing.transportation_charges=$scope.data.transportaion;
            $scope.tax_data=[];
            console.log($scope.case_closing.transportation_charges);
            for(var i=0;i<$scope.case_closing.transportation_charges.length;i++){
                if($scope.case_closing.transportation_charges[i].tax_id!=null && $scope.case_closing.transportation_charges[i].tax_id!='' && $scope.case_closing.transportation_charges[i].tax_id!='undefined'){
                    $scope.tax_data[i]=JSON.parse($scope.case_closing.transportation_charges[i].id);
                    console.log($scope.tax_data[i]);
                    $scope.case_closing.transportation_charges[i].tax_id=$scope.tax_data[i].id;
                    $scope.case_closing.transportation_charges[i].tax_rate=$scope.tax_data[i].tax_rate;
                }
            }
        }
        $scope.case.case_details=$scope.case_details;
        $scope.case.case_closing=$scope.case_closing;
        $scope.case.id=case_id;
        console.log(JSON.stringify($scope.case));
        $scope.case_details.company_id=localStorage.getItem('warehouse_id');
        $('.loading').show();
        updateCaseManagementData({
            //case_details:$scope.case_details,
            //case_closing:$scope.case_closing
            case:$scope.case
        }).then(function (response) {
            $('.loading').hide();
            console.log('data--->',response.data);
            $scope.get_case_details();
            $('#caseSuccess').fadeIn().delay(5000).fadeOut();
            $scope.case_success = "Case Details Updated Successfully";
            $scope.case_error = "";
            $scope.dismiss_modal_one();
            $('#edit_case_details').modal('hide');
        },function (response) {
            console.log(response);
            $scope.case_success = '';
            $('#caseError').fadeIn().delay(5000).fadeOut();
            $scope.case_error = response.data.error[0];
        })
    };

    $scope.check_approve = function (id,approve_status,process_status) {
        case_approve_id=id;
        $scope.heading_msg='Activate';
        // if(process_status=='Cancel'){
        //     $('#approve_msg').modal('show');
        //     $scope.approve_btn = false;
        //     $scope.hide_app=true;
        //     $scope.check_approve_msg = "Case Has Been Canceled";
        // }
        if(approve_status=='deactivated' && process_status!='Cancel'){

            $scope.check_approve_msg = "Do you want to activate this case ?";
            //$scope.pi_product_id = pro_id;

            $('#approve_msg').modal('show');
            $scope.approve_btn = true;
            $scope.hide_app=true;
        }else if(process_status=='Cancel'){
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=true;
            $scope.check_approve_msg = "Case Has Been Canceled";
        }else{
            $scope.check_approve_msg = "Do you want to dis-activate this case ?";
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.hide_app=false;
            //$scope.check_approve_msg = "Already approved";
        }
    };

    $scope.approve_ok_click=function(){
        var temp_time = $filter('date')(new Date(),'dd/MM/yyyy HH:mm');
        $('#eta').val(temp_time);
        $('#enter_eta').modal('show');
        $scope.close_add_product();
    }

    $scope.approve = function (tt) {
        console.log(tt);
        $('.loading').show();
        approveCaseStatus({
            eta_time:$('#eta').val(),
            id:case_approve_id
            
        }).then(function(response){
            console.log(response);
            $('.loading').hide();
            $scope.get_case_details();
            $scope.close_add_product();
            $scope.otp_modal_dismiss();
        },function(response){
            console.log(response);

        });
    };

    $scope.check_customer_status=function(){
        checkCustomerStatus({
            customer_name:$scope.case_details.customer_name,
            mobile_no:$scope.case_details.mobile_no
        }).then(function(response){
            console.log(response);
            $scope.res=JSON.parse(response.data);
            console.log($scope.res);
            if($scope.res=='block'){
                console.log('in');
                alert('Blocked Customer');
            }else{
                console.log(response);
            }
            
        },function(response){
            console.log(response);

        });
    };

    var case_cancel_id;
    $scope.case_cancel_click=function(id,cancel_status){
        case_cancel_id=id;
        $scope.heading_msg='Cancel';
        if( cancel_status=='' || cancel_status == 'activated'){

            $scope.check_approve_msg = "Do you want to cancel this case ?";
            //$scope.pi_product_id = pro_id;

            $('#cancel_msg').modal('show');
            $scope.approve_btn = true;
        }else if(cancel_status=='Approved' || cancel_status=='Disputed' || cancel_status=='Bill' || cancel_status=='ETA' || cancel_status =='closed'){
            $('#cancel_msg').modal('show');
            $scope.approve_btn = false;
            $scope.check_approve_msg = "Case is already processed, can't cancel";
        }
        else{
            $('#cancel_msg').modal('show');
            $scope.approve_btn = false;
            $scope.check_approve_msg = "Already Canceled";
        }
    }

    $scope.ok_cancel_clicked = function(){
        $scope.dismiss_no_packt();
        $('#enter_case_cancel').modal('show');
    }
    $scope.cancel_case = function () {
        $('.loading').show();
        cancelCaseStatus({
            id:case_cancel_id,
            travelled_km: $scope.travelled_km,
            case_cancel_time:$('#case_cancel_id').val()
        }).then(function(response){
            $('.loading').hide();
            console.log(response);
            $scope.get_case_details();
            $('#enter_case_cancel').modal('hide');
        },function(response){
            console.log(response);

        });
    };

    // $scope.clear_case_close_popup=function(){
    //     $scope.case_closing={};
    //     $scope.tax='';
    //     $scope.case_closing.service_reached_on='';
    //     $scope.case_closing.service_end_time='';
    //     $scope.total='';
    //     // $scope.tax_data = {};
    //     // $scope.tax_data.tax_rate = 18;
    // }

    $scope.set_location_id = function(data){
        $scope.location_data = JSON.parse(data);
        console.log($scope.location_data);
        $scope.case_details.client_location_id = $scope.location_data.id;
        $scope.case_details.client_location_type = $scope.location_data.type;
        $scope.get_service_data($scope.case_details.client_id,$scope.case_details.client_location_id,$scope.case_details.client_location_type);
    }

    $scope.calc_other_total = function(type,tax){
        console.log(type);
        console.log(tax);
        $scope.case_closing.waiting_total_amount = (parseFloat($scope.case_closing.waiting_no_of_hour) * parseFloat($scope.case_closing.waiting_base_amount)).toFixed(2);
        $scope.case_closing.custody_total_amount = (parseFloat($scope.case_closing.custody_no_of_hour) * parseFloat($scope.case_closing.custody_base_amount)).toFixed(2);
        
        if(type == 'waiting'){
            console.log('waiting')
            $scope.waiting_tax = tax;
            $scope.case_closing.waiting_tax_id = $scope.waiting_tax.id;
            $scope.case_closing.waiting_tax_rate = $scope.waiting_tax.tax_rate;
            $scope.case_closing.waiting_tax_amount = parseFloat($scope.case_closing.waiting_total_amount) * parseFloat($scope.case_closing.waiting_tax_rate) / 100;
            $scope.case_closing.waiting_total = parseFloat($scope.case_closing.waiting_tax_amount) + parseFloat($scope.case_closing.waiting_total_amount);
            console.log($scope.case_closing.waiting_tax_id)
            console.log($scope.case_closing.waiting_tax_rate)
            console.log($scope.case_closing.waiting_tax_amount)
            console.log($scope.case_closing.waiting_total)
        }
         if(type == 'custody'){
            console.log('custody')
            $scope.custody_tax = tax;
            $scope.case_closing.custody_tax_id = $scope.custody_tax.id;
            $scope.case_closing.custody_tax_rate = $scope.custody_tax.tax_rate;
            $scope.case_closing.custody_tax_amount = parseFloat($scope.case_closing.custody_total_amount) * parseFloat($scope.case_closing.custody_tax_rate) / 100;
            $scope.case_closing.custody_total = parseFloat($scope.case_closing.custody_tax_amount) + parseFloat($scope.case_closing.custody_total_amount);
            console.log($scope.case_closing.custody_tax_id)
            console.log($scope.case_closing.custody_tax_rate)
            console.log($scope.case_closing.custody_tax_amount)
            console.log($scope.case_closing.custody_total)
        }
        if(type != 'custody' && type != 'waiting' ){
            $scope.case_closing.waiting_total = parseFloat($scope.case_closing.waiting_total_amount);
            $scope.case_closing.custody_total = parseFloat($scope.case_closing.custody_total_amount);
        }

        console.log($scope.case_closing.subtotal);
        console.log($scope.case_closing.custody_total);
        console.log($scope.case_closing.waiting_total);
        $scope.t = parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount);
        $scope.total = (parseFloat($scope.case_closing.close_towing_charges) + parseFloat($scope.case_closing.tax_amount) + parseFloat($scope.case_closing.custody_total) + parseFloat($scope.case_closing.waiting_total)).toFixed(2);
        console.log($scope.total);
        $scope.case_closing.total=$scope.total;
    }
	
	
	  $scope.getUname = function(data1,id,type){
         $scope.id = id;
         $scope.type = type;
       $scope.uname  = data1;
	  }
	   $scope.getProceed = function(){
          $("#msg_details").modal('hide');
		 $("#edit_case_details").modal('show');
	     $scope.edit_case_details($scope.id,$scope.type);
		 
	  }
	  
}]);