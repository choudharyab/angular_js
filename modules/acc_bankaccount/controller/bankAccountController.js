var bankAccountModule=angular.module('bankAccountModule',[]);
bankAccountModule.controller('bankAccountController',['$rootScope','$scope','$location','getWarehouseListService1','getCashInHandDetails','getBankAccountDetails','getBankOccDetails',
    function($rootScope,$scope,$location,getWarehouseListService1,getCashInHandDetails,getBankAccountDetails,getBankOccDetails){

    getWarehouseListService1({}).then(function (response) {
        $scope.warehouse_list = response.data;
    });
    $scope.grand_total_cr=0;
        $scope.grand_total_db=0;
    //var cash_cr,cash_db,bank_acc_cr,bank_acc_db,bank_occ_cr,bank_occ_db;
        $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);

        $scope.get_wh = function () {
            $rootScope.warehouse_id = $scope.warehouse_id;
        };

        $scope.ExchangeRateVal = localStorage.getItem('currencyCheckVar');

        $scope.getAllBankAccountsList=function () {
            $scope.grand_total_cr=0;
            $scope.grand_total_db=0;
            getCashInHandDetails({
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                warehouse_id:$rootScope.warehouse_id
            }).then(function (response) {
                console.log(response);
                for(var i=0;i<response.data.data.length;i++){
                    if(response.data.data[i].credit_amount == null){
                        response.data.data[i].credit_amount = 0;
                    }
                    if(response.data.data[i].debit_amount == null){
                        response.data.data[i].debit_amount = 0;
                    }
                }
                $scope.cash_in_hand_list=response.data.data;
                /*list=response.data;*/
                $scope.total_cash_credit=0;
                $scope.total_cash_debit=0;
                for(var i=0;i<$scope.cash_in_hand_list.length;i++)
                {
                    $scope.total_cash_credit+=parseFloat($scope.cash_in_hand_list[i].credit_amount);
                    $scope.total_cash_debit+=parseFloat($scope.cash_in_hand_list[i].debit_amount);
                }
                console.log('total credit amount------',$scope.total_cash_credit);
                console.log('total debit amount------',$scope.total_cash_debit);
                $scope.grand_total_cr+=$scope.total_cash_credit;
                $scope.grand_total_db+=$scope.total_cash_debit;
            },function(response){
                console.log(response);
            });
            getBankAccountDetails({
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                warehouse_id:$rootScope.warehouse_id
            }).then(function (response) {
                console.log(response);
                $scope.bank_account_list=response.data.data;
                $scope.total_bank_amount=response.data;
                /*list=response.data;*/
                $scope.total_bank_account_credit=0;
                $scope.total_bank_account_debit=0;
                /*for(var j=0;j<$scope.bank_account_list.length;j++)
                {
                if($scope.bank_account_list[j].credit_amount == '' || $scope.bank_account_list[j].credit_amount == null || 	$scope.bank_account_list[j].credit_amount == undefined){
                        $scope.bank_account_list[j].credit_amount = 0;
                    }

                   if($scope.bank_account_list[j].debit_amount == '' || $scope.bank_account_list[j].debit_amount == null || $scope.bank_account_list[j].debit_amount == undefined){
                        $scope.bank_account_list[j].debit_amount = 0;
                    }
                    $scope.total_bank_account_credit+=parseFloat($scope.bank_account_list[j].credit_amount);
                    $scope.total_bank_account_debit+=parseFloat($scope.bank_account_list[j].debit_amount);
                }*/
                for(var j=0;j<$scope.bank_account_list.length;j++)
                {
                    if($scope.bank_account_list[j].credit_amount == '' || $scope.bank_account_list[j].credit_amount == null || $scope.bank_account_list[j].credit_amount == undefined){
                        $scope.bank_account_list[j].credit_amount = 0;
                    }

                    if($scope.bank_account_list[j].debit_amount == '' || $scope.bank_account_list[j].debit_amount == null || $scope.bank_account_list[j].debit_amount == undefined){
                        $scope.bank_account_list[j].debit_amount = 0;
                    }
                    //console.log('$scope.bank_account_list.length--->',$scope.bank_account_list[j].credit_amt);
                    $scope.total_bank_account_credit+=parseFloat($scope.bank_account_list[j].credit_amount);
                    $scope.total_bank_account_debit+=parseFloat($scope.bank_account_list[j].debit_amount);
                }
                console.log('total credit amount------',$scope.total_bank_account_credit);
                console.log('total debit amount------',$scope.total_bank_account_debit);
                $scope.grand_total_cr+=$scope.total_bank_account_credit;
                $scope.grand_total_db+=$scope.total_bank_account_debit;
            },function(response){
                console.log(response);
            });
            getBankOccDetails({
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                warehouse_id:$rootScope.warehouse_id
            }).then(function (response) {
                console.log(response);
                for(var i=0;i<response.data.data.length;i++){
                    if(response.data.data[i].credit_amount == null){
                        response.data.data[i].credit_amount = 0;
                    }
                    if(response.data.data[i].debit_amount == null){
                        response.data.data[i].debit_amount = 0;
                    }
                }
                $scope.bank_occ_list=response.data.data;
                /*list=response.data;*/
                $scope.total_bank_occ_credit=0;
                $scope.total_bank_occ_debit=0;
                for(var k=0;k<$scope.bank_occ_list.length;k++)
                {
                    $scope.total_bank_occ_credit+=parseFloat($scope.bank_occ_list[k].credit_amount);
                    $scope.total_bank_occ_debit+=parseFloat($scope.bank_occ_list[k].debit_amount);
                }
                console.log('total credit amount------',$scope.total_bank_occ_credit);
                console.log('total debit amount------',$scope.total_bank_occ_debit);
                $scope.grand_total_cr+=$scope.total_bank_occ_credit;
                $scope.grand_total_db+=$scope.total_bank_occ_debit;
            },function(response){
                console.log(response);
            });


        };
        $scope.getAllBankAccountsList();

        $scope.cashInHandMonthWise = function (id,type) {
            $rootScope.cash_ledger_id=id;
            // if(type=='Ledger')
            // {
                $location.path('/cashinhandmonthwise/'+id);
            //}
        };

        $scope.bankAccountMonthWise = function (id,type) {
            $rootScope.bank_ledger_id=id;
            // if(type=='Ledger')
            // {
                $location.path('/bankaccountmonthwise/'+id);
            //}
        };

        $scope.bankOccMonthWise = function (id,type) {
            console.log('in');
            $rootScope.Occ_ledger_id=id;
            // if(type=='Ledger')
            // {
                $location.path('/bankoccmonthwise/'+id);
            //}
        };

}]).controller('cashInHandMonthWiseController',['$rootScope','$scope','$routeParams','$location','getCashInHandMonthWiseDetails',function ($rootScope,$scope,$routeParams,$location,getCashInHandMonthWiseDetails) {

    //$rootScope.cash_ledger_id = $routeParams.ledger_id;

$scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);

    getCashInHandMonthWiseDetails({
        from_date:$rootScope.from_date,
        to_date:$rootScope.to_date,
        ledger_id:$routeParams.ledger_id,
        warehouse_id:$rootScope.warehouse_id
    }).then(function (res) {
        var debit_amount_total = 0;
        var credit_amount_total = 0;
        var closing_balance_total = 0;
        if(res.data.opening_debit_balance == null){
            res.data.opening_debit_balance = 0;
        }
         if(res.data.opening_credit_balance == null){
            res.data.opening_credit_balance = 0;
        }
        for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].credit == null){
                res.data.data[i].credit = 0;
            }
            if(res.data.data[i].debit == null){
                res.data.data[i].debit = 0;
            }
            debit_amount_total = (parseFloat(debit_amount_total) + parseFloat(res.data.data[i].debit)).toFixed(2);
            credit_amount_total = (parseFloat(credit_amount_total) + parseFloat(res.data.data[i].credit)).toFixed(2);
            closing_balance_total = (parseFloat(closing_balance_total) + parseFloat(res.data.data[i].closing_amount)).toFixed(2);
        }
        $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat(res.data.opening_debit_balance);  
        $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat(res.data.opening_credit_balance);
        $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat(res.data.opening_balance)).toFixed(2);
        $scope.cashInHandMonthWiseList = res.data;
        $scope.opening_balance = res.data.opening_balance;
        $scope.total_closing_bal = 0;
        // for(var f=0;f<$scope.cashInHandMonthWiseList.length;f++){
        //     $scope.total_closing_bal += parseFloat($scope.cashInHandMonthWiseList[f].closing_balance);
        // }
        // $scope.total_closing_bal.toFixed(2);
    },function (res) {
        console.log(res);
    });
    $scope.cashInHandDateWise = function (route) {
        $location.path(route);
    };

}]).controller('cashInHandDateWiseController',['$rootScope','$scope','$routeParams','getCashInHandDateWiseDetails',function ($rootScope,$scope,$routeParams,getCashInHandDateWiseDetails) {

$scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);
    $scope.debit_total_datewise = 0;
    $scope.credit_total_datewise = 0;
    console.log($routeParams.month_no);

    getCashInHandDateWiseDetails({
        from_date:$rootScope.from_date,
        to_date:$rootScope.to_date,
        ledger_id:$rootScope.cash_ledger_id,
        warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no
    }).then(function (res) {
        $scope.cashInHandDateWiseList = res.data;
        for(var i=0;i<response.data.data.length;i++){
            $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
            $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
        }
        $scope.debit_total = parseFloat($scope.debit_total_datewise) + parseFloat($scope.cashInHandDateWiseList.opening_debit_balance ); 
        $scope.credit_total = parseFloat($scope.credit_total_datewise) + parseFloat($scope.cashInHandDateWiseList.opening_credit_balance );
    },function (res) {
        console.log(res);
    });
}])
    .controller('bankAccountMonthWiseController',['$rootScope','$scope','$routeParams','$location','getBankAccountMonthWiseDetails',function ($rootScope,$scope,$routeParams,$location,getBankAccountMonthWiseDetails) {

$scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);

        //$rootScope.cash_ledger_id = $routeParams.ledger_id;

        getBankAccountMonthWiseDetails({
            from_date:$rootScope.from_date,
            to_date:$rootScope.to_date,
            ledger_id:$routeParams.ledger_id,
            warehouse_id:$rootScope.warehouse_id
        }).then(function (res) {
            var debit_amount_total = 0;
            var credit_amount_total = 0;
            var closing_balance_total = 0;
            if(res.data.opening_debit_balance == null){
                res.data.opening_debit_balance = 0;
            }
            if(res.data.opening_credit_balance == null){
                res.data.opening_credit_balance = 0;
            }
            for(var i=0;i<res.data.data.length;i++){
                if(res.data.data[i].credit == null){
                    res.data.data[i].credit = 0;
                }
                if(res.data.data[i].debit == null){
                    res.data.data[i].debit = 0;
                }
                debit_amount_total = (parseFloat(debit_amount_total) + parseFloat(res.data.data[i].debit)).toFixed(2);
                credit_amount_total = (parseFloat(credit_amount_total) + parseFloat(res.data.data[i].credit)).toFixed(2);
                closing_balance_total = (parseFloat(closing_balance_total) + parseFloat(res.data.data[i].closing_amount)).toFixed(2);
            }
            $scope.acc_month_data = res.data;
            $scope.bankAccountMonthWiseList = res.data.data;
            $scope.opening_balance = res.data.opening_balance;
            $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat(res.data.opening_debit_balance);  
            $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat(res.data.opening_credit_balance);
            $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat(res.data.opening_balance)).toFixed(2);

            $scope.total_closing_bal = 0;
            for(var f=0;f<$scope.bankAccountMonthWiseList.length;f++){
                $scope.total_closing_bal += parseFloat($scope.bankAccountMonthWiseList[f].closing_balance);
            }
            $scope.total_closing_bal.toFixed(2);
        },function (res) {
            console.log(res);
        });
        $scope.bankAccountDateWise = function (route) {
            $location.path(route);
        };

    }]).controller('bankAccountDateWiseController',['$rootScope','$scope','$routeParams','getBankAccountDateWiseDetails',function ($rootScope,$scope,$routeParams,getBankAccountDateWiseDetails) {

    console.log($routeParams.month_no);

$scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);
    $scope.debit_total = 0;
    $scope.credit_total = 0;
    getBankAccountDateWiseDetails({
        from_date:$rootScope.from_date,
        to_date:$rootScope.to_date,
        ledger_id:$rootScope.bank_ledger_id,
        warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no
    }).then(function (res) {
        
        $scope.bankAccountDateWiseList = res.data;
        for(var i=0;i<response.data.data.length;i++){
            $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
            $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
        }
        $scope.debit_total = parseFloat($scope.debit_total_datewise) + parseFloat($scope.bankAccountDateWiseList.opening_debit_balance ); 
        $scope.credit_total = parseFloat($scope.credit_total_datewise) + parseFloat($scope.bankAccountDateWiseList.opening_credit_balance );
    },function (res) {
        console.log(res);
    });
}])
    .controller('bankOccMonthWiseController',['$rootScope','$scope','$routeParams','$location','getBankOccMonthWiseDetails',function ($rootScope,$scope,$routeParams,$location,getBankOccMonthWiseDetails) {

        //$rootScope.cash_ledger_id = $routeParams.ledger_id;

$scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);

        getBankOccMonthWiseDetails({
            from_date:$rootScope.from_date,
            to_date:$rootScope.to_date,
            ledger_id:$routeParams.ledger_id,
            warehouse_id:$rootScope.warehouse_id
        }).then(function (res) {
            var debit_amount_total = 0;
            var credit_amount_total = 0;
            var closing_balance_total = 0;
            if(res.data.opening_debit_balance == null){
                res.data.opening_debit_balance = 0;
            }
            if(res.data.opening_credit_balance == null){
                res.data.opening_credit_balance = 0;
            }
            for(var i=0;i<res.data.data.length;i++){
                if(res.data.data[i].credit == null){
                    res.data.data[i].credit = 0;
                }
                if(res.data.data[i].debit == null){
                    res.data.data[i].debit = 0;
                }
                debit_amount_total = (parseFloat(debit_amount_total) + parseFloat(res.data.data[i].debit)).toFixed(2);
                credit_amount_total = (parseFloat(credit_amount_total) + parseFloat(res.data.data[i].credit)).toFixed(2);
                closing_balance_total = (parseFloat(closing_balance_total) + parseFloat(res.data.data[i].closing_amount)).toFixed(2);
            }
            $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat(res.data.opening_debit_balance);  
            $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat(res.data.opening_credit_balance);
            $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat(res.data.opening_balance)).toFixed(2);
            $scope.bankOccMonthWiseList = res.data;

            $scope.total_closing_bal = 0;
            $scope.opening_balance = res.data.opening_balance;
            // for(var f=0;f<$scope.bankOccMonthWiseList.length;f++){
            //     $scope.total_closing_bal += parseFloat($scope.bankOccMonthWiseList[f].closing_amount);
            // }
            // $scope.total_closing_bal.toFixed(2);
        },function (res) {
            console.log(res);
        });
        $scope.bankOccDateWise = function (route) {
            $location.path(route);
        };

    }]).controller('bankOccDateWiseController',['$rootScope','$scope','$routeParams','getBankOccDateWiseDetails',function ($rootScope,$scope,$routeParams,getBankOccDateWiseDetails) {

    console.log($routeParams.month_no);

$scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);
    $scope.debit_total = 0;
    $scope.credit_total = 0;
    getBankOccDateWiseDetails({
        from_date:$rootScope.from_date,
        to_date:$rootScope.to_date,
        ledger_id:$rootScope.Occ_ledger_id,
        warehouse_id:$rootScope.warehouse_id,
        month_no:$routeParams.month_no
    }).then(function (res) {

        $scope.bankOccDateWiseList = res.data;
        for(var i=0;i<response.data.data.length;i++){
            $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
            $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
        }
        $scope.debit_total = parseFloat($scope.debit_total_datewise) + parseFloat($scope.bankOccDateWiseList.opening_debit_balance ); 
        $scope.credit_total = parseFloat($scope.credit_total_datewise) + parseFloat($scope.bankOccDateWiseList.opening_credit_balance );
    },function (res) {
        console.log(res);
    });
}])
;


