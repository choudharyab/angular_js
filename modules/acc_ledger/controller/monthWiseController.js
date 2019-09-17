var monthWiseModule = angular.module('monthWiseModule',[]);
monthWiseModule.controller('monthWiseController',['$rootScope','$scope','$location','$filter','$routeParams','getSubLedgerMonthWiseDetails',
'getAssetsMonthwise','getSubgroupwiseLedgers','getExpenseMonthwise','getIncomeMonthwise','getPlMonthwise',
function($rootScope,$scope,$location,$filter,$routeParams,getSubLedgerMonthWiseDetails,getAssetsMonthwise,getSubgroupwiseLedgers,getExpenseMonthwise,
    getIncomeMonthwise,getPlMonthwise){
      $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);

      console.log($location.path());
      $scope.monthwise_heading = $routeParams.ledger_name;
      //$scope.subgroupwise_heading = $routeParams.ledger_name;
      var from_date = $routeParams.from_date.replace(/-/g, '/');
        var to_date = $routeParams.to_date.replace(/-/g, '/');
      $scope.onLoadGetAllMonthWise = function(){   
             $rootScope.name_of_ledger = $routeParams.ledger_name;
        console.log('~~~~~~~~~~~~~~~',from_date);
        console.log('~~~~~~~~~~~~~~~',to_date);
        console.log('$routeParams.balancesheet_side',$routeParams.balancesheet_side);
        if($routeParams.balancesheet_side == 'Liabilities'){ 
            getSubLedgerMonthWiseDetails({
                ledger_id: $routeParams.ledger_id,
                ledger_name: $routeParams.ledger_name,
                from_date:from_date,
                to_date:to_date,
                subgroup_id:  $routeParams.subgroup_id,
                type:  $routeParams.type,
                ledger_type: $routeParams.ledger_type
            }).then(function (response) {           
                if(response.data.opening_debit_balance == null){
                    response.data.opening_debit_balance = 0;
                } 
                if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                }
                $scope.month_wise_lists = response.data;   
                if($scope.month_wise_lists.opening_balance == null){
                    $scope.month_wise_lists.opening_balance = 0;
                }     
                var debit_amount_total = 0;
                var credit_amount_total = 0;
                var closing_balance_total = 0;
                //if( $scope.month_wise_lists.details.length > 0 ){
                    for(var i=0;i< $scope.month_wise_lists.data.length;i++){
                        if($scope.month_wise_lists.data[i].debit == null){
                            $scope.month_wise_lists.data[i].debit = 0;
                        }    
                        if($scope.month_wise_lists.data[i].credit == null){
                            $scope.month_wise_lists.data[i].credit = 0;
                        }    
    
                        debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.data[i].debit)).toFixed(2);
                        credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.data[i].credit)).toFixed(2);
                        closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.data[i].closing_amount)).toFixed(2);
                    }   
                    $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                    $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_credit_balance);
                    //$rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2);
                 $rootScope.closing_balance_total = response.data.total_closing_balance; 
                // }else{
                //     $rootScope.debit_amount_total = debit_amount_total;  
                //     $rootScope.credit_amount_total = credit_amount_total;
                //     $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                // }   
            });
        }

        else if($routeParams.balancesheet_side == 'Asset'){
            getAssetsMonthwise({
                ledger_id: $routeParams.ledger_id,
                ledger_name: $routeParams.ledger_name,
                from_date:from_date,
                to_date:to_date,
                subgroup_id:  $routeParams.subgroup_id,
                type:  $routeParams.type,
                ledger_type: $routeParams.ledger_type,
                customer_id: $routeParams.id
            }).then(function (response) {           
                if(response.data.opening_debit_balance == null){
                    response.data.opening_debit_balance = 0;
                } 
                if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                }
                $scope.month_wise_lists = response.data;   
                if($scope.month_wise_lists.opening_balance == null){
                    $scope.month_wise_lists.opening_balance = 0;
                }     
                var debit_amount_total = 0;
                var credit_amount_total = 0;
                var closing_balance_total = 0;
                //if( $scope.month_wise_lists.details.length > 0 ){
                    for(var i=0;i< $scope.month_wise_lists.data.length;i++){
                        if($scope.month_wise_lists.data[i].debit == null){
                            $scope.month_wise_lists.data[i].debit = 0;
                        }    
                        if($scope.month_wise_lists.data[i].credit == null){
                            $scope.month_wise_lists.data[i].credit = 0;
                        }    
    
                        debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.data[i].debit)).toFixed(2);
                        credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.data[i].credit)).toFixed(2);
                        closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.data[i].closing_amount)).toFixed(2);
                    }   
                    $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                    $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_credit_balance);
                    $rootScope.closing_balance_total = response.data.total_closing_balance; 
                    //$rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                // }else{
                //     $rootScope.debit_amount_total = debit_amount_total;  
                //     $rootScope.credit_amount_total = credit_amount_total;
                //     $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                // }   
            });
        }else if($routeParams.balancesheet_side == 'Expense'){
            $rootScope.name_of_ledger = $routeParams.ledger_name;
            getPlMonthwise({
                from_date:from_date,
                to_date:to_date,
                ledger_id:  $routeParams.ledger_id,
                ledger_name: $routeParams.ledger_name,
                type: $routeParams.balancesheet_side
            }).then(function (response) {           
                if(response.data.opening_debit_balance == null){
                    response.data.opening_debit_balance = 0;
                } 
                if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                }
                $scope.month_wise_lists = response.data;   
                if($scope.month_wise_lists.opening_balance == null){
                    $scope.month_wise_lists.opening_balance = 0;
                }     
                var debit_amount_total = 0;
                var credit_amount_total = 0;
                var closing_balance_total = 0;
                //if( $scope.month_wise_lists.details.length > 0 ){
                    for(var i=0;i< $scope.month_wise_lists.data.length;i++){
                        if($scope.month_wise_lists.data[i].debit == null){
                            $scope.month_wise_lists.data[i].debit = 0;
                        }    
                        if($scope.month_wise_lists.data[i].credit == null){
                            $scope.month_wise_lists.data[i].credit = 0;
                        }    
    
                        debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.data[i].debit)).toFixed(2);
                        credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.data[i].credit)).toFixed(2);
                        closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.data[i].closing_amount)).toFixed(2);
                    }   
                    // $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                    // $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);
                    // $rootScope.closing_balance_total = response.data.total_closing_balance; 
                    console.log('====================>',parseFloat(credit_amount_total));
                    $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                    $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_credit_balance);
                    $rootScope.closing_balance_total = response.data.total_closing_balance;
                    //$rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                // }else{
                //     $rootScope.debit_amount_total = debit_amount_total;  
                //     $rootScope.credit_amount_total = credit_amount_total;
                //     $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                // }   
            });
        }       
      };

      $scope.getProfitLossMonthWise = function(){
          if($routeParams.group_name == 'PURCHASE ACCOUNT' || $routeParams.group_name == 'SALES ACCOUNT'){

            console.log($routeParams.group_name);
            if($routeParams.balancesheet_side == 'Income'){
                getIncomeMonthwise({
                    from_date:from_date,
                    to_date:to_date,
                    ledger_subgroup_id:  $routeParams.subgroup_id,
                    tax_type: $routeParams.tax_type,
                    tax_id: $routeParams.tax_id
                }).then(function (response) {           
                    if(response.data.opening_debit_balance == null){
                        response.data.opening_debit_balance = 0;
                    } 
                    if(response.data.opening_credit_balance == null){
                        response.data.opening_credit_balance = 0;
                    }     
                    $scope.month_wise_lists = response.data;   
                    if($scope.month_wise_lists.opening_balance == null){
                        $scope.month_wise_lists.opening_balance = 0;
                    } 

                    var debit_amount_total = 0;
                    var credit_amount_total = 0;
                    var closing_balance_total = 0;
                    //if( $scope.month_wise_lists.details.length > 0 ){
                        for(var i=0;i< $scope.month_wise_lists.data.length;i++){
                            if($scope.month_wise_lists.data[i].debit == null){
                                $scope.month_wise_lists.data[i].debit = 0;
                            }    
                            if($scope.month_wise_lists.data[i].credit == null){
                                $scope.month_wise_lists.data[i].credit = 0;
                            }    
        
                            debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.data[i].debit)).toFixed(2);
                            credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.data[i].credit)).toFixed(2);
                            closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.data[i].closing_amount)).toFixed(2);
                        }   
                        $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                        $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_credit_balance);
                        $rootScope.closing_balance_total = response.data.total_closing_balance; 
                        //$rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                    // }else{
                    //     $rootScope.debit_amount_total = debit_amount_total;  
                    //     $rootScope.credit_amount_total = credit_amount_total;
                    //     $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                    // }   
                });
            }
    
            else if($routeParams.balancesheet_side == 'Expense'){
                getExpenseMonthwise({
                    from_date:from_date,
                    to_date:to_date,
                    ledger_subgroup_id:  $routeParams.subgroup_id,
                    tax_type: $routeParams.tax_type,
                    tax_id: $routeParams.tax_id
                }).then(function (response) {           
                    if(response.data.opening_debit_balance == null){
                        response.data.opening_debit_balance = 0;
                    } 
                    if(response.data.opening_credit_balance == null){
                        response.data.opening_credit_balance = 0;
                    }
                    $scope.month_wise_lists = response.data;   
                    if($scope.month_wise_lists.opening_balance == null){
                        $scope.month_wise_lists.opening_balance = 0;
                    }     
                    var debit_amount_total = 0;
                    var credit_amount_total = 0;
                    var closing_balance_total = 0;
                    //if( $scope.month_wise_lists.details.length > 0 ){
                        for(var i=0;i< $scope.month_wise_lists.data.length;i++){
                            if($scope.month_wise_lists.data[i].debit == null){
                                $scope.month_wise_lists.data[i].debit = 0;
                            }    
                            if($scope.month_wise_lists.data[i].credit == null){
                                $scope.month_wise_lists.data[i].credit = 0;
                            }    
        
                            debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.data[i].debit)).toFixed(2);
                            credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.data[i].credit)).toFixed(2);
                            closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.data[i].closing_amount)).toFixed(2);
                        }   
                        $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                        $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_credit_balance);
                        $rootScope.closing_balance_total = response.data.total_closing_balance; 
                        //$rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                    // }else{
                    //     $rootScope.debit_amount_total = debit_amount_total;  
                    //     $rootScope.credit_amount_total = credit_amount_total;
                    //     $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                    // }   
                });
            }
          }else{
            $rootScope.name_of_ledger = $routeParams.ledger_name;
            getPlMonthwise({
                from_date:from_date,
                to_date:to_date,
                ledger_id:  $routeParams.ledger_id,
                ledger_name: $routeParams.ledger_name,
                type: $routeParams.balancesheet_side
            }).then(function (response) {           
                if(response.data.opening_debit_balance == null){
                    response.data.opening_debit_balance = 0;
                } 
                if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                }
                $scope.month_wise_lists = response.data;   
                if($scope.month_wise_lists.opening_balance == null){
                    $scope.month_wise_lists.opening_balance = 0;
                }     
                var debit_amount_total = 0;
                var credit_amount_total = 0;
                var closing_balance_total = 0;
                //if( $scope.month_wise_lists.details.length > 0 ){
                    for(var i=0;i< $scope.month_wise_lists.data.length;i++){
                        if($scope.month_wise_lists.data[i].debit == null){
                            $scope.month_wise_lists.data[i].debit = 0;
                        }    
                        if($scope.month_wise_lists.data[i].credit == null){
                            $scope.month_wise_lists.data[i].credit = 0;
                        }    
    
                        debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.data[i].debit)).toFixed(2);
                        credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.data[i].credit)).toFixed(2);
                        closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.data[i].closing_amount)).toFixed(2);
                    }   
                    // $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                    // $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);
                    // $rootScope.closing_balance_total = response.data.total_closing_balance; 
                    console.log('====================>',parseFloat(credit_amount_total));
                    $rootScope.debit_amount_total = parseFloat(debit_amount_total) + parseFloat($scope.month_wise_lists.opening_debit_balance);  
                    $rootScope.credit_amount_total = parseFloat(credit_amount_total) + parseFloat($scope.month_wise_lists.opening_credit_balance);
                    $rootScope.closing_balance_total = response.data.total_closing_balance;
                    //$rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                // }else{
                //     $rootScope.debit_amount_total = debit_amount_total;  
                //     $rootScope.credit_amount_total = credit_amount_total;
                //     $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
                // }   
            });
          }
        
      }

    $scope.onLoadGetAllLedgers = function(){
        $rootScope.name_of_ledger = $routeParams.subgroup_name;
        getSubgroupwiseLedgers({
            
            subgroup_name: $routeParams.subgroup_name,
            from_date:from_date,
            to_date:to_date,
            subgroup_id:  $routeParams.subgroup_id,
            type:  $routeParams.type,
        }).then(function (response) {           
            for(var k=0;k<response.data.data.length;k++){
                if(response.data.data[k].Debit == null){
                    response.data.data[k].Debit = 0;
                }    
                if(response.data.data[k].Credit == null){
                    response.data.data[k].Credit = 0;
                }
                response.data.data[k].closing_balance = parseFloat(response.data.data[k].Credit) - parseFloat(response.data.data[k].Debit);
            }
            $scope.subgroup_wise_list = response.data;   
            if($scope.subgroup_wise_list.opening_balance == null){
                $scope.subgroup_wise_list.opening_balance = 0;
            }     
            var debit_amount_total = 0;
            var credit_amount_total = 0;
            var closing_balance_total = 0;
            //if( $scope.month_wise_lists.details.length > 0 ){
                for(var i=0;i< $scope.subgroup_wise_list.data.length;i++){    

                    debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($scope.subgroup_wise_list.data[i].Debit)).toFixed(2);
                    credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($scope.subgroup_wise_list.data[i].Credit)).toFixed(2);
                    //$rootScope.closing_balance_total = response.data.total_closing_balance; 
                    closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.subgroup_wise_list.data[i].closing_amount)).toFixed(2);
                }   
                console.log(closing_balance_total);
                $scope.debit_total = debit_amount_total;  
                $scope.credit_total = credit_amount_total;
                // if(response.data.data.length > 0){
                //     console.log('inside');
                //     $scope.closing_total = (parseFloat($scope.subgroup_wise_list.total_closing_balance) + parseFloat($scope.subgroup_wise_list.opening_balance)).toFixed(2);
                // }else{
                //     $scope.closing_total = $scope.subgroup_wise_list.opening_balance;
                // }
                $rootScope.closing_total = response.data.total_closing_balance; 
                

                console.log($scope.closing_total);
            // }else{
            //     $rootScope.debit_amount_total = debit_amount_total;  
            //     $rootScope.credit_amount_total = credit_amount_total;
            //     $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($scope.month_wise_lists.opening_balance)).toFixed(2); 
            // }   
        });
    }



    if($location.url().split("/")[1] == 'detailsmonthwisee'){
        console.log('inn');
        $scope.onLoadGetAllMonthWise();
    }
    if($location.url().split("/")[1] == 'detailsmonthwise'){
        console.log('inside');
        $scope.onLoadGetAllLedgers();
    }
    if($location.url().split("/")[1] == 'detailsmonthwiseforpl'){
        console.log('inside');
        $scope.getProfitLossMonthWise();
    }

    
      $scope.getDateWiseDetails = function(month_no){
        var from_date = $routeParams.from_date.replace(/\//g, '-');
        var to_date = $routeParams.to_date.replace(/\//g, '-'); 
        console.log(from_date,to_date);
        var ledger_id = $routeParams.ledger_id;
        var type = $routeParams.type;
        var sub_group_id = $routeParams.sub_group_id;
        var ledger_type = $routeParams.ledger_type;
        if($routeParams.balancesheet_side == 'Income' || $routeParams.balancesheet_side == 'Expense'){
            $location.path('/detailsdatewiseforpl/' + $routeParams.subgroup_id  + '/' + month_no + '/' + $routeParams.tax_type + '/' + $routeParams.tax_id + '/' + from_date + '/' + to_date + '/' + $routeParams.balancesheet_side + '/' + $routeParams.group_name + '/' +$routeParams.ledger_id + '/' +$routeParams.ledger_name);
        }else{
            $location.path('/detailsdatewisee/' + ledger_id + '/' + type + '/' + sub_group_id + '/' + month_no + '/' + ledger_type + '/' + from_date + '/' + to_date + '/' + $routeParams.ledger_name + '/' + $routeParams.balancesheet_side + '/' + $routeParams.id);
        }
       
      //  $location.path('/detailsdatewisee/' + from_date + '/' + to_date + '/' + ledger_id + '/' + type + '/' + sub_ledger_id + '/' + month_no); 
       
    };
 
    $scope.get_month_wise_details_for_sub_ledger = function(ledger_id,led_name,ledger_type,balancesheet_side,id,subgroup_id,ledger_name){
        console.log(id);
        var id = id;
        if(id == undefined){
            id = 0;
        }
        
        
        console.log(id);
        console.log(sub_ledger_id);
        var ledger_id = ledger_id;
        if(ledger_id == undefined){
            ledger_id = 0;
        }
        var from_date = $rootScope.from_date.replace(/\//g, '-');
        var to_date = $rootScope.to_date.replace(/\//g, '-');  
        var type = ledger_name;
        if(type == undefined){
            type = 0;
        }
        var sub_ledger_id = sub_ledger_id;
        if(sub_ledger_id == undefined){
            sub_ledger_id = 0;
        }
        console.log(ledger_id);
        console.log(led_name.split('%')[0]);
        var led_name = led_name.split('%')[0];
        if(led_name == undefined){
            led_name = 0;
        }
        console.log(subgroup_id);
        var subgroup_id = $routeParams.subgroup_id;
        if(subgroup_id == undefined){
            subgroup_id = 0;
        }
        console.log(ledger_name);
        if(ledger_name == undefined){
            ledger_name = 0;
        }
        console.log(ledger_type);
        if(ledger_type == undefined){
            ledger_type = 0;
        }
        $location.path('/detailsmonthwisee/'+from_date+'/'+to_date +'/'+ ledger_id + '/' + type + '/' + subgroup_id + '/' + led_name + '/' + ledger_type + '/' + balancesheet_side + '/' + id); 
    };
    

     
}]);



