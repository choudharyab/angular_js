'use strict';
var appUrl = "http://wheelsonroad.tectureproducts.in/wheelsonroadserver/api/";
 
 //var appUrl = "http://192.168.0.124/wheelsonroad/wheelsonroadserver/api/";


angular.module('myApp', [
  'ngRoute',
  'ngMessages',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers','homeModule','loginModule','productModule','warehouseModule','supplierModule','taxRateModule','supplierModule','documentationModule',
  'customerListModuleNew','otpModule','bankDetailsModule','crmLoanModule','payrollModule','serviceRuleModule',
  'hrmfeedbackModule','crmfeedbackModule','hrmMasterModule','hrmSalaryMasterModule','hrmLeaveFeedbackModule','leaveManagementModule',
  'crmActivityModule','employeeDetailModule','hrmFullNFinalModule','attendanceModule',
  'supplierchequedetailsmodule','clientchequedetailsmodule','otherDetailsModule',
  'generateVoucherModule','balanceSheetModule','dailyreportModule','bankAccountModule','userManagementModule',
  'customerStatusModule','fleetListModule','caseScrutinyModule','caseManagementModule','purchaseRequisitionModule','goodReceivingModule',
    'loanStatementModule','fleetMaintenanceModule','caseApprovedModule','disputedSheetModule','fleetAvailabilityModule','cashClientSheetModule',
    'crmFollowSheetModule',
    'leadManagementModule','caseInvoiceModule','empReimbursementModule','purchaseExpenseModule',
    'logFilesModule','backupModule','overallCaseReportModule','clientwiseTotalCaseReportModule','outstandingReportModule','agingReportModule',
    'fleetMaintenanceReportModule','accountLedgerModule','cashClientReportModule','subLedgerModule','monthWiseModule','dateWiseModule','gstr1Module',
    'gstr3bModule','accProfitLossModule','fleetDieselRecordModule','cashCaseManagementModule',
    'awpTollReportModule','policyRuleModule','policyDetailsModule','accountLedgerAccModule','trialBalanceModule'
]).
config(['$routeProvider', function($routeProvider) {

	// ...........Doucument............//
		$routeProvider.when('/documentation', {templateUrl: 'modules/documentation/view/documentation.html', controller: 'documentationController'});

	// ...........login............//

		$routeProvider.when('/login', {templateUrl: 'modules/login/view/login.html', controller: 'loginController'});

    // ...........home............//

    	$routeProvider.when('/home', {templateUrl: 'modules/home/view/home.html',controller:'homeController'});

    // ...........product............//

		$routeProvider.when('/product', {templateUrl: 'modules/product/view/product_list.html', controller: 'productController'});

    // ...........warehouse............//

		$routeProvider.when('/company', {templateUrl: 'modules/warehouse/view/warehouse_list.html', controller: 'warehouseController'});

    // ...........supplier............//

		$routeProvider.when('/agent', {templateUrl: 'modules/agent/view/supplier_list.html', controller: 'supplierController'});

    // ...........tax rate............//

    $routeProvider.when('/taxrate', {templateUrl: 'modules/tax_rate/view/tax_rate.html', controller: 'taxRateController'});

    // ...........supplier............//

    $routeProvider.when('/agent', {templateUrl: 'modules/agent/view/supplier_list.html', controller: 'supplierController'});

    //$routeProvider.when('/supplier_demo', {templateUrl: 'modules/supplier/view/supplier_list_25.html', controller: 'supplierController'});

    // ...........Customer............//

    $routeProvider.when('/client', {templateUrl: 'modules/client/view/customer_list.html', controller: 'customerListControllerNew'});

    //............OTP List..............//

    $routeProvider.when('/otplist', {templateUrl: 'modules/otp/view/otp_list.html', controller: 'otpController'});

      //............Bank Details..............//

    $routeProvider.when('/bank_details', {templateUrl: 'modules/bank_details/view/bankDetails.html', controller: 'bankDetailsController'});

		$routeProvider.when('/hrmemployeedetails', {templateUrl : 'modules/hrm_employeedetail/view/employeeDetail.html'});
		
		//..................HRM modules....................//
		

		$routeProvider.when('/hrm_employee_details', {templateUrl: 'modules/hrm_employeedetail/view/employeeDetail.html',controller : 'employeeDetailController'});
    		
    		$routeProvider.when('/hrm_leave_details', {templateUrl: 'modules/hrm_leaveManagement/view/leaveManagement.html',controller:'leaveManagementController'});	

     		$routeProvider.when('/hrm_leave_status', {templateUrl: 'modules/hrm_leaveManagement/view/leaveStatus.html'});
     		
     		//$routeProvider.when('/hrm_payroll', {templateUrl: 'modules/hrm_payrole/view/payrole.html',controller:'payroleController'}); 
     		
     		$routeProvider.when('/loan&advance', {templateUrl: 'modules/hrm_loan&advance/view/loan&advance.html',controller:'crmLoanController'});
    
            $routeProvider.when('/payrolenew', {templateUrl: 'modules/hrm_payrolenew/view/payrolenew.html',controller:'payrollController'});

            $routeProvider.when('/hrm_payroll', {templateUrl: 'modules/hrm_payrolenew/view/payrole.html',controller:'payrollController'});

            $routeProvider.when('/hrm_attendance', {templateUrl: 'modules/hrm_attendance/view/attendance.html',controller : 'attendanceController'});
            $routeProvider.when('/hrm_attendancedetails', {templateUrl: 'modules/hrm_attendance/view/attendancedetails.html',controller : 'attendanceController'});
     		
     		$routeProvider.when('/hrm_general', {templateUrl: 'modules/hrm_master_data/view/hrm_general.html'});
     		
     		$routeProvider.when('/hrm_salary', {templateUrl: 'modules/hrm_salary_master/view/hrm_salary.html'});
     		
     		$routeProvider.when('/hrm_feedback', {templateUrl: 'modules/hrm_feedback/view/hrmfeedback.html'});
     		
     		$routeProvider.when('/hrm_leave_feedback', {templateUrl: 'modules/hrm_leave_feedback/view/hrmLeavefeedback.html'}); 
     		
     		//$routeProvider.when('/hrm_full_&_final', {templateUrl: 'modules/hrm_full_&_final/view/fullAndFinal.html'});
     		$routeProvider.when('/hrm_full_n_final', {templateUrl: 'modules/hrm_full_&_final/view/fullAndFinal.html', controller: 'fullAndFinalController'});
     		
     
     		
     		//..................Customer Service Bill modules....................//
     		$routeProvider.when('/customerservicebill',{templateUrl: 'modules/customer_service_bill/view/customerServicebill.html', controller: 'customerServiceBillController'});
     		
     		//.................. Account modules....................//
     		$routeProvider.when('/acc_balancesheet',{templateUrl: 'modules/acc_balancesheet/view/balanceSheet.html',controller:'balanceSheetController'});
     		
     		$routeProvider.when('/acc_clientdetails',{templateUrl: 'modules/acc_customerdetails/view/customerDetails.html', controller: 'clientDetailsController'});
     		
     		////$routeProvider.when('/acc_ledger',{templateUrl: 'modules/acc_ledger/view/ledger.html'});
     		
     		$routeProvider.when('/acc_otherdetails',{templateUrl: 'modules/acc_otherdetails/view/otherDetails.html',  controller: 'otherDetailsController'});
     		
     		$routeProvider.when('/acc_supplierdetails',{templateUrl: 'modules/acc_supplierdetails/view/supplierDetails.html', controller: 'supplierDetailsController'});
     		
     		//$routeProvider.when('/acc_profitloss', {templateUrl: 'modules/acc_profitloss/view/profitLoss.html', controller : ''});
     		
     		/* acc profitloss routes */
     		
     		$routeProvider.when('/acc_profitloss', {templateUrl: 'modules/acc_profitloss/view/profitLoss.html',controller:'accProfitLossController'});

   //*********** purchase acc **********//

   $routeProvider.when('/purchasemonthwise/:acc_id', {templateUrl: 'modules/acc_profitloss/view/purchasemonthwise.html',controller:'purchaseAccMonthWiseController'});

   $routeProvider.when('/purchasedatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/purchasedatewise.html',controller:'purchaseAccDateWiseController'});

   //*********** sale acc **********//

   $routeProvider.when('/salesmonthwise/:tax_id', {templateUrl: 'modules/acc_profitloss/view/salemonthwise.html',controller:'salesAccMonthWiseController'});

   $routeProvider.when('/saledatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/saledatewise.html',controller:'saleAccDateWiseController'});

   //*********** Direct Expenses **********//


   $routeProvider.when('/inwordmonthwise', {templateUrl: 'modules/acc_profitloss/view/inwordbelowmonthwise.html',controller:'inwordBelowMonthWiseController'});

   $routeProvider.when('/inworddatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/inwordbelowdatewise.html',controller:'inwordBelowDateWiseController'});

   $routeProvider.when('/amountabovemonthwise', {templateUrl: 'modules/acc_profitloss/view/amountabovemonthwise.html',controller:'amountAboveMonthWiseController'});

   $routeProvider.when('/amountabovedatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/amountabovedatewise.html',controller:'amountAboveDateWiseController'});

   $routeProvider.when('/loadunloadmonthwise', {templateUrl: 'modules/acc_profitloss/view/loadunloadmonthwise.html',controller:'loadUnloadMonthWiseController'});

   $routeProvider.when('/loadunloaddatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/loadunloaddatewise.html',controller:'loadUnloadDateWiseController'});
     		
     		/* end acc profitloss */

     		 //*********** Indirect Incomes **********//
	 $routeProvider.when('/indirectincomemonthwise/:ld_id', {templateUrl: 'modules/acc_profitloss/view/indirectincomemonthwise.html',controller:'indirectIncomeMonthWiseController'});

	 $routeProvider.when('/indirectincomedatewise/:month_no/:ld_id', {templateUrl: 'modules/acc_profitloss/view/indirectincomedatewise.html',controller:'indirectIncomeDateWiseController'});

	 $routeProvider.when('/indincomeservicebillmonthwise/:ld_id', {templateUrl: 'modules/acc_profitloss/view/indincomeservicebillmonthwise.html',controller:'indIncomeServiceBillMonthWiseController'});

	 $routeProvider.when('/indincomeservicebilldatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/indincomeservicebilldatewise.html',controller:'indIncomeServiceBillDateWiseController'});

	 $routeProvider.when('/indincomeratediffmonthwise/:ld_id', {templateUrl: 'modules/acc_profitloss/view/indincomeratediffmonthwise.html',controller:'indIncomeRateDiffMonthWiseController'});

	 $routeProvider.when('/indincomeratediffdatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/indincomeratediffdatewise.html',controller:'indIncomeRateDiffDateWiseController'});

 //*********** Direct Income **********//

	 $routeProvider.when('/directincomemonthwise', {templateUrl: 'modules/acc_profitloss/view/directincomemonthwise.html',controller:'directIncomeMonthWiseController'});
	 
	 $routeProvider.when('/directincomedatewise/:month_no', {templateUrl: 'modules/acc_profitloss/view/directincomedatewise.html',controller:'directIncomeDateWiseController'});

     		
		$routeProvider.when('/acc_monthwise', {templateUrl: 'modules/acc_profitloss/view/monthwise.html'});
		$routeProvider.when('/acc_datewise', {templateUrl: 'modules/acc_profitloss/view/datewise.html'});
		
		$routeProvider.when('/acc_bankaccount', {templateUrl: 'modules/acc_bankaccount/view/bankAccount.html'});
		$routeProvider.when('/generatevoucher', {templateUrl: 'modules/acc_generatevoucher/view/generateVoucher.html',controller:'generateVoucherController'});
     		
     		//..........Stock Exit .........//
     		$routeProvider.when('/stockexit',{templateUrl: 'modules/inv_stock_exit/view/stock_exit.html', controller: 'stockExitController'});
     		
     		
     		//...........................Sale Return........................//

    		$routeProvider.when('/salesupplierreturn', {templateUrl: 'modules/sale_supplier_return/view/sale_supplier_return.html', controller: 'saleSupplierReturnController'});

		//...........................Sale Credit Note........................//

		$routeProvider.when('/sale_creditnote',{templateUrl: 'modules/sale_creditnote/view/sale_Creditnote.html', controller: 'saleCreditNoteController'});
		
		
				//..........................Account Section.............................//

    $routeProvider.when('/ledger', {templateUrl: 'modules/acc_ledger/view/ledger.html',controller:'accountLedgerController'});
    
    
    //..........................HRM Section.............................//
    $routeProvider.when('/hrm_feedback', {templateUrl: 'modules/hrm_feedback/view/hrmfeedback.html', controller: 'hrmfeedbackController'});
    
    //..........................CRM Section.............................//
    $routeProvider.when('/crm_feedback', {templateUrl: 'modules/crm_feedback/view/crmfeedback.html', controller: 'crmfeedbackController'});
    $routeProvider.when('/crm_activity', {templateUrl: 'modules/crm_activity/view/crmActivity.html', controller: 'crmActivityController'});
    
    
    $routeProvider.when('/hrm_master', {templateUrl: 'modules/hrm_master_data/view/hrmMaster.html', controller: 'hrmMasterController'});
        
    $routeProvider.when('/hrm_salaryMaster', {templateUrl: 'modules/hrm_salary_master/view/hrmSalarymaster.html', controller: 'hrmSalaryMasterController'});
        
    $routeProvider.when('/hrm_leaveFeedback', {templateUrl: 'modules/hrm_leave_feedback/view/hrmLeavefeedback.html', controller: 'hrmLeaveFeedbackController'});
    
    /* Akhilesh report routes */
    
    $routeProvider.when('/report_payment', {templateUrl: 'modules/report_payment/view/paymentReport.html', controller: 'paymentReportController'});
	
   //.....................Balance sheet .......................//
     		$routeProvider.when('/capitalamountmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/capitalamountmonthwise.html',controller:'capitalAccMonthWiseController'});

     		$routeProvider.when('/capitalamountdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/capitalamountdatewise.html',controller:'capitalAccDateWiseController'});

			$routeProvider.when('/loanmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/loanmonthwise.html',controller:'loanMonthWiseController'});

     		$routeProvider.when('/loandatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/loandatewise.html',controller:'loanDateWiseController'});

     		$routeProvider.when('/currentmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/currentmonthwise.html',controller:'currentMonthWiseController'});

     		$routeProvider.when('/currentdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/currentdatewise.html',controller:'currentDateWiseController'});

     		$routeProvider.when('/taxdutiesmonthwise/:taxduties_type/:taxduties_id',{templateUrl: 'modules/acc_balancesheet/view/taxdutiesmonthwise.html',controller:'taxMonthWiseController'});

     		$routeProvider.when('/taxdutiesdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/taxdutiesdatewise.html',controller:'taxDateWiseController'});

     		$routeProvider.when('/taxdutiesinputwise',{templateUrl: 'modules/acc_balancesheet/view/taxdutiesinputwise.html',controller:'taxInputWiseController'});

     		$routeProvider.when('/suspencemonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/suspencemonthwise.html',controller:'suspenceMonthWiseController'});

     		$routeProvider.when('/suspencedatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/suspencedatewise.html',controller:'suspenceDateWiseController'});

     		$routeProvider.when('/fixedassetsmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/fixedassetsmonthwise.html',controller:'fixedAssetsMonthWiseController'});

     		$routeProvider.when('/fixedassetsdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/fixedassetsdatewise.html',controller:'fixedAssetsDateWiseController'});

     		$routeProvider.when('/investmentmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/investmentmonthwise.html',controller:'investmentMonthWiseController'});

     		$routeProvider.when('/investmentdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/investmentdatewise.html',controller:'investmentDateWiseController'});

     		$routeProvider.when('/currentassetsmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/currentassetsmonthwise.html',controller:'currentAssetsMonthWiseController'});

     		$routeProvider.when('/currentassetsdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/currentassetsdatewise.html',controller:'currentAssetsDateWiseController'});

     		$routeProvider.when('/branchmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/branchmonthwise.html',controller:'branchMonthWiseController'});

     		$routeProvider.when('/branchdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/branchdatewise.html',controller:'branchDateWiseController'});

     		$routeProvider.when('/profitlossmonthwise/:ledger_id',{templateUrl: 'modules/acc_balancesheet/view/profitlossmonthwise.html',controller:'profitlossMonthWiseController'});

     		$routeProvider.when('/profitlossdatewise/:month_no',{templateUrl: 'modules/acc_balancesheet/view/profitlossdatewise.html',controller:'profitlossDateWiseController'});



$routeProvider.when('/bank_account', {templateUrl: 'modules/acc_bankaccount/view/bankAccount.html',controller: 'bankAccountController'});

$routeProvider.when('/daily_report', {templateUrl: 'modules/dailyreport/view/dailyreport.html',controller: 'dailyreportController'});

$routeProvider.when('/cashinhandmonthwise/:ledger_id', {templateUrl: 'modules/acc_bankaccount/view/cashInHandMonthWise.html',controller: 'cashInHandMonthWiseController'});

$routeProvider.when('/cashinhanddatewise/:month_no', {templateUrl: 'modules/acc_bankaccount/view/cashInHandDateWise.html',controller: 'cashInHandDateWiseController'});

$routeProvider.when('/bankaccountmonthwise/:ledger_id', {templateUrl: 'modules/acc_bankaccount/view/bankAccountMonthWise.html',controller: 'bankAccountMonthWiseController'});

$routeProvider.when('/bankaccountdatewise/:month_no', {templateUrl: 'modules/acc_bankaccount/view/bankAccountDateWise.html',controller: 'bankAccountDateWiseController'});

$routeProvider.when('/bankoccmonthwise/:ledger_id', {templateUrl: 'modules/acc_bankaccount/view/bankOccMonthWise.html',controller: 'bankOccMonthWiseController'});

$routeProvider.when('/bankoccdatewise/:month_no', {templateUrl: 'modules/acc_bankaccount/view/bankOccDateWise.html',controller: 'bankOccDateWiseController'});

// <-----reports by akash-------------------------->

$routeProvider.when('/clientwiseReport', {templateUrl: 'modules/ClientwiseTotalCaseReport/view/clientwiseReport.html',controller: 'clientwiseReportController'});

$routeProvider.when('/outstandingReports', {templateUrl: 'modules/OutstandingReport/view/outstandingReport.html',controller: 'outstandingReportController'});

$routeProvider.when('/15daysaging_report', {templateUrl: 'modules/15DaysAgingReport/view/15days.html',controller: 'agingReportController'});

$routeProvider.when('/fleetMaintainanceReport', {templateUrl: 'modules/FleetMaintainanceReport/view/fleetMaintainanceReport.html',controller: 'fleetMaintenanceReportController'});

/* -- formulation --  */
		$routeProvider.when('/formulationSaleorder', {templateUrl: 'modules/formulation_sale_po/view/formulation_sale_purchase_order.html',controller: 'formulationSalePurchaseorderController'});
		$routeProvider.when('/formulationpurchaseorder', {templateUrl: 'modules/formulation_purchase_order/view/formulation_purchase_order.html', controller: 'formulationPurchaseOrderController'});
		$routeProvider.when('/formulationpi', {templateUrl: 'modules/formulation_purchase_invoice/view/purchase_invoice.html', controller: 'formulationInvoiceController'});
		$routeProvider.when('/add_formulationpi', {templateUrl: 'modules/formulation_purchase_invoice/view/add_purchase_invoice_new.html', controller: 'addFormulationInvoiceController'});
		$routeProvider.when('/editformulationpurchaseinvoice/:invoice_id',{templateUrl: 'modules/formulation_purchase_invoice/view/add_purchase_invoice_new.html', controller: 'editFormulationInvoiceController'});
        $routeProvider.when('/formulationsaleinvoice',{templateUrl: 'modules/formulation_sale_invoice/view/saleOrderinvoice.html', controller: 'formulationsaleInvoiceListController'});
    	$routeProvider.when('/addformulationsaleinvoice',{templateUrl: 'modules/formulation_sale_invoice/view/add_sale_invoice .html', controller: 'formulationsaleinvoiceController'}); 	
    	$routeProvider.when('/editformulationsaleinvoice/:sale_inv_id',{templateUrl: 'modules/formulation_sale_invoice/view/add_sale_invoice .html', controller: 'editformulationsaleinvoiceController'});
/* -- formulation --  */

$routeProvider.when('/usermanagement', {templateUrl: 'modules/user_management/view/userList.html',controller:'userManagementController'});

$routeProvider.when('/po_pdf', {templateUrl: 'all_reports/po_invoice.html',controller:'MyCtrl1'});


        /* --- yogita added route ---  */
	// $routeProvider.when('/customerStatus', {templateUrl: 'modules/crm_customerStatus/view/customerStatus.html',controller:'customerStatusController'});

	$routeProvider.when('/customer_status', {templateUrl: 'modules/crm_customerStatus/view/customerStatus.html',controller:'customerStatusController'});


$routeProvider.when('/expenseorder', {templateUrl: 'modules/purchase_expense_order/view/purchase_expences.html',controller:'purchaseExpenseController'}); /*,controller:'purchaseExpenseController'*/
			
/* Nw module for wheelsonroad   */
    /*master*/
    $routeProvider.when('/serviceRule', {templateUrl: 'modules/serviceRule/view/serviceRule.html',controller:'serviceRuleController'});
    /*master*/
	 $routeProvider.when('/policyRule', {templateUrl: 'modules/policyrule/view/policyRule.html',controller:'policyRuleController'});
    /*Case Managemnet*/
    $routeProvider.when('/caseManagement', {templateUrl: 'modules/caseManagement/view/caseManagement.html',controller:'caseManagementController'});
   
    $routeProvider.when('/scrutingRsr', {templateUrl: 'modules/case_scruting/view/caseScruting.html',controller:'caseScrutinyController'});
    $routeProvider.when('/scrutingFlat', {templateUrl: 'modules/case_scruting/view/caseScrutingflat.html'});

    $routeProvider.when('/approvedSheetRsr', {templateUrl: 'modules/case_ApprovedSheet/view/caseApprovedSheet.html',controller:'caseApprovedController'});
    $routeProvider.when('/approvedSheetflat', {templateUrl: 'modules/case_ApprovedSheet/view/caseApprovedSheetflat.html'});

    $routeProvider.when('/disputedSheetRsr', {templateUrl: 'modules/case_DisputedSheet/view/disputedSheet.html',controller:'disputedSheetController'});
    $routeProvider.when('/disputedSheetflat', {templateUrl: 'modules/case_DisputedSheet/view/disputedSheetflat.html'});
    /*Case Managemnet*/

    /* purchase */
    $routeProvider.when('/purchaseRequisition', {templateUrl: 'modules/purchaseRequisition/view/purchaseRequisition.html',controller:'purchaseRequisitionController'});
    
    $routeProvider.when('/goodsReceiving', {templateUrl: 'modules/goodsreceivingnote/view/goodsreceiving.html',controller:'goodReceivingController'});
    /* purchase */


    /* feet list */
    $routeProvider.when('/fleetList', {templateUrl: 'modules/fleetList/view/fleetList.html',controller:'fleetListController'});
    $routeProvider.when('/fleetAvailability', {templateUrl: 'modules/fleetAvailability/view/fleetAvailability.html',controller:'fleetAvailabilityController'});
    $routeProvider.when('/loanStatement', {templateUrl: 'modules/loanStatement/view/loanStatement.html',controller:'loanStatementController'});
    $routeProvider.when('/fleetMaintenance', {templateUrl: 'modules/fleetMaintenance/view/fleetMaintenance.html',controller:'fleetMaintenanceController'});
    $routeProvider.when('/cashClientSheet', {templateUrl: 'modules/case_CashClientSheet/view/cashClientSheet.html',controller:'cashClientSheetController'});
    $routeProvider.when('/cashInvoiceSheet', {templateUrl: 'modules/case_invoice/view/caseInvoice.html',controller:'caseInvoiceController'});
    /* feet list */
    $routeProvider.when('/leadmanagement', {templateUrl: 'modules/crm_leadmanagement/view/leadmanagement.html',controller: 'leadManagementController'});

    $routeProvider.when('/followSheet', {templateUrl: 'modules/followsheet/view/followsheet.html',controller: 'crmFollowSheetController'});

    $routeProvider.when('/hrm_emp_reimbursement', {templateUrl: 'modules/hrm_employee_reimbursement/view/empReimbursement.html',controller: 'empReimbursementController'});

    $routeProvider.when('/purchaseexpense', {templateUrl: 'modules/purchase_expense/view/purchase_expense.html',controller:'purchaseExpenseController'});

    $routeProvider.when('/log_files', {templateUrl: 'modules/log_files/view/logfiles.html',controller:'logfilesController'});
    
    $routeProvider.when('/back_up_db', {templateUrl: 'modules/backup/view/backup.html',controller:'backupController'});

    $routeProvider.when('/overall_case_report', {templateUrl: 'modules/overall_case_report/view/overallCaseReport.html',controller:'overallCaseReportController'});

    $routeProvider.when('/cash_client_report', {templateUrl: 'modules/cash_client_report/view/cashclientreport.html',controller:'cashClientReportController'});

    $routeProvider.when('/detailsmonthwise/:from_date/:to_date/:subgroup_id/:subgroup_name/:type', {templateUrl: 'modules/acc_ledger/view/subledgerwise.html',controller:'monthWiseController'});
    $routeProvider.when('/detailssdatewise', {templateUrl: 'modules/acc_ledger/view/detailssdatewise.html',controller:'accountLedgerController'});
    $routeProvider.when('/subledgerwise', {templateUrl: 'modules/acc_ledger/view/subledgerwise.html',controller:'accountLedgerController'});

    $routeProvider.when('/subledgerwisee/:from_date/:to_date/:id/', {templateUrl: 'modules/acc_ledger/view/subledgerwise.html',controller:'subLedgerController'});
    $routeProvider.when('/detailsmonthwisee/:from_date/:to_date/:ledger_id/:type/:subgroup_id/:ledger_name/:ledger_type/:balancesheet_side/:id', {templateUrl: 'modules/acc_ledger/view/detailsmonthwise.html',controller:'monthWiseController'});
    $routeProvider.when('/detailsdatewisee/:ledger_id/:type/:sub_group_id/:month_no/:ledger_type/:from_date/:to_date/:ledger_name/:balancesheet_side/:id', {templateUrl: 'modules/acc_ledger/view/detailssdatewise.html',controller:'dateWiseController'});

    $routeProvider.when('/detailsmonthwiseforpl/:from_date/:to_date/:ledger_subgroup_id/:ledger_id/:ledger_name/:tax_type/:tax_id/:balancesheet_side/:group_name', {templateUrl: 'modules/acc_ledger/view/detailsmonthwise.html',controller:'monthWiseController'});
    $routeProvider.when('/detailsdatewiseforpl/:sub_group_id/:month_no/:tax_type/:tax_id/:from_date/:to_date/:balancesheet_side/:group_name/:ledger_id/:ledger_name', {templateUrl: 'modules/acc_ledger/view/detailssdatewise.html',controller:'dateWiseController'});
    $routeProvider.when('/gstr1', {templateUrl: 'modules/gstr1/view/gstr1.html', controller: 'gstr1Controller'});
    $routeProvider.when('/gstr3b', {templateUrl: 'modules/gstr3b/view/gstr3b.html', controller: 'gstr3bController'});
    $routeProvider.when('/fleet_DieselRecord', {templateUrl: 'modules/fleet_DieselRecord/view/fleet_DieselRecord.html',controller:'fleetDieselRecordController'});
    
    $routeProvider.when('/cashCaseManagement', {templateUrl: 'modules/cashCaseManagement/view/cashCaseManagement.html',controller:'cashCaseManagementController'});

$routeProvider.when('/awp_toll_report', {templateUrl: 'modules/awp_toll_report/view/awptollreport.html',controller:'awpTollReportController'});

$routeProvider.when('/closedCaseManagement', {templateUrl: 'modules/caseManagement/view/caseManagement.html',controller:'caseManagementController'});

$routeProvider.when('/policyDetails', {templateUrl: 'modules/policyDetails/view/policyDetails.html',controller:'policyDetailsController'});
$routeProvider.when('/vendor', {templateUrl: 'modules/vendor/view/vendor.html'});

$routeProvider.when('/ledger_main', {templateUrl: 'modules/acc_ledger/view/ledger_main.html',controller:'accountLedgerController'});
/* Nw module for wheelsonroad   */
/* ac opening balance */

$routeProvider.when('/accOpeningbalance', {templateUrl: 'modules/acc_ledger_Ac/view/ledger_Ac.html', controller:'accountLedgerAccController'});
$routeProvider.when('/accOpeningbalanceDetails', {templateUrl: 'modules/acc_ledger_Ac/view/ledgerdatewise.html', controller:'accountLedgerAccController'});

$routeProvider.when('/trial_balance', {templateUrl: 'modules/acc_trial_balance/view/trial_balance.html', controller:'trialBalanceController'});

/* ac opening balance */

 $routeProvider.when('/subledgerwise_for_pl/:from_date/:to_date/:subgroup_id/:subgroup_name/:type', {templateUrl: 'modules/acc_ledger/view/subledgerwise.html',controller:'subLedgerController'});

	$routeProvider.otherwise({redirectTo: '/login'});
}]).factory('Auth', function(){
    var user = localStorage.getItem('token');
    return{
        setUser : function(aUser){
            user = aUser;
        },
        isLoggedIn : function(){
            return(user)? user : false;
        }
    }
}).factory('checkExpireTokenService',function($http){
    return function (params) {
        return $http.get(appUrl+'get_next_supplier_code?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).run(['$rootScope', '$location','$route', 'Auth','checkExpireTokenService', function ($rootScope, $location,$route, Auth,checkExpireTokenService) {
    $rootScope.$on('$routeChangeStart', function (event,current) {
    
    	checkExpireTokenService({}).then(function () {},function (res) {
            if(res.status=='500' || res.status=='400'){
                localStorage.clear();
                
                $('nav').removeClass('left-menu');
                $('nav').addClass('my_menubar');
                
                $location.path('/login');
      
                
            }
        });

       if (!Auth.isLoggedIn() || localStorage.getItem('token')==null) {
          event.preventDefault();
          $location.path('/login');
        }else{
            $('nav').removeClass('my_menubar');
            $('nav').addClass('left-menu');
            
            if($location.path()=='/login'){
                $location.path('/home');
            }
            
        }
        
       $rootScope.login_usr_type = localStorage.getItem('user_type');

        if(localStorage.getItem('user_type')=='user'){

            $rootScope.elephento_user_rights = JSON.parse(localStorage.getItem('user_rights'));

            for(var g=0;g<$rootScope.elephento_user_rights.length;g++){

                for(var p=0;p<$rootScope.elephento_user_rights[g].user_modules[0].user_role_sub_modules.length;p++){

                    if($rootScope.elephento_user_rights[g].user_modules[0].user_role_sub_modules[p].sub_module.sub_module_routes=='#'+ $location.path()){

                        $rootScope.current_module_rights = $rootScope.elephento_user_rights[g].user_modules[0].user_role_sub_modules[p];
                    }
                }
            }
        }
    });
}]).controller('currencyController',function($scope,$http,$route){
    if(localStorage.getItem('currencyCheckVar') == null){
        localStorage.setItem('currencyCheckVar','EUR');
        angular.element(document.querySelector("#eurClass")).addClass("active");
    } else {  
        $scope.changeCurrency = function(data){
            if(data == 'EUR'){
                angular.element(document.querySelector("#eurClass")).addClass("active");
                angular.element(document.querySelector("#inrClass")).removeClass("active");
            } else {
                angular.element(document.querySelector("#inrClass")).addClass("active");
                angular.element(document.querySelector("#eurClass")).removeClass("active");
            }
            localStorage.setItem('currencyCheckVar',data);
            $route.reload();
        }
    }
    //Check exchange rate globally
    $scope.ExchangeRateVal = localStorage.getItem('currencyCheckVar');
    if($scope.ExchangeRateVal == 'EUR'){
        angular.element(document.querySelector("#eurClass")).addClass("active");
        angular.element(document.querySelector("#inrClass")).removeClass("active");
    } else {
        angular.element(document.querySelector("#inrClass")).addClass("active");
        angular.element(document.querySelector("#eurClass")).removeClass("active");
    }
});

