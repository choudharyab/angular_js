var logFilesModule=angular.module('logFilesModule',[]);
logFilesModule.controller('logfilesController',['$rootScope','$scope','$location','logFilesListingService',function($rootScope,$scope,$location,logFilesListingService){
	
    
    $scope.logfile_listing = function () {
        logFilesListingService({}).then(function (res) {
            $scope.logfiles = res.data;            
        })
    };
    $scope.logfile_listing();


}]);



