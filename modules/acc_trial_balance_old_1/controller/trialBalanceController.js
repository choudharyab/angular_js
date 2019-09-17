var trialBalanceModule = angular.module('trialBalanceModule',[]);
trialBalanceModule.controller('trialBalanceController',['$rootScope','$scope','$location','$window','$routeParams','getLedgerBalanceListService','getWarehouseListService','generateExcelTrialBalanceService',function($rootScope,$scope,$location,$window,$routeParams,getLedgerBalanceListService,getWarehouseListService,generateExcelTrialBalanceService){

    var ledgeraccdetail;

 $scope.details_ledger_for_non_micro = true;
 $scope.details_ledger_for_micro = false;
 $scope.state_0 = false;
 $scope.state_1 = false;
 $scope.state_2 = false;
 $scope.state_3 = false;
 $scope.state_4 = false;
 $scope.state_5 = false;
 $scope.state_6 = false;
 $scope.state_7 = false;
 $scope.state_8 = false;
 $scope.state_9 = false;
 $scope.state_10 = false;
 $scope.state_11 = false;
 $scope.state_12 = false;
 $scope.state_13 = false;
 $scope.state_14 = false;
 $scope.state_15 = false;
 $scope.state_16 = false;
 $scope.show_op = false;
 $scope.show_closing = false;
 //$("#sub_group_0").hide();
 $scope.finance_year = new Date().getFullYear();
 
 $scope.selected_warehouse = localStorage.getItem('warehouse_id');
 $rootScope.warehouse_id = $scope.selected_warehouse;
 $scope.get_wh = function () {
	 $rootScope.warehouse_id = $scope.warehouse_id;
	 for(i=0;i<$scope.warehouse_list.length;i++){
		 if($scope.warehouse_list[i].id==$scope.warehouse_id)
		 $scope.warehouse_data=$scope.warehouse_list[i];
	 }
	 localStorage.setItem('warehouse_id',($scope.warehouse_data).id);
	 localStorage.setItem('warehouse_name',($scope.warehouse_data).warehouse_name);
	 console.log('warehouse_name----->',localStorage.getItem('warehouse_name'));
	 $scope.selected_warehouse = localStorage.getItem('warehouse_id');
	 $rootScope.selected_warehouse_name = localStorage.getItem('warehouse_name');
	 //$route.reload();
 };
 
 
 //alert($scope.finance_year)
    $scope.current_month = new Date().getMonth() + 1;
	//alert($scope.current_month);
    if($scope.current_month > 3){
       // $scope.finance_year--;
	        $rootScope.finance_from_year =$scope.finance_year;
            $rootScope.finance_to_year =$scope.finance_year + 1;
    }else{
		$rootScope.finance_from_year =$scope.finance_year -1;
            $rootScope.finance_to_year =$scope.finance_year;
	}
   // $scope.current_month++;
    $rootScope.from_date = $scope.finance_from_year +'-04'+'-01';
    $rootScope.to_date = $scope.finance_to_year +'-03'+'-31';
   getWarehouseListService({}).then(function (response) {
        $scope.warehouse_list = response.data;
 
    });
    getLedgerBalanceListService({
		from_date:$rootScope.from_date,to_date:$rootScope.to_date,warehouse_id:$rootScope.warehouse_id
	}).then(function (response) {
		$scope.credit_total=0;
		$scope.debit_total=0;
        $scope.ledger_balance_list = response.data;
		console.log($scope.ledger_balance_list);
		for(i=0;i<$scope.ledger_balance_list.length;i++){
		
			$scope.credit_total=parseFloat($scope.credit_total)+parseFloat($scope.ledger_balance_list[i].total_credit_amount);
			$scope.debit_total=parseFloat($scope.debit_total)+parseFloat($scope.ledger_balance_list[i].total_debit_amount);
		}
		$scope.credit_total = $scope.credit_total.toFixed(2);
		$scope.debit_total = $scope.debit_total.toFixed(2);
 
    });
    $scope.getSubGroupData = function ($index) {
		var  v1 ='state_'+$index;
		$scope[v1] = !$scope[v1];
		/*if($index == 0)
		{
			$scope.state_0 = !$scope.state_0 ;
		}else if($index == 1){
			$scope.state_1 = !$scope.state_1 ;
		}*/
		 
    };
	
	$scope.getSubSubGroupData = function ($index1,$index2) {
		//alert($index)
		var  v2 ='sub_'+$index1+'_'+$index2;
		$scope[v2] = !$scope[v2];
		/*if($index == 0)
		{
			$scope.state_0 = !$scope.state_0 ;
		}else if($index == 1){
			$scope.state_1 = !$scope.state_1 ;
		}*/
		 
    };
	$scope.change_view_type = function () {
		
		if($scope.view_type == 'Compacted'){
			for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = true;
			}
			//$location.path('/trial_balance');
		}
		else if($scope.view_type == 'Details'){
			for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = true;
			   
			   for(var j=0;j < 50;j++){
				var  v1 ='sub_'+i+'_'+j;
			   $scope[v1] = true;
			  }
			}
			//$location.path('/trial_balance');
			
		}else if($scope.view_type == 'Micro'){
			
			   for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = true;
			   
			   for(var j=0;j < 50;j++){
				var  v1 ='sub_'+i+'_'+j;
			   $scope[v1] = true;
			  }
			}
			 $scope.details_ledger_for_non_micro = false;
             $scope.details_ledger_for_micro = true;
			 
			 $location.path('/trial_balance_micro');
			
		}
		else{
			  for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = false;
			 }
		}
		//alert($scope.view_type)
		
	}
	
	 $scope.get_ledger_data_by_date = function ($index) {
		 $scope.credit_total =0;
		 $scope.debit_total =0;
        getLedgerBalanceListService({
		from_date:$scope.from_date,to_date:$scope.to_date,warehouse_id:$rootScope.warehouse_id
		}).then(function (response) {
			$scope.ledger_balance_list = response.data;
			console.log($scope.ledger_balance_list);
			for(i=0;i<$scope.ledger_balance_list.length;i++){
		
				$scope.credit_total=parseFloat($scope.credit_total)+parseFloat($scope.ledger_balance_list[i].total_credit_amount);
				
				$scope.debit_total=parseFloat($scope.debit_total)+parseFloat($scope.ledger_balance_list[i].total_debit_amount);
				
			}
			$scope.credit_total = $scope.credit_total.toFixed(2);
			$scope.debit_total = $scope.debit_total.toFixed(2);
		});
    };
	
	$scope.get_month_details = function(acc_name,ledger_id,route_type,check_supp,bill_type,tax_type,ledger_type,income_type)
	{
		//alert(acc_name)
		if(acc_name == 'Purchases'){
			 $location.path('/purchasemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+tax_type);
		}else if(acc_name == 'Direct Expenses'){
		   $location.path('/inwordmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+ledger_id);
		}
		else if(acc_name == 'Indirect Expenses'){
			if(route_type == 'round_off'){
		      $location.path('/indirectexpensesroundoffmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
			}else{
				$location.path('/indirectexpensesmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
			}
		}else if(acc_name == 'Sale Accounts'){
		     $location.path('/salesmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+tax_type);
		}else if(acc_name == 'Direct Incomes'){
		     $location.path('/directincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+income_type+'/'+ledger_type);
		}else if(acc_name == 'Indirect Incomes'){
		     $location.path('/indirectincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+income_type+'/'+ledger_type);
		}else if(acc_name == 'Capital Account'){
		     $location.path('/capitalamountmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Loan Liabilities'){
		     $location.path('/capitalamountmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Current Liabilities'){
			if(route_type == 'sundry'){
			 $location.path('/sundrycreditormonthwiseData/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+ledger_id+'/'+check_supp);
			}else if(route_type == 'tax_duties'){
				$location.path('/taxdutiesmonthwise/'+bill_type+'/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+tax_type);
		    }else{
			
		    }
		}else if(acc_name == 'Provision Account'){
			
		     $location.path('/capitalamountmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Suspense Account'){
			
		     $location.path('/suspencemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
		}else if(acc_name == 'Fixed Assets'){
			
		     $location.path('/fixedassetsmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Investments'){
			
		     $location.path('/investmentmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Loan & Advances'){
			
		     $location.path('/investmentdatewise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}
		else if(acc_name == 'Curent Assets'){
			if(route_type == 'sundry'){
			$location.path('/sundrydebtorsrmonthwiseData/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+ledger_id);
			}else{
				$location.path('/branchmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
		    }
		     
		}
		else if(acc_name == 'Bank & Cash'){
			if(route_type == 'bank'){
				
			 $location.path('/bankaccountmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
			}else{
				$location.path('/branchmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
		    }
		     
		}
	}
     $scope.generate_excel_trial_balance = function () {
        $('.loading').show();
        generateExcelTrialBalanceService({
           
			warehouse_id : $rootScope.warehouse_id,
			from_date : $scope.from_date,
			to_date : $scope.to_date,
        }).then(function (response) {
            //console.log(response)
            $window.open('Elephantoserver/public/excel_files/trial_balance.xlsx');
            $('.loading').hide();
        },function (res) {
            console.log(res);
        }); 
    }

   

}]).controller('trialBalanceMicroController',['$rootScope','$scope','$location','$window','$routeParams','getLedgerBalanceListService','getWarehouseListService','generateExcelTrialBalanceMicroService',function($rootScope,$scope,$location,$window,$routeParams,getLedgerBalanceListService,getWarehouseListService,generateExcelTrialBalanceMicroService) {




 $scope.details_ledger_for_non_micro = true;
 $scope.details_ledger_for_micro = false;
 $scope.state_0 = false;
 $scope.state_1 = false;
 $scope.state_2 = false;
 $scope.state_3 = false;
 $scope.state_4 = false;
 $scope.state_5 = false;
 $scope.state_6 = false;
 $scope.state_7 = false;
 $scope.state_8 = false;
 $scope.state_9 = false;
 $scope.state_10 = false;
 $scope.state_11 = false;
 $scope.state_12 = false;
 $scope.state_13 = false;
 $scope.state_14 = false;
 $scope.state_15 = false;
 $scope.state_16 = false;
 $scope.show_op = false;
 $scope.show_closing = false;
 //$("#sub_group_0").hide();
 $scope.finance_year = new Date().getFullYear();
 
 $scope.selected_warehouse = localStorage.getItem('warehouse_id');
 $rootScope.warehouse_id = $scope.selected_warehouse;
 $scope.get_wh = function () {
	 $rootScope.warehouse_id = $scope.warehouse_id;
	 for(i=0;i<$scope.warehouse_list.length;i++){
		 if($scope.warehouse_list[i].id==$scope.warehouse_id)
		 $scope.warehouse_data=$scope.warehouse_list[i];
	 }
	 localStorage.setItem('warehouse_id',($scope.warehouse_data).id);
	 localStorage.setItem('warehouse_name',($scope.warehouse_data).warehouse_name);
	 console.log('warehouse_name----->',localStorage.getItem('warehouse_name'));
	 $scope.selected_warehouse = localStorage.getItem('warehouse_id');
	 $rootScope.selected_warehouse_name = localStorage.getItem('warehouse_name');
	 //$route.reload();
 };
 
 $rootScope.finance_from_year =$scope.finance_year;
 $rootScope.finance_to_year =$scope.finance_year + 1;
 //alert($scope.finance_year)
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
       // $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date = $scope.finance_year +'-04'+'-01';
    $rootScope.to_date = $scope.finance_year+1+'-03'+'-31';
   getWarehouseListService({}).then(function (response) {
        $scope.warehouse_list = response.data;
 
    });
    getLedgerBalanceListService({
		from_date:$rootScope.from_date,to_date:$rootScope.to_date,warehouse_id:$rootScope.warehouse_id
	}).then(function (response) {
		$scope.total_opening_balance=0;
		$scope.credit_total=0;
		$scope.debit_total=0;
		$scope.total_closing_balance=0;
        $scope.ledger_balance_list = response.data;
		console.log($scope.ledger_balance_list);
		for(i=0;i<$scope.ledger_balance_list.length;i++){
		
			$scope.total_opening_balance=parseFloat($scope.total_opening_balance)+parseFloat($scope.ledger_balance_list[i].opening_balance);
			$scope.credit_total=parseFloat($scope.credit_total)+parseFloat($scope.ledger_balance_list[i].credit_total);
			$scope.debit_total=parseFloat($scope.debit_total)+parseFloat($scope.ledger_balance_list[i].debit_total);
			$scope.total_closing_balance=parseFloat($scope.total_closing_balance)+parseFloat($scope.ledger_balance_list[i].total_amt);
		}
		$scope.total_opening_balance = $scope.total_opening_balance.toFixed(2);
		$scope.credit_total = $scope.credit_total.toFixed(2);
		$scope.debit_total = $scope.debit_total.toFixed(2);
		$scope.total_closing_balance = $scope.total_closing_balance.toFixed(2);
 
    });
    $scope.getSubGroupData = function ($index) {
		var  v1 ='state_'+$index;
		$scope[v1] = !$scope[v1];
		/*if($index == 0)
		{
			$scope.state_0 = !$scope.state_0 ;
		}else if($index == 1){
			$scope.state_1 = !$scope.state_1 ;
		}*/
		 
    };
	
	$scope.getSubSubGroupData = function ($index1,$index2) {
		//alert($index)
		var  v2 ='sub_'+$index1+'_'+$index2;
		$scope[v2] = !$scope[v2];
		/*if($index == 0)
		{
			$scope.state_0 = !$scope.state_0 ;
		}else if($index == 1){
			$scope.state_1 = !$scope.state_1 ;
		}*/
		 
    };
	
 $scope.change_view_type = function () {
		
		if($scope.view_type == 'Compacted'){
			for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = true;
			}
			$location.path('/trial_balance');
		}
		else if($scope.view_type == 'Details'){
			for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = true;
			   
			   for(var j=0;j < 50;j++){
				var  v1 ='sub_'+i+'_'+j;
			   $scope[v1] = true;
			  }
			}
			$location.path('/trial_balance');
			
		}else if($scope.view_type == 'Micro'){
			
			   for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = true;
			   
			   for(var j=0;j < 50;j++){
				var  v1 ='sub_'+i+'_'+j;
			   $scope[v1] = true;
			  }
			}
			 $scope.details_ledger_for_non_micro = false;
             $scope.details_ledger_for_micro = true;
			 
			// $location.path('/trial_balance_micro');
			
		}
		else{
			  for(var i=0;i < 20;i++){
				var  v1 ='state_'+i;
			   $scope[v1] = true;
			   
			   for(var j=0;j < 50;j++){
				var  v1 ='sub_'+i+'_'+j;
			   $scope[v1] = true;
			  }
			}
			 $scope.details_ledger_for_non_micro = false;
             $scope.details_ledger_for_micro = true;
		}
		//alert($scope.view_type)
		
	}

$scope.change_view_type();

 $scope.get_ledger_data_by_date = function ($index) {
		$scope.total_opening_balance=0;
		$scope.credit_total=0;
		$scope.debit_total=0;
		$scope.total_closing_balance=0;
        getLedgerBalanceListService({
		from_date:$scope.from_date,to_date:$scope.to_date,warehouse_id:$rootScope.warehouse_id
		}).then(function (response) {
			$scope.ledger_balance_list = response.data;
			console.log($scope.ledger_balance_list);
			for(i=0;i<$scope.ledger_balance_list.length;i++){
		
			$scope.total_opening_balance=parseFloat($scope.total_opening_balance)+parseFloat($scope.ledger_balance_list[i].opening_balance);
				$scope.credit_total=parseFloat($scope.credit_total)+parseFloat($scope.ledger_balance_list[i].total_credit_amount);
				
				$scope.debit_total=parseFloat($scope.debit_total)+parseFloat($scope.ledger_balance_list[i].total_debit_amount);
				$scope.total_closing_balance=parseFloat($scope.total_closing_balance)+parseFloat($scope.ledger_balance_list[i].total_amt);
			}
			$scope.total_opening_balance = $scope.total_opening_balance.toFixed(2);
			$scope.credit_total = $scope.credit_total.toFixed(2);
			$scope.debit_total = $scope.debit_total.toFixed(2);
			$scope.total_closing_balance = $scope.total_closing_balance.toFixed(2);
		});
    };


	
	$scope.get_month_details = function(acc_name,ledger_id,route_type,check_supp,bill_type,tax_type,ledger_type,income_type)
	{
		//alert(acc_name)
		if(acc_name == 'Purchases'){
			 $location.path('/purchasemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+tax_type);
		}else if(acc_name == 'Direct Expenses'){
		   $location.path('/inwordmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+ledger_id);
		}
		else if(acc_name == 'Indirect Expenses'){
			if(route_type == 'round_off'){
		      $location.path('/indirectexpensesroundoffmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
			}else{
				$location.path('/indirectexpensesmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
			}
		}else if(acc_name == 'Sale Accounts'){
		     $location.path('/salesmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+tax_type);
		}else if(acc_name == 'Direct Incomes'){
		     $location.path('/directincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+income_type+'/'+ledger_type);
		}else if(acc_name == 'Indirect Incomes'){
		     $location.path('/indirectincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+income_type+'/'+ledger_type);
		}else if(acc_name == 'Capital Account'){
		     $location.path('/capitalamountmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Loan Liabilities'){
		     $location.path('/capitalamountmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Current Liabilities'){
			if(route_type == 'sundry'){
			 $location.path('/sundrycreditormonthwiseData/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+ledger_id+'/'+check_supp);
			}else if(route_type == 'tax_duties'){
				$location.path('/taxdutiesmonthwise/'+bill_type+'/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+tax_type);
		    }else{
			
		    }
		}else if(acc_name == 'Provision Account'){
			
		     $location.path('/capitalamountmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Suspense Account'){
			
		     $location.path('/suspencemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
		}else if(acc_name == 'Fixed Assets'){
			
		     $location.path('/fixedassetsmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Investments'){
			
		     $location.path('/investmentmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}else if(acc_name == 'Loan & Advances'){
			
		     $location.path('/investmentdatewise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id);
		}
		else if(acc_name == 'Curent Assets'){
			if(route_type == 'sundry'){
			$location.path('/sundrydebtorsrmonthwiseData/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.warehouse_id+'/'+ledger_id);
			}else{
				$location.path('/branchmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
		    }
		     
		}
		else if(acc_name == 'Bank & Cash'){
			if(route_type == 'bank'){
				
			 $location.path('/bankaccountmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
			}else{
				$location.path('/branchmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date);
		    }
		     
		}
	}
   $scope.generate_excel_trial_balance_micro = function () {
        $('.loading').show();
        generateExcelTrialBalanceMicroService({
           
			warehouse_id : $rootScope.warehouse_id,
			from_date : $scope.from_date,
			to_date : $scope.to_date,
        }).then(function (response) {
            //console.log(response)
            $window.open('Elephantoserver/public/excel_files/trial_balance_micro.xlsx');
            $('.loading').hide();
        },function (res) {
            console.log(res);
        }); 
    }

   
    
}]);