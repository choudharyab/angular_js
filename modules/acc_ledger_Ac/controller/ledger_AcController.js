var accountLedgerAccModule = angular.module('accountLedgerAccModule',[]);
accountLedgerAccModule.controller('accountLedgerAccController',['$rootScope','$scope','$location',
	'$routeParams','getAccLedgerAcountListService','getWarehouseListService1',
	'getAccLedgerAcountDetailsService',
	function($rootScope,$scope,$location,$routeParams,getAccLedgerAcountListService,
		getWarehouseListService1,getAccLedgerAcountDetailsService){

    var ledgeraccdetail;
$scope.warehouse_list = '';
 $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);
    $scope.finance_to_year = parseInt($scope.finance_year+1);

    $scope.selected_warehouse_name=localStorage.getItem('company_name');
    getWarehouseListService1({}).then(function (response) {
        $scope.warehouse_list = response.data;
 
    });

	// $scope.selected_warehouse = localStorage.getItem('warehouse_id');
	// console.log($scope.selected_warehouse);
	// console.log($scope.warehouse_list);
 //    $scope.get_wh = function () {
 //        $rootScope.warehouse_id = $scope.warehouse_id;
 //        for(i=0;i<$scope.warehouse_list.length;i++){
 //            if($scope.warehouse_list[i].id==$scope.warehouse_id)
 //            $scope.warehouse_data=$scope.warehouse_list[i];
 //        }
 //        console.log($scope.warehouse_data);
 //        localStorage.setItem('warehouse_id',($scope.warehouse_data).id);
 //        localStorage.setItem('company_name',($scope.warehouse_data).company_name);
 //        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
 //        $rootScope.selected_warehouse_name = localStorage.getItem('company_name');
 //        //$route.reload();
 //    };

 //    $scope.$on('change_warehouse',function(event,data){
 //        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
 //        $scope.ledger_account_list();
 //  $scope.get_po_warehouse();
 //    });

 //     $scope.get_po_warehouse = function () {
 //        localStorage.setItem('warehouse_id',$rootScope.warehouse_id);
        
 //        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
 //    };


	$scope.ledger_account_list = function () {
        getAccLedgerAcountListService({from_date:$scope.from_date,
            to_date:$scope.to_date}).then(function (response) {
            $scope.ledgerAccountList = response.data.data;
            ledgeraccdetail=response.data.ledger_account_data;
        })
    };
    $scope.ledger_account_list();

    $scope.ledgerAccountdetails=function(opening_bal,total_debit,total_credit,closing_bal,pdc_bal){
		
		$scope.opening_balance = opening_bal;
		$scope.total_debit = total_debit;
		$scope.total_credit = total_credit;
		$scope.pdc_balance = pdc_bal;
		$scope.closing_balance = closing_bal;
		//$scope.closing_balance = $scope.closing_balance.toFixed(2);
        /**if(ledgeraccdetail[ind].total_debit==null || ledgeraccdetail[ind].total_debit==undefined){
            ledgeraccdetail[ind].total_debit=0;
        }
        if(ledgeraccdetail[ind].total_credit==null || ledgeraccdetail[ind].total_credit==undefined){
            ledgeraccdetail[ind].total_credit=0;
        }
        $scope.ledgerDetails = ledgeraccdetail[ind];
        ledgeraccdetail[ind].closing_balance =ledgeraccdetail[ind].opening_balance+ledgeraccdetail[ind].total_debit-ledgeraccdetail[ind].total_credit;**/

    }
	
    $scope.view_ledger_datewise=function(ledger_id,ledger_name,subtype){
    	$location.path('/accOpeningbalanceDetails');
    	console.log(ledger_name);
    	$rootScope.ledger_name = ledger_name;
    	$rootScope.debit_total = 0;
    	$rootScope.credit_total = 0;
    	getAccLedgerAcountDetailsService({
				ledger_id:ledger_id,
				subtype:subtype,
				from_date:$scope.from_date,
				to_date:$scope.to_date
			}).then(function(response){
				$rootScope.ledgerDateWise=response.data;
				if(response.data.data.length != 0){
					for(var i=0;i<response.data.data.length;i++){
						$rootScope.debit_total = parseFloat($rootScope.debit_total) + parseFloat(response.data.data[i].debit_amount);
						$rootScope.credit_total = parseFloat($rootScope.credit_total) + parseFloat(response.data.data[i].credit_amount);
					}
				}				
			});

		// if(ledger_id != undefined){
		// 	$location.path('/ledgerdatewise/'+ledger_id+'/'+type+'/'+supplier_type);
		// }
		// if($routeParams.ledger_id != undefined){
		// 	getAccLedgerAcountDetailsService({
		// 		ledger_id:$routeParams.ledger_id,
		// 		type:$routeParams.type,
		// 		from_date:$scope.from_date,
		// 		to_date:$scope.to_date,
		// 		supp_check:$routeParams.supplier_type,
		// 	}).then(function(response){
		// 		$scope.ledgerDateWise=response.data;				
		// 	});
		// }
        
    }
	//$scope.view_ledger_datewise();
	
	$scope.convertCrDr = function(value){
		var checkVal = value.toString().indexOf('-');
		if(checkVal === -1){
			return value+' DR';
		} else {
			var splitVal = value.toString().split('-');
			return splitVal[1]+' CR';
		}
	}
 
}]);