'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope','setGetDataService',function($scope,setGetDataService) {
	$scope.module_all_data = setGetDataService.get_module_data();

        $scope.selected_warehouse_info = JSON.parse(localStorage.getItem('warehouse_info'));
  }])
  .controller('MyCtrl2', [function() {

  }]);