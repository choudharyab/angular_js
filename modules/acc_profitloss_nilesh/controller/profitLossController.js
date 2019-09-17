var accProfitLossModule = angular.module('accProfitLossModule',[]);
accProfitLossModule.controller('accProfitLossController',['$rootScope','$scope','$location','$timeout','getPLPurchaseAccountListService','getPLSaleAccountListService','getWarehouseListService','getDirectExpensesListService','indirectExpensesListService','directIncomeListService','indirectIncomeListService','openingStockService','closingStockService','fixedPurchaseAssetService',function($rootScope,$scope,$location,$timeout,getPLPurchaseAccountListService,getPLSaleAccountListService,getWarehouseListService,getDirectExpensesListService,indirectExpensesListService,directIncomeListService,indirectIncomeListService,openingStockService,closingStockService,fixedPurchaseAssetService){

    var sale_acc_total,direct_income_total,closing_stock_total,opening_stock_total,purchase_acc_total,direct_expenses_total,indirect_income_total,gross_profit,total_gross_profit,final_total;

    $scope.all_acc_value = {};
	 $scope.direct_incomes_arry=[];
	 $scope.indirect_incomes_arry=[];
	 $scope.indirect_expense_arry=[];
	 $scope.direct_expense_arry =[];
    $scope.view_type = '';    
    $scope.showpurchaseaccountdetails=false;
    $scope.showopenstockdetails=false;
    $scope.showdirectexpensesdetails=false;
    $scope.showindirectexpensesdetails=false;
    $scope.showsaleaccountdetails=false;
    $scope.showdirectincomedetails=false;
    $scope.showclosingstockdetails=false;
    $scope.showindirectincomedetails=false;
$scope.showDirectIncomesSubLedger =false;
$scope.showInDirectIncomesSubLedger =false;
$scope.showInDirectExpenseSubLedger =false;
$scope.showDirectExpenseSubLedger =false;


    $scope.show_purchase_account=function(){
        $scope.showpurchaseaccountdetails=!$scope.showpurchaseaccountdetails;
             $('.show2').show();
                $('.first_row').addClass(''); 
    }
    $scope.show_open_stock=function(){
        $scope.showopenstockdetails=!$scope.showopenstockdetails;
             $('.show1').show();
                $('.first_row').addClass(''); 
    }
    $scope.show_direct_expenses=function(){
        $scope.showdirectexpensesdetails=!$scope.showdirectexpensesdetails;
             $('.show3').show();
                $('.first_row').addClass(''); 
    }
    $scope.show_indirect_expenses=function(){
        $scope.showindirectexpensesdetails=!$scope.showindirectexpensesdetails;
             $('.show4').show();
                $('.first_row').addClass(''); 
    }
    $scope.show_sales_account=function(){
        $scope.showsaleaccountdetails=!$scope.showsaleaccountdetails;
             $('.show5').show();
                $('.first_row').addClass(''); 
    }
    $scope.show_direct_income=function(){
        $scope.showdirectincomedetails=!$scope.showdirectincomedetails;
             $('.show6').show();
                $('.first_row').addClass(''); 
    }
    $scope.show_closing_stock=function(){
        $scope.showclosingstockdetails=!$scope.showclosingstockdetails;
             $('.show7').show();
                $('.first_row').addClass(''); 
    }
    $scope.show_indirect_incomes=function(){
        $scope.showindirectincomedetails=!$scope.showindirectincomedetails;
             $('.show8').show();
                $('.first_row').addClass(''); 
    }

    $scope.change_view_type = function(){
        if($scope.view_type == 'Compacted'){
            $scope.showpurchaseaccountdetails=true;
            $scope.showopenstockdetails=true;
            $scope.showdirectexpensesdetails=true;
            $scope.showindirectexpensesdetails=true;
            $scope.showsaleaccountdetails=true;
            $scope.showdirectincomedetails=true;
            $scope.showclosingstockdetails=true;
            $scope.showindirectincomedetails=true;
            $('.type tr:not(:first-child)').hide(); 
            $('.second_row').show();
            $('.first_row').addClass('');
            
        }else if($scope.view_type == 'Detailed'){
            $('.type tr:not(:first-child)').show();
            $('.first_row').addClass('');
            $scope.showpurchaseaccountdetails=true;
            $scope.showopenstockdetails=true;
            $scope.showdirectexpensesdetails=true;
            $scope.showindirectexpensesdetails=true;
            $scope.showsaleaccountdetails=true;
            $scope.showdirectincomedetails=true;
            $scope.showclosingstockdetails=true;
            $scope.showindirectincomedetails=true;

            $scope.showDirectExpenseSubLedger=true;
            $scope.showInDirectExpenseSubLedger=true;
            $scope.showDirectIncomesSubLedger=true;
            $scope.showInDirectIncomesSubLedger=true;
          

        }else{
            $scope.showpurchaseaccountdetails=false;
            $scope.showopenstockdetails=false;
            $scope.showdirectexpensesdetails=false;
            $scope.showindirectexpensesdetails=false;
            $scope.showsaleaccountdetails=false;
            $scope.showdirectincomedetails=false;
            $scope.showclosingstockdetails=false;
            $scope.showindirectincomedetails=false;
            $('.type tr:not(:first-child)').hide();
            $('.first_row').removeClass('');

                  $scope.showDirectExpenseSubLedger=false;
            $scope.showInDirectExpenseSubLedger=false;
            $scope.showDirectIncomesSubLedger=false;
            $scope.showInDirectIncomesSubLedger=false;
        }
        
    };

    getWarehouseListService({}).then(function (response) {
        $scope.warehouse_list = response.data;
    });

    $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();

    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date = $scope.finance_year +'-04'+'-01';
    $rootScope.to_date = $scope.finance_year+1+'-03'+'-31';

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

  


    $scope.allProfitLossList = function () {
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        $scope.credit_total = 0;
        $scope.debit_total = 0;
        $scope.netProfit =0;
        $scope.netLoss =0;
        $scope.gross_profitCO=0;
        $scope.gross_profit_blank_field=0;
        $scope.final_total=0;
        $scope.show_gross_profit_co=0;
        $scope.show_gross_loss_co=0;
        fixedPurchaseAssetService({
            from_date:$rootScope.from_date,
            to_date:$rootScope.to_date,
            warehouse_id:$rootScope.warehouse_id
        }).then(function (res) {

            console.log(res)
        });

        getPLPurchaseAccountListService({
            from_date:$rootScope.from_date,
            to_date:$rootScope.to_date,
            warehouse_id:$rootScope.warehouse_id
        }).then(function (res) {
            $scope.purchase_acc_list = res.data.purchase_accounts_list;
            $scope.purchase_acc_total = parseFloat(res.data.purchase_accounts_total).toFixed(2);
            $scope.debit_total = (parseFloat($scope.debit_total) + parseFloat($scope.purchase_acc_total)).toFixed
            (2);
            purchase_acc_total = $scope.purchase_acc_total;
            $scope.all_acc_value.purchase_acc_total = $scope.purchase_acc_total;
        
            getPLSaleAccountListService({
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                warehouse_id:$rootScope.warehouse_id
            }).then(function (res) {
                $scope.sale_account_list = res.data.sale_accounts_list;
                $scope.sale_acc_total = parseFloat(res.data.sale_accounts_total).toFixed(2);
                sale_acc_total = $scope.sale_acc_total;
                $scope.credit_total = (parseFloat($scope.credit_total ) + parseFloat($scope.sale_acc_total)).toFixed(2);
                $scope.all_acc_value.sale_acc_total = sale_acc_total;
        
                getDirectExpensesListService({
                    from_date:$rootScope.from_date,
                    to_date:$rootScope.to_date,
                    warehouse_id:$rootScope.warehouse_id
                }).then(function (res) {
                    $scope.direct_expenses_details = res.data.direct_expense_details;
                    $scope.direct_expense_arry = $scope.direct_expenses_details;
                    direct_expenses_total = res.data.direct_expense_total_amount;
                     $scope.debit_total = (parseFloat($scope.debit_total) + parseFloat(direct_expenses_total)).toFixed
                    (2);
                    $scope.direct_expenses_total_amount = res.data.direct_expense_total_amount;
                    $scope.all_acc_value.direct_expenses_total = direct_expenses_total;
                    indirectExpensesListService({
                        from_date:$rootScope.from_date,
                        to_date:$rootScope.to_date,
                        warehouse_id:$rootScope.warehouse_id
                    }).then(function (res) {
                        $scope.indirectExpensesList = res.data.indirect_expense_details;
                        $scope.indirect_expense_arry = $scope.indirectExpensesList;
                        $scope.indirectExpensesTotal = res.data.indirect_expense_total_amount;
                         $scope.debit_total = (parseFloat($scope.debit_total) + parseFloat( $scope.indirectExpensesTotal)).toFixed
                        (2);
                        $scope.all_acc_value.indirect_expenses_total =   $scope.indirectExpensesTotal;
                        directIncomeListService({
                            from_date:$rootScope.from_date,
                            to_date:$rootScope.to_date,
                            warehouse_id:$rootScope.warehouse_id
                        }).then(function (res) {
                            $scope.directIncomeList = res.data.direct_incomes_details;
                            $scope.direct_incomes_arry = $scope.directIncomeList;
                            $scope.directIncomeTotal = res.data.direct_incomes_total_amount;
                              $scope.credit_total = (parseFloat($scope.credit_total ) + parseFloat($scope.directIncomeTotal)).toFixed(2);
                            direct_income_total = res.data.direct_incomes_total_amount;
                            $scope.all_acc_value.direct_income_total = direct_income_total;
                            indirectIncomeListService({
                                from_date:$rootScope.from_date,
                                to_date:$rootScope.to_date,
                                warehouse_id:$rootScope.warehouse_id
                            }).then(function (res) {
                                $scope.indirectIncomeList = res.data.indirect_incomes_details;
                                 $scope.indirect_incomes_arry = $scope.indirectIncomeList;
                                $scope.indirectIncomeTotal = res.data.indirect_incomes_total_amount;
                                $scope.credit_total = (parseFloat($scope.credit_total ) + parseFloat($scope.indirectIncomeTotal)).toFixed(2);
                                indirect_income_total = res.data.indirect_incomes_total_amount;
                                $scope.all_acc_value.indirect_income_total = indirect_income_total;
                                closingStockService({
                                    from_date:$rootScope.from_date,
                                    to_date:$rootScope.to_date,
                                    warehouse_id:$rootScope.warehouse_id
                                }).then(function (res) {
                                    $scope.closingstockdata=res.data;
                                   $scope.closingstockdata_total = res.data.total_stock_amount;
                                   $scope.credit_total = (parseFloat($scope.credit_total ) + parseFloat($scope.closingstockdata_total)).toFixed(2);
                                   // console.log('$scope.closingstockdata_total=====',$scope.closingstockdata_total);
                                    closing_stock_total = res.data;
                                    $scope.all_acc_value.closing_stock_total = closing_stock_total.total_stock_amount;
                              
                                    openingStockService({
                                        from_date:$rootScope.from_date,
                                        to_date:$rootScope.to_date,
                                        warehouse_id:$rootScope.warehouse_id
                                    }).then(function (res) {
                                        $scope.openingstockdata=res.data;
                                        opening_stock_total = res.data;
                                        $scope.all_acc_value.opening_stock_total = opening_stock_total.total_opening_stock_amount;
                                        $scope.debit_total = (parseFloat($scope.debit_total) + parseFloat( $scope.all_acc_value.opening_stock_total)).toFixed
                                        (2);
                                        console.log($scope.all_acc_value);

                                        if($scope.all_acc_value){

                                            $scope.gross_profit_blank_field = parseFloat($scope.all_acc_value.sale_acc_total)+parseFloat($scope.all_acc_value.direct_income_total)+parseFloat($scope.all_acc_value.closing_stock_total);
                                            $scope.gross_profit_blank_field =$scope.gross_profit_blank_field.toFixed(2);
                                            $scope.gross_profitCO = parseFloat($scope.gross_profit_blank_field)-(parseFloat($scope.all_acc_value.opening_stock_total)+parseFloat($scope.all_acc_value.purchase_acc_total)+parseFloat($scope.all_acc_value.direct_expenses_total));
                                        console.log('  $scope.gross_profitCO',  $scope.gross_profitCO);
                                            $scope.final_total = parseFloat($scope.gross_profitCO) + parseFloat($scope.all_acc_value.indirect_income_total);
											$scope.final_total =$scope.final_total.toFixed(2);
                                        //    if(  $scope.gross_profitCO != 'NaN'){
                                        //    $scope.debit_total = (parseFloat($scope.debit_total) + parseFloat( $scope.gross_profitCO)).toFixed
                                        //    (2);}
                                        }
                                        if($scope.gross_profitCO>0){
                                            $scope.show_gross_profit_co =$scope.gross_profitCO.toFixed(2);
                                        }else{
                                            $scope.show_gross_loss_co =Math.abs($scope.gross_profitCO).toFixed(2);
                                        }

                                        $scope.show_gross_loss_co =$scope.show_gross_loss_co.toFixed(2);
                                        $scope.netCalculation = (parseFloat($scope.gross_profitCO) + parseFloat($scope.all_acc_value.indirect_income_total)) -parseFloat($scope.all_acc_value.indirect_expenses_total);

                                      //  $('#netProfilloss').val($scope.netCalculation);

                                        if($scope.netCalculation>0){
                                            $scope.netProfit = $scope.netCalculation.toFixed(2);
                                            $scope.netLoss = 0;
                                            $scope.debit_total = parseFloat($scope.debit_total) +parseFloat($scope.netCalculation);
                                        }else{
                                            $scope.netLoss = Math.abs($scope.netCalculation).toFixed(2);
                                            $scope.netProfit = 0;
                                            $scope.credit_total = parseFloat($scope.credit_total) + Math.abs(parseFloat($scope.netCalculation));
                                        }
                                          $scope.netLoss = $scope.netLoss.toFixed(2)
                                    });
                                });
                            });
                        });

                    });
                });
            });
        
        });
        

       // $scope.credit_total = (parseFloat(sale_acc_total) +   parseFloat($scope.closingstockdata_total) +  parseFloat($scope.directIncomeTotal) +  parseFloat($scope.indirectIncomeTotal) ).toFixed(2);
        console.log('$scope.credit_total====',$scope.credit_total);
       
    };

    $scope.allProfitLossList();


    $scope.purchaseView = function (tax_id,tax_type) {
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        $location.path('/purchasemonthwise/'+tax_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+tax_type);
    };
    $scope.purchaseViewDirect = function (ledger_id,ledger_type,income_type,ind) {

		console.log(ind);
		 $rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
		$rootScope.income_type = income_type;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		if(ledger_type == 'Group')
		{
          $scope.direct_incomes_arry=[];

            if($scope.previous_ind==ind){
				$scope.showDirectIncomesSubLedger=false;
				$scope.previous_ind=null;
			}else{
				$scope.showDirectIncomesSubLedger=true;
				$scope.previous_ind=ind;
			}

		     for(i=0;i<$scope.directIncomeList.length;i++){
			  if(i==ind){
				$scope.direct_incomes_arry.push($scope.directIncomeList[ind]);
			  }else{
				$scope.black_obj={};
				  $scope.black_obj.ledger_name=$scope.directIncomeList[i].ledger_name;
				  $scope.black_obj.total_amt=$scope.directIncomeList[i].total_amt;
				//  $scope.black_obj.route_type=$scope.capital_acc_list[i].route_type;
				$scope.direct_incomes_arry.push($scope.black_obj);
			  }
		   }


		}else{
			 $location.path('/directincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.income_type+'/'+ledger_type);
		}
        
    };
 $scope.purchaseViewInDirect = function (ledger_id,ledger_type,income_type,ind) {

		
		 $rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
		$rootScope.income_type = income_type;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		if(ledger_type == 'Group')
		{
          $scope.indirect_incomes_arry=[];

            if($scope.previous_ind==ind){
				$scope.showInDirectIncomesSubLedger=false;
				$scope.previous_ind=null;
			}else{
				$scope.showInDirectIncomesSubLedger=true;
				$scope.previous_ind=ind;
			}

		     for(i=0;i<$scope.indirectIncomeList.length;i++){
			  if(i==ind){
				$scope.indirect_incomes_arry.push($scope.indirectIncomeList[ind]);
			  }else{
				$scope.black_obj={};
				  $scope.black_obj.ledger_name=$scope.indirectIncomeList[i].ledger_name;
				  $scope.black_obj.total_amt=$scope.indirectIncomeList[i].total_amt;
				//  $scope.black_obj.route_type=$scope.capital_acc_list[i].route_type;
				$scope.indirect_incomes_arry.push($scope.black_obj);
			  }
		   }


		}else{

           if(income_type == 'service_bill')
            {

               $location.path('/indincomeservicebillmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.income_type+'/'+ledger_type);
            }else if(income_type == 'debit_note'){
                 $location.path('/indincomeratediffmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.income_type+'/'+ledger_type);
            }else{
			 $location.path('/indirectincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$rootScope.income_type+'/'+ledger_type);
           }
		}
        
    };

 $scope.getDirectIncomesMonth = function (ledger_id,ledger_type,income_type) {

		 $rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		
       $location.path('/directincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+income_type+'/'+ledger_type);
		
        
    };
 $scope.getInDirectIncomesMonth = function (ledger_id,ledger_type,income_type) {

		 $rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		
       $location.path('/indirectincomemonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+income_type+'/'+ledger_type);
		
        
    };
 $scope.getDirectExpenseMonth = function (ledger_id,ledger_type) {

		 $rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
      $location.path('/loadunloadmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+ledger_id);
        
    };
 $scope.getInDirectExpenseMonth = function (ledger_id,ledger_type) {

		 $rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
       $location.path('/indirectexpensesmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
        
    };
    $scope.show_inward_monthwise = function (charge_id,ledger_type,ledger_id,ind) {
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        if(ledger_type == 'charges'){
            $location.path('/inwordmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+charge_id);
        } else if(ledger_type == 'Group'){
                 $scope.direct_expense_arry=[];

					if($scope.previous_ind==ind){
						$scope.showDirectExpenseSubLedger=false;
						$scope.previous_ind=null;
					}else{
						$scope.showDirectExpenseSubLedger=true;
						$scope.previous_ind=ind;
					}

					 for(i=0;i<$scope.direct_expenses_details.length;i++){
					  if(i==ind){
						$scope.direct_expense_arry.push($scope.direct_expenses_details[ind]);
					  }else{
						$scope.black_obj={};
						  $scope.black_obj.ledger_name=$scope.direct_expenses_details[i].ledger_name;
						  $scope.black_obj.closing_balance=$scope.direct_expenses_details[i].closing_balance;
						//  $scope.black_obj.route_type=$scope.capital_acc_list[i].route_type;
						$scope.direct_expense_arry.push($scope.black_obj);
					  }
				   }
           console.log($scope.direct_expense_arry);
        }else{
                  $location.path('/loadunloadmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+ledger_id);
          }
        
    };
    $scope.salesmonth = function (tax_id,tax_type) {
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        //$location.path(route);
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        $location.path('/salesmonthwise/'+tax_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+tax_type);
    };
  
    $scope.show_amount_monthwise = function () {
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        $location.path('/amountabovemonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
    };

    $scope.show_amount_monthwise_load = function () {
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        $location.path('/loadunloadmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
    };
    $scope.check_indirect_exp = function (type,ledger_id,ledger_name,charge_id,ind) {

		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		
		if(type == 'charges'){
            $location.path('/indirectexpensechargesmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+charge_id+'/'+type);
        }
		
        else if(type == 'Round Off'){
            $location.path('/indirectexpensesroundoffmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
        } else {
		   if(type=='Group'){
                  
						   $scope.indirect_expense_arry=[];

					if($scope.previous_ind==ind){
						$scope.showInDirectExpenseSubLedger=false;
						$scope.previous_ind=null;
					}else{
						$scope.showInDirectExpenseSubLedger=true;
						$scope.previous_ind=ind;
					}

					 for(i=0;i<$scope.indirectExpensesList.length;i++){
					  if(i==ind){
						$scope.indirect_expense_arry.push($scope.indirectExpensesList[ind]);
					  }else{
						$scope.black_obj={};
						  $scope.black_obj.ledger_name=$scope.indirectExpensesList[i].ledger_name;
						  $scope.black_obj.total_amt=$scope.indirectExpensesList[i].total_amt;
						//  $scope.black_obj.route_type=$scope.capital_acc_list[i].route_type;
						$scope.indirect_expense_arry.push($scope.black_obj);
					  }
				   }

               
            } 
            else{
                  $location.path('/indirectexpensesmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
            }
        } 
        
    };

    $scope.checkIndirectIncomeType = function (type,ld_id,charge_id) {
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date;
        $rootScope.ledg_id=ld_id;
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		if(type=='charges'){
			  $location.path('/indirectincomemonthwise/'+charge_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+type);
		}
        else if(type=='Ledger'){
            $location.path('/indirectincomemonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
        } else if(type=='service_bill'){
            $location.path('/indincomeservicebillmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
        } else if(type=='rate_diff'){
          $location.path('/indincomeratediffmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
        }
    };


}]).controller('purchaseAccMonthWiseController',['$rootScope','$scope','$routeParams','$location','getPurchaseAccMonthWiseListService',function ($rootScope,$scope,$routeParams,$location,getPurchaseAccMonthWiseListService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $rootScope.warehouse_id;
	
    $scope.purchase_tax_id = $routeParams.acc_id;
	$scope.purchase_tax_type = $routeParams.tax_type;
    getPurchaseAccMonthWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$rootScope.warehouse_id,
        tax_id:$routeParams.acc_id,
		tax_type:$routeParams.tax_type,
    }).then(function (res) {
        $scope.purchaseAccMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.start_closing_balance=res.data.start_closing_balance;
      
     $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
		 
        $scope.credit_total=res.data.credit_total;
      
        $scope.debit_total=res.data.debit_total;
       
    },function (res) {
        console.log(res);
    });
    $scope.purchaseDateWise = function (route) {
       $location.path(route);
    };

    
	// $scope.convertCrDr = function(value){
	// 	var checkVal = value.toString().indexOf('-');
	// 	if(checkVal === -1){
	// 		return value+' DR';
	// 	} else {
	// 		var splitVal = value.toString().split('-');
	// 		return splitVal[1]+' CR';
	// 	}
	// }
}]).controller('purchaseAccDateWiseController',['$rootScope','$scope','$routeParams','getPurchaseAccDateWiseListService',function ($rootScope,$scope,$routeParams,getPurchaseAccDateWiseListService) {

    //console.log($routeParams.month_no);

    getPurchaseAccDateWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no,
        tax_id:$routeParams.acc_id,
		tax_type:$routeParams.tax_type,
    }).then(function (res) {
        $scope.ledgers = res.data;
       /* $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.ledger_name=res.data.ledger_name;
        $scope.debit_total=res.data.debit_total;*/
    },function (res) {
        console.log(res);
    })
}]).controller('salesAccMonthWiseController',['$rootScope','$scope','$routeParams','$location','getSaleAccMonthWiseListService',function ($rootScope,$scope,$routeParams,$location,getSaleAccMonthWiseListService) {

    $rootScope.sale_tax_id = $routeParams.tax_id;
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $rootScope.warehouse_id;
	$scope.sale_tax_type = $routeParams.tax_type;
    getSaleAccMonthWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
       
        tax_id:$routeParams.tax_id,
		tax_type:$routeParams.tax_type,
    }).then(function (res) {
        $scope.saleAccMonthWiseList = res.data.details;
        $scope.ledger_name = res.data.ledger_name;
        
        $scope.closing_balance=res.data.closing_balance;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.start_closing_balance=res.data.start_closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
      
    },function (res) {
        console.log(res);
    });
    $scope.saleDateWise = function (route) {
        $location.path(route);
    };
}]).controller('saleAccDateWiseController',['$rootScope','$scope','$routeParams','getSaleAccDateWiseListService',function ($rootScope,$scope,$routeParams,getSaleAccDateWiseListService) {

    getSaleAccDateWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        tax_id:$routeParams.tax_id,
        
        month_no:$routeParams.month_no,
		tax_type:$routeParams.tax_type,
    }).then(function (res) {
        $scope.ledgers = res.data;
       
    },function (res) {
        console.log(res);
    })
}]).controller('inwordBelowMonthWiseController',['$rootScope','$scope','$routeParams','$location','getInwordBelowMonthWiseListService',function ($rootScope,$scope,$routeParams,$location,getInwordBelowMonthWiseListService) {
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.charge_id = $routeParams.charge_id;
	
    getInwordBelowMonthWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$rootScope.warehouse_id,
        charge_id:$routeParams.charge_id,
    }).then(function (res) {
        $scope.inwordBelowMonthWiseList = res.data.details;
     
        $scope.opening_balance=res.data.opening_balance;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.start_closing_balance=res.data.start_closing_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.ledger_name=res.data.ledger_name;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.inwordBelowMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.inwordBelowMonthWiseList[f].closing_balance);
        }
    });
    $scope.purchaseDateWise = function (route) {
		
        $location.path(route);
    };
}]).controller('inwordBelowDateWiseController',['$rootScope','$scope','$routeParams','getInwordBelowDateWiseListService',function ($rootScope,$scope,$routeParams,getInwordBelowDateWiseListService) {

    getInwordBelowDateWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
         warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no,
        charge_id:$routeParams.charge_id,
    }).then(function (res) {
        $scope.ledgers = res.data;
       
        //console.log($scope.inwordBelowDateWiseList);
    })
}]).controller('amountAboveMonthWiseController',['$rootScope','$scope','$routeParams','$location','amountAboveMonthWiseListService',function ($rootScope,$scope,$routeParams,$location,amountAboveMonthWiseListService) {
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    amountAboveMonthWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
       warehouse_id:$rootScope.warehouse_id,
    }).then(function (res) {
        $scope.amountAboveMonthWiseList = res.data.details;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    });
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('amountAboveDateWiseController',['$rootScope','$scope','$routeParams','amountAboveDateWiseListService',function ($rootScope,$scope,$routeParams,amountAboveDateWiseListService) {

    amountAboveDateWiseListService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
         warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no
    }).then(function (res) {
        //if(angular.isArray(res.data)){
            $scope.amountAboveDateWiseList = res.data.details;
            $scope.opening_balance=res.data.opening_balance;
            $scope.closing_balance=res.data.closing_balance;
            $scope.credit_total=res.data.credit_total;
            $scope.debit_total=res.data.debit_total;
        //}
     })
}]).controller('loadUnloadMonthWiseController',['$rootScope','$scope','$routeParams','$location','loadingUnloadingMonthWiseService',function ($rootScope,$scope,$routeParams,$location,loadingUnloadingMonthWiseService) {
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
	$scope.ledg_id = $routeParams.ledger_id;

    loadingUnloadingMonthWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
       warehouse_id:$rootScope.warehouse_id,
		ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.loadUnloadMonthWiseList = res.data.details;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
		$scope.debit_opening_balance=res.data.debit_opening_balance;
		$scope.credit_opening_balance=res.data.credit_opening_balance;
		$scope.start_closing_balance=res.data.start_closing_balance;
		$scope.ledger_name=res.data.ledger_name;
    });
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('loadUnloadDateWiseController',['$rootScope','$scope','$routeParams','loadingUnloadingDateWiseService',function ($rootScope,$scope,$routeParams,loadingUnloadingDateWiseService) {

    loadingUnloadingDateWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no,
		ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        console.log(res.data);
        $scope.ledgers = res.data;
       
    });
}]).controller('indirectExpensesMonthWiseController',['$rootScope','$scope','$routeParams','$location','indirectExpensesMonthWiseService',function ($rootScope,$scope,$routeParams,$location,indirectExpensesMonthWiseService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.ld_id = $routeParams.ld_id;
    indirectExpensesMonthWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
         warehouse_id:$rootScope.warehouse_id,
        ledger_id:$routeParams.ld_id,
    }).then(function (res) {
        $scope.indirectExpMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.start_closing_balance=res.data.start_closing_balance;
        
    });
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('indirectExpensesDateWiseController',['$rootScope','$scope','$routeParams','indirectExpensesDateWiseService',function ($rootScope,$scope,$routeParams,indirectExpensesDateWiseService) {

    indirectExpensesDateWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
         warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ld_id,
    }).then(function (res) {
       $scope.ledgers = res.data; 
       });
}]).controller('indirectExpensesChargeMonthWiseController',['$rootScope','$scope','$routeParams','$location','indirectExpensesChargeMonthWiseService',function ($rootScope,$scope,$routeParams,$location,indirectExpensesChargeMonthWiseService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.charge_id = $routeParams.charge_id;
	$scope.charge_type = $routeParams.charge_type;
    indirectExpensesChargeMonthWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$rootScope.warehouse_id,
        charge_id:$routeParams.charge_id,
		charge_type:$routeParams.charge_type,
    }).then(function (res) {
        $scope.indirectExpMonthWiseList = res.data.details;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.charge_name=res.data.charge_name;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.indirectExpMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.indirectExpMonthWiseList[f].closing_balance);
        }
    });
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('indirectExpensesChargeDateWiseController',['$rootScope','$scope','$routeParams','indirectExpensesChargeDateWiseService',function ($rootScope,$scope,$routeParams,indirectExpensesChargeDateWiseService) {

    indirectExpensesChargeDateWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
       warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no,
        charge_id:$routeParams.charge_id,
		charge_type:$routeParams.charge_type,
    }).then(function (res) {
        /*if(angular.isArray(res.data)){
             $scope.indirectExpDateWiseList = res.data;
         }else{
            $scope.no_data_msg = JSON.parse(res.data);
        }*/
        $scope.indirectExpDateWiseLists = res.data.details; 
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
		$scope.charge_name=res.data.charge_name;
    });
}]).controller('indirectExpensesRoundOffMonthWiseController',['$rootScope','$scope','$routeParams','$location','indirectExpensesroundoffMonthWiseService',function ($rootScope,$scope,$routeParams,$location,indirectExpensesroundoffMonthWiseService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    indirectExpensesroundoffMonthWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$rootScope.warehouse_id,
    }).then(function (res) {
        $scope.indirectExpMonthWiseList = res.data.indirect_expense_monthwise;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        for(var f=0;f<$scope.indirectExpMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.indirectExpMonthWiseList[f].closing_balance);
        }
    });
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('indirectExpensesRoundOffDateWiseController',['$rootScope','$scope','$routeParams','indirectExpensesroundoffDateWiseService',function ($rootScope,$scope,$routeParams,indirectExpensesroundoffDateWiseService) {

    indirectExpensesroundoffDateWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
    }).then(function (res) {
        $scope.ledgers = res.data;
    });
}]).controller('directIncomeMonthWiseController',['$rootScope','$scope','$routeParams','$location','directIncomeMonthWiseService',function ($rootScope,$scope,$routeParams,$location,directIncomeMonthWiseService) {
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $rootScope.warehouse_id;
    $scope.ld_id = $routeParams.ld_id;
	$scope.ld_type = $routeParams.ld_type;
	$scope.income_type = $routeParams.income_type;
	
	
		directIncomeMonthWiseService({
			from_date:$routeParams.from_date,
			to_date:$routeParams.to_date,
			  warehouse_id:$rootScope.warehouse_id,
			ledger_id:$routeParams.ld_id,
			ledger_type:$routeParams.ld_type,
			income_type:$routeParams.income_type,
		}).then(function (res) {
			$scope.directIncomeMonthWiseList = res.data.details;
			
			
			$scope.credit_total=res.data.credit_total;
			$scope.debit_total=res.data.debit_total;
          
            $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.start_closing_balance=res.data.start_closing_balance;
        $scope.ledger_name=res.data.ledger_name;
			
		});
	
	
    
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('directIncomeDateWiseController',['$rootScope','$scope','$routeParams','directIncomeDateWiseService',function ($rootScope,$scope,$routeParams,directIncomeDateWiseService) {
	
		directIncomeDateWiseService({
			from_date:$routeParams.from_date,
			to_date:$routeParams.to_date,
			  warehouse_id:$rootScope.warehouse_id,
			ledger_id:$routeParams.ld_id,
			month_no:$routeParams.month_no,
			ledger_type:$routeParams.ld_type,
			income_type:$routeParams.income_type,
		}).then(function (res) {
           $scope.ledgers = res.data;
		});
	
}]).controller('indirectIncomeMonthWiseController',['$rootScope','$scope','$routeParams','$location','indirectIncomeMonthWiseService',function ($rootScope,$scope,$routeParams,$location,indirectIncomeMonthWiseService) {
    $scope.frm_date = $routeParams.from_date;
    $scope.to_date = $routeParams.to_date;
   
    $scope.ld_id = $routeParams.ld_id;
	$scope.income_type = $routeParams.income_type;
	$scope.ledger_type = $routeParams.ledger_type;
	
		indirectIncomeMonthWiseService({
			from_date:$routeParams.from_date,
			to_date:$routeParams.to_date,
			  warehouse_id:$rootScope.warehouse_id,
			ledger_id:$routeParams.ld_id,
			ledger_type:$routeParams.ledger_type,
			income_type:$routeParams.income_type,
		}).then(function (res) {
			$scope.indirectIncomeMonthWiseList = res.data.details;
			$scope.credit_total=res.data.credit_total;
			$scope.debit_total=res.data.debit_total;
			$scope.ledger_name=res.data.ledger_name;
           
            $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.start_closing_balance=res.data.start_closing_balance;
			
		});
	
    
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('indirectIncomeDateWiseController',['$rootScope','$scope','$routeParams','indirectIncomeDateWiseService',function ($rootScope,$scope,$routeParams,indirectIncomeDateWiseService) {

	$scope.ledger_type = $routeParams.ledger_type;
    indirectIncomeDateWiseService({
			from_date:$routeParams.from_date,
			to_date:$routeParams.to_date,
			  warehouse_id:$rootScope.warehouse_id,
			ledger_id:$routeParams.ld_id,
			ledger_type:$routeParams.ledger_type,
			income_type:$routeParams.income_type,
			month_no:$routeParams.month_no
		}).then(function (res) {
            $scope.ledgers = res.data;
			
		});
	
}]).controller('indIncomeServiceBillMonthWiseController',['$rootScope','$scope','$routeParams','$location','indIncomeServiceBillMonthWiseService',function ($rootScope,$scope,$routeParams,$location,indIncomeServiceBillMonthWiseService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.to_date = $routeParams.to_date;
    $scope.income_type = $routeParams.income_type;
    $scope.ld_id = $routeParams.ld_id;
    $scope.ledger_type = $routeParams.ledger_type;
    indIncomeServiceBillMonthWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
       ledger_id:$routeParams.ld_id,
        income_type:$routeParams.income_type,
        ledger_type:$routeParams.ledger_type,
    }).then(function (res) {
        $scope.indirectIncomeServiceMonthWiseList = res.data.details;
       
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
      
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        $scope.start_closing_balance=res.data.start_closing_balance;
        
    });
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('indIncomeServiceBillDateWiseController',['$rootScope','$scope','$routeParams','indIncomeServiceBillDateWiseService',function ($rootScope,$scope,$routeParams,indIncomeServiceBillDateWiseService) {

    indIncomeServiceBillDateWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
         warehouse_id:$rootScope.warehouse_id,
        ledger_id:$routeParams.ld_id,
        month_no:$routeParams.month_no
    }).then(function (res) {

         $scope.ledgers = res.data;
        
    });
}]).controller('indIncomeRateDiffMonthWiseController',['$rootScope','$scope','$routeParams','$location','indIncomeRateDiffMonthWiseService',function ($rootScope,$scope,$routeParams,$location,indIncomeRateDiffMonthWiseService) {
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.ld_id = $routeParams.ld_id;
    indIncomeRateDiffMonthWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$rootScope.warehouse_id,
        ledger_id:$routeParams.ld_id,
    }).then(function (res) {
        $scope.indirectIncomeRateDiffMonthWiseList = res.data.details;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        $scope.debit_opening_balance=res.data.debit_opening_balance;
        $scope.credit_opening_balance=res.data.credit_opening_balance;
        $scope.debit_closing_balance=res.data.debit_closing_balance;
        $scope.credit_closing_balance=res.data.credit_closing_balance;
        for(var f=0;f<$scope.indirectIncomeRateDiffMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.indirectIncomeRateDiffMonthWiseList[f].closing_balance);
        }
    });
    $scope.purchaseDateWise = function (route) {
        $location.path(route);
    };
}]).controller('indIncomeRateDiffDateWiseController',['$rootScope','$scope','$routeParams','indIncomeRatediffDateWiseService',function ($rootScope,$scope,$routeParams,indIncomeRatediffDateWiseService) {

    indIncomeRatediffDateWiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
       warehouse_id:$rootScope.warehouse_id,
        ledger_id:$routeParams.ld_id,
        month_no:$routeParams.month_no
    }).then(function (res) {

        //if(angular.isArray(res.data)){
            $scope.indirectIncomeRateDiffeDateWiseList = res.data.details;
            $scope.opening_balance=res.data.opening_balance;
            $scope.closing_balance=res.data.closing_balance;
            $scope.credit_total=res.data.credit_total;
            $scope.debit_total=res.data.debit_total;
        //}else{
            //$scope.no_data_msg = JSON.parse(res.data);
        //}
    });
}]);



