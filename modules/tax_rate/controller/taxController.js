var taxRateModule = angular.module('taxRateModule',[]);
taxRateModule.controller('taxRateController',['$rootScope','$scope','$location','$route','getTaxRateService','addTaxRateService','editTaxRateService','deleteTaxRateService','getTransportationNameService','addTransportationNameService','deleteTransportationRateService','commonService','get_details_by_chargeid','editChargesService',function($rootScope,$scope,$location,$route,getTaxRateService,addTaxRateService,editTaxRateService,deleteTaxRateService,getTransportationNameService,addTransportationNameService,deleteTransportationRateService,check_permission,get_details_by_chargeid,editChargesService){

	$scope.active_lable = false;
    $scope.tax_details = {};
    var tax;
    var charge,charge_id;
    $scope.show_edit = false;
        $scope.show_save = false;

    $scope.add_tax_click = function () {
        $scope.tax_details = {};
		$scope.tax_rate_title = "Add Tax Rate";
		 $scope.show_edit = false;
        $scope.show_save = false;
		$route.reload();
        document.getElementById("tax_rate").focus();
    };

    $scope.getTaxRate = function () {
        getTaxRateService({}).then(function (res) {
            $scope.tax_rate_details = res.data;
            tax = res.data;
			$scope.tax_rate_title = "Add Tax Rate";
        },function (res) {
            console.log(res);
        })
    };
    $scope.getTaxRate();

    $scope.add_tax_rate = function () {

        addTaxRateService({
            tax_name:$scope.tax_details.tax_name,
            tax_rate:$scope.tax_details.tax_rate
        }).then(function (response) {
            console.log(response);
            $scope.getTaxRate();
            $('#example2').modal('hide');
            $scope.tax_details = {};
            $('#succ_msg').fadeIn().delay(5000).fadeOut();
            $scope.success_msg = 'Tax Added Successfully';
        },function (res) {
            console.log(res);
        })
    };
    
    $scope.get_tax = function (index,id) {
        $scope.tax_details.tax_rate = tax[index].tax_rate;
        $scope.tax_details.tax_name = tax[index].tax_name;
        $scope.tax_id = id;
		$scope.active_lable = true;
        $scope.show_edit = true;
        $scope.show_save = true;
		$scope.tax_rate_title = "Edit Tax Rate";
    };
    $scope.update_tax_rate = function () {
        editTaxRateService({
            tax_name:$scope.tax_details.tax_name,
            tax_rate:$scope.tax_details.tax_rate,
            tax_rate_id : $scope.tax_id
        }).then(function (res) {
            console.log(res.data);
            $scope.getTaxRate();
            $('#example2').modal('hide');
            $scope.tax_details = {};
            $('#succ_msg').fadeIn().delay(5000).fadeOut();
            $scope.success_msg = 'Tax Updated Successfully';
        },function (res) {
            console.log(res);
        })
    };
   $scope.deleteTaxRate = function (id) {
        deleteTaxRateService({
            tax_rate_id:id
        }).then(function (res) {
            console.log(res);
            $scope.getTaxRate();
        },function (res) {
            console.log(res);
        })
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
	 $scope.add_transportation_name = function () {
		
        addTransportationNameService({
            transportation_name:$scope.charge_details.transportation_name,
           
        }).then(function (response) {
            console.log(response);
            $scope.getTransportationName();
            $scope.dismiss();
            $scope.charge_details = {};
            $('#succ_msg').fadeIn().delay(5000).fadeOut();
            $scope.success_msg = 'Service Added Successfully';
        },function (res) {
            console.log(res);
        })
    };

    $scope.add_charges=function(){
       // $scope.charges_title = "Add Charges ";
        $scope.show_save_charge = false;
        $scope.show_edit_charge = false;
        $scope.active_lable = true;
        $scope.charge_details = {};
        $route.reload();
    }
	 $scope.get_transportation_by_id = function (index,id) {

        $scope.charge_details.transportation_name = charge[index].transportation_name;
        $scope.transportation_id = charge[index].id;
		$scope.active_lable = true;
        $scope.show_save_charge = true;
        $scope.show_edit_charge = true;
		//$scope.charges_title = "Edit Charges ";
    };

    $scope.get_edit_charge=function(id){
        charge_id=id;
        get_details_by_chargeid({charge_id:id}).then(function(response){
            console.log(response);
    $scope.charge_details.transportation_name = response.data[0].transportation_name;
    $scope.active_lable = true;
        $scope.show_save_charge = true;
        $scope.show_edit_charge = true;
        },function(res){
            console.log(res);
        })
    };
    $scope.update_transportation_name = function () {
        editChargesService({
            transportation_name:$scope.charge_details.transportation_name,
            charge_id : charge_id
        }).then(function (res) {
            console.log(res.data);
           $scope.getTransportationName();
            $scope.dismiss();
            $scope.charge_details = {};
            $('#succ_msg').fadeIn().delay(5000).fadeOut();
            $scope.success_msg = 'Service Updated Successfully';
        },function (res) {
            console.log(res);
        })
    };
   $scope.deleteTransportationName = function (id) {
        deleteTransportationRateService({
            charge_id:id
        }).then(function (res) {
            console.log(res);
        $scope.getTransportationName();
        },function (res) {
            console.log(res);
        })
    };
	
    //-------------------- Tax otp AddOns ------------------------//
        
    $scope.tax_permission_popup = function (tax_id,tax_status,tax_type) {
		$scope.current_modal = "tax_rate";
        check_permission.check_status(tax_id,tax_status,tax_type,$scope.current_modal);
		$scope.comment ={};
        $scope.otp_object = {};
    };

    $scope.charge_permission_popup = function(charge_id,charge_status,charge_type){
        $scope.current_modal = "transportation_charge";
        check_permission.check_status(charge_id,charge_status,charge_type,$scope.current_modal);
        $scope.comment={};
        $scope.otp_object = {};
    }

    $scope.tax_generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.tax_verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };

    $scope.$on('CallParentMethod', function (event, data) {

        if(data.model=='tax_rate'){
            $scope.modal_dismiss_two();
            $('#example2').modal('show');
            $scope.getTaxRate();
          
            for(var g=0;g<tax.length;g++){
                if(tax[g].id==data.id){
                    $scope.get_tax(g,data.id); 
                }
            }            
        }
        else if(data.model=='transportation_charge'){
            $scope.modal_dismiss_two();
            $scope.getTransportationName();
            $('#example3').modal('show');

            //  for(var g=0;g<charge.length;g++){
            //     if(charge[g].id==data.id){
            //         $scope.get_transportation_by_id(g,data.id); 
            //     }
            // }
            $scope.get_edit_charge(data.id);
        }
    });

    $scope.$on('updateListing', function (event, data) {
        
        if(data.model=='tax_rate'){
            $scope.getTaxRate();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#del_msg').fadeIn().delay(5000).fadeOut();
                $scope.delete_msg = 'Tax Deleted Successfully';
            }
        }else if(data.model=='transportation_charge'){
            $scope.getTransportationName();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#del_msg').fadeIn().delay(5000).fadeOut();
                $scope.delete_msg = 'Charge Deleted Successfully';
            }
        }
    });
	
    $scope.check_enter_clicked = function(event){
        console.log($scope.show_save);
        console.log($scope.show_edit);
        console.log(event.keyCode);
        if($scope.show_save==true && $scope.show_edit == true){
            if (event.keyCode == 13) {
                $scope.update_tax_rate();
            }
        }

        if($scope.show_save==false && $scope.show_edit == false){
            if (event.keyCode == 13) {
                $scope.add_tax_rate();
            }
        }
        
    }

}]);



