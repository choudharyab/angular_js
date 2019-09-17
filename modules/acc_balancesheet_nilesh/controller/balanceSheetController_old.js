balanceSheetModule=angular.module('balanceSheetModule',[]);
balanceSheetModule.controller('balanceSheetController',['$rootScope','$scope','$location','$timeout','getWarehouseListService','getCaptialAccountDataService','getLoansDataService','getCurrentDataService','getSuspenseAccountDataService','getTaxDutiesDataService','getCurrentAssetsDataService','getFixedAssetsDataService','getInvestmentDataService','getBranchDataService','getProfitLossDataService','sundryCreditorDateService','sundryDebtorDateService','closingStockService',
	function($rootScope,$scope,$location,$timeout,getWarehouseListService,getCaptialAccountDataService,getLoansDataService,getCurrentDataService,getSuspenseAccountDataService,getTaxDutiesDataService,getCurrentAssetsDataService,getFixedAssetsDataService,getInvestmentDataService,getBranchDataService,getProfitLossDataService,sundryCreditorDateService,sundryDebtorDateService,closingStockService){
	
	$scope.view_type = '';    

    $scope.change_view_type = function(){
        if($scope.view_type == 'Compacted'){
            $('.type tr:not(:first-child)').hide();
            $('.second_row').show();
            $('.first_row').addClass('bgcolor');
        }else if($scope.view_type == 'Detailed'){
            $('.type tr:not(:first-child)').show();
            $('.first_row').addClass('bgcolor');
        }else{
            $('.type tr:not(:first-child)').hide();
            $('.first_row').removeClass('bgcolor');
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
	
    $scope.get_wh = function () {
        $rootScope.warehouse_id = $scope.warehouse_id;
    };

    $scope.$on('change_warehouse',function(event,data){
        $scope.wh_list();
        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
        $scope.get_PO_list();
    });
	

    
	// $scope.allbalancesheetlist=function(){
		
	// 	$rootScope.from_date = $scope.from_date; 
	// 	$rootScope.to_date = $scope.to_date; 
		
	// 	$scope.liabilitiessum = 0;
	// 	$scope.assetssum= 0;
	// 	$scope.currentsum=0;
    //     sundryCreditorDateService({
    //         from_date:$rootScope.from_date,
    //         to_date:$rootScope.to_date,
    //         warehouse_id:$rootScope.warehouse_id
    //     }).then(function (response) {
    //         $scope.sundry_credit_amt = response.data.sundry_creditors_amount;
	// 		$scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.sundry_credit_amt);
    //         //console.log(response)
    //     });

    //     sundryDebtorDateService({
    //         from_date:$rootScope.from_date,
    //         to_date:$rootScope.to_date,
    //         warehouse_id:$rootScope.warehouse_id
    //     }).then(function (response) {
    //         $scope.sundry_debit_amt = response.data.sundry_debtors_amount;
	// 		$scope.assetssum=parseFloat($scope.assetssum) + parseFloat($scope.sundry_debit_amt);
			
    //         //console.log(response)
    //     });

		

	// 	getCaptialAccountDataService({
	// 		from_date:$rootScope.from_date,
    //         to_date:$rootScope.to_date,
    //         warehouse_id:$rootScope.warehouse_id
	// 	}).then(function (res) {
    //         $scope.capital_acc_list = res.data.capital_account_details;
    //         if(res.data.capital_account_total_amount){
    //         	$scope.capital_acc_total = parseFloat(res.data.capital_account_total_amount).toFixed(2);
    //         }else{
    //         	$scope.capital_acc_total = 0;
    //         }
            
    //         $scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.capital_acc_total);
    //     });

	// 	getLoansDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
    //         warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 		$scope.loan_list=response.data.loans_liabilities_details;
	// 		if(response.data.loans_liabilities_total_amount){
    //         	$scope.loan_total=parseFloat(response.data.loans_liabilities_total_amount).toFixed(2);
    //         }else{
    //         	$scope.loan_total = 0;
    //         }
	// 		 $scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.loan_total);
	// 	});

	// 	getCurrentDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
	// 		warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 		$scope.current_list=response.data.current_liabilities_details;
	// 		//console.log($scope.current_list)
	// 		if(response.data.current_liabilities_total_amount){
    //         	$scope.current_total=parseFloat(response.data.current_liabilities_total_amount).toFixed(2);
    //         }else{
    //         	$scope.current_total = 0;
    //         }
	// 		$scope.current_liab_total_amt = response.data.current_liabilities_total_amount;
	// 		$scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.current_total);
	// 		$scope.currentsum=parseFloat($scope.currentsum) + parseFloat($scope.current_total);
			
	// 	});

	// 	getSuspenseAccountDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
	// 		warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 		$scope.suspense_acc_list=response.data.suspense_account_details;
	// 		if(response.data.suspense_account_total_amount){
    //         	$scope.suspense_acc_total=parseFloat(response.data.suspense_account_total_amount).toFixed(2);
    //         }else{
    //         	$scope.suspense_acc_total = 0;
    //         }
			
	// 		$scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.suspense_acc_total);
	// 	});



	// 	getTaxDutiesDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
	// 		warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 	if(response.data.duties_taxes_amount){
    //         	$scope.tax_duties_total=parseFloat(response.data.duties_taxes_amount).toFixed(2);
    //         }else{
    //         	$scope.tax_duties_total = 0;
    //         }
	// 		$scope.currentsum=parseFloat($scope.currentsum) + parseFloat($scope.tax_duties_total);
	// 		$scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.tax_duties_total);
	// 	});


	// 	getFixedAssetsDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
	// 		warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 		$scope.fixedassestlist=response.data.fixed_assets_details;
	// 		if(response.data.fixed_assets_total_amount){
    //         	$scope.fixedassesttotal=parseFloat(response.data.fixed_assets_total_amount).toFixed(2);
    //         }else{
    //         	$scope.fixedassesttotal = 0;
    //         }
			
	// 		$scope.assetssum = $scope.assetssum + parseFloat($scope.fixedassesttotal);
	// 	});
	// 	$scope.currentassesttotal = 0;
	// 	getCurrentAssetsDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
	// 		warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 		$scope.currentassestlist=response.data.current_assets_details;
    //         for(i=0;i< $scope.currentassestlist.length;i++){
    //             $scope.total_current_asset_data=parseFloat($scope.total_current_asset_data)+parseFloat($scope.currentassestlist[i].total_amt);
    //             console.log($scope.currentassestlist[i].total_amt);
    //         }
    //     });
        
    //     closingStockService({
    //         from_date:$rootScope.from_date,
    //         to_date:$rootScope.to_date,
    //         warehouse_id:$rootScope.warehouse_id
    //     }).then(function (res) {
    //        $scope.closingstockdata_total = res.data.total_stock_amount;
          
    //        $scope.total_current_asset_data= $scope.total_current_asset_data+ parseFloat($scope.closingstockdata_total); 
    //        $scope.sumarray.assetssum = $scope.sumarray.assetssum + parseFloat($scope.total_current_asset_data);
        
    //     });

	// 	getInvestmentDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
	// 		warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 		$scope.investmentdatalist=response.data.investment_details;
	// 		if(response.data.investment_total_amount){
    //         	$scope.investmenttotal=parseFloat(response.data.investment_total_amount).toFixed(2);
    //         }else{
    //         	$scope.investmenttotal = 0;
    //         }
			
	// 		$scope.assetssum = $scope.assetssum + parseFloat($scope.investmenttotal);
	// 	});

	// 	getBranchDataService({
	// 		from_date:$rootScope.from_date,
	// 		to_date:$rootScope.to_date,
	// 		warehouse_id:$rootScope.warehouse_id
	// 	}).then(function(response){
	// 		$scope.branchdatalist=response.data.branch_division_details;
	// 		if(response.data.branch_division_total_amount){
    //         	$scope.branchtotal=parseFloat(response.data.branch_division_total_amount).toFixed(2);
    //         }else{
    //         	$scope.branchtotal = 0;
    //         }
			
	// 		$scope.assetssum = $scope.assetssum + parseFloat($scope.branchtotal);
	// 	});

    //     getProfitLossDataService({
    //         from_date:$rootScope.from_date,
    //         to_date:$rootScope.to_date,
    //         warehouse_id:$rootScope.warehouse_id
    //     }).then(function(response){
    //        // $scope.profitlossdatalist=response.data.profit_loss_account_details;
    //         if(response.data.net_profit>0){
    //             $scope.profitlosstotal=parseFloat(response.data.net_profit);
    //         }else if(response.data.net_loss>0){
    //             $scope.profitlosstotal=-parseFloat(response.data.net_loss);
    //         }else{
    //             $scope.profitlosstotal=0;
    //         }
    //         $scope.sumarray.liabilitiessum = parseFloat($scope.sumarray.liabilitiessum) + parseFloat($scope.profitlosstotal);
	// 	})
	// }
    // $scope.allbalancesheetlist();
    
    $scope.sumarray = {};
    
	$scope.allbalancesheetlist=function(){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
        $scope.sumarray.liabilitiessum=0;
        $scope.sumarray.assetssum=0;
        $scope.currentassesttotal = 0;
        $scope.finalliabilitiessum=0;
        $scope.finalassetssum =0;
        $scope.total_current_asset_data=0;

        sundryDebtorDateService({
            from_date:$rootScope.from_date,
            to_date:$rootScope.to_date,
            warehouse_id:$rootScope.warehouse_id
        }).then(function (response) {
            $scope.sundry_debit_amt = response.data.sundry_debtors_amount;
			//$scope.assetssum=parseFloat($scope.assetssum) + parseFloat($scope.sundry_debit_amt);
			
            //console.log(response)
        });

		getCaptialAccountDataService({
			from_date:$rootScope.from_date,
            to_date:$rootScope.to_date,
            warehouse_id:$rootScope.warehouse_id
		}).then(function (res) {
            $scope.capital_acc_list = res.data.capital_account_details;
            if(res.data.capital_account_total_amount){
            	$scope.capital_acc_total = parseFloat(res.data.capital_account_total_amount).toFixed(2);
            }else{
            	$scope.capital_acc_total = 0;
            }
            
            $scope.sumarray.liabilitiessum = parseFloat($scope.sumarray.liabilitiessum) + parseFloat($scope.capital_acc_total);
           
            getLoansDataService({
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                warehouse_id:$rootScope.warehouse_id
            }).then(function(response){
                $scope.loan_list=response.data.loans_liabilities_details;
                if(response.data.loans_liabilities_total_amount){
                    $scope.loan_total=parseFloat(response.data.loans_liabilities_total_amount).toFixed(2);
                }else{
                    $scope.loan_total = 0;
                }
                 $scope.sumarray.liabilitiessum = parseFloat($scope.sumarray.liabilitiessum) + parseFloat($scope.loan_total);
           
                 getCurrentDataService({
                    from_date:$rootScope.from_date,
                    to_date:$rootScope.to_date,
                    warehouse_id:$rootScope.warehouse_id
                }).then(function(response){
                    $scope.current_list=response.data.current_liabilities_details;
                    //console.log($scope.current_list)
                    $scope.current_liab_total_amt=0;
                    for(i=0;i< $scope.current_list.length;i++){
                        $scope.current_liab_total_amt=parseFloat($scope.current_liab_total_amt)+parseFloat($scope.current_list[i].total_amt);
                        console.log($scope.current_list[i].total_amt);
                    }

                    // if(response.data.current_liabilities_total_amount){
                    //     $scope.current_total=parseFloat(response.data.current_liabilities_total_amount).toFixed(2);
                    // }else{
                    //     $scope.current_total = 0;
                    // }
                    //$scope.current_liab_total_amt = response.data.current_liabilities_total_amount;
                    $scope.sumarray.liabilitiessum = parseFloat($scope.sumarray.liabilitiessum) + parseFloat($scope.current_liab_total_amt);
                   // $scope.currentsum=parseFloat($scope.currentsum) + parseFloat($scope.current_liab_total_amt);
                    
                    sundryCreditorDateService({
                        from_date:$rootScope.from_date,
                        to_date:$rootScope.to_date,
                        warehouse_id:$rootScope.warehouse_id
                    }).then(function (response) {
                        $scope.sundry_credit_amt = response.data.sundry_creditors_amount;
                        //$scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.sundry_credit_amt);
                        //console.log(response)

                    getTaxDutiesDataService({
                            from_date:$rootScope.from_date,
                            to_date:$rootScope.to_date,
                            warehouse_id:$rootScope.warehouse_id
                        }).then(function(response){
                        if(response.data.duties_taxes_amount){
                                $scope.tax_duties_total=parseFloat(response.data.duties_taxes_amount).toFixed(2);
                            }else{
                                $scope.tax_duties_total = 0;
                            }
                         //  $scope.currentsum=parseFloat($scope.currentsum) + parseFloat($scope.tax_duties_total);
                            //$scope.liabilitiessum = parseFloat($scope.liabilitiessum) + parseFloat($scope.tax_duties_total);
                       
                            getSuspenseAccountDataService({
                                from_date:$rootScope.from_date,
                                to_date:$rootScope.to_date,
                                warehouse_id:$rootScope.warehouse_id
                            }).then(function(response){
                                $scope.suspense_acc_list=response.data.suspense_account_details;
                                if(response.data.suspense_account_total_amount){
                                    $scope.suspense_acc_total=parseFloat(response.data.suspense_account_total_amount).toFixed(2);
                                }else{
                                    $scope.suspense_acc_total = 0;
                                }
                                
                                $scope.sumarray.liabilitiessum = parseFloat($scope.sumarray.liabilitiessum) + parseFloat($scope.suspense_acc_total);
                               
                                getProfitLossDataService({
                                    from_date:$rootScope.from_date,
                                    to_date:$rootScope.to_date,
                                    warehouse_id:$rootScope.warehouse_id
                                }).then(function(response){
                                   // $scope.profitlossdatalist=response.data.profit_loss_account_details;
                                    if(response.data.net_profit>0){
                                        $scope.profitlosstotal=parseFloat(response.data.net_profit);
                                    }else if(response.data.net_loss>0){
                                        $scope.profitlosstotal=-parseFloat(response.data.net_loss);
                                    }else{
                                        $scope.profitlosstotal=0;
                                    }
                                    $scope.sumarray.liabilitiessum = parseFloat($scope.sumarray.liabilitiessum) + parseFloat($scope.profitlosstotal);
                                  
                                    getFixedAssetsDataService({
                                        from_date:$rootScope.from_date,
                                        to_date:$rootScope.to_date,
                                        warehouse_id:$rootScope.warehouse_id
                                    }).then(function(response){
                                        $scope.fixedassestlist=response.data.fixed_assets_details;
                                        if(response.data.fixed_assets_total_amount){
                                            $scope.fixedassesttotal=parseFloat(response.data.fixed_assets_total_amount).toFixed(2);
                                        }else{
                                            $scope.fixedassesttotal = 0;
                                        }
                                        
                                        $scope.sumarray.assetssum = $scope.sumarray.assetssum + parseFloat($scope.fixedassesttotal);
                                        getCurrentAssetsDataService({
                                            from_date:$rootScope.from_date,
                                            to_date:$rootScope.to_date,
                                            warehouse_id:$rootScope.warehouse_id
                                        }).then(function(response){
                                           
                                            $scope.currentassestlist=response.data.current_assets_details;
                                            
                                            for(i=0;i< $scope.currentassestlist.length;i++){
                                                $scope.total_current_asset_data=parseFloat($scope.total_current_asset_data)+parseFloat($scope.currentassestlist[i].total_amt);
                                                console.log($scope.currentassestlist[i].total_amt);
                                            }
                                            // $scope.total_current_asset_data= $scope.total_current_asset_data.toFixed(2);
                                         
                        
                                          
                                            closingStockService({
                                                from_date:$rootScope.from_date,
                                                to_date:$rootScope.to_date,
                                                warehouse_id:$rootScope.warehouse_id
                                            }).then(function (res) {
                                               $scope.closingstockdata_total = res.data.total_stock_amount;
                                              
                                               $scope.total_current_asset_data= $scope.total_current_asset_data+ parseFloat($scope.closingstockdata_total); 
                                               $scope.sumarray.assetssum = $scope.sumarray.assetssum + parseFloat($scope.total_current_asset_data);
                                            
                                            getInvestmentDataService({
                                                from_date:$rootScope.from_date,
                                                to_date:$rootScope.to_date,
                                                warehouse_id:$rootScope.warehouse_id
                                            }).then(function(response){
                                                $scope.investmentdatalist=response.data.investment_details;
                                                if(response.data.investment_total_amount){
                                                    $scope.investmenttotal=parseFloat(response.data.investment_total_amount).toFixed(2);
                                                }else{
                                                    $scope.investmenttotal = 0;
                                                }
                                                
                                                $scope.sumarray.assetssum = $scope.sumarray.assetssum + parseFloat($scope.investmenttotal);
                                                getBranchDataService({
                                                    from_date:$rootScope.from_date,
                                                    to_date:$rootScope.to_date,
                                                    warehouse_id:$rootScope.warehouse_id
                                                }).then(function(response){
                                                    $scope.branchdatalist=response.data.branch_division_details;
                                                    if(response.data.branch_division_total_amount){
                                                        $scope.branchtotal=parseFloat(response.data.branch_division_total_amount).toFixed(2);
                                                    }else{
                                                        $scope.branchtotal = 0;
                                                    }
                                                    
                                                    $scope.sumarray.assetssum = $scope.sumarray.assetssum + parseFloat($scope.branchtotal);
                                                
                                                    $scope.finalliabilitiessum=0;
                                                    $scope.finalassetssum =0;
                                                   // $scope.sharecapital = parseFloat($scope.sumarray.assetssum) - parseFloat($scope.sumarray.liabilitiessum);
                                                   // $scope.finalliabilitiessum = parseFloat($scope.sumarray.liabilitiessum) +parseFloat($scope.sharecapital);
                                                   $scope.finalliabilitiessum = parseFloat($scope.sumarray.liabilitiessum);
                                                   $scope.finalassetssum = parseFloat($scope.sumarray.assetssum);
                                                
                                                });
                                            });
                                        });
                                    });

                                });
                           
                            });
                       
                        });
  
                    });
  
                });

             });
        });
    });

    }
    $scope.allbalancesheetlist();


    $scope.totalCrditAmt = function(){
        $timeout(function () {
            $scope.total_credit_sundry_amt = parseFloat($scope.tax_duties_total) + parseFloat($scope.sundry_credit_amt);
        },5000);
    } 
    $scope.totalCrditAmt();

    $scope.totalDebitAmt = function(){
        $timeout(function () {
            $scope.total_debit_sundry_amt = parseInt($scope.currentassesttotal) + parseInt($scope.sundry_debit_amt);
        },5000);
    } 
    $scope.totalDebitAmt();

	$scope.capitalcheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        
		$rootScope.ld_id=ld_id;
		if(type=='Ledger'){
			$location.path('/capitalamountmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		} else {
			$location.path('/ledgergroupmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	};

	$scope.loancheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		$rootScope.led_id=ld_id;
		if(type=='Ledger'){
			$location.path('/loanmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	};

	
	$scope.currentcheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		$rootScope.ledger_id_current=ld_id;
		if(type=='Ledger'){
			$location.path('/currentmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	};

	$scope.taxcall=function(){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        $location.path('/taxdutiesinputwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
	};

	$scope.suspencecheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		$rootScope.ledger_id_suspence=ld_id;
		if(type=='Ledger'){
		$location.path('/suspencemonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	};


	$scope.fixedcheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		$rootScope.ledger_id_fixed=ld_id;
		if(type=='Ledger'){
			$location.path('/fixedassetsmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	};

	$scope.currentassetscheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
       
		$rootScope.ledger_id_cs=ld_id;
		if(type=='Ledger'){
			$location.path('/currentassetsmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+ledger_location_id);
		}else if(type=='Group'){
            $location.path('/sundrydebtorsrmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
        }else if(type=='bank'){
         //  $location.path('/bankaccountmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
        }
	};

    $scope.invcheck=function(type,ld_id){
	  
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		$rootScope.ledger_id_inv=ld_id;
		if(type='Ledger'){
			$location.path('/investmentmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	};

	$scope.branchcheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		$rootScope.ledger_id_branch=ld_id;
		if(type='Ledger'){
			$location.path('/branchmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	}

	$scope.profitcheck=function(type,ld_id){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
		$rootScope.ledger_id_profit=ld_id;
		if(type='Ledger'){
			$location.path('/profitlossmonthwise/'+ld_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
	}

    $scope.sundry_debitor_acc = function(){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        $location.path('/sundrydebtorsrmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
    }

    $scope.sundry_creditors_acc = function(type){
		if(type == 'tax_duties'){
			$scope.taxcall();
		} else {
			$rootScope.from_date = $scope.from_date; 
			$rootScope.to_date = $scope.to_date; 
			
			if($rootScope.warehouse_id == undefined){
				$scope.waree_id = 0;
			} else {
				$scope.waree_id = $rootScope.warehouse_id;
			}
			$location.path('/sundrycreditormonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
		}
		
    }

    $scope.sundry_debitor_acc = function(){
		
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
        $location.path('/sundrydebtorsrmonthwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
    }
	
	$scope.current_liab = function(type,ledger_id,route_type,tax_type,check_supp){
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
       
		if(route_type == 'tax_duties'){
			//$location.path('/taxdutiesinputwise/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
			$location.path('/taxdutiesmonthwise/'+type+'/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+tax_type);
		} else if(route_type == 'sundry') {
			$location.path('/sundrycreditormonthwiseData/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+ledger_id+'/'+check_supp);
		} else {
			
		}
	}

	$scope.current_asset = function(type,ledger_id,route_type){
		$rootScope.from_date = $scope.from_date; 
		$rootScope.to_date = $scope.to_date; 
		
        if($rootScope.warehouse_id == undefined){
            $scope.waree_id = 0;
        } else {
            $scope.waree_id = $rootScope.warehouse_id;
        }
       
		if(route_type == 'sundry') {
			$location.path('/sundrydebtorsrmonthwiseData/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id+'/'+ledger_id);
		}else if(type=='bank'){
              $location.path('/bankaccountmonthwise/'+ledger_id+'/'+$rootScope.from_date+'/'+$rootScope.to_date+'/'+$scope.waree_id);
           }
	}
    

	//////////////////////////////////  Liabilities ////////////

}]).controller('capitalAccDateWiseController',['$rootScope','$scope','$routeParams','getCapitalAccountDatewisetService',function ($rootScope,$scope,$routeParams,getCapitalAccountDatewisetService) {

        //console.log($routeParams.month_no);

    getCapitalAccountDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.capitalAccDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.debit_total=res.data.debit_total;
        $scope.credit_total=res.data.credit_total;

    },function (res) {
        console.log(res);
    })
}]).controller('capitalAccMonthWiseController',['$rootScope','$scope','$routeParams','$location','getCapitalAccountMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getCapitalAccountMonthwisetService) {
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getCapitalAccountMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.capitalAccMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.capitalAccMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.capitalAccMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
     $scope.capitalDateWise = function (route) {
        $location.path(route);
    };
    
}]).controller('loanDateWiseController',['$rootScope','$scope','$routeParams','getLoansDatewisetService',function ($rootScope,$scope,$routeParams,getLoansDatewisetService) {

    console.log($routeParams.month_no);

    getLoansDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.loanDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.debit_total=res.data.debit_total;
        $scope.credit_total=res.data.credit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('loanMonthWiseController',['$rootScope','$scope','$routeParams','$location','getLoansMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getLoansMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getLoansMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.loanMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.loanMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.loanMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });

     $scope.loanDateWise = function (route) {
        $location.path(route);
		console.log(route);

    };
    
}]).controller('currentDateWiseController',['$rootScope','$scope','$routeParams','getCurrentDatewisetService',function ($rootScope,$scope,$routeParams,getCurrentDatewisetService) {

    //console.log($routeParams.month_no);

    getCurrentDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.currentDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('currentMonthWiseController',['$rootScope','$scope','$routeParams','$location','getCurrentMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getCurrentMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getCurrentMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.currentMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.currentMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.currentMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
     $scope.currentDateWise = function (route) {
        $location.path(route);
    };
    
}]).controller('taxDateWiseController',['$rootScope','$scope','$routeParams','getTaxDutiesDatewisetService',function ($rootScope,$scope,$routeParams,getTaxDutiesDatewisetService) {

        //console.log($routeParams.month_no);

    getTaxDutiesDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        type:$routeParams.taxduties_type,
       	tax_id:$routeParams.taxduties_id,
        month_no:$routeParams.month_no,
		tax_type:$routeParams.tax_type
    }).then(function (res) {
        $scope.taxdutiesDateWiseList = res.data.details;
        $scope.tax_name=res.data.tax_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('taxMonthWiseController',['$rootScope','$scope','$routeParams','$location','getTaxDutiesMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getTaxDutiesMonthwisetService) {

    $rootScope.tax_type=$routeParams.taxduties_type;
    $rootScope.tax_id = $routeParams.taxduties_id;
    $scope.tx_type = $routeParams.taxduties_type;
    $scope.tx_id = $routeParams.taxduties_id;
    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
	$scope.month_tax_type = $routeParams.tax_type;
    getTaxDutiesMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        type:$routeParams.taxduties_type,
       	tax_id:$routeParams.taxduties_id,
		tax_type:$routeParams.tax_type
    }).then(function (res) {
        $scope.taxdutiesMonthWiseList = res.data.details;
        $scope.tax_name=res.data.tax_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.taxdutiesMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.taxdutiesMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
    $scope.taxDateWise = function (route) {
        $location.path(route);
    };
    
}]).controller('taxInputWiseController',['$rootScope','$scope','$routeParams','$location','getTaxDutiesInputOutputwisetService',function ($rootScope,$scope,$routeParams,$location,getTaxDutiesInputOutputwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    getTaxDutiesInputOutputwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
    }).then(function (res) {
        $scope.taxdutiesinputWiseList = res.data;

       /* $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.currentMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.currentMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);*/
    },function (res) {
        console.log(res);
    });
     $scope.taxMonthWise = function (route) {
     	console.log(route);
        $location.path(route);

    };
    
}]).controller('suspenceDateWiseController',['$rootScope','$scope','$routeParams','getSuspenseAccountDatewisetService',function ($rootScope,$scope,$routeParams,getSuspenseAccountDatewisetService) {

        console.log($routeParams.month_no);

    getSuspenseAccountDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.suspenceDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('suspenceMonthWiseController',['$rootScope','$scope','$routeParams','$location','getSuspenseAccountMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getSuspenseAccountMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getSuspenseAccountMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.suspenceMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.suspenceMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.suspenceMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
     $scope.suspenceMonthWise = function (route) {
        $location.path(route);
    };
    
    /////////////////////////   Assets ////////////////////////////////////////////
}]).controller('fixedAssetsDateWiseController',['$rootScope','$scope','$routeParams','getFixedAssetsDatewisetService',function ($rootScope,$scope,$routeParams,getFixedAssetsDatewisetService) {

        console.log($routeParams.month_no);

    getFixedAssetsDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.fixedAssetsDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('fixedAssetsMonthWiseController',['$rootScope','$scope','$routeParams','$location','getFixedAssetsMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getFixedAssetsMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getFixedAssetsMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {

        $scope.fixed_assest_month_list = res.data.details;

        console.log($scope.fixed_assest_month_list);

        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.fixed_assest_month_list.length;f++){
            $scope.total_closing_bal += parseFloat($scope.fixed_assest_month_list[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (response) {
        console.log(response);
    });

     $scope.fixedMonthWise = function (route) {
        $location.path(route);
    };
    
}]).controller('currentAssetsDateWiseController',['$rootScope','$scope','$routeParams','getCurrentAssetsDatewisetService',function ($rootScope,$scope,$routeParams,getCurrentAssetsDatewisetService) {

        console.log($routeParams.month_no);

    getCurrentAssetsDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.currentAssetsDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('currentAssetsMonthWiseController',['$rootScope','$scope','$routeParams','$location','getCurrentAssetsMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getCurrentAssetsMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getCurrentAssetsMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.currentAssetsMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.currentAssetsMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.currentAssetsMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
     $scope.currenasssetstDatehWise = function (route) {
        $location.path(route);
    };
    
}]).controller('investmentDateWiseController',['$rootScope','$scope','$routeParams','getInvestmentsDatewisetService',function ($rootScope,$scope,$routeParams,getInvestmentsDatewisetService) {

        console.log($routeParams.month_no);

    getInvestmentsDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.invAssetsDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('investmentMonthWiseController',['$rootScope','$scope','$routeParams','$location','getInvestmentMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getInvestmentMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getInvestmentMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.invAssetsMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.invAssetsMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.invAssetsMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
    $scope.invDatehWise = function (route) {
        $location.path(route);
    };
    
}]).controller('branchDateWiseController',['$rootScope','$scope','$routeParams','getBranchDatewisetService',function ($rootScope,$scope,$routeParams,getBranchDatewisetService) {

        console.log($routeParams.month_no);

    getBranchDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.branchDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('branchMonthWiseController',['$rootScope','$scope','$routeParams','$location','getBranchMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getBranchMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getBranchMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.branchMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.branchMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.branchMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
     $scope.branchDatehWise = function (route) {
        $location.path(route);
    };
    
}]).controller('profitlossDateWiseController',['$rootScope','$scope','$routeParams','getProfitLosshDatewisetService',function ($rootScope,$scope,$routeParams,getProfitLosshDatewisetService) {

    //console.log($routeParams.month_no);

    getProfitLosshDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.profitDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })
}]).controller('profitlossMonthWiseController',['$rootScope','$scope','$routeParams','$location','getProfitLossMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getProfitLossMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.leg_id = $routeParams.ledger_id;
    getProfitLossMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.profitMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.profitMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.profitMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
     $scope.profitDatehWise = function (route) {
        $location.path(route);
    };
    
}]).controller('ledgerGroupMonthWiseController',['$rootScope','$scope','$routeParams','$location','ledgerGroupMonthwiseService',function ($rootScope,$scope,$routeParams,$location,ledgerGroupMonthwiseService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
	$scope.group_id = $routeParams.group_id;
    ledgerGroupMonthwiseService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
		group_id:$routeParams.group_id,
    }).then(function (res) {
        console.log(res)
        $scope.profitMonthWiseList = res.data.details;
        $scope.ledger_group_name=res.data.ledger_group_name;
        //$scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.profitMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.profitMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });

    $scope.sundrySupplierMonthWise = function(route){
        $location.path(route);
    }
     
}]).controller('ledgerGroupMonthWisedataController',['$rootScope','$scope','$routeParams','$location','getCapitalAccountMonthwisetService',function ($rootScope,$scope,$routeParams,$location,getCapitalAccountMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.ledger_id = $routeParams.ledger_id;
	
	getCapitalAccountMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.capitalAccMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.capitalAccMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.capitalAccMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
    $scope.sundrySupplierMonthWise = function (route) {
		alert(route)
        $location.path(route);
    };
	
    /**sundryCreditorMonthwiseDataService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.profitMonthWiseList = res.data.details;
        $scope.supplier_name=res.data.supplier_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.profitMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.profitMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });**/

    $scope.sundrySupplierMonthWise = function(route){
        $location.path(route);
    }
     
}]).controller('ledgerGroupDateWiseController',['$rootScope','$scope','$routeParams','$location','getCapitalAccountDatewisetService',function ($rootScope,$scope,$routeParams,$location,getCapitalAccountDatewisetService) {

	getCapitalAccountDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        ledger_id:$routeParams.ledger_id
    }).then(function (res) {
        $scope.capitalAccDateWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.debit_total=res.data.debit_total;
        $scope.credit_total=res.data.credit_total;

    },function (res) {
        console.log(res);
    })

    /**sundryCreditorDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        supplier_id:$routeParams.supplier_id
    }).then(function (res) {
        $scope.branchDateWiseList = res.data.details;
        $scope.supplier_name=res.data.supplier_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
    },function (res) {
        console.log(res);
    })**/
     
}]).controller('sundryCreditorMonthWiseController',['$rootScope','$scope','$routeParams','$location','sundryCreditorMonthwisetService',function ($rootScope,$scope,$routeParams,$location,sundryCreditorMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
	
    sundryCreditorMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
    }).then(function (res) {
        console.log(res)
        $scope.profitMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.profitMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.profitMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });

    $scope.sundrySupplierMonthWise = function(route){
        $location.path(route);
    }
     
}]).controller('sundryCreditorMonthWisedataController',['$rootScope','$scope','$routeParams','$location','sundryCreditorMonthwiseDataService',function ($rootScope,$scope,$routeParams,$location,sundryCreditorMonthwiseDataService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.supplier_id = $routeParams.supplier_id;
	$scope.check_sup = $routeParams.check_sup;
    sundryCreditorMonthwiseDataService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        supplier_id:$routeParams.supplier_id,
		supp_check : $routeParams.check_sup
    }).then(function (res) {
        $scope.profitMonthWiseList = res.data.details;
        $scope.supplier_name=res.data.supplier_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.profitMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.profitMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
		$scope.credit_opening_balance = res.data.credit_opening_balance;
		$scope.debit_opening_balance = res.data.debit_opening_balance;
    },function (res) {
        console.log(res);
    });

    $scope.sundrySupplierMonthWise = function(route){
        $location.path(route);
    }
     
}]).controller('sundryCreditorDateWiseController',['$rootScope','$scope','$routeParams','$location','sundryCreditorDatewisetService',function ($rootScope,$scope,$routeParams,$location,sundryCreditorDatewisetService) {
	
    sundryCreditorDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        supplier_id:$routeParams.supplier_id,
		supp_check : $routeParams.check_sup
    }).then(function (res) {
        $scope.branchDateWiseList = res.data.details;
        $scope.supplier_name=res.data.supplier_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
		$scope.credit_opening_balance = res.data.credit_opening_balance;
		$scope.debit_opening_balance = res.data.debit_opening_balance;
		
		var creditorData = res.data.details;
		var total_debit_amt = 0;
		var total_credit_amt = 0;
		angular.forEach(creditorData, function(value, key){
			total_debit_amt += Number(value.debit_amount);
			total_credit_amt += Number(value.credit_amount);
		});
		$scope.debit_total_val = total_debit_amt;
		$scope.credit_total_val = total_credit_amt;
    },function (res) {
        console.log(res);
    })
     
}]).controller('sundryDebtorsMonthWiseController',['$rootScope','$scope','$routeParams','$location','sundryDebtorsMonthwisetService',function ($rootScope,$scope,$routeParams,$location,sundryDebtorsMonthwisetService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    sundryDebtorsMonthwisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
    }).then(function (res) {
        console.log(res)
        $scope.profitMonthWiseList = res.data.details;
        $scope.ledger_name=res.data.ledger_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.profitMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.profitMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });

    $scope.sundryCustomerMonthWise = function(route){
        $location.path(route);
    }
     
}]).controller('sundryDebtorsMonthWisedataController',['$rootScope','$scope','$routeParams','$location','sundryDebtorsMonthwiseDataService',function ($rootScope,$scope,$routeParams,$location,sundryDebtorsMonthwiseDataService) {

    $scope.frm_date = $routeParams.from_date;
    $scope.t_date = $routeParams.to_date;
    $scope.wre_id = $routeParams.warehouse_id;
    $scope.customer_id = $routeParams.customer_id;
    sundryDebtorsMonthwiseDataService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        customer_id:$routeParams.customer_id
    }).then(function (res) {
        $scope.profitMonthWiseList = res.data.details;
        $scope.customer_name=res.data.customer_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
        $scope.total_closing_bal = 0;
        for(var f=0;f<$scope.profitMonthWiseList.length;f++){
            $scope.total_closing_bal += parseFloat($scope.profitMonthWiseList[f].closing_balance);
        }
        $scope.total_closing_bal.toFixed(2);
		$scope.credit_opening_balance = res.data.credit_opening_balance;
		$scope.debit_opening_balance = res.data.debit_opening_balance;
    },function (res) {
        console.log(res);
    });

    $scope.sundryCustomerMonthWise = function(route){
        $location.path(route);
    }
     
     
}]).controller('sundryDebtorsDateWiseController',['$rootScope','$scope','$routeParams','$location','sundryDebtorsDatewisetService',function ($rootScope,$scope,$routeParams,$location,sundryDebtorsDatewisetService) {

    sundryDebtorsDatewisetService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        month_no:$routeParams.month_no,
        customer_id:$routeParams.customer_id
    }).then(function (res) {
        $scope.branchDateWiseList = res.data.details;
        $scope.customer_name=res.data.customer_name;
        $scope.opening_balance=res.data.opening_balance;
        $scope.closing_balance=res.data.closing_balance;
        $scope.credit_total=res.data.credit_total;
        $scope.debit_total=res.data.debit_total;
		$scope.credit_opening_balance = res.data.credit_opening_balance;
		$scope.debit_opening_balance = res.data.debit_opening_balance;
		
		var debtorData = res.data.details;
		var total_debit_amt = 0;
		var total_credit_amt = 0;
		angular.forEach(debtorData, function(value, key){
			total_debit_amt += Number(value.debit_amount);
			total_credit_amt += Number(value.credit_amount);
		});
		$scope.debit_total_val = total_debit_amt;
		$scope.credit_total_val = total_credit_amt;
		
    },function (res) {
        console.log(res);
    })
     
}]);



