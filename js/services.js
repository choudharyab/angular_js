'use strict';
angular.module('myApp.services', []).
  value('version', '0.1').service('commonService', ['$rootScope','$location','generatePasswordService','verifyOTPService', function($rootScope,$location,generatePasswordService,verifyOTPService) {
    $rootScope.comment = {};
    $rootScope.otp_object = {};
    this.check_status = function(id,status,type,model) {
        $rootScope.comment.id = id;
        $rootScope.otp_object.id = id;
        if(status==1 || status==11 || status==111){
            $rootScope.gen_pass_div = true;
            $rootScope.gen_pass_btn = true;
            $rootScope.otp_div = true;
            $rootScope.verify_otp_btn = true;
            $rootScope.generateOTP = false;
            $rootScope.title_text = "Verify OTP";
            $rootScope.comment.type = type;
            $rootScope.otp_object.type = type;
            $rootScope.comment.model = model;
            $rootScope.otp_object.model = model;
            $rootScope.pending_msg = '';

        }else{
            $rootScope.gen_pass_div = false;
            $rootScope.gen_pass_btn = false;
            $rootScope.otp_div = false;
            $rootScope.verify_otp_btn = false;
            $rootScope.generateOTP = true;
            $rootScope.title_text = "Generate Password";
            $rootScope.comment.type = type;
            $rootScope.otp_object.type = type;
            $rootScope.comment.model = model;
            $rootScope.otp_object.model = model;
            $rootScope.pending_msg = '';
        }
    };
    this.generate_otp = function (comment) {
        $rootScope.comment.comment = comment.comment;
        $rootScope.pending_msg = 'Please wait..';
        generatePasswordService({
            comment:$rootScope.comment
        }).then(function (response) {
            console.log(response.data);
            $rootScope.gen_pass_div = true;
            $rootScope.gen_pass_btn = true;
            $rootScope.otp_div = true;
            $rootScope.verify_otp_btn = true;
            $rootScope.generateOTP = false;
            $rootScope.title_text = "Verify OTP";
            $rootScope.$broadcast("updateListing",$rootScope.comment);
            $rootScope.pending_msg = '';
        },function (res) {
            $rootScope.pending_msg = 'Mail not sent..';
            //alert(res.data.error);
            //$rootScope.pending_msg = '';
        })
    };
    this.verify_permission_otp = function (otp,route) {
        $rootScope.otp_object.otp = otp.otp;
        console.log($rootScope.otp_object);
        verifyOTPService({
            otp_object:$rootScope.otp_object
        }).then(function (response) {
            console.log(response.data);
            $rootScope.show_success_msg = true;
            if($rootScope.otp_object.type=='edit'){
              /* if($rootScope.otp_object.model=='purchase_invoice'){
               $rootScope.$broadcast("CallParentMethod",$rootScope.otp_object);
               }else{
               $location.path('/'+route+'/'+$rootScope.otp_object.id);
               }*/
                if($rootScope.otp_object.model=='purchase_invoice' || $rootScope.otp_object.model=='sale_invoice' || $rootScope.otp_object.model=='indenting_purchase_invoice'){
                    $rootScope.$broadcast("closePopupBeforeRoute",$rootScope.otp_object);
                }
                $rootScope.$broadcast("CallParentMethod",$rootScope.otp_object);
            }else{
                $rootScope.$broadcast("updateListing",$rootScope.otp_object);

            }
        },function (response) {
            console.log(response);
            alert ('Invalid OTP...Please Try Again');
        })
    }
}]).factory('generatePasswordService',function($http){
    return function (params) {
        return $http.post(appUrl+'common_generate_password?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('verifyOTPService',function($http){
    return function (params) {
        return $http.post(appUrl+'common_verify_otp?token='+localStorage.getItem('token'), $.param(params),{headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        })
    }
}).factory('flashMessage',function ($rootScope) {
    var queue = [], currentMessage = '';
    $rootScope.$on('$routeChangeSuccess', function() {
        if (queue.length > 0)
            currentMessage = queue.shift();
        else
            currentMessage = '';
    });
    return {
        set: function(message) {
            queue.push(message);
        },
        get: function(message) {
            return currentMessage;
        }
    };
}).service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function(){
            })
            .error(function(){
            });
    }
}]).service('setGetDataService',function () {
    var module_data = {};

   this.set_module_data = function (module_data) {
        this.module_data = module_data;
    };
    this.get_module_data = function () {
       return this.module_data;
    }
});
