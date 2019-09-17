var dailyreportModule=angular.module('dailyreportModule',[]);
dailyreportModule.controller('dailyreportController',['$rootScope','$scope','$location','getDailyReportDetails','getTransportationNameService','getCustomerListService',
'getServicesListing',
    function($rootScope,$scope,$location,getDailyReportDetails,getTransportationNameService,getCustomerListService,getServicesListing){
$scope.ExchangeRateVal = localStorage.getItem('currencyCheckVar')
    //var sale_invoice;


    $scope.getTransportationName = function () {
        getTransportationNameService({}).then(function (res) {
            $scope.charge_details = res.data;
            charge = res.data;
           console.log(res.data);
        },function (res) {
            console.log(res);
        })
    };
    $scope.getTransportationName();

    $scope.get_client_listing = function () {
        getCustomerListService({}).then(function (response) {
             console.log(response);
             $scope.client_listing_details = response.data;
        },function (response) {
             console.log(response);
        })
    };
    $scope.get_client_listing();

    $scope.get_service_details = function(){
        getServicesListing({
            type:'service'
        }).then(function (response) {
            $scope.service_details = response.data;
            console.log(response.data);
        },function (response) {
            console.log(response);
        })
    };
    $scope.get_service_details();

        $scope.getDailyReportList=function () {
            getDailyReportDetails({
                date:$scope.date,
                client_id:$scope.client_id,
                service_id:$scope.service_id
            }).then(function (response) {
                console.log(response);
                $scope.case_management_data=response.data.case_data;
                $scope.scrutiny_sheet_data=response.data.scruitnysheet;
                $scope.approved_sheet_data=response.data.approvesheet;
                $scope.disputed_sheet_data=response.data.disputedsheet;
               // sale_invoice=response.data.sale_invoice_results;
                $scope.cash_client_data=response.data.cashcasesheet;
                $scope.invoice_data=response.data.invoicedata;
                console.log( "=================>>>>>>>",$scope.daily_purchase_order_list);
                /*list=response.data;*/
                $scope.sum = 0;
                for(var i=0;i<$scope.daily_sale_invoice_list.length;i++)
                {
                    $scope.sum=$scope.sum+parseFloat($scope.daily_sale_invoice_list[i].grand_total);
                }
                console.log("*********",$scope.sum);
            },function(response){
                console.log(response);
            });
        };
        $scope.getDailyReportList();
	
}]);



