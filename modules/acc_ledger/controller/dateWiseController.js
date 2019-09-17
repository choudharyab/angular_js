var dateWiseModule = angular.module('dateWiseModule',[]);
dateWiseModule.controller('dateWiseController',['$scope','$routeParams','$rootScope','getDateWiseDetails','getAssetsDatewise','getIncomeDatewise','getExpenseDatewise',
'getPlDatewise',
function($scope,$routeParams,$rootScope,getDateWiseDetails,getAssetsDatewise,getIncomeDatewise,getExpenseDatewise,getPlDatewise){

      console.log('$routeParams=======',$routeParams);
      console.log('$routeParams.from_date',$routeParams.ledger_id);

      $scope.datewise_heading = $routeParams.ledger_name;
      $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);


      $scope.onLoadGetAllDateWise = function(){
        $rootScope.name_of_ledger = $routeParams.ledger_name;
        
        var from_date = $routeParams.from_date.replace(/-/g, '/');
        var to_date = $routeParams.to_date.replace(/-/g, '/');   
        if($routeParams.balancesheet_side == 'Liabilities'){
            getDateWiseDetails({
                month_no: $routeParams.month_no,
                from_date: from_date,
                to_date: to_date,
                ledger_id: $routeParams.ledger_id,
                sub_group_id : $routeParams.sub_group_id,
                type: $routeParams.type,
                ledger_type: $routeParams.ledger_type,
                ledger_name : $routeParams.ledger_name
            }).then(function (response) {  
                $scope.debit_total_datewise = 0;  
                $scope.credit_total_datewise = 0;
                if(response.data.opening_balance == null){
                    response.data.opening_balance = 0;
                }
                if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                } 
                if(response.data.opening_debit_balance == null){
                    response.data.opening_debit_balance = 0;
                }             
                $scope.date_wise_lists = response.data;  
                for(var i=0;i<response.data.data.length;i++){
                    $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
                    $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
                } 

                
                $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat($scope.date_wise_lists.opening_debit_balance ); 
                $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat($scope.date_wise_lists.opening_credit_balance );      
                $scope.closing = parseFloat($scope.credit_total_datewise) - parseFloat($scope.debit_total_datewise);
            });
        }
        else if($routeParams.balancesheet_side == 'Asset'){
            getAssetsDatewise({
                month_no: $routeParams.month_no,
                from_date: from_date,
                to_date: to_date,
                ledger_id: $routeParams.ledger_id,
                sub_group_id : $routeParams.sub_group_id,
                type: $routeParams.type,
                ledger_type: $routeParams.ledger_type,
                ledger_name : $routeParams.ledger_name,
                customer_id: $routeParams.id
            }).then(function (response) {  
                $scope.debit_total_datewise = 0;  
                $scope.credit_total_datewise = 0;
                if(response.data.opening_balance == null){
                    response.data.opening_balance = 0;
                }  
                if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                } 
                if(response.data.opening_debit_balance == null){
                    response.data.opening_debit_balance = 0;
                }           
                $scope.date_wise_lists = response.data;  
                for(var i=0;i<response.data.data.length;i++){
                    $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
                    $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
                }     
                $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat($scope.date_wise_lists.opening_debit_balance ); 
                $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat($scope.date_wise_lists.opening_credit_balance );      
                $scope.closing = parseFloat($scope.debit_total_datewise) - parseFloat($scope.credit_total_datewise);
            });
        }
        
        if($routeParams.group_name == 'PURCHASE ACCOUNT' || $routeParams.group_name == 'SALES ACCOUNT'){
            console.log($routeParams.group_name);
            if($routeParams.balancesheet_side == 'Income'){
                getIncomeDatewise({
                    month_no: $routeParams.month_no,
                    from_date: from_date,
                    to_date: to_date,
                    ledger_subgroup_id : $routeParams.subgroup_id,
                    tax_type: $routeParams.tax_type,
                    tax_id : $routeParams.tax_id
                }).then(function (response) {  
                    $scope.debit_total_datewise = 0;  
                    $scope.credit_total_datewise = 0;
                    if(response.data.opening_balance == null){
                        response.data.opening_balance = 0;
                    }            
                    $scope.date_wise_lists = response.data;  
                    for(var i=0;i<response.data.data.length;i++){
                        $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
                        $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
                    } 
                    $scope.closing = parseFloat($scope.credit_total_datewise) - parseFloat($scope.debit_total_datewise);        
                });
            }
    
            else if($routeParams.balancesheet_side == 'Expense'){
                getExpenseDatewise({
                    month_no: $routeParams.month_no,
                    from_date: from_date,
                    to_date: to_date,
                    ledger_subgroup_id : $routeParams.subgroup_id,
                    tax_type: $routeParams.tax_type,
                    tax_id : $routeParams.tax_id
                }).then(function (response) {  
                    $scope.debit_total_datewise = 0;  
                    $scope.credit_total_datewise = 0;
                    if(response.data.opening_balance == null){
                        response.data.opening_balance = 0;
                    } 
                    if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                    } 
                    if(response.data.opening_debit_balance == null){
                        response.data.opening_debit_balance = 0;
                    }             
                    $scope.date_wise_lists = response.data;  
                    for(var i=0;i<response.data.data.length;i++){
                        $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
                        $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
                    }    
                    $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat($scope.date_wise_lists.opening_debit_balance ); 
                    $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat($scope.date_wise_lists.opening_credit_balance );           
                    $scope.closing = parseFloat($scope.debit_total_datewise) - parseFloat($scope.credit_total_datewise);
                });
            }
        }else{
            console.log($routeParams.balancesheet_side);
            getPlDatewise({
                month_no: $routeParams.month_no,
                from_date: from_date,
                to_date: to_date,
                ledger_subgroup_id : $routeParams.subgroup_id,
                ledger_id: $routeParams.ledger_id,
                ledger_name: $routeParams.ledger_name,
                type: $routeParams.balancesheet_side
            }).then(function (response) {  
                $scope.debit_total_datewise = 0;  
                $scope.credit_total_datewise = 0;
                if(response.data.opening_balance == null){
                    response.data.opening_balance = 0;
                }
                if(response.data.opening_debit_balance == null){
                    response.data.opening_debit_balance = 0;
                }
                if(response.data.opening_credit_balance == null){
                    response.data.opening_credit_balance = 0;
                }            
                $scope.date_wise_lists = response.data;  
                for(var i=0;i<response.data.data.length;i++){
                    $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat(response.data.data[i].debit_amount);
                    $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat(response.data.data[i].credit_amount);
                }  
                $scope.debit_total_datewise = parseFloat($scope.debit_total_datewise) + parseFloat($scope.date_wise_lists.opening_debit_balance);
                $scope.credit_total_datewise = parseFloat($scope.credit_total_datewise) + parseFloat($scope.date_wise_lists.opening_credit_balance);
                $scope.closing = $scope.date_wise_lists.total_closing_balance;
                // if($routeParams.balancesheet_side == 'Expense'){
                //     $scope.closing = parseFloat($scope.debit_total_datewise) - parseFloat($scope.credit_total_datewise);
                // }
                // if($routeParams.balancesheet_side == 'Income'){
                //     $scope.closing = parseFloat($scope.credit_total_datewise) - parseFloat($scope.debit_total_datewise);
                // }
            });
        }
        
        
      };
      $scope.onLoadGetAllDateWise();
}]);



