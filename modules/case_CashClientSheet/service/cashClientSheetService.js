// cashClientSheetModule.factory('getAllDisputedList',function($http){
//     return function (params) {
// 		return $http.get(appUrl+'get_disputed_sheet?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
//         })
//     }
// }).factory('searchDisputedList',function($http){
//     return function (params) {
//         return $http.get(appUrl+'disputed_filter?token='+localStorage.getItem('token')+'&warehouse_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
//         })
//     }
// });
cashClientSheetModule.factory('getAllCashClientList',function($http){
     return function (params) {
		return $http.get(appUrl+'get_cash_client_listing?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
 }).factory('searchCashClientList',function($http){
    return function (params) {
        return $http.get(appUrl+'cash_filter?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('generateCashInvoiceService',function($http){
    return function (params) {
        return $http.get(appUrl+'generate_cash_bill_pdf?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});