var customerListModule = angular.module('customerListModuleNew',[]);
customerListModule.controller('customerListControllerNew',['$rootScope','$scope','$location','$route','productAutoCompleteService','addCustomerDetailsService',
    'getProductByIdService','getCustomerListService','getCustomerByIdService','getStateListService','updateCustomerDetailsService','commonService',
    'getNextCustomerCodeService','generateLoginStatus','country','getTaxRateService','chargeListService',
    function($rootScope,$scope,$location,$route,productAutoCompleteService,addCustomerDetailsService,getProductByIdService,getCustomerListService,getCustomerByIdService,
        getStateListService,updateCustomerDetailsService,check_permission,getNextCustomerCodeService,
        generateLoginStatus,country,getTaxRateService,chargeListService){

   

$scope.active_lable = false;
 $scope.otp_object = {};
$scope.add_client_info = {'depot_address':[],'contacts':[],'details':{'client_code':''},'charges_rules':[{'transportation_charge_id':'','tax_id':''}]};
//$scope.selected_product_array = [{'product_id':'','product_code':'','group_name':'','product_name':'','grade':'','measurement':''}];
var next_client;
var client,client_id;
$scope.hide_client_code=true;

$('.loading').hide();
$scope.state_list = function () {
    getStateListService({}).then(function (response) {
        $scope.state_list = response.data;
    });
};
        $scope.state_list();
	$scope.client_title = "Add Client";
    $scope.click_add_client = function () {
        $scope.add_client_info = {'depot_address':[],'contacts':[],'details':{'client_code':''},'charges_rules':[{'transportation_charge_id':'','tax_id':''}]};
        //$scope.selected_product_array = [];
      
		$route.reload();
    };

    $scope.chargeListing = function(){
        chargeListService({}).then(function (response) {
            $scope.transportation_charges = response.data;
            console.log('data--->',$scope.transportation_charges);
        });
    };
    $scope.chargeListing();

    $scope.get_client_listing = function () {
         $('.loading').hide();
        getCustomerListService({}).then(function (response) {
			console.log(response);
            $scope.client_listing_details = response.data;
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_client_listing();

    $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_list = resposne.data;
        });
    };
    $scope.get_tax_rate_list();

    $scope.add_more_client_address = function () {
        $scope.add_client_info.depot_address.push({'address_name':'','street_address':'','city':'','pincode':'','country':'','dl_no':'','tin_no':'','gst_no':''});
    };
    $scope.remove_client_addreess = function (add_index) {
        $scope.add_client_info.depot_address.splice(add_index,1);
    };
    $scope.add_more_client_contact = function () {
        $scope.add_client_info.contacts.push({'full_name':'','designation':'','email':'','website':'','office_phone':'','mobile_number':'','fax_number':'','location':''});
    };
    $scope.remove_client_contact = function (con_index) {
        $scope.add_client_info.contacts.splice(con_index,1);
    };
    $scope.add_more_charges_rules = function () {
        $scope.add_client_info.charges_rules.push({'transportation_charge_id':'','tax_id':''});
    };
    $scope.remove_charges_rules = function (add_index) {
        $scope.add_client_info.charges_rules.splice(add_index,1);
    };
    /*$scope.add_client_products = function () {
        $scope.selected_product_array.push({'product_id':'','product_code':'','group_name':'','product_name':'','grade':'','measurement':''});
    };
    $scope.remove_client_products = function (pro_index) {
        $scope.selected_product_array.splice(pro_index,1);
    };*/
    $scope.get_next_client_code = function () {
        getNextCustomerCodeService({}).then(function (res) {
            $scope.next_client_code = JSON.parse(res.data);
            next_client = $scope.next_client_code;
        })
    };
    $scope.get_next_client_code();


    //.........Toshish(tab change).......//
    $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };
	
	//ab changes
/*	$scope.tab_details = true;
    $scope.shift_tab_control = function (type) {
        if(type=='jump_to_address'){
            $scope.tab_details = false;$scope.tab_address = true;$scope.tab_contact = false;$scope.tab_product = false;
        }
        if(type=='jump_to_contact'){
            $scope.tab_details = false;$scope.tab_address = false;$scope.tab_contact = true;$scope.tab_product = false;
        }
        if(type=='jump_to_product'){
            $scope.tab_details = false;$scope.tab_address = false;$scope.tab_contact = false;$scope.tab_product = true;
        }
    };*/
	//ab changes
	
    /*$scope.get_product = function (more_product_index) {
        $scope.more_product_index = more_product_index;
        productAutoCompleteService({term: $scope.selected_product_array[more_product_index].product_code}).then(function (response) {
            more_product_list = response.data;
        });
        $scope.$watch('add_client_info.products[index].product_code',function () {
            console.log('called');
            $("#more_product_code" + more_product_index).autocomplete({
                source: more_product_list,
                select: function (event, ui) {
                    console.log(ui);
                    getProductByIdService({product_id:ui.item.id}).then(function (response) {
                        console.log(response);
                        $scope.selected_product_array[more_product_index].product_id = ui.item.id;
                        $scope.selected_product_array[more_product_index].group_name = response.data[0].productgroup;
                        $scope.selected_product_array[more_product_index].product_name = response.data[0].product_name;
                        $scope.selected_product_array[more_product_index].grade = response.data[0].grade;
                        $scope.selected_product_array[more_product_index].measurement = response.data[0].measurement;
                    })
                }
            })
        });
    };*/
    $scope.save_client_info = function () {
        console.log($scope.add_client_info);
        $scope.add_client_info.details.warehouse_id=localStorage.getItem('warehouse_id');
        //$scope.add_client_info.products = $scope.selected_product_array;
        $('.loading').show();
        addCustomerDetailsService({
            customer_details: $scope.add_client_info,
            client_code: next_client
        }).then(function (res) {
            $('.loading').hide();
            console.log(res);
            $scope.dismiss();
            $('#add_client_msg').fadeIn().delay(5000).fadeOut();
            $scope.client_add_success = "Client Added Successfully";
            $scope.get_client_listing();
            $scope.add_client_info = {'depot_address':[],'contacts':[],'details':{'client_code':''}};
            //$scope.selected_product_array = [];
        },function (res) {
            console.log(res);
        })
    };
    $scope.current_modal = "client";
    $scope.client_permission_popup = function (c_id,c_status,c_type) {
        check_permission.check_status(c_id,c_status,c_type,$scope.current_modal);
		$scope.comment ={};
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
        if (data.model == $scope.current_modal) {
            $scope.modal_dismiss_two();
			$scope.active_lable = true;
            $scope.show_save = true;
            $scope.show_edit = true;
            $scope.hide_client_code=false;
            $('#example2').modal('show');
            $scope.client_title = "Edit client";
            $scope.get_client_listing();
            client_id = data.id;

            getCustomerByIdService({client_id: data.id}).then(function (response) {
                console.log('edit customers--->',response);
                $scope.add_client_info= response.data[0];
                //$scope.selected_product_array = $scope.add_client_info.products;
                $scope.next_client_code = response.data[0].details.client_code;
				$scope.add_client_info.main_address.pincode = parseInt($scope.add_client_info.main_address.pincode);
				$scope.add_client_info.main_address.tin_no = $scope.add_client_info.main_address.tin_no;
				$scope.add_client_info.main_contact.mobile_number = parseInt($scope.add_client_info.main_contact.mobile_number);
				if(response.data[0].client_charges.length > 0){
                    $scope.add_client_info.charges_rules=response.data[0].client_charges;
                }else{
                    console.log('in');
                    $scope.add_client_info.charges_rules=[{'transportation_charge_id':'','tax_id':''}];
                }
				console.log( $scope.add_client_info.main_address.pincode );
            });
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.get_client_listing();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#add_delete_msg').fadeIn().delay(5000).fadeOut();
                $scope.client_delete_success = 'client deleted Successfully';
            }
        }
    });
    $scope.get_data_by_id=function (id) {
        $scope.show_save = true;
        $scope.show_edit = true;
        client=id;
        $scope.hide_client_code=false;
        getCustomerByIdService({client_id: id}).then(function (response) {
            console.log('edit customers--->',response);
            $scope.add_client_info= response.data[0];
            console.log($scope.add_client_info);
            //$scope.selected_product_array = $scope.add_client_info.products;
            $scope.next_client_code = response.data[0].details.client_code;
            $scope.add_client_info.main_address.pincode = parseInt($scope.add_client_info.main_address.pincode);
            $scope.add_client_info.main_address.tin_no = $scope.add_client_info.main_address.tin_no;
            $scope.add_client_info.main_contact.mobile_number = parseInt($scope.add_client_info.main_contact.mobile_number);
            /*for(var i=0;i<$scope.add_client_info.depot_address.length;i++){
                $scope.state[i]=$scope.add_client_info.depot_address[i].state_id;
            }*/
            console.log( $scope.add_client_info.main_address.pincode );
        });
    };
    $scope.edit_client_info = function () {
    
    /*for(var g=0;g<$scope.add_client_info.products.length;g++){
            if($scope.add_client_info.products[g].id){
                $scope.add_client_info.products[g].product_id = $scope.add_client_info.products[g].id;
            }
        }*/
      
    $('.loading').show();
        updateCustomerDetailsService({customer_details:$scope.add_client_info,client_id:client_id}).then(function (response) {
             $('.loading').hide();
            console.log('res ---->',response);
			$scope.get_client_listing();
            $scope.dismiss();
            $('#add_client_msg').fadeIn().delay(5000).fadeOut();
          //  $scope.client_add_success = JSON.parse(response.data[0]);
				$scope.client_add_success = "Client Updated Successfully";
				console.log( $scope.client_add_success);
				$scope.get_client_listing();
            $scope.add_client_info = {'depot_address':[],'contacts':[],'details':{'client_code':''}};
			 $scope.client_title = "Add client";
            //$scope.selected_product_array = [];
        },function (res) {
            console.log(res);
        })
    };
    $scope.edit_client = function (client_id) {
        getCustomerByIdService({client_id: client_id}).then(function (response) {
            console.log('edit customers--->',response);
            $('#example2').modal('show');
            $scope.add_client_info = response.data[0];
            //$scope.selected_product_array = $scope.add_client_info.products;
          
        });
    };

    $scope.check_email_confirmation = function (client_id,login_status) {
    client_id=client_id;
        if(login_status=='active'){
            $('#approve_msg').modal('show');
            $scope.approve_btn = false;
            $scope.check_approve_msg = "Already approved....!!!!";
        }else{
            $('#approve_msg').modal('show');
            $scope.check_approve_msg = "Are you sure to confirm this login ?";
            $scope.approve_btn = true;
            
        }

    };
    $scope.confirm_email=function(){
        generateLoginStatus({
            client_id: client_id
        }).then(function (response) {
            console.log('!!!!!!!!!!!!',response.data);
            on_success=response.data;
            console.log(on_success);
            $scope.get_client_listing();
            $scope.modal_dismiss_sr_edit();
            //console.log("@@@@@@@@@@@",$scope.isDisabled)           
        });
    };


        var auto_bank_country_arr;

         $scope.searchBankCountry = function(){
        country({term:$scope.add_client_info.details.bank_country}).then(function (res) {
            for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].country_name; 
          }
            auto_bank_country_arr=res.data;
            $scope.getBankCountryId();
           
        },function (res) {
        });
        }

            $scope.getBankCountryId=function () {
            $('#bank_country_id').autocomplete({
                source:auto_bank_country_arr,
                select:function (event,ui) {
                    //console.log('------------>>',ui.item);
                    $scope.auto_bank_country=ui.item.country_name;
                    //console.log('~~~~~~~~~~~~~~~~>>',$scope.auto_country);
                    $scope.add_client_info.details.bank_country=$scope.auto_bank_country;

                   
                }
            })
        };

    //     var auto_country_arr;
    //      $scope.searchCountry = function(){
    //   country({term:$scope.auto_country}).then(function (res) {
    //         for(var g=0;g<res.data.length;g++){
    //         res.data[g].value = res.data[g].country_name; 
    //       }
    //         auto_country_arr=res.data;
    //         $scope.getId();
    //         console.log(auto_country_arr);
    //     },function (res) {
    //     });
    // }

    // $scope.getId=function () {
    //         $('#country_id').autocomplete({
    //             source:auto_country_arr,
    //             select:function (event,ui) {
    //                 $scope.auto_country=ui.item.country_name;
    //                 //$scope.add_client_info.main_address.cou = $scope.auto_country;
    //                 $scope.add_client_info.main_address.country_id =ui.item.id;

                   
    //             }
    //         })
    //     };

        var arr_main;
        var arr;
        $scope.searchMainCountry = function(){
      country({term:$scope.add_client_info.main_address.country}).then(function (res) {
            for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].country_name; 
          }
            arr_main=res.data;
            $scope.getMainId();
            console.log(arr_main);
        },function (res) {
        });
    }

    $scope.getMainId=function () {
            $('#main_country').autocomplete({
                source:arr_main,
                select:function (event,ui) {
                    //console.log('------------>>',ui.item);
                    $scope.add_client_info.main_address.country=ui.item.country_name;
                   
                }
            })
    };

    $scope.searchCountry = function(index){
      country({term:$scope.add_client_info.depot_address[index].country}).then(function (res) {
          for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].country_name; 
          }
            arr=res.data;
            $scope.getClientId(index);
            console.log(arr);
        },function (res) {
        });
    };

    $scope.getClientId=function (ind) {
        $('#country-'+ind).autocomplete({
                source:arr,
                select:function (event,ui) {
                    //console.log('------------>>',ui.item);
                    //$scope.auto_country=ui.item.country_name;
                    $scope.add_client_info.depot_address[ind].country=ui.item.country_name;
                   
                }
            })
    };

    $scope.calc_total_rule_amount = function(){
        
        $scope.add_client_info.details.waiting_total_amount = (parseFloat($scope.add_client_info.details.waiting_no_of_hour) * parseFloat($scope.add_client_info.details.waiting_base_amount)).toFixed(2);
        $scope.add_client_info.details.custody_total_amount = (parseFloat($scope.add_client_info.details.custody_no_of_hour) * parseFloat($scope.add_client_info.details.custody_base_amount)).toFixed(2);
    }

}]);