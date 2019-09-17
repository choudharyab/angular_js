var gstr3bModule = angular.module('gstr3bModule',[]);
gstr3bModule.controller('gstr3bController',['$rootScope','$scope','$location','$route','$timeout','$window','getWarehouseListService1','getGstr3bService','generateJsonGstr3bService','generateExcelGstr3bService',function($rootScope,$scope,$location,$route,$timeout,$window,getWarehouseListService1,getGstr3bService,generateJsonGstr3bService,generateExcelGstr3bService){
	
	
	getWarehouseListService1({}).then(function (response) {
        $scope.warehouse_list = response.data;
    });
	
	$scope.selected_warehouse = localStorage.getItem('warehouse_id');
    $scope.get_po_warehouse = function () {
		$scope.changeAllData();
        /**localStorage.setItem('warehouse_id',JSON.parse($scope.warehouse_id).id);
        localStorage.setItem('warehouse_name',JSON.parse($scope.warehouse_id).warehouse_name);
        localStorage.setItem('warehouse_state_id',JSON.parse($scope.warehouse_id).state_id);
        $scope.selected_warehouse = localStorage.getItem('warehouse_id');**/
    };
	
	$scope.changeAllData = function(){
		$('.loading').show();
		getGstr3bService({
			month : $scope.month,
			year : $scope.year,
			warehouse_id : $scope.warehouse_id,
		}).then(function (response) {
			$('.loading').hide();
			
			//warehouse data
			$scope.gst_no_value = response.data.warehouse_data[0].gst_no;
			$scope.warehouse_name_value = response.data.warehouse_data[0].company_name;

			//outward_taxable_supplies_data
			$scope.total_taxable_value = response.data.total_taxable_value;
			$scope.integrated_tax = response.data.outward_igst;
			$scope.central_tax = response.data.outward_cgst;
			$scope.state_tax = response.data.outward_sgst;
			$scope.cess = response.data.outward_cess;
			
			
			//all_other_itc
			$scope.integrated_tax_itc = response.data.inward_igst;
			$scope.central_tax_itc = response.data.inward_cgst;
			$scope.state_tax_itc = response.data.inward_sgst;
			$scope.cess_itc = response.data.inward_cess;
			
			//itc_reversed
			$scope.other_integrated_tax = response.data.itc_other_igst;
			$scope.other_central_tax = response.data.itc_other_cgst;
			$scope.other_state_tax = response.data.itc_other_sgst;
			$scope.other_cess = response.data.itc_other_cess;
			
			//net_itc_available
			$scope.integrated_tax_available = response.data.net_itc_igst;
			$scope.central_tax_available = response.data.net_itc_cgst;
			$scope.state_tax_available = response.data.net_itc_sgst;
			$scope.cess_available = response.data.net_itc_cess;
			
		});
	}
	
	$scope.generate_json_gstr3b = function () {
		if($scope.month == undefined){
			alert('Please select month')
		} else if($scope.year == undefined){
			alert('Please select year')
		} else if($scope.warehouse_id == undefined){
			alert('Please select warehouse')
		} else {
			$('.loading').show();
			generateJsonGstr3bService({
				month : $scope.month,
				year : $scope.year,
				warehouse_id : $scope.warehouse_id,
			}).then(function (response) {
				//console.log(response)
				var file_name= response.data.file_name;
				$scope.jsonfileName = file_name;
				$timeout(function () {
					$('.loading').hide();
					$('#genrJson').hide();
					$('#dowJson').show();
				},700);
			},function (res) {
				console.log(res);
			}); 
		}
        
    }
	
	
	$scope.generate_excel_gstr3b = function () {
        $('.loading').show();
        generateExcelGstr3bService({
            month : $scope.month,
			year : $scope.year,
			warehouse_id : $scope.warehouse_id,
        }).then(function (response) {
            //console.log(response)
            $window.open('Elephantoserver/public/excel_files/GSTR3B.xlsx');
            $('.loading').hide();
        },function (res) {
            console.log(res);
        }); 
    }
	
}]);
