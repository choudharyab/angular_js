balanceSheetModule=angular.module('balanceSheetModule',[]);
balanceSheetModule.controller('balanceSheetController',['$rootScope','$scope','$location','$timeout','getWarehouseListService','getCaptialAccountDataService','getLoansDataService','getCurrentDataService','getSuspenseAccountDataService','getTaxDutiesDataService','getCurrentAssetsDataService','getFixedAssetsDataService','getInvestmentDataService','getBranchDataService','getProfitLossDataService','sundryCreditorDateService','sundryDebtorDateService','getBalanceSheetData','getMonthWiseDetails','isSubLedgerAvailable',
	function($rootScope,$scope,$location,$timeout,getWarehouseListService,getCaptialAccountDataService,getLoansDataService,getCurrentDataService,getSuspenseAccountDataService,getTaxDutiesDataService,getCurrentAssetsDataService,getFixedAssetsDataService,getInvestmentDataService,getBranchDataService,getProfitLossDataService,sundryCreditorDateService,sundryDebtorDateService,getBalanceSheetData,getMonthWiseDetails,isSubLedgerAvailable){
   
    $scope.view_type = '';    
    $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();

    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);
    // $scope.change_view_type = function(){
    //     if($scope.view_type == 'Compacted'){
    //         $('.type tr:not(:first-child)').next('tr').show();
    //         $('.first_row').addClass('bgcolor');
    //     }else if($scope.view_type == 'Detailed'){
    //         $('.type tr:not(:first-child)').show();
    //         $('.first_row').addClass('bgcolor');
    //         //$('.ledger_type tr:not(:first-child)').show();          
    //     }else{
    //         $('.type tr:not(:first-child)').hide();
    //         $('.first_row').removeClass('bgcolor');
    //         //$('.ledger_type tr:not(:first-child)').hide();   
    //     }
    //     // if($scope.view_type == 'Compacted'){
    //     //     $('.type tr:not(:first-child)').hide();
    //     //     $('.first_row').removeClass('bgcolor');
    //     // }else if($scope.view_type == 'Detailed'){
    //     //     $('.type tr:not(:first-child)').show();
    //     //     $('.first_row').addClass('bgcolor');
    //     // }
    // }; 
    
    $scope.change_view_type = function(){
        if($scope.view_type == 'Compacted'){
            $('.type tr:not(:first-child)').hide();
            //$('.type tr:not(:first-child)').next('tr').show();
            $('.second_row').show();
            $('.first_row').addClass('bgcolor');
        }else if($scope.view_type == 'Detailed'){
            $('.type tr:not(:first-child)').show();
            $('.first_row').addClass('bgcolor');
           // $('.ledger_type tr:not(:first-child)').show();          
        }else{
            $('.type tr:not(:first-child)').hide();
            $('.first_row').removeClass('bgcolor');
            //$('.ledger_type tr:not(:first-child)').hide();   
        }
        // if($scope.view_type == 'Compacted'){
        //     $('.type tr:not(:first-child)').hide();
        //     $('.first_row').removeClass('bgcolor');
        // }else if($scope.view_type == 'Detailed'){
        //     $('.type tr:not(:first-child)').show();
        //     $('.first_row').addClass('bgcolor');
        // }else{

        // }
    };

    console.log($rootScope.from_date)

    $scope.assets = [];
    $scope.liabilities = [];
    $scope.onLoadGetBalanceSheetData = function(){
        console.log($rootScope.from_date)
        getBalanceSheetData({
            from_date: $rootScope.from_date,
            to_date: $rootScope.to_date
        }).then(function (response) {           
           $scope.asset_arr = [];             
                for(var i=0;i<response.data.asset.length;i++){
                            $scope.asset_obj = {};
                            $scope.asset_obj.amt = 0
                            $scope.asset_obj.id = response.data.asset[i].id;
                            $scope.asset_obj.group_name = response.data.asset[i].ledger_group_name;
                            if(response.data.asset[i].total_amount == null){
                                response.data.asset[i].total_amount = 0;
                            }
                            $scope.asset_obj.amt = response.data.asset[i].total_amount;
                            $scope.asset_ledger_arr = [];
                            for(var j=0;j<response.data.asset[i].subgroup.length;j++){
                                    //$scope.asset_obj.amt = parseFloat($scope.asset_obj.amt) + parseFloat(response.data.asset[i].subgroup[j].opening_balance);
                                    $scope.asset_ledger_obj = {};
                                    $scope.asset_ledger_obj.id = response.data.asset[i].subgroup[j].id;
                                    $scope.asset_ledger_obj.ledger_name = response.data.asset[i].subgroup[j].subgroup_name;
                                    $scope.asset_ledger_obj.amount =  response.data.asset[i].subgroup[j].opening_balance;
                                    $scope.asset_ledger_obj.sub_grp_total =  response.data.asset[i].subgroup[j].total_amount;
                                    $scope.asset_ledger_obj.sub_ledger_arr = response.data.asset[i].subgroup[j].ledger;
                                    $scope.asset_ledger_arr.push($scope.asset_ledger_obj); 
                            }
                            $scope.asset_obj.ledger_arr = $scope.asset_ledger_arr;  
                            $scope.asset_arr.push($scope.asset_obj);            
                }
          
           $scope.assets =  $scope.asset_arr;
           console.log($scope.assets);  

           $scope.liability_arr = [];         
                for(var k=0;k<response.data.liability.length;k++){
                    
                            $scope.liability_obj = {};
                            $scope.liability_obj.amt=0;
                            $scope.liability_obj.id = response.data.liability[k].id;
                            $scope.liability_obj.group_name = response.data.liability[k].ledger_group_name;
                            if(response.data.liability[k].total_amount == null){
                                response.data.liability[k].total_amount = 0;
                            }
                            $scope.liability_obj.amt = response.data.liability[k].total_amount;
                            $scope.liability_ledger_arr = [];
                            for(var l=0;l<response.data.liability[k].subgroup.length;l++){
                                    $scope.liability_ledger_obj = {};
                                    //$scope.liability_obj.amt = parseFloat($scope.liability_obj.amt) + parseFloat(response.data.liability[k].subgroup[l].opening_balance);
                                    $scope.liability_ledger_obj.id = response.data.liability[k].subgroup[l].id;
                                    $scope.liability_ledger_obj.ledger_name = response.data.liability[k].subgroup[l].subgroup_name;
                                    $scope.liability_ledger_obj.amount = response.data.liability[k].subgroup[l].opening_balance;
                                    $scope.liability_ledger_obj.sub_grp_total =  response.data.liability[k].subgroup[l].total_amount;
                                    $scope.liability_ledger_obj.sub_ledger_arr = response.data.liability[k].subgroup[l].ledger;
                                    $scope.liability_ledger_arr.push($scope.liability_ledger_obj); 
                            }
                            $scope.liability_obj.ledger_arr = $scope.liability_ledger_arr;  
                            $scope.liability_arr.push($scope.liability_obj);            
                }          
           $scope.liabilities =  $scope.liability_arr; 
           console.log($scope.liabilities);  
        });
    };
    $scope.onLoadGetBalanceSheetData();

    $scope.get_month_wise_details_for_sub_ledger = function(ledger_id,led_name,ledger_type,balancesheet_side,id,subgroup_id,ledger_name){
        console.log(id);
        var id = id;
        if(id == ''){
            id = 0;
        }
        console.log(id);
        console.log(sub_ledger_id);
        var ledger_id = ledger_id;
        var from_date = $rootScope.from_date.replace(/\//g, '-');
        var to_date = $rootScope.to_date.replace(/\//g, '-');  
        var type = ledger_name;
        var sub_ledger_id = sub_ledger_id;
        console.log(ledger_id);
        console.log(led_name);
        console.log(subgroup_id);
        console.log(ledger_name);
        console.log(ledger_type);
        console.log(led_name.split('%')[0]);
        var led_name = led_name.split('%')[0];
        $location.path('/detailsmonthwisee/'+ from_date + '/' + to_date +'/'+ ledger_id + '/' + type + '/' + subgroup_id + '/' + led_name + '/' + ledger_type + '/' + balancesheet_side + '/' + id); 
    };

    //  $scope.liabilities = [{'id':'1','group_name':'CAPITAL','amt':'3000','ledger_arr':[{"id":"1","ledger_name":"Surplus","amount":'1000'},{"id":"2","ledger_name":"PROVISION",'amount':'2000'}]},{'id':'2','group_name':'CAPITAL','amt':'7000','ledger_arr':[{"id":"3","ledger_name":"Surplus",'amount':'3000'},{"id":"4","ledger_name":"PROVISION",'amount':'4000'}]}];

    // $scope.assets = [{'id':'1','group_name':'CAPITAL','amt':'3000','ledger_arr':[{"id":"1","ledger_name":"Surplus","amount":'1000'},{"id":"2","ledger_name":"PROVISION",'amount':'2000'}]},{'id':'2','group_name':'CAPITAL','amt':'7000','ledger_arr':[{"id":"3","ledger_name":"Surplus",'amount':'3000'},{"id":"4","ledger_name":"PROVISION",'amount':'4000'}]}];

    $scope.calculate_liabilities_total = function(){
        var lia_tot = 0;
        if( $scope.liabilities.length > 0 ){
            for(var i=0;i< $scope.liabilities.length;i++){
               lia_tot = (parseFloat(lia_tot) + parseFloat($scope.liabilities[i].amt)).toFixed(2);
            }
            return lia_tot;
        }else{
            return lia_tot;
        }
    };

    $scope.calculate_assets_total = function(){
        var asset_tot = 0;
        if( $scope.assets.length > 0 ){
            for(var i=0;i< $scope.assets.length;i++){
                asset_tot = (parseFloat(asset_tot) + parseFloat($scope.assets[i].amt)).toFixed(2);
            }
            return asset_tot;
        }else{
            return asset_tot;
        }
    };

    $scope.open_sub_detail_rows = function(ind){
        if ($('#table_id_' + ind + '  tr:last-child').is(':visible') === true) {
            $('#table_id_' + ind + ' tr:not(:first-child)').hide();
            $('#first_row_' + ind).removeClass('bgcolor');
            //$(this).text('Show');
        } else {
            $('#table_id_' + ind + ' tr:not(:first-child)').show();
            $('#first_row_' + ind).addClass('bgcolor');
           // $(this).text('Hide');
        }
    };

    $scope.open_sub_detail_rows_for_credit = function(id){
        if ($('#table_id_' + id + '  tr:last-child').is(':visible') === true) {
            $('#table_id_' + id + ' tr:not(:first-child)').hide();
            $('#first_row_' + id).removeClass('bgcolor');
            //$(this).text('Show');
        } else {
            $('#table_id_' + id + ' tr:not(:first-child)').show();
            $('#first_row_' + id).addClass('bgcolor');
           // $(this).text('Hide');
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
    $rootScope.from_date = '01'+'/04/'+$scope.finance_year ;
    $rootScope.to_date = moment().format("DD/MM/YYYY");
	
    $scope.get_wh = function () {
        $rootScope.warehouse_id = $scope.warehouse_id;
    };

    $scope.$on('change_warehouse',function(event,data){
        $scope.wh_list();
        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
        $scope.get_PO_list();
    });

    $scope.get_month_wise_details_for_ledger = function(id,ledger_name){
        var ledger_id = id;
        var frm_date = $rootScope.from_date.replace(/\//g, '-');
        var to_date = $rootScope.to_date.replace(/\//g, '-');  
        var type = ledger_name;
        var sub_ledger_id = null;
        $location.path('/detailsmonthwisee/'+ frm_date + '/' + to_date +'/'+ ledger_id + '/' + type + '/' + sub_ledger_id); 
    };


    $scope.get_subgroupwise_ledgers = function(subgroup_id,subgroup_name,type){
        var from_date = $rootScope.from_date.replace(/\//g, '-');
        var to_date = $rootScope.to_date.replace(/\//g, '-');
        $location.path('/detailsmonthwise/'+ from_date + '/' + to_date +'/'+ subgroup_id + '/' + subgroup_name + '/' + type);
    }

    


}]).controller('capitalAccDateWiseController',['$rootScope','$scope','$routeParams','getCapitalAccountDatewisetService',
function ($rootScope,$scope,$routeParams,getCapitalAccountDatewisetService) {

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

        console.log($routeParams.month_no);

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

        console.log($routeParams.month_no);

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
    sundryCreditorMonthwiseDataService({
        from_date:$routeParams.from_date,
        to_date:$routeParams.to_date,
        warehouse_id:$routeParams.warehouse_id,
        supplier_id:$routeParams.supplier_id
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
    },function (res) {
        console.log(res);
    })
     
}]);



