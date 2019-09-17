var accProfitLossModule = angular.module('accProfitLossModule',[]);
accProfitLossModule.controller('accProfitLossController',['$rootScope','$scope','$location','getWarehouseListService1','getProfitAndLossSheetData1',function($rootScope,$scope,$location,getWarehouseListService1,getProfitAndLossSheetData1){

    var sale_acc_total,direct_income_total,closing_stock_total,opening_stock_total,purchase_acc_total,direct_expenses_total,indirect_income_total,gross_profit,total_gross_profit,final_total;
    
   
      $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);

    $scope.view_type = 'Compacted';
    $scope.change_view_type = function(){
        if($scope.view_type == 'Compacted'){
            console.log('iff');
            $('.type tr:not(:first-child)').hide();           
           // $('.type tr:not(:first-child)').next('tr').show();
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
    $scope.change_view_type();  

    /*$scope.change_view_type = function(){
        if($scope.view_type == 'Compacted'){
            $('.type tr:not(:first-child)').hide();
            $('.first_row').removeClass('bgcolor');
        }else{
            $('.type tr:not(:first-child)').show();
            $('.first_row').addClass('bgcolor');
        }
    };*/

    $scope.debit_details = [];
    $scope.debit_details_total_amount = 0;
    $scope.credit_details = [];
    $scope.credit_details_total_amount = 0;
    $scope.onLoadGetProfitAndLossSheetData = function(){
        getProfitAndLossSheetData1({}).then(function (response) {           
           $scope.credit_details_arr = [];         
           for(var i=0;i<response.data.income.length;i++){
                    $scope.credit_details_obj = {};
                    $scope.credit_details_obj.id = response.data.income[i].id;
                    $scope.credit_details_obj.group_name = response.data.income[i].ledger_group_name;
                    if(response.data.income[i].total_amount == null){
                        response.data.income[i].total_amount = 0;
                    }
                    $scope.credit_details_obj.amt = response.data.income[i].total_amount;
                    if(response.data.income[i].total_amount != null){
                        $scope.credit_details_total_amount = (parseFloat($scope.credit_details_total_amount) + parseFloat(response.data.income[i].total_amount) );
                    }
                  
                    $scope.credit_details_ledger_arr = [];
                    for(var j=0;j<response.data.income[i].subgroup.length;j++){
                            $scope.credit_details_ledger_obj = {};
                            $scope.credit_details_ledger_obj.id = response.data.income[i].subgroup[j].id;
                            $scope.credit_details_ledger_obj.subgroup_name = response.data.income[i].subgroup[j].subgroup_name;
                            $scope.credit_details_ledger_obj.amount = response.data.income[i].subgroup[j].total_amount;
                            $scope.credit_details_ledger_obj.tax_type = response.data.income[i].subgroup[j].tax_type;
                            $scope.credit_details_ledger_obj.tax_id = response.data.income[i].subgroup[j].tax_id;
                            $scope.credit_details_ledger_obj.sub_ledger_arr = response.data.income[i].subgroup[j].ledger;
                            $scope.credit_details_ledger_arr.push($scope.credit_details_ledger_obj); 
                    }
                    $scope.credit_details_obj.ledger_arr = $scope.credit_details_ledger_arr;  
                    $scope.credit_details_arr.push($scope.credit_details_obj);            
           }
           $scope.credit_details =  $scope.credit_details_arr; 

           $scope.debit_details_arr = [];          
           for(var k=0;k<response.data.expense.length;k++){
                    $scope.debit_details_obj = {};
                    $scope.debit_details_obj.id = response.data.expense[k].id;
                    $scope.debit_details_obj.group_name = response.data.expense[k].ledger_group_name;
                    if(response.data.expense[k].total_amount == null){
                        response.data.expense[k].total_amount = 0;
                    }
                    $scope.debit_details_obj.amt = response.data.expense[k].total_amount;
                    if(response.data.expense[k].total_amount != null){
                        $scope.debit_details_total_amount = (parseFloat($scope.debit_details_total_amount) + parseFloat(response.data.expense[k].total_amount));
                    }
                    $scope.debit_details_ledger_arr = [];
                    for(var l=0;l<response.data.expense[k].subgroup.length;l++){
                            $scope.debit_details_ledger_obj = {};
                            $scope.debit_details_ledger_obj.id = response.data.expense[k].subgroup[l].id;
                            $scope.debit_details_ledger_obj.subgroup_name = response.data.expense[k].subgroup[l].subgroup_name;
                            $scope.debit_details_ledger_obj.amount = response.data.expense[k].subgroup[l].total_amount;
                            $scope.debit_details_ledger_obj.tax_type = response.data.expense[k].subgroup[l].tax_type;
                            $scope.debit_details_ledger_obj.tax_id = response.data.expense[k].subgroup[l].tax_id;
                            $scope.debit_details_ledger_obj.sub_ledger_arr = response.data.expense[k].subgroup[l].ledger;
                            $scope.debit_details_ledger_arr.push($scope.debit_details_ledger_obj); 
                    }
                    $scope.debit_details_obj.ledger_arr = $scope.debit_details_ledger_arr;  
                    $scope.debit_details_arr.push($scope.debit_details_obj);            
           }
           $scope.debit_details =  $scope.debit_details_arr;      
           console.log($scope.debit_details);
           console.log($scope.credit_details);    
        });
    };
    $scope.onLoadGetProfitAndLossSheetData();

    $scope.get_month_wise_details_for_pl = function(subgroup_id,ledger_id,ledger_name,subgroup_name,tax_type,tax_id,profitloss_side,group_name){
        console.log(tax_type);
        console.log(tax_id);
        console.log(ledger_id);
        console.log(ledger_name);
        if(tax_type == undefined || tax_type == ''){
            var tax_type = 0;
        }
        if(tax_id == undefined || tax_id == ''){
            var tax_id = 0;
        }
        var from_date = $rootScope.from_date.replace(/\//g, '-');
        var to_date = $rootScope.to_date.replace(/\//g, '-');  
        $location.path('/detailsmonthwiseforpl/'+ from_date + '/' + to_date +'/'+ subgroup_id +'/'+ ledger_id +'/'+ledger_name+'/' + tax_type + '/' + tax_id + '/' + profitloss_side + '/' + group_name); 
    };

    $scope.calculate_debit_total = function(){
        var debit_total = 0;
        if( $scope.debit_details.length > 0 ){
            for(var i=0;i< $scope.debit_details.length;i++){
                if($scope.debit_details[i].amt == null){
                    $scope.debit_details[i].amt = 0;
                }
                debit_total = (parseFloat(debit_total) + parseFloat($scope.debit_details[i].amt)).toFixed(2);
            }
            return debit_total;
        }else{
            return debit_total;
        }
    };

    $scope.calculate_credit_total = function(){
        var credit_total = 0;
        if( $scope.credit_details.length > 0 ){
            for(var i=0;i< $scope.credit_details.length;i++){
                if($scope.credit_details[i].amt == null){
                    $scope.credit_details[i].amt = 0;
                }
                credit_total = (parseFloat(credit_total) + parseFloat($scope.credit_details[i].amt)).toFixed(2);
            }
            return credit_total;
        }else{
            return credit_total;
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

    getWarehouseListService1({}).then(function (response) {
        $scope.warehouse_list = response.data;
    });

    $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();

    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date = '01'+'/04/'+ $scope.finance_year;
    $rootScope.to_date = moment().format("DD/MM/YYYY");

    $scope.get_wh = function () {
        $rootScope.warehouse_id = $scope.warehouse_id;
    };

    $scope.get_subgroup_wise_ledger_for_pl = function(subgroup_id,subgroup_name,type){
        console.log(subgroup_id);
        console.log(subgroup_name);
        console.log(type);
        var from_date = $rootScope.from_date.replace(/\//g, '-');
        var to_date = $rootScope.to_date.replace(/\//g, '-');
        $location.path('/subledgerwise_for_pl/'+from_date+'/'+to_date+'/'+subgroup_id+'/'+subgroup_name+'/'+type);

    }

}]);



