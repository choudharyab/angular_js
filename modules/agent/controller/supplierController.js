var supplierModule = angular.module('supplierModule',[]);
supplierModule.controller('supplierController',['$rootScope','$scope','$http','$location','$sce','$q','$route','productAutoCompleteService','addSupplierService',
    'getAgentListService','getProductByIdService','commonService','getSupplierDetailsByIdService','getStateListService','editSupplierService',
    'getNextSupplierCodeService','country',
    function($rootScope,$scope,$http,$location,$sce, $q,$route,productAutoCompleteService,addSupplierService,getAgentListService,getProductByIdService,check_permission,
        getSupplierDetailsByIdService,getStateListService,editSupplierService,getNextSupplierCodeService,country){
	

	$scope.active_lable = false;

	 $scope.otp_object = {};
    var all_agent_list;
    $scope.hide_agent_code=true;
	//$scope.selected_product_array = [{'product_id':'','product_code':'','group_name':'','product_name':'','grade':'','measurement':'','hsn_code':''}];
    /*$scope.add_agent_info = {'depot_address':[],'contacts':[],'details':{'party_code':''}};*/
        $scope.add_agent_info = {'depot_address':[],'contacts':[],'details':{}};
	 $scope.agent_title = "Add Agent";
   
    $scope.add_agent_buttton = function () {
        if(localStorage.getItem('warehouse_id')==''){
            alert('Please select company first');
        }else{
            //$scope.selected_product_array = [{'product_id':'','product_code':'','group_name':'','product_name':'','grade':'','measurement':'','hsn_code':''}];
            
		$scope.add_agent_info = {'depot_address':[],'contacts':[],'details':{}};
		$scope.add_agent_info = {'depot_address':[],'contacts':[],'details':{'pan_no':''}};
		$scope.add_agent_info = {'depot_address':[],'contacts':[],'main_address':{'pincode':''}};
		$scope.add_agent_info = {'depot_address':[],'contacts':[],'main_address':{'dl_no':''}};
		$scope.add_agent_info = {'depot_address':[],'contacts':[],'main_address':{'gst_no':''}};
		$scope.add_agent_info = {'depot_address':[],'contacts':[],'main_contact':{'mobile_number':''}};
       
		$route.reload();
         $scope.add_agent_info = {'depot_address':[],'contacts':[],'main_contact':{'website':'www.'}};
         //$('#example2').modal('show');
		//$scope.add_agent_info.main_address = {};
        }
        
		
    };

    $scope.agent_list = function () {
        getAgentListService({}).then(function (response) {
			 
			console.log('response--->',response);
            $scope.agent_details_list = response.data;
            all_agent_list = response.data.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.agent_list();

    /*$scope.next_agent_code = function () {
        getNextSupplierCodeService({}).then(function (res) {
            $scope.text_next_party_code = JSON.parse(res.data);
            $scope.add_agent_info.details.party_code = $scope.text_next_party_code;
            $rootScope.next_agn_no = $scope.text_next_party_code;
        })
    };*/


    $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };

	/*$scope.tab_details = true;
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
	
    //$scope.next_agent_code();

    $scope.add_more_address = function () {
        $scope.add_agent_info.depot_address.push({'address_name':'','city':'','state_id':'','pincode':'','country':'','dl_no':'','tin_no':'','gst_no':''});
    };
    $scope.remove_address=function (index) {
        $scope.add_agent_info.depot_address.splice(index,1);
    };
    $scope.add_more_contact = function () {
        $scope.add_agent_info.contacts.push({'full_name':'','designation':'','email':'','website':'','office_phone':'','mobile_number':'','fax_number':'','location':''});
    };
    $scope.remove_contact=function (index) {
        $scope.add_agent_info.contacts.splice(index,1);
    };
    /*$scope.add_more_products = function () {
        $scope.selected_product_array.push({'product_id':'','product_code':'','group_name':'','product_name':'','grade':'','measurement':'','hsn_code':''});
    };
    $scope.remove_product = function (idx) {
        $scope.selected_product_array.splice(idx,1);
    };*/

    /*$scope.get_product_text = function (index) {
        console.log(index);
        $scope.product_index = index;
        productAutoCompleteService({term: $scope.selected_product_array[index].product_code}).then(
            function (response) {
                auto_product_list = response.data;
            }
        );
        $scope.$watch('selected_product_array[index].product_code',function () {
            $("#product_code" + index).autocomplete({
                source: auto_product_list,
                select: function (event, ui) {
                    console.log(ui);
                    getProductByIdService({
                        product_id:ui.item.id
                    }).then(function (response) {
                        console.log(response);
                        $scope.selected_product_array[index].product_id = ui.item.id;
                        $scope.selected_product_array[index].group_name = response.data[0].productgroup;
                        $scope.selected_product_array[index].product_name = response.data[0].product_name;
                        $scope.selected_product_array[index].grade = response.data[0].grade;
                        $scope.selected_product_array[index].measurement = response.data[0].measurement;
                    });
                }
            })
        })
    };*/
    $scope.get_state_list = function () {
        getStateListService({}).then(function (response) {
            $scope.state_list = response.data;
        });
    };
    $scope.get_state_list();

    $scope.searchBankCountry = function(){
      country({term:$scope.add_agent_info.details.bank_country}).then(function (res) {
            for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].country_name; 
          }
            auto_country_arr=res.data;
            $scope.getId();
            console.log(auto_country_arr);
        },function (res) {
        });
    };

    $scope.getId=function () {
            $('#country_id').autocomplete({
                source:auto_country_arr,
                select:function (event,ui) {
                    //console.log('------------>>',ui.item);
                    $scope.add_agent_info.details.bank_country=ui.item.country_name;
                   
                }
            })
    };

    var arr,arr_main;
    $scope.searchMainCountry = function(){
      country({term:$scope.add_agent_info.main_address.country}).then(function (res) {
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
                    $scope.add_agent_info.main_address.country=ui.item.country_name;
                   
                }
            })
    };

    $scope.searchCountry = function(index){
      country({term:$scope.add_agent_info.depot_address[index].country}).then(function (res) {
          for(var g=0;g<res.data.length;g++){
            res.data[g].value = res.data[g].country_name; 
          }
            arr=res.data;
            $scope.getCustId(index);
            console.log(arr);
        },function (res) {
        });
    };

    $scope.getCustId=function (ind) {
        $('#country-'+ind).autocomplete({
                source:arr,
                select:function (event,ui) {
                    //console.log('------------>>',ui.item);
                    //$scope.auto_country=ui.item.country_name;
                    $scope.add_agent_info.depot_address[ind].country=ui.item.country_name;
                   
                }
            })
    };


    $scope.save_agent = function () {
        //$scope.add_agent_info.products = $scope.selected_product_array;
        $scope.add_agent_info.details.warehouse_id=localStorage.getItem('warehouse_id');
        console.log(JSON.stringify($scope.add_agent_info));
        addSupplierService({
            agent_details:$scope.add_agent_info,
           // party_code:$scope.text_next_party_code
        }).then(function (response) {
            console.log(response);
            $('#addagentSuccess').fadeIn().delay(5000).fadeOut();
            $scope.addagentSuccess = response.data;
            $scope.dismiss();
			$scope.agent_list();
            $scope.add_agent_info = {'depot_address':[],'contacts':[],'details':{}};
        },function (res) {
            console.log(res);
        })
    };
    $scope.current_modal = "agent";
    $scope.agent_permission_popup = function (agn_id,agn_status,agn_type) {
		console.log('agn_id',agn_id);
        check_permission.check_status(agn_id,agn_status,agn_type,$scope.current_modal);
		$scope.comment ={};
    };
    $scope.edit_agent_function = function (agn_index) {
        $scope.add_agent_info=all_agent_list[agn_index];
        console.log($scope.add_agent_info);
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
			$scope.active_lable = true;
            $scope.show_save = true;
            $scope.show_edit = true;
            $scope.agent_list();
            $scope.modal_dismiss_two();
            $scope.agent_title = "Edit Agent";
            $scope.agn_id = data.id;
            $scope.hide_agent_code=false;

            getSupplierDetailsByIdService({agent_id:data.id}).then(function (response) {
                $scope.add_agent_info = response.data[0];
				$scope.text_next_party_code=response.data[0].details.agent_code;
                console.log('agent details------>>',response.data[0]);
				
				//$scope.text_next_party_code =  $scope.add_agent_info.details.party_code;
				
				$scope.add_agent_info.main_address.pincode = parseInt($scope.add_agent_info.main_address.pincode);
				$scope.add_agent_info.main_address.tin_no = $scope.add_agent_info.main_address.tin_no;
				 //console.log($scope.add_agent_info.main_address.pincode);
                //$scope.selected_product_array = response.data[0].products;
                $scope.show_edit = true;
                $scope.show_save = true;
                $('#example2').modal('show');
            })
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.agent_list();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#deleteagentSuccess').fadeIn().delay(5000).fadeOut();
                $scope.deleteagentSuccess = 'Agent deleted Successfully';
            }
        }
    });

    $scope.edit=function(id){
        $scope.active_lable = true;
            $scope.show_save = true;
            $scope.show_edit = true;
            $scope.hide_agent_code=false;
            /*$scope.agent_list();
            $scope.modal_dismiss_two();
            $scope.agent_title = "Edit agent";
            $scope.agn_id = data.id;*/

            getSupplierDetailsByIdService({agent_id:id}).then(function (response) {
                $scope.add_agent_info = response.data[0];
                $scope.text_next_party_code=response.data[0].details.agent_code;
                console.log('agent details------>>',response.data[0]);
                
                //$scope.text_next_party_code =  $scope.add_agent_info.details.party_code;
                
                $scope.add_agent_info.main_address.pincode = parseInt($scope.add_agent_info.main_address.pincode);
                $scope.add_agent_info.main_address.tin_no = $scope.add_agent_info.main_address.tin_no;
                 //console.log($scope.add_agent_info.main_address.pincode);
                //$scope.selected_product_array = response.data[0].products;
                $scope.show_edit = true;
                $scope.show_save = true;
                
            })
    }
    $scope.edit_agent = function () {
        //$scope.add_agent_info.products = $scope.selected_product_array;
        editSupplierService({
            agent_details:$scope.add_agent_info,
            agent_id:$scope.agn_id
        }).then(function (res) {
            console.log(res);
			 $scope.agent_list();
            $('#addagentSuccess').fadeIn().delay(5000).fadeOut();
			$scope.agent_title = "Add Agent";
            $scope.addagentSuccess = res.data;
            $scope.dismiss();
            $scope.add_agent_info = {'depot_address':[],'contacts':[],'details':{}};
        },function (res) {
            console.log(res);
        })
    }
	
	 $scope.logout = function () {
		 
		   $http.get(appUrl+'change_login_status?token='+localStorage.getItem('token'),{header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    console.log('called logout');     
	localStorage.clear();
	
      $location.path('/login');
    };
	
}]);