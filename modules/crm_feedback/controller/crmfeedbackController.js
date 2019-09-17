var crmfeedbackModule = angular.module('crmfeedbackModule',[]);
crmfeedbackModule.controller('crmfeedbackController',['$rootScope','$scope','$location','$route','$filter','getcustomerfeedback','addCrmComment','getFeedbackFor',
    'getNames','addFeedback','deleteCrmFeedback','commonService',
    function($rootScope,$scope,$location,$route,$filter,getcustomerfeedback,addCrmComment,getFeedbackFor,getNames,addFeedback,deleteCrmFeedback,check_permission){
    
    var auto_customer_arr;
    var type_id;
    $scope.customer_feedback={};
    $scope.customer_feedback.date=$filter('date')(new Date(),'yyyy-MM-dd');

    $scope.add_crm_feedback_clicked=function(){
        $scope.auto_customer_id='';
        $scope.customer_feedback.type='';
        $scope.customer_feedback.crm_feedback_id='';
        $scope.customer_feedback.crm_description='';
        $route.reload();
    };

    $scope.getfeedbacklist=function () {
		getcustomerfeedback({}).then(function (response) {
			console.log(response);
            
            $scope.rating_count=[];
            for(var j=0;j<response.data.length;j++){
                //$scope.rating_count[j]=response.data[j].rating;
                
                for(var i=0;i<5;i++){
                    if(response.data[j].rating==1){
                        response.data[j].count1=1;
                    }
                    if(response.data[j].rating==2){
                        response.data[j].count1=1;
                        response.data[j].count2=1;
                    }
                    if(response.data[j].rating==3){
                        response.data[j].count1=1;
                        response.data[j].count2=1;
                        response.data[j].count3=1;
                    }
                    if(response.data[j].rating==4){
                        response.data[j].count1=1;
                        response.data[j].count2=1;
                        response.data[j].count3=1;
                        response.data[j].count4=1;
                    }
                    if(response.data[j].rating==5){
                        response.data[j].count1=1;
                        response.data[j].count2=1;
                        response.data[j].count3=1;
                        response.data[j].count4=1;
                        response.data[j].count5=1;
                    }
                }	
            }
            $scope.feedback_list=response.data;
	    },function(response){
	    	console.log(response);
	    })

  };
  $scope.getfeedbacklist();

   $scope.comment = '';

   $scope.getFeedbackId = function (id) {
        $scope.crm_customer_feedback_id = id;
        console.log($scope.crm_customer_feedback_id);
    };

   $scope.add_comment = function () {
        addCrmComment({
            crm_customer_feedback_id: $scope.crm_customer_feedback_id,
            comment: $scope.comment
        }).then(function (response) {
            console.log(response);
            $scope.modal_dismiss_two();
            $scope.getfeedbacklist();
            $scope.comment='';
        /*},function (res) {
            console.log(res);*/
        });

   };

   $scope.get_feedback_for=function()
    {
        getFeedbackFor({}).then(function(response){
            $scope.feedback_for_list=response.data;
            console.log($scope.feedback_for_list);
        },function(response){
            console.log(response);
        });
    };
    $scope.get_feedback_for();

    $scope.$watch('auto_customer_id',function () {
        getNames({
            term:$scope.auto_customer_id,
            type:$scope.customer_feedback.type
        }).then(function (res) {
            auto_customer_arr=res.data;
            $scope.getId();
        })

    });
    $scope.getId=function () {
        $('#auto_cust_id').autocomplete({
            source:auto_customer_arr,
            select:function (event,ui) {
                $scope.auto_customer_id=ui.item.value;
                $scope.cust_id=ui.item.id;
                console.log($scope.cust_id);
                $scope.customer_feedback.type_id=ui.item.id;
                console.log($scope.customer_feedback.type_id);
            }
        })
    };

    /*$scope.customer_feedback.type_id=$scope.type_id;*/
    $scope.save_feedback=function () {
        addFeedback({
            crm_customer_feedback:$scope.customer_feedback
        }).then(function (response) {
            console.log(response);
            $scope.dismiss();
            $scope.getfeedbacklist();
            $scope.customer_feedback.type='';
            $scope.auto_customer_id='';
            $scope.customer_feedback.crm_description='';
            $scope.customer_feedback.crm_feedback_id='';
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

    $scope.current_modal = "crm_feedback";
    $scope.crm_feedback_permission_popup = function (po_id,po_status,po_type) {
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
            $scope.get_PO_list();
            $scope.modal_dismiss_two();
            $scope.active_lable = true;
            $scope.edit_activity(data.id);
        }
    });*/
    $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.getfeedbacklist();
            if(data.otp){
                $scope.modal_dismiss_two();
                $('#feedbackSuccess').fadeIn().delay(5000).fadeOut();
                $scope.feedback_success = "Feedback Deleted Successfully";
            }
        }
    });
    /*$scope.deleteCrmFeedbackList=function (id) {
        console.log('####################',id);
        deleteCrmFeedback({
            crm_customer_feedback_id:id
        }).then(function (response) {
            console.log(response);
            $scope.getfeedbacklist();
        });
    };*/
    
}]);



