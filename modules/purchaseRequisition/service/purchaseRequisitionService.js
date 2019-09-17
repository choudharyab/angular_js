caseManagementModule.factory('getRequisitionListing',function($http){
    return function (params) {
        return $http.get(appUrl+'get_purchase_requistion?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('savePurchaseRequisitionData',function($http){
    return function (params) {
        return $http.post(appUrl+'store_purchase_requistion?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getRequisitionDataById',function($http){
    return function (params) {
        return $http.get(appUrl+'get_purchase_requistion_using_id?token='+localStorage.getItem('token')+'&company_id='+localStorage.getItem('warehouse_id'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('updatePurchaseRequisitionData',function($http){
    return function (params) {
        return $http.post(appUrl+'update_purchase_requistion?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('getPurchaseCodeAutocomplete',function($http){
    return function (params) {
        return $http.get(appUrl+'product_autocomplete_for_purchase_requistion?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
}).factory('approvePurchaseRequisition',function($http){
    return function (params) {
        return $http.get(appUrl+'approve_purchase_requisition?token='+localStorage.getItem('token'),{params:params,header:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
        })
    }
});