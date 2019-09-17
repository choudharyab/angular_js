var account_ledger = angular.module('accountLedgerModule',[]);
account_ledger.controller('accountLedgerController',['$rootScope','$scope','$location','$route','getAccLedgerGroupListService','saveLedgerGroupService','getAccLedgerListService','getAccLedgerByIdService','updateLedgerGroupService','deleteAccLedgerByIdService','getStateListService','getTaxRateService','getTdsRateChartService','getTdsRateChartDetailsService','saveNewLedgerGroupService','getAccLedgerDetailsByIdService','updateNewLedgerGroupService',function($rootScope,$scope,$location,$route,getAccLedgerGroupListService,saveLedgerGroupService,getAccLedgerListService,getAccLedgerByIdService,updateLedgerGroupService,deleteAccLedgerByIdService,getStateListService,getTaxRateService,getTdsRateChartService,getTdsRateChartDetailsService,saveNewLedgerGroupService,getAccLedgerDetailsByIdService,updateNewLedgerGroupService){

    var selected_ledger_id;
	 $scope.active_lable = true;
	 $scope.showGst = false;
	 $scope.showTds = false;
	
	 $scope.add_ledger_info = {'depot_address':[],'contacts':[],'details':{'gst_applicable':'No','tds_applicable':'No'}};
	  $scope.add_ledger_info.details.country = 'India';
 $scope.supplier_title = 'Add New Ledger';
	$scope.ledger_group_list = function () {
        getAccLedgerGroupListService({}).then(function (response) {
            $scope.ledgerGroupList = response.data;
        })
    };
    $scope.ledger_group_list();
    $scope.get_state_list = function () {
        getStateListService({}).then(function (response) {
            $scope.state_list = response.data;
        });
    };
	
	 $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_rate_list = resposne.data;
        });
    };
	 $scope.get_tds_rate_list = function () {
        getTdsRateChartService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tds_rate_chart_list = resposne.data;
        });
    };
   
    $scope.get_state_list();
$scope.get_tds_rate_list();
$scope.get_tax_rate_list();
$scope.add_ledger_info.details.ledger_type ='Ledger';
	 $scope.add_ledger_buttton = function () {

      $scope.add_ledger_info.details.gst_applicable ='No';
	   $scope.add_ledger_info.details.tds_applicable ='No';
	    $scope.add_ledger_info.details.hsn_code='';
        $scope.add_ledger_info.details.sac_code='';
        $scope.add_ledger_info.details.gst_rate_id='';
        
		  $scope.get_state_list();

		  $scope.get_tds_rate_list();
		  $scope.add_ledger_info.details.ledger_type ='Ledger';
		  $scope.dismiss();
		  $route.reload();

           
    };
	
	$scope.add_more_address = function () {
        $scope.add_ledger_info.depot_address.push({'address_name':'','street_address':'','city':'','state_id':'','pincode':'','country':''});
    };
    $scope.remove_address=function (index) {
        $scope.add_ledger_info.depot_address.splice(index,1);
    };
    $scope.add_more_contact = function () {
        $scope.add_ledger_info.contacts.push({'full_name':'','designation':'','designation':'','email':'','website':'','office_phone':'','mobile_number':'','fax_number':'','alternet_mobile_no':'','skype_id':'','location':''});
    };
    $scope.remove_contact=function (index) {
        $scope.add_ledger_info.contacts.splice(index,1);
    };
	
	
	
	$scope.getnpdetails = function () {
        getTdsRateChartDetailsService({
			np_id:$scope.add_ledger_info.details.tds_nature_of_payment,
			}).then(function (resposne) {
            console.log(resposne);
            $scope.tds_rate_chart_details = resposne.data;
            $scope.individual_rate = resposne.data.individual_rate;
            $scope.company_firm_rate = resposne.data.company_firm_rate;
            $scope.add_ledger_info.details.section_code = resposne.data.section_code;
            $scope.add_ledger_info.details.tds_rate = '';
            $scope.add_ledger_info.details.tds_deductive_type = '';
           
        });
    };
	$scope.get_tds_deductive_type = function () {
		
		if($scope.add_ledger_info.details.tds_deductive_type == 'Individuals' )
		{
			$scope.add_ledger_info.details.tds_rate  = $scope.individual_rate;
		}else{
			$scope.add_ledger_info.details.tds_rate  = $scope.company_firm_rate;
		}
       
    };
	 $scope.checkGST = function () {
		 
		 if($scope.add_ledger_info.details.gst_applicable == 'Yes')
		 {
			 $scope.showGst = true;
		 }else{
			 $scope.showGst = false;
		 }
           
    };
	 $scope.checkTds = function () {
		 if($scope.add_ledger_info.details.tds_applicable == 'Yes')
		 {
			 $scope.showTds = true;
		 }else{
			 $scope.showTds = false;
		 }
      
	  };
	 //  $scope.ledgerTypeList = [{'ledger_type':'Ledger'},{'ledger_type':'Group'}];
    $scope.acc_ledger_type = 'Group';

    $scope.save_ledger = function () {
        saveLedgerGroupService({
            ledger_name:$scope.ledger_name,
            ledger_group_id:$scope.ledger_group_id,
            ledger_type:$scope.acc_ledger_type,
            opening_balance:$scope.opening_balance
        }).then(function (resp) {
            $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
            $scope.led_success = JSON.parse(resp.data);
            $scope.ledger_list();
			 $scope.ledger_group_list();
            $scope.ledger_name = '';
            $scope.ledger_group_id = '';
            $scope.acc_ledger_type = 'Ledger';
        })
    };
	 $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };
	$scope.save_new_ledger = function () {
        saveNewLedgerGroupService({
            ledger_data:$scope.add_ledger_info,
        
        }).then(function (resp) {
			if(resp.data.results > 0){
				 $('#example2').modal('hide');
               $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
              
			}
               $scope.led_success = resp.data.message;
            $scope.ledger_list();
			 $scope.ledger_group_list();
			  $scope.add_ledger_info = {'depot_address':[],'contacts':[],'details':{'gst_applicable':'No','tds_applicable':'No'}};
           // $scope.ledger_name = '';
           // $scope.ledger_group_id = '';
           // $scope.acc_ledger_type = 'Ledger';
        })
    };



    $scope.ledger_list = function () {
        getAccLedgerListService({}).then(function (res) {
            $scope.ledgerList = res.data;
        })
    };
    $scope.ledger_list();


	 $scope.ledger_details_by_id = function (ledger_id) {
         $scope.get_tax_rate_list();
		  $scope.get_state_list();
		  $scope.get_tds_rate_list(); 
       $scope.ledger_id= ledger_id;
 
      getAccLedgerDetailsByIdService({ledger_id:$scope.ledger_id}).then(function (res) {
            console.log(res);
            $scope.add_ledger_info.details = res.data.ledgers;
            $scope.add_ledger_info.depot_address = res.data.depot_address;
console.log($scope.add_ledger_info.depot_address);
            $scope.add_ledger_info.contacts = res.data.contacts;
           if($scope.add_ledger_info.details.gst_applicable == 'Yes')
			 {
				 $scope.showGst = true;
			 }
            if($scope.add_ledger_info.details.tds_applicable == 'Yes')
			 {
				 $scope.showTds = true;
			 }
            $scope.show_edit = true;
            $scope.show_save = true;

        });

           
    };
    $scope.update_new_ledger = function () {
        updateNewLedgerGroupService({
            ledger_data:$scope.add_ledger_info,
            ledger_id:$scope.ledger_id,
        
        }).then(function (resp) {
			if(resp.data.results > 0){
				 $('#example2').modal('hide');
               $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
              
			}
               $scope.led_success = resp.data.message;
            $scope.ledger_list();
			 $scope.ledger_group_list();
			  $scope.add_ledger_info = {'depot_address':[],'contacts':[],'details':{'gst_applicable':'No','tds_applicable':'No'}};
           // $scope.ledger_name = '';
           // $scope.ledger_group_id = '';
           // $scope.acc_ledger_type = 'Ledger';
        })
    };
    $scope.edit_ledger = function (ledger_id) {
        selected_ledger_id = ledger_id;
        getAccLedgerByIdService({id:ledger_id}).then(function (res) {
            console.log(res);
            $scope.edit_ledger_data = res.data[0];
            $scope.ledger_name = res.data[0].ledger_name;
            $scope.acc_ledger_type = res.data[0].ledger_type;
            $scope.ledger_group_id = res.data[0].ledger_group_id;
            $scope.show_edit = true;
            $scope.show_save = true;
        });
    };

    $scope.update_ledger = function () {
        updateLedgerGroupService({
            id:selected_ledger_id,
            ledger_name:$scope.ledger_name,
            ledger_group_id:$scope.ledger_group_id,
            ledger_type:$scope.acc_ledger_type
        }).then(function (res) {
            $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
            $scope.led_success = JSON.parse(res.data);
            $scope.ledger_list();
            $scope.ledger_name = '';
            $scope.ledger_group_id = '';
            $scope.acc_ledger_type = 'Ledger';
            $scope.show_edit = false;
            $scope.show_save = false;
        })
    };

    $scope.deleteLedgerById = function (led_id) {
        deleteAccLedgerByIdService({id:led_id}).then(function (res) {
            $scope.ledger_list();
            $('#ledger_delete_success').fadeIn().delay(5000).fadeOut();
            $scope.led_del_success = JSON.parse(res.data);
        },function (res) {
            console.log(res);
        })
    };


}]);



