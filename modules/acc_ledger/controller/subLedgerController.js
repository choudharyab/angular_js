var subLedgerModule = angular.module('subLedgerModule',[]);
subLedgerModule.controller('subLedgerController',['$rootScope','$scope','$location','$filter',
    '$routeParams','isSubLedgerAvailable','getSubgroupwiseLedgersForPl',
    function($rootScope,$scope,$location,$filter,$routeParams,isSubLedgerAvailable,getSubgroupwiseLedgersForPl){

      console.log('$routeParams=======',$routeParams);
      console.log('$routeParams.from_date',$routeParams.from_date);

      $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);

      
      $scope.onLoadGetAllSubledger = function(){
        console.log($location.url().split("/")[1]);
        if($location.url().split("/")[1] == 'subledgerwise_for_pl'){
            var from_date = $routeParams.from_date.replace(/-/g, '/');
        var to_date = $routeParams.to_date.replace(/-/g, '/');
        $rootScope.name_of_ledger = $routeParams.subgroup_name;
        getSubgroupwiseLedgersForPl({
            
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

        }else{


        isSubLedgerAvailable({
            from_date:$routeParams.from_date,
            to_date:$routeParams.to_date,
            ledger_id:$routeParams.id            
        }).then(function (response) {  
            if(response.data.code == 200){                
                console.log('calleddddddddddddddddddddddddddddddddddddddddddd');
        $rootScope.sub_ledger_wise_lists = response.data.data;
        $rootScope.sub_ledger_wise_lists.ledger_id =$routeParams.id;
        $rootScope.sub_ledger_wise_lists.from_date =$routeParams.from_date;
        $rootScope.sub_ledger_wise_lists.to_date =$routeParams.to_date;
        console.log(' $rootScope.sub_ledger_wise_lists~~~~~~~~~~~~~~', $rootScope.sub_ledger_wise_lists);
        var sub_ledger_credit_total = 0;
        var sub_ledger_debit_total = 0;
        var sub_ledger_closing_total = 0;
        if($rootScope.sub_ledger_wise_lists.length > 0){
            for(var i=0;i<$rootScope.sub_ledger_wise_lists.length;i++){
                if($rootScope.sub_ledger_wise_lists[i].credit_amount == null){
                    $rootScope.sub_ledger_wise_lists[i].credit_amount = 0;
                } 
                if($rootScope.sub_ledger_wise_lists[i].debit_amount == null){
                    $rootScope.sub_ledger_wise_lists[i].debit_amount = 0;
                }
                sub_ledger_credit_total = (parseFloat(sub_ledger_credit_total) + parseFloat($rootScope.sub_ledger_wise_lists[i].credit_amount)).toFixed(2);
                sub_ledger_debit_total = (parseFloat(sub_ledger_debit_total) + parseFloat($rootScope.sub_ledger_wise_lists[i].debit_amount)).toFixed(2);
                sub_ledger_closing_total = (parseFloat(sub_ledger_closing_total) + parseFloat($rootScope.sub_ledger_wise_lists[i].closing_balance)).toFixed(2);
            }
            $rootScope.sub_ledger_credit_total = sub_ledger_credit_total;
            $rootScope.sub_ledger_debit_total = sub_ledger_debit_total;
            $rootScope.sub_ledger_closing_total = sub_ledger_closing_total;
        }else{
            $rootScope.sub_ledger_credit_total = sub_ledger_credit_total;
            $rootScope.sub_ledger_debit_total = sub_ledger_debit_total;
            $rootScope.sub_ledger_closing_total = sub_ledger_closing_total;
        } 
            }else{
               
            }
        },function (res) {
           
        });      
      }
  };
      $scope.onLoadGetAllSubledger();


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
        console.log(led_name);
        if(led_name == undefined){
            led_name = 0;
        }
        console.log(subgroup_id);
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
        $location.path('/detailsmonthwisee/'+ from_date + '/' + to_date +'/'+ ledger_id + '/' + type + '/' + subgroup_id + '/' + led_name + '/' + ledger_type + '/' + balancesheet_side + '/' + id); 
    };
     
}]);



