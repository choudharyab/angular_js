caseInvoiceModule.factory('getCaseInvoiceListing',function($http){
    return function (params) {
        return $http.get(appUrl+'case_bill_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('movedToApprovedSheet',function($http){
    return function (params) {
        return $http.post(appUrl+'add_case_to_disputed_or_approve?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
}).factory('searchScrutinyList',function($http){
    return function (params) {
		return $http.get(appUrl+'scrutiny_filter?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('getDataById',function($http){
    return function (params) {
		return $http.get(appUrl+'case_bill_data_using_id?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateInvoiceService',function($http){
    return function (params) {
        return $http.get(appUrl+'generate_bill_pdf?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updateBillData',function($http){
    return function (params) {
        return $http.post(appUrl+'update_case_bill?token='+localStorage.getItem('token'),
            $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
    }
});