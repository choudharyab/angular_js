var gstr1Module = angular.module('gstr1Module',[]);
gstr1Module.controller('gstr1Controller',['$rootScope','$scope','$location','$route','$timeout','$window','getWarehouseListService1','getGstr1Service','generateJsonGstr1Service','generateExcelGstr1Service',
function($rootScope,$scope,$location,$route,$timeout,$window,getWarehouseListService1,getGstr1Service,generateJsonGstr1Service,generateExcelGstr1Service){
	
    $scope.yearListData = function(){
		var currentTime = new Date();
		var year = currentTime.getFullYear();
		var lastyear = year-2;
		var val = 12; 
		var incrYear = {};
		for(var i=1; i<=val; i++){
			incrYear[i] = {
				yearCount : lastyear+i,
			};
		}
		$scope.yearlist = incrYear;
	}
	$scope.yearListData();
	
	getWarehouseListService1({}).then(function (response) {
        $scope.warehouse_list = response.data;
    });
	
	$scope.selected_warehouse = localStorage.getItem('warehouse_id');
    $scope.get_po_warehouse = function () {
		$scope.changeAllData();
        localStorage.setItem('warehouse_id',JSON.parse($scope.warehouse_id).id);
        localStorage.setItem('warehouse_name',JSON.parse($scope.warehouse_id).warehouse_name);
        localStorage.setItem('warehouse_state_id',JSON.parse($scope.warehouse_id).state_id);
        $scope.selected_warehouse = localStorage.getItem('warehouse_id');
    };
	
	$scope.changeAllData = function(){
		$('#genrJson').show();
		$('#dowJson').hide();
		$('.loading').show();
		getGstr1Service({
			month : $scope.month,
			year : $scope.year,
			warehouse_id : $scope.warehouse_id,
		}).then(function (response) {
			$('.loading').hide();
			//console.log(response)
			$scope.gstr_list = response.data;
			$scope.total_invoice_count = response.data.total_invoice_count;
			$scope.total_invoice_value = response.data.total_invoice_value;
			$scope.total_taxable_value = response.data.total_taxable_value;
			$scope.tax_liability = response.data.tax_liability;
			$scope.reverse_charge = response.data.reverse_charge;
			$scope.total_tax_liability = parseFloat(response.data.tax_liability) - parseFloat(response.data.reverse_charge);
			$scope.warehouse_gst_no = response.data.warehouse_data[0].gst_no;
			$scope.warehouse_state_name = response.data.warehouse_data[0].state_name;
			
		});
	}
	
	$scope.generate_json_gstr1 = function () {
		if($scope.month == undefined){
			alert('Please select month')
		} else if($scope.year == undefined){
			alert('Please select year')
		} else if($scope.warehouse_id == undefined){
			alert('Please select warehouse')
		} else {
			$('.loading').show();
			generateJsonGstr1Service({
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
	
	
	$scope.generate_excel_gstr1 = function () {
        $('.loading').show();
        generateExcelGstr1Service({
            month : $scope.month,
			year : $scope.year,
			warehouse_id : $scope.warehouse_id,
        }).then(function (response) {
            //console.log(response)
            $window.open('Elephantoserver/public/excel_files/GSTR1.xlsx');
            $('.loading').hide();
        },function (res) {
            console.log(res);
        }); 
    }
	
}]);
