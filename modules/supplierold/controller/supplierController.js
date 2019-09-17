var supplierModule = angular.module('supplierModule',[]);
supplierModule.controller('supplierController',['$rootScope','$scope','$location','$sce','$q','$route','productAutoCompleteService','addSupplierService','getSupplierListService','getProductByIdService','commonService','getSupplierDetailsByIdService','getStateListService','editSupplierService','getNextSupplierCodeService',function($rootScope,$scope,$location,$sce, $q,$route,productAutoCompleteService,addSupplierService,getSupplierListService,getProductByIdService,check_permission,getSupplierDetailsByIdService,getStateListService,editSupplierService,getNextSupplierCodeService){
	
	
	var all_supplier_list,auto_product_list;
	$scope.selected_product_array = [];
    $scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'details':{'supplier_code':''}};

    $scope.add_supplier_buttton = function () {
       // $scope.supplier_title = "Add Supplier";
        $scope.selected_product_array = [];
		$scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'details':{'supplier_code':''}};
		$scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'details':{'pan_no':''}};
		$scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'main_address':{'pincode':''}};
		$scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'main_address':{'dl_no':''}};
		$scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'main_address':{'gst_no':''}};
		$scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'main_contact':{'mobile_number':''}};
		$route.reload();
		//$scope.add_supplier_info.main_address = {};
		
    };

    $scope.supplier_list = function () {
        getSupplierListService({}).then(function (response) {
			 $scope.supplier_title = "Add Supplier";
			console.log('response--->',response);
            $scope.supplier_details_list = response.data.data;
            all_supplier_list = response.data.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.supplier_list();

    // $scope.next_supplier_code = function () {
    //     getNextSupplierCodeService({}).then(function (res) {
    //         $scope.text_next_supplier_code = JSON.parse(res.data);
    //         // $scope.add_supplier_info.details.supplier_code = $scope.text_next_supplier_code;
    //         $rootScope.next_supp_no = $scope.text_next_supplier_code;
    //     })
    // };

	$scope.tab_details = true;
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
    };
	
    //$scope.next_supplier_code();

    $scope.add_more_address = function () {
        $scope.add_supplier_info.depot_address.push({'address_name':'','street_address':'','city':'','state_id':'','pincode':'','country':'','dl_no':'','tin_no':'','gst_no':''});
    };
    $scope.remove_address=function (index) {
        $scope.add_supplier_info.depot_address.splice(index,1);
    };
    $scope.add_more_contact = function () {
        $scope.add_supplier_info.contacts.push({'full_name':'','designation':'','email':'','website':'','office_phone':'','mobile_number':'','fax_number':'','location':''});
    };
    $scope.remove_contact=function (index) {
        $scope.add_supplier_info.contacts.splice(index,1);
    };
    $scope.add_more_products = function () {
        $scope.selected_product_array.push({'product_id':'','product_code':'','group_name':'','product_name':'','grade':'','measurement':'','hsn_code':''});
    };
    $scope.remove_product = function (idx) {
        $scope.selected_product_array.splice(idx,1);
    };

    $scope.get_product_text = function (index) {
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
    };
    $scope.get_state_list = function () {
        getStateListService({}).then(function (response) {
            $scope.state_list = response.data;
        });
    };
    $scope.get_state_list();

    $scope.save_supplier = function () {
        $scope.add_supplier_info.products = $scope.selected_product_array;
        console.log($scope.add_supplier_info);
        addSupplierService({
            supplier_details:$scope.add_supplier_info,
            supplier_code:$scope.text_next_supplier_code
        }).then(function (response) {
            console.log(response);
            $('#addSupplierSuccess').fadeIn().delay(5000).fadeOut();
            $scope.addSupplierSuccess = response.data;
            $scope.dismiss();
			$scope.supplier_list();
            $scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'details':{'supplier_code':''}};
        },function (res) {
            console.log(res);
        })
    };
    $scope.current_modal = "supplier";
    $scope.supplier_permission_popup = function (supp_id,supp_status,supp_type) {
		console.log('supp_id',supp_id);
        check_permission.check_status(supp_id,supp_status,supp_type,$scope.current_modal);
    };
    $scope.edit_supplier_function = function (supp_index) {
        $scope.add_supplier_info=all_supplier_list[supp_index];
        console.log($scope.add_supplier_info);
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
            $scope.show_save = true;
            $scope.show_edit = true;
            $scope.supplier_list();
            $scope.modal_dismiss_two();
            $scope.supplier_title = "Edit Supplier";
            $scope.supp_id = data.id;

            getSupplierDetailsByIdService({supplier_id:data.id}).then(function (response) {
                $scope.add_supplier_info = response.data[0];
				
                console.log('supplier details------>>',response.data[0]);
				
				$scope.text_next_supplier_code =  $scope.add_supplier_info.details.supplier_code;
				
				$scope.add_supplier_info.main_address.pincode = parseInt($scope.add_supplier_info.main_address.pincode);
				$scope.add_supplier_info.main_address.tin_no = parseInt($scope.add_supplier_info.main_address.tin_no);
				 //console.log($scope.add_supplier_info.main_address.pincode);
                $scope.selected_product_array = response.data[0].products;
                $scope.show_edit = true;
                $scope.show_save = true;
                $('#example2').modal('show');
            })
        }
    });
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.supplier_list();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#deleteSupplierSuccess').fadeIn().delay(5000).fadeOut();
                $scope.deleteSupplierSuccess = 'Supplier deleted Successfully';
            }
        }
    });

    $scope.edit_supplier = function () {
        $scope.add_supplier_info.products = $scope.selected_product_array;
        editSupplierService({
            supplier_details:$scope.add_supplier_info,
            supplier_id:$scope.supp_id
        }).then(function (res) {
            console.log(res);
			 $scope.supplier_list();
            $('#addSupplierSuccess').fadeIn().delay(5000).fadeOut();
            $scope.addSupplierSuccess = res.data;
            $scope.dismiss();
            $scope.add_supplier_info = {'depot_address':[],'contacts':[],'products':[],'details':{'supplier_code':''}};
        },function (res) {
            console.log(res);
        })
    }
}]);