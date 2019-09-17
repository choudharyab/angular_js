var account_ledger = angular.module('accountLedgerModule',[]);
account_ledger.controller('accountLedgerController',['$rootScope','$scope','$location','$filter','getAccLedgerGroupListService','saveLedgerGroupService','getAccLedgerListService','getAccLedgerByIdService','updateLedgerGroupService','deleteAccLedgerByIdService','saveGroupDetails','getGroupDetails','updateGroupDetails','deleteGroupDetails','getDateWiseDetails',
'getMonthWiseDetails','saveSubLedgerDetails','getSubLedgerLists','deleteSubLedgerDetails','updateSubLedgerDetails','getSubLedgerMonthWiseDetails','isSubLedgerAvailable','getTdsRateChartService','getTaxRateService','getStateListService','saveNewLedgerGroupService',function($rootScope,$scope,$location,$filter,getAccLedgerGroupListService,saveLedgerGroupService,getAccLedgerListService,getAccLedgerByIdService,updateLedgerGroupService,deleteAccLedgerByIdService,saveGroupDetails,getGroupDetails,updateGroupDetails,deleteGroupDetails,getDateWiseDetails,getMonthWiseDetails,saveSubLedgerDetails,getSubLedgerLists,deleteSubLedgerDetails,updateSubLedgerDetails,getSubLedgerMonthWiseDetails,isSubLedgerAvailable,getTdsRateChartService,getTaxRateService,getStateListService,saveNewLedgerGroupService){
	
	$scope.active_lable = false;	
    var selected_ledger_id;
    $scope.show_save_grp = true;
    $scope.show_edit_grp = false;
    $scope.group_name = '';
    $scope.type = '';
    $scope.subtype = '';
    $scope.group_details = '';    
     $scope.showGst = false;
     $scope.showTds = false;
   $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();
    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date =  '01'+'/04/' + $scope.finance_year;
    $rootScope.to_date = '31' +'/03/'+ parseInt($scope.finance_year+1);
     $scope.add_ledger_info = {'depot_address':[],'contacts':[],'details':{'gst_applicable':'No','tds_applicable':'No'}};
      $scope.add_ledger_info.details.country = 'India';
 $scope.supplier_title = 'Add New Ledger';

    $scope.$on('handleMonthlyDetails', function(events, monthly_details) {
        $rootScope.month_wise_lists = monthly_details;        
        var debit_amount_total = 0;
        var credit_amount_total = 0;
        var closing_balance_total = 0;
        if( $rootScope.month_wise_lists.details.length > 0 ){
            for(var i=0;i< $rootScope.month_wise_lists.details.length;i++){
                debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($rootScope.month_wise_lists.details[i].debit_amount)).toFixed(2);
                credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($rootScope.month_wise_lists.details[i].credit_amount)).toFixed(2);
                closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($rootScope.month_wise_lists.details[i].closing_balance)).toFixed(2);
            }   
            $rootScope.debit_amount_total = debit_amount_total;  
            $rootScope.credit_amount_total = credit_amount_total;
            $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($rootScope.month_wise_lists.opening_balance)).toFixed(2); 
        }else{
            $rootScope.debit_amount_total = debit_amount_total;  
            $rootScope.credit_amount_total = credit_amount_total;
            $rootScope.closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($rootScope.month_wise_lists.opening_balance)).toFixed(2); 
        }         
    });

    $scope.$on('handleDailyDetails', function(events, daily_details) {
        $rootScope.date_wise_lists = daily_details;       
    });

    $scope.$on('handleSubLedgerDetails', function(events, sub_ledger_details) {
        $rootScope.sub_ledger_wise_lists = sub_ledger_details;
        console.log(' $rootScope.sub_ledger_wise_lists =============', $rootScope.sub_ledger_wise_lists);
        var sub_ledger_credit_total = 0;
        var sub_ledger_debit_total = 0;
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
            }
            $rootScope.sub_ledger_credit_total = sub_ledger_credit_total;
            $rootScope.sub_ledger_debit_total = sub_ledger_debit_total;
        }else{
            $rootScope.sub_ledger_credit_total = sub_ledger_credit_total;
            $rootScope.sub_ledger_debit_total = sub_ledger_debit_total;
        }       
    });

    $scope.getDateWiseDetails = function(month_no,from_date,to_date,ledger_id,sub_ledger_user_id,type){  
        $location.path('/detailssdatewise');      
        getDateWiseDetails({
            month_no: month_no,
            from_date: from_date,
            to_date: to_date,
            ledger_id: ledger_id,
            sub_ledger_user_id : sub_ledger_user_id,
            type: type
        }).then(function (response) {
            $scope.daily_details = response.data;   
            $rootScope.$broadcast('handleDailyDetails',$scope.daily_details);                
        });
    };

    $scope.calculate_debit_amount_total = function(){
        var debit_amount_total = 0;
        if( $rootScope.month_wise_lists.details.length > 0 ){
            for(var i=0;i< $rootScope.month_wise_lists.details.length;i++){
                debit_amount_total = (parseFloat(debit_amount_total) + parseFloat($rootScope.month_wise_lists.details[i].debit_amount)).toFixed(2);
            }
            return debit_amount_total;
        }else{
            return  debit_amount_total;
        }
    };

    $scope.calculate_credit_amount_total = function(){
        var credit_amount_total = 0;
        if( $rootScope.month_wise_lists.details.length > 0 ){
            for(var i=0;i< $rootScope.month_wise_lists.details.length;i++){
                credit_amount_total = (parseFloat(credit_amount_total) + parseFloat($rootScope.month_wise_lists.details[i].credit_amount)).toFixed(2);
            }
            return credit_amount_total;
        }else{
            return credit_amount_total;
        }
    };

    $scope.calculate_closing_balance_total = function(){
        var closing_balance_total = 0;
        if( $rootScope.month_wise_lists.details.length > 0 ){
            for(var i=0;i< $rootScope.month_wise_lists.details.length;i++){
                closing_balance_total = (parseFloat(closing_balance_total) + parseFloat($rootScope.month_wise_lists.details[i].closing_balance)).toFixed(2);
            }
            return (parseFloat(closing_balance_total) + parseFloat($rootScope.month_wise_lists.opening_balance)).toFixed(2);
        }else{
            return (parseFloat(closing_balance_total) + parseFloat($rootScope.month_wise_lists.opening_balance)).toFixed(2);
        }
    };

    $scope.calculate_debit_amount = function(){
        var debit_amount = 0;
        if(  $rootScope.date_wise_lists.length > 0 ){
            for(var i=0;i<  $rootScope.date_wise_lists.length;i++){
                debit_amount = (parseFloat(debit_amount) + parseFloat( $rootScope.date_wise_lists[i].debit_amount)).toFixed(2);
            }
            return debit_amount;
        }else{
            return  debit_amount;
        }
    };

    $scope.calculate_credit_amount = function(){
        var credit_amount = 0;
        if(  $rootScope.date_wise_lists.length > 0 ){
            for(var i=0;i<  $rootScope.date_wise_lists.length;i++){
                credit_amount = (parseFloat(credit_amount) + parseFloat( $rootScope.date_wise_lists[i].credit_amount)).toFixed(2);
            }
            return credit_amount;
        }else{
            return  credit_amount;
        }
    };

    $scope.finance_year = new Date().getFullYear();
    $scope.current_month = new Date().getMonth();

    if($scope.current_month<3){
        $scope.finance_year--;
    }
    $scope.current_month++;
    $rootScope.from_date = '01'+'/04/'+ $scope.finance_year;
    $rootScope.to_date = moment().format("DD/MM/YYYY");

    // $scope.get_month_wise_details = function(id){
    //     console.log('ttttttttttttttttttttttttttttttttttttttttttttt');
    //     getMonthWiseDetails({
    //         from_date:$rootScope.from_date,
    //         to_date:$rootScope.to_date,
    //         ledger_id: id
    //     }).then(function (response) {
    //         $scope.monthly_details = response.data;
    //         $scope.monthly_details.from_date = $rootScope.from_date;
    //         $scope.monthly_details.to_date = $rootScope.to_date;
    //         $scope.monthly_details.ledger_id = id;
    //         $rootScope.$broadcast('handleMonthlyDetails',$scope.monthly_details);          
    //     });

    // };

    $scope.get_month_wise_details = function(id,ledger_name){
        if(ledger_name == 'SUNDRY CREDITORS'){
            $location.path('/subledgerwise'); 
            getMonthWiseDetails({
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                ledger_id: id,
                type: 'SUNDRY CREDITORS'
            }).then(function (response) {              
                $scope.supplier_details = response.data;
                $scope.supplier_details.from_date = $rootScope.from_date;
                $scope.supplier_details.to_date = $rootScope.to_date;
                $scope.supplier_details.ledger_id = id; 
                $scope.supplier_details.type = 'SUNDRY CREDITORS';             
                $rootScope.$broadcast('handleSubLedgerDetails',$scope.supplier_details);  
            });
        }else if(ledger_name == 'SUNDRY DEBTORS'){
            $location.path('/subledgerwise'); 
            getMonthWiseDetails({
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                ledger_id: id,
                type: 'SUNDRY DEBTORS'
            }).then(function (response) {               
                $scope.customer_details = response.data;
                $scope.customer_details.from_date = $rootScope.from_date;
                $scope.customer_details.to_date = $rootScope.to_date;
                $scope.customer_details.ledger_id = id;
                $scope.customer_details.type = 'SUNDRY DEBTORS';
                $rootScope.$broadcast('handleSubLedgerDetails',$scope.customer_details); 
            });
        }else{
            isSubLedgerAvailable({
                sub_ledger_id:'',
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                ledger_id: id,
                type: ''
            }).then(function (response) {               
                if(response.data.code == 200){
                    $location.path('/subledgerwise'); 
                    $scope.other_details = response.data.data;
                    $scope.other_details.from_date = $rootScope.from_date;
                    $scope.other_details.to_date = $rootScope.to_date;
                    $scope.other_details.ledger_id = id;
                    $scope.other_details.type = '';
                    $rootScope.$broadcast('handleSubLedgerDetails',$scope.other_details); 
                }else{
                    $location.path('/detailsmonthwise');
                    getMonthWiseDetails({
                        sub_ledger_id:'',
                        from_date:$rootScope.from_date,
                        to_date:$rootScope.to_date,
                        ledger_id: id,
                        type: ''
                    }).then(function (response) {               
                        $scope.monthly_details = response.data;
                        $scope.monthly_details.from_date = $rootScope.from_date;
                        $scope.monthly_details.to_date = $rootScope.to_date;
                        $scope.monthly_details.ledger_id = id;
                        $scope.monthly_details.sub_ledger_user_id = '';
                        $scope.monthly_details.type = '';
                        $rootScope.$broadcast('handleMonthlyDetails',$scope.monthly_details);          
                    });
                }
            },function (res) {
                $location.path('/detailsmonthwise');
                getMonthWiseDetails({
                    sub_ledger_id:'',
                    from_date:$rootScope.from_date,
                    to_date:$rootScope.to_date,
                    ledger_id: id,
                    type: ''
                }).then(function (response) {               
                    $scope.monthly_details = response.data;
                    $scope.monthly_details.from_date = $rootScope.from_date;
                    $scope.monthly_details.to_date = $rootScope.to_date;
                    $scope.monthly_details.ledger_id = id;
                    $scope.monthly_details.sub_ledger_user_id = '';
                    $scope.monthly_details.type = '';
                    $rootScope.$broadcast('handleMonthlyDetails',$scope.monthly_details);          
                });
            });
          /*  $location.path('/detailsmonthwise');
            getMonthWiseDetails({
                sub_ledger_id:'',
                from_date:$rootScope.from_date,
                to_date:$rootScope.to_date,
                ledger_id: id,
                type: ''
            }).then(function (response) {               
                $scope.monthly_details = response.data;
                $scope.monthly_details.from_date = $rootScope.from_date;
                $scope.monthly_details.to_date = $rootScope.to_date;
                $scope.monthly_details.ledger_id = id;
                $scope.monthly_details.sub_ledger_user_id = '';
                $scope.monthly_details.type = '';
                $rootScope.$broadcast('handleMonthlyDetails',$scope.monthly_details);          
            });*/
        }       
    };

    $scope.get_sub_ledger_month_wise_details = function(sub_ledger_user_id,from_date,ledger_id,to_date,type){
        $location.path('/detailsmonthwise');
        getSubLedgerMonthWiseDetails({
            sub_ledger_id:sub_ledger_user_id,
            from_date:$rootScope.from_date,
            to_date:$rootScope.to_date,
            ledger_id: ledger_id,
            type: type
        }).then(function (response) {
            $scope.monthly_details = response.data;
            $scope.monthly_details.from_date = $rootScope.from_date;
            $scope.monthly_details.to_date = $rootScope.to_date;
            $scope.monthly_details.ledger_id = ledger_id;
            $scope.monthly_details.sub_ledger_user_id = sub_ledger_user_id;
            $scope.monthly_details.type = type;
            $rootScope.$broadcast('handleMonthlyDetails',$scope.monthly_details);          
        });
    };

    $scope.clear_grp_modal = function(){      
        $scope.show_save_grp = true;
        $scope.show_edit_grp = false;
        $scope.group_name = '';
        $scope.type = '';
        $scope.subtype = '';
        $scope.group_details = '';
        $scope.onLoadGetAllGroupLists();
    };


    $scope.clear_sub_ledger_modal_data = function(){
        $scope.show_save_sub_ledger = true;
        $scope.show_edit_sub_ledger  = false;
        $scope.sub_ledger_date = $filter('date')(new Date(), 'dd/MM/yyyy');
        $scope.onLoadGetSubLedgerLists();
    };

    $scope.onLoadGetSubLedgerLists = function(){
        getSubLedgerLists({}).then(function (response) {
            $scope.sub_ledger_lists = response.data;
         });
    };
    $scope.onLoadGetSubLedgerLists();

    $scope.save_sub_ledger_details = function(){
        saveSubLedgerDetails({
            'ledger_date':$scope.sub_ledger_date,
            'ledger_name':$scope.sub_ledger_name,
            'ledger_subgroup_id':$scope.ledger_id,
            'opening_balance':$scope.opening_balance,
            'amount_mode': $scope.amount_mode
        }).then(function (response) {
            $scope.sub_ledger_date = '';
            $scope.sub_ledger_name = '';
            $scope.ledger_id = '';
            $scope.opening_balance = '';
            $scope.amount_mode = '';
            $('#example4').modal('hide');
            $scope.onLoadGetSubLedgerLists();
            $('#add_sub_ledger_detail_success').fadeIn().delay(5000).fadeOut();
            $scope.add_sub_ledger_detail_success = JSON.parse(response.data);
           
        });
    };

    $scope.edit_sub_ledger_details = function(ind){
        $scope.show_save_sub_ledger = false;
        $scope.show_edit_sub_ledger  = true;
        $scope.subledger_id = $scope.sub_ledger_lists[ind].id;
        $scope.sub_ledger_name= $scope.sub_ledger_lists[ind].ledger_name;
        $scope.ledger_id = $scope.sub_ledger_lists[ind].ledger_subgroup_id; 
        $scope.opening_balance = $scope.sub_ledger_lists[ind].opening_balance; 
        $scope.amount_mode = $scope.sub_ledger_lists[ind].amount_mode; 
    };

    $scope.update_sub_ledger_details = function(){
        updateSubLedgerDetails({
            'ledger_id':$scope.subledger_id,            
            'ledger_name':$scope.sub_ledger_name,
            'ledger_subgroup_id':$scope.ledger_id,
            'opening_balance':$scope.opening_balance,
            'amount_mode' : $scope.amount_mode
        }).then(function (response) {
            $scope.sub_ledger_date = '';
            $scope.sub_ledger_name = '';
            $scope.ledger_id = '';
            $scope.opening_balance = '';
            $scope.amount_mode = '';
            $scope.onLoadGetSubLedgerLists();
            $('#example4').modal('hide');
            $('#add_sub_ledger_detail_success').fadeIn().delay(5000).fadeOut();
            $scope.add_sub_ledger_detail_success = JSON.parse(response.data);
            $scope.show_save_sub_ledger = true;
            $scope.show_edit_sub_ledger  = false;           
        });
    };

    $scope.delete_sub_ledger_details = function(id){
        deleteSubLedgerDetails({
           'ledger_id':id
        }).then(function (response) {
            $scope.onLoadGetSubLedgerLists();
            $('#add_sub_ledger_detail_success').fadeIn().delay(5000).fadeOut();
            $scope.add_sub_ledger_detail_success = JSON.parse(response.data);           
        });
    };

    $scope.select_type = function(){
        if($scope.type == 'Balance Sheet'){
            $scope.sub_types = ['Liability','Assets'];
        }else if($scope.type == 'Profit_N_Loss'){
            $scope.sub_types = ['Debit','Credit'];
        }else{
            $scope.sub_types = '';
        }
    };

    $scope.save_group_details = function(){
        saveGroupDetails({
            'group_name':$scope.group_name,
            'type':$scope.type,
            'subtype':$scope.subtype
        }).then(function (response) {
            $scope.group_name = '';
            $scope.type = '';
            $scope.subtype = '';
            $scope.onLoadGetAllGroupLists();
            $('#add_group_detail_success').fadeIn().delay(5000).fadeOut();
            $scope.add_group_detail_success = JSON.parse(response.data);           
        });
    };

    $scope.enterPressedForLedger = function(){       
        if($scope.show_save == true){
            console.log('save called');
            $scope.save_ledger();

        }else if($scope.show_save == false){
            console.log('update called');
            $scope.update_ledger();
        }
    };

    $scope.enterPressedForGroup = function(){       
        if($scope.show_save_grp == true){
            console.log('save called');
            $scope.save_group_details();

        }else if($scope.show_save_grp == false){
            console.log('update called');
            $scope.update_group_details();
        }
    };

    $scope.onLoadGetAllGroupLists = function(){
        getGroupDetails({}).then(function (response) {
           $scope.group_details = response.data;
        });
    };

    $scope.edit_group_details = function(ind){
        $scope.show_save_grp = false;
        $scope.show_edit_grp = true;
        $scope.edit_id = $scope.group_details[ind].id;
        $scope.group_name = $scope.group_details[ind].ledger_group_name;
        $scope.type = $scope.group_details[ind].type;
        if($scope.type == 'Balance Sheet'){
            $scope.sub_types = ['Liability','Assets'];
        }else if($scope.type == 'Profit_N_Loss'){
            $scope.sub_types = ['Debit','Credit'];
        }else{
            $scope.sub_types = '';
        }
        $scope.subtype = $scope.group_details[ind].subtype;
    };

    $scope.update_group_details = function(){
        updateGroupDetails({
            'id':$scope.edit_id,
            'group_name':$scope.group_name,
            'type':$scope.type,
            'subtype':$scope.subtype
        }).then(function (response) {
            $scope.group_name = '';
            $scope.type = '';
            $scope.subtype = '';
            $('#add_group_detail_success').fadeIn().delay(5000).fadeOut();
            $scope.add_group_detail_success = JSON.parse(response.data);
            $scope.onLoadGetAllGroupLists();
            $scope.show_save_grp = true;
            $scope.show_edit_grp = false;
        });
    };

    $scope.delete_group_details = function(id){
        deleteGroupDetails({
            id:id
        }).then(function (response) {
            $('#add_group_detail_success').fadeIn().delay(5000).fadeOut();
            $scope.add_group_detail_success = JSON.parse(response.data);
            $scope.onLoadGetAllGroupLists();
         });
    };

    $scope.clear_modal_data = function(){
        $scope.ledger_date = $filter('date')(new Date(), 'dd/MM/yyyy');
        $scope.ledger_group_list();
        // $scope.ledgerTypeList = [{'ledger_type':'Ledger'},{'ledger_type':'Group'}];
        // $scope.acc_ledger_type = 'Ledger';
        $scope.show_edit = false;
        $scope.show_save = true;
    }

	// $scope.ledger_group_list = function () {
 //        getAccLedgerGroupListService({}).then(function (response) {
 //            $scope.ledgerGroupList = response.data;
 //        })
 //    };
    
    $scope.save_ledger = function () {
        saveLedgerGroupService({
            ledger_name:$scope.ledger_name,
            ledger_group_id:$scope.ledger_group_id,
            // ledger_type:$scope.acc_ledger_type,
            //opening_balance:$scope.opening_balance,
            ledger_date: $scope.ledger_date
        }).then(function (resp) {
            $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
            $scope.led_success = JSON.parse(resp.data);
            $scope.dismiss();
            $scope.ledger_list();
            $scope.ledger_name = '';
            $scope.ledger_group_id = '';
            // $scope.acc_ledger_type = 'Ledger';
            $scope.opening_balance = '';
            $scope.ledger_date = '';
        })
    };
    $scope.ledger_list = function () {
        getAccLedgerListService({}).then(function (res) {
            $scope.ledgerList = res.data;
        })
    };
    $scope.ledger_list();

    $scope.edit_ledger = function (ledger_id) {
        $scope.ledger_group_list();
        // $scope.ledgerTypeList = [{'ledger_type':'Ledger'},{'ledger_type':'Group'}];
        selected_ledger_id = ledger_id;
        getAccLedgerByIdService({id:ledger_id}).then(function (res) {
            console.log(res);
            $scope.edit_ledger_data = res.data[0];
            $scope.ledger_name = res.data[0].subgroup_name;
            // $scope.acc_ledger_type = res.data[0].ledger_type;
            $scope.ledger_group_id = res.data[0].ledger_group_id;
            $scope.ledger_date = res.data[0].ledger_date_new;
            $scope.opening_balance = res.data[0].opening_balance;
            $scope.show_edit = true;
            $scope.show_save = false;
		   $scope.active_lable = true;
        });
    };

    $scope.update_ledger = function () {
        updateLedgerGroupService({
            id:selected_ledger_id,
            ledger_name:$scope.ledger_name,
            ledger_group_id:$scope.ledger_group_id,
            // ledger_type:$scope.acc_ledger_type,
            opening_balance:$scope.opening_balance,
            ledger_date: $scope.ledger_date
        }).then(function (res) {
            $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
            $scope.led_success = JSON.parse(res.data);
            $scope.dismiss();
            $scope.ledger_list();
            $scope.ledger_name = '';
            $scope.ledger_group_id = '';
            // $scope.acc_ledger_type = 'Ledger';
            $scope.opening_balance = '';
            $scope.ledger_date = '';
            $scope.show_edit = false;
            $scope.show_save = true;
        })
    };

    $scope.deleteLedgerById = function (led_id) {
        deleteAccLedgerByIdService({id:led_id}).then(function (res) {
            $scope.ledger_list();
            $('#ledger_delete_success').fadeIn().delay(5000).fadeOut();
            $scope.led_del_success = JSON.parse(res.data);
        },function (res) {
            console.log(res);
        })
    };

    /***********************created By Anup Choudhary**************************************************/
    $scope.ledger_group_list = function () {
        getAccLedgerGroupListService({}).then(function (response) {
            $scope.ledgerGroupList = response.data;
        })
    };
    $scope.ledger_group_list();
    $scope.get_state_list = function () {
        getStateListService({}).then(function (response) {
            $scope.state_list = response.data;
        });
    };
    
     $scope.get_tax_rate_list = function () {
        getTaxRateService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tax_rate_list = resposne.data;
        });
    };
     $scope.get_tds_rate_list = function () {
        getTdsRateChartService({}).then(function (resposne) {
            console.log(resposne);
            $scope.tds_rate_chart_list = resposne.data;
        });
    };
   
$scope.get_state_list();
$scope.get_tds_rate_list();
$scope.get_tax_rate_list();
$scope.add_ledger_info.details.ledger_type ='Ledger';
     $scope.add_ledger_buttton = function () {

      $scope.add_ledger_info.details.gst_applicable ='No';
       $scope.add_ledger_info.details.tds_applicable ='No';
        $scope.add_ledger_info.details.hsn_code='';
        $scope.add_ledger_info.details.sac_code='';
        $scope.add_ledger_info.details.gst_rate_id='';
        
          $scope.get_state_list();

          $scope.get_tds_rate_list();
          $scope.add_ledger_info.details.ledger_type ='Ledger';
          $scope.dismiss();
          $route.reload();

           
    };
    
    $scope.add_more_address = function () {
        $scope.add_ledger_info.depot_address.push({'address_name':'','street_address':'','city':'','state_id':'','pincode':'','country':''});
    };
    $scope.remove_address=function (index) {
        $scope.add_ledger_info.depot_address.splice(index,1);
    };
    $scope.add_more_contact = function () {
        $scope.add_ledger_info.contacts.push({'full_name':'','designation':'','designation':'','email':'','website':'','office_phone':'','mobile_number':'','fax_number':'','alternet_mobile_no':'','skype_id':'','location':''});
    };
    $scope.remove_contact=function (index) {
        $scope.add_ledger_info.contacts.splice(index,1);
    };
    
    
    
    $scope.getnpdetails = function () {
        getTdsRateChartDetailsService({
            np_id:$scope.add_ledger_info.details.tds_nature_of_payment,
            }).then(function (resposne) {
            console.log(resposne);
            $scope.tds_rate_chart_details = resposne.data;
            $scope.individual_rate = resposne.data.individual_rate;
            $scope.company_firm_rate = resposne.data.company_firm_rate;
            $scope.add_ledger_info.details.section_code = resposne.data.section_code;
            $scope.add_ledger_info.details.tds_rate = '';
            $scope.add_ledger_info.details.tds_deductive_type = '';
           
        });
    };
    $scope.get_tds_deductive_type = function () {
        
        if($scope.add_ledger_info.details.tds_deductive_type == 'Individuals' )
        {
            $scope.add_ledger_info.details.tds_rate  = $scope.individual_rate;
        }else{
            $scope.add_ledger_info.details.tds_rate  = $scope.company_firm_rate;
        }
       
    };
     $scope.checkGST = function () {
         
         if($scope.add_ledger_info.details.gst_applicable == 'Yes')
         {
             $scope.showGst = true;
         }else{
             $scope.showGst = false;
         }
           
    };
     $scope.checkTds = function () {
         if($scope.add_ledger_info.details.tds_applicable == 'Yes')
         {
             $scope.showTds = true;
         }else{
             $scope.showTds = false;
         }
      
      };
     //  $scope.ledgerTypeList = [{'ledger_type':'Ledger'},{'ledger_type':'Group'}];
    $scope.acc_ledger_type = 'Group';

    $scope.save_ledger = function () {
        saveLedgerGroupService({
            ledger_name:$scope.ledger_name,
            ledger_group_id:$scope.ledger_group_id,
            ledger_type:$scope.acc_ledger_type,
            opening_balance:$scope.opening_balance
        }).then(function (resp) {
        	 $('#example6').modal('hide');
            $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
            $scope.led_success = JSON.parse(resp.data);
            $scope.ledger_list();
             $scope.ledger_group_list();
            $scope.ledger_name = '';
            $scope.ledger_group_id = '';
            $scope.acc_ledger_type = 'Ledger';
        })
    };
     $scope.ShowTab = function(tabname){
        $('#' + tabname).tab('show');
    };
    $scope.save_new_ledger = function () {
        saveNewLedgerGroupService({
            ledger_data:$scope.add_ledger_info,
        
        }).then(function (resp) {
            if(resp.data.results > 0){
                 $('#example6').modal('hide');
               $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
              
            }
               $scope.led_success = resp.data.message;
            $scope.ledger_list();
             $scope.ledger_group_list();
              $scope.add_ledger_info = {'depot_address':[],'contacts':[],'details':{'gst_applicable':'No','tds_applicable':'No'}};
           // $scope.ledger_name = '';
           // $scope.ledger_group_id = '';
           // $scope.acc_ledger_type = 'Ledger';
        })
    };



    $scope.ledger_list = function () {
        getAccLedgerListService({}).then(function (res) {
            $scope.ledgerList = res.data;
        })
    };
    $scope.ledger_list();

    $scope.getSubLedgerLists = function () {
        getSubLedgerLists({}).then(function (res) {
            $scope.ledgerList1 = res.data;
        })
    };
    $scope.getSubLedgerLists();


     $scope.ledger_details_by_id = function (ledger_id) {
         $scope.get_tax_rate_list();
          $scope.get_state_list();
          $scope.get_tds_rate_list(); 
       $scope.ledger_id= ledger_id;
 
      getAccLedgerDetailsByIdService({ledger_id:$scope.ledger_id}).then(function (res) {
            console.log(res);
            $scope.add_ledger_info.details = res.data.ledgers;
            $scope.add_ledger_info.depot_address = res.data.depot_address;
console.log($scope.add_ledger_info.depot_address);
            $scope.add_ledger_info.contacts = res.data.contacts;
           if($scope.add_ledger_info.details.gst_applicable == 'Yes')
             {
                 $scope.showGst = true;
             }
            if($scope.add_ledger_info.details.tds_applicable == 'Yes')
             {
                 $scope.showTds = true;
             }
            $scope.show_edit = true;
            $scope.show_save = true;

        });

           
    };
    $scope.update_new_ledger = function () {
        updateNewLedgerGroupService({
            ledger_data:$scope.add_ledger_info,
            ledger_id:$scope.ledger_id,
        
        }).then(function (resp) {
            if(resp.data.results > 0){
                 $('#example2').modal('hide');
               $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
              
            }
               $scope.led_success = resp.data.message;
            $scope.ledger_list();
             $scope.ledger_group_list();
              $scope.add_ledger_info = {'depot_address':[],'contacts':[],'details':{'gst_applicable':'No','tds_applicable':'No'}};
           // $scope.ledger_name = '';
           // $scope.ledger_group_id = '';
           // $scope.acc_ledger_type = 'Ledger';
        })
    };
    $scope.edit_ledger = function (ledger_id) {
        selected_ledger_id = ledger_id;
        getAccLedgerByIdService({id:ledger_id}).then(function (res) {
            console.log(res);
            $scope.edit_ledger_data = res.data[0];
            $scope.ledger_name = res.data[0].ledger_name;
            $scope.acc_ledger_type = res.data[0].ledger_type;
            $scope.ledger_group_id = res.data[0].ledger_group_id;
            $scope.show_edit = true;
            $scope.show_save = true;
        });
    };

    $scope.update_ledger = function () {
        updateLedgerGroupService({
            id:selected_ledger_id,
            ledger_name:$scope.ledger_name,
            ledger_group_id:$scope.ledger_group_id,
            ledger_type:$scope.acc_ledger_type
        }).then(function (res) {
            $('#ledger_add_success').fadeIn().delay(5000).fadeOut();
            $scope.led_success = JSON.parse(res.data);
            $scope.ledger_list();
            $scope.ledger_name = '';
            $scope.ledger_group_id = '';
            $scope.acc_ledger_type = 'Ledger';
            $scope.show_edit = false;
            $scope.show_save = false;
        })
    };

    $scope.deleteLedgerById = function (led_id) {
        deleteAccLedgerByIdService({id:led_id}).then(function (res) {
            $scope.ledger_list();
            $('#ledger_delete_success').fadeIn().delay(5000).fadeOut();
            $scope.led_del_success = JSON.parse(res.data);
        },function (res) {
            console.log(res);
        })
    };

     $scope.deleteLedgerById1 = function (led_id) {
     	 console.log("mera new id",led_id);
        deleteSubLedgerDetails({id:led_id}).then(function (res) {
            $scope.getSubLedgerLists();
            $('#ledger_delete_success').fadeIn().delay(5000).fadeOut();
            $scope.led_del_success = JSON.parse(res.data);
        },function (res) {
            console.log(res);
        })
    };
}]);



