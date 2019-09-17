hrmfeedbackModule=angular.module('hrmfeedbackModule',[]);
hrmfeedbackModule.controller('hrmfeedbackController',['$rootScope','$scope','$location','$route','$filter','getHrmFeedback','addHrmComment','addHrmFeedback',
    'getEmployeeNames','getHrmFeedbackFor','deleteHrmFeedback','commonService',
    function($rootScope,$scope,$location,$route,$filter,getHrmFeedback,addHrmComment,addHrmFeedback,getEmployeeNames,getHrmFeedbackFor,deleteHrmFeedback,check_permission) {
    var list;
    $scope.add_feedback={};
    $scope.feedback_success='';
    $scope.feedback_error='';

    $scope.add_feedback_click=function(){
        $scope.add_feedback.employee_id='';
        $scope.add_feedback.feedback_id='';
        $scope.add_feedback.feedback='';
        $route.reload();
    };

    $scope.getFeedback = function () {
        getHrmFeedback({}).then(function (response) {
            console.log(response);
            $scope.feedbacklisting = response.data;
            list = response.data;
        }, function (res) {
            console.log(res);
        });
        console.log(list);
    };


    $scope.add_feedback.date=$filter('date')(new Date(),'yyyy-MM-dd');

    $scope.get_names=function () {
        getEmployeeNames({}).then(function (response) {
            $scope.names_list=response.data;
            console.log($scope.names_list);
        },function(response){
            console.log(response);
        });
    };
    $scope.get_names();
    $scope.get_feedback_for=function()
    {
        getHrmFeedbackFor({}).then(function(response){
            $scope.feedback_for_list=response.data;
            console.log($scope.feedback_for_list);
        },function(response){
            console.log(response);
        });
    };
    $scope.get_feedback_for();

    

    $scope.save_feedback=function () {
        console.log($scope.add_feedback);
        addHrmFeedback({
            employee_feedback:$scope.add_feedback
        }).then(function (response) {
            console.log(response);
            $scope.dismiss();
            $scope.getFeedback();
            /*$scope.add_feedback={};*/
            $scope.add_feedback.employee_id='';
            $scope.add_feedback.feedback_id='';
            $scope.add_feedback.feedback='';
            $('#feedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.feedback_success = "Feedback Added Successfully";
            $scope.feedback_error = "";
        },function (response) {
            console.log(response);
            $scope.feedback_success='';
            $('#feedbackError').fadeIn().delay(5000).fadeOut();
            $scope.feedback_error=response.data.error[0];
        })

    };

    $scope.getFeedback();
    $scope.comment = '';

    $scope.getFeedbackId = function (id) {
        $scope.employee_feedback_id = id;
        console.log($scope.employee_feedback_id);
    };

    $scope.add_comment = function () {
        addHrmComment({
            employee_feedback_id: $scope.employee_feedback_id,
            comment: $scope.comment
        }).then(function (response) {
            console.log(response);
            $scope.modal_dismiss_sr_edit();
            $scope.getFeedback();
            $scope.comment='';
        });

    };

    /*$scope.deleteHrmFeedbackList=function (id) {
        console.log('####################',id);
        deleteHrmFeedback({
            employee_feedback_id:id
        }).then(function (response) {
            console.log(response);
            $scope.getFeedback();
        });
    };*/

    $scope.current_modal = "hrm_feedback";
    $scope.hrm_feedback_permission_popup = function (po_id,po_status,po_type) {
        check_permission.check_status(po_id,po_status,po_type,$scope.current_modal);
        $scope.comment ={};
        $scope.otp_object = {};
    };
    $scope.generate_password_function = function () {
        check_permission.generate_otp($scope.comment);
        $scope.comment ={};
    };
    $scope.verify_otp = function () {
        check_permission.verify_permission_otp($scope.otp_object, '');
        $scope.otp_object = {};
    };
    /*$scope.$on('CallParentMethod', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.getFeedback();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_activity(data.id);
        }
    });*/
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.getFeedback();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#feedbackSuccess').fadeIn().delay(5000).fadeOut();
            $scope.feedback_success = "Feedback Deleted Successfully";
            
            }
        }
    });
}]);

