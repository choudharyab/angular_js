var backupModule=angular.module('backupModule',[]);
backupModule.controller('backupController',['$rootScope','$scope','$location','$window','getBackupService','backupListingService','commonService',
function($rootScope,$scope,$location,$window,getBackupService,backupListingService,check_permission){

    $scope.backup_list = function(){
        backupListingService({}).then(function(res){
            $scope.backup_listing=res.data;
        })
    }
    $scope.backup_list();
        
    $scope.backup_database = function(){
        getBackupService({}).then(function (res) {  
            $window.open('wheelsonroadserver/'+res.data);
            $scope.backup_list();
        })
    };
    
    $scope.download_file=function(file_name){
        $window.open('wheelsonroadserver/'+file_name);
    }


    $scope.current_modal = 'backup_database';
    $scope.backup_permission_popup = function (log_id,log_status,log_type,file_name) {
        check_permission.check_status(log_id,log_status,log_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object ={};
        $scope.database_filename=file_name;
    };
    $scope.generate_password = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };

    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.backup_list();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#delete_logistic').fadeIn().delay(5000).fadeOut();
                $scope.delete_logistic_msg = 'Database Deleted Successfully';
            }
        }
    });
    
    $scope.$on('CallParentMethod', function (event, data) {
        $scope.modal_dismiss_two();
        console.log($scope.database_filename);
        $window.open('wheelsonroadserver/'+$scope.database_filename);
    });
	
}]);



