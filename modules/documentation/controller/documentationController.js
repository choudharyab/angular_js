var documentationModule = angular.module('documentationModule',[]);
documentationModule.controller('documentationController',['$rootScope','$http','$scope','$location','addFolderService','getFolderListService','getfileListService','copyFileService','commonService','deletePrivateFileService','folderlistFilterService',
	function($rootScope,$http,$scope,$location,addFolderService,getFolderListService,getfileListService,copyFileService,check_permission,deletePrivateFileService,folderlistFilterService){
	
	$scope.folder_data={
		private:false,
		public:true
	};

	$scope.upload_data={};
	var token_data=localStorage.getItem('token');
    $scope.files = [];

      $scope.get_folder_typelist=function(){
       	folderlistFilterService({}).then(function(response){
       		$scope.folderfilter_list = response.data;
       	},function(response){
       		console.log(response);
       	})
       };
       $scope.get_folder_typelist();


	$scope.folderlist = function(){
		getFolderListService({}).then(function(response){
			console.log(response);
			$scope.folder_list=response.data;
		},function(response){
			console.log(response);
		})
	};
	$scope.folderlist();

	$scope.add_folder_name = function(){
		//console.log($scope.folder_data);
		addFolderService({folder:$scope.folder_data}).then(function(response){
			console.log(response);
			$scope.folderlist();
			 $scope.dismiss();
			$('#folderSuccess').fadeIn().delay(5000).fadeOut();
                $scope.folder_success = "Folder Added Successfully";
                $scope.folder_error = "";
		},function(response){
			console.log(response);
			$('#folderError').fadeIn().delay(5000).fadeOut();
                $scope.folder_error = response.data.error;
		})
	};

	$scope.reset_folder = function(){
		$scope.folder_data={
			private:false,
		    public:true
		}
	};

	$scope.edit_folder = function(){

	};

	$scope.reset_upload = function(){
		$scope.upload_data={
			private:false,
		    public:false
		}
		$scope.files=[]
		 $scope.arr =[];
		$('#fileInput').val(null);
		$scope.show_msg=false;
	};

	

		$scope.folderdatalist = function(){
			$scope.public1=$scope.upload_data.public;
			$scope.private1=$scope.upload_data.private;
			console.log($scope.private1,$scope.public1);

		}


	
   $scope.arr =[];
    $scope.$on("selectedFile", function (event, args) {
        $scope.$apply(function () {
            $scope.files.push(args.file);
        });
        console.log(' $scope.files--->', $scope.files);
        $scope.arr =  $scope.files;
      //  console.log($scope.arr[0].name);

        
    });

     $scope.documents_upload = function()
    { $scope.show_msg=true;
       
        $http({
            method: 'POST',
            url: appUrl+'upload_files?length='+$scope.files.length+'&token='+token_data,
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("file_upload", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    console.log(data.files[i]);
					//$scope.images.push(data.files[i]);
					console.log('====>>>>',$scope.images);
                    //formData.append('uploadimages',$scope.images);
                    formData.append('uploadimages'+i, data.files[i]);
                }
                //formData.append("file_length", );
                console.log(data.files.length);

                return formData;
            },
            data: {model: $scope.upload_data,files: $scope.files}
        }).

        success(function (data, status, headers, config) {
        	 $scope.modal_dismiss_two();
            console.log("success!");
             $scope.getfiledata();
            $('#fileSuccess').fadeIn().delay(5000).fadeOut();
                $scope.file_success = "Data Uploaded Successfully";
                $scope.file_error = "";
                $scope.files=[];
        }).

        error(function (data, status, headers, config) {
            console.log("failed!");
            $('#fileError').fadeIn().delay(5000).fadeOut();
                $scope.file_error = response.data.error;
        });
    }

    $scope.search_id;
    $scope.getCOAData = function() {
      var data = localStorage.getItem('attachFileDataCOA');
      if(data != null){
        var cdata = JSON.parse(data);
        var file_list = [];
        $.each(cdata, function(index, value) {
          file_list.push(value.id);
        });
        $scope.search_id = file_list;
      } else {
        $scope.search_id = '';
      }
    }
    $scope.getCOAData();

    $scope.getfiledata=function(){
    	getfileListService({}).then(function(response){
        
        //alert(localStorage.getItem('attachFileDataCOA'))
    		console.log(response);
    		$scope.file_list=response.data;
        /*=================================================================*/
        $scope.private_folder=response.data.private_folders;
        $scope.public_folder=response.data.public_folders;
        /*=================================================================*/
    	},function(response){
    		console.log(response);
    	})
    };
    $scope.getfiledata();

    $scope.copyfile = function(file_name,type){
    	
    	copyFileService({file_name:file_name,type:type}).then(function(response){
    		console.log(response);
    		$('#fileCopySuccess').fadeIn().delay(5000).fadeOut();
                $scope.file_copy_success = "File Copy Successfully";
                $scope.file_copy_error = "";
    		 $scope.getfiledata();
    	},function(response){
    		console.log(response);
    		$('#fileCopyError').fadeIn().delay(5000).fadeOut();
                $scope.file_copy_error = response.data.msg;
    	})
    };

    $scope.deltePrivateFile = function(id){
    	deletePrivateFileService({file_id:id}).then(function(response){
    		console.log(response);
    		$('#filedeleteSuccess').fadeIn().delay(5000).fadeOut();
                $scope.file_delete_success = "File Deleted Successfully";
                $scope.file_delete_error = "";
    		$scope.getfiledata();
    	},function(response){
    		console.log(response);
    		$('#filedeleteError').fadeIn().delay(5000).fadeOut();
                $scope.file_delete_error = response.data.error;
    	})
    };


     $scope.current_modal = 'public_file';
          $scope.product_permission_popup = function (pro_id,pro_status,pro_type) {
          check_permission.check_status(pro_id,pro_status,pro_type,$scope.current_modal);
           $scope.comment ={};
           $scope.otp_object = {};
       };
          $scope.product_generate_password = function () {
          check_permission.generate_otp($scope.comment);
          $scope.comment ={};
       };
          $scope.product_verify_otp = function () {
          check_permission.verify_permission_otp($scope.otp_object, '');
          $scope.otp_object = {};
       };
    
       $scope.$on('updateListing', function (event, data) {
        if(data.model==$scope.current_modal){
            $scope.action_type = data.type;
            $scope.getfiledata();
            if(data.otp){
            $scope.dismiss();
            $('#filedeleteSuccess').fadeIn().delay(5000).fadeOut();
            $scope.file_delete_success = 'File Deleted Successfully';
            }
        }
    });

       $scope.get_change_list = function(){
       	console.log('f_id-->',$scope.folder_name);
       	getfileListService({folder_name:$scope.folder_name}).then(function(response){
    		console.log(response);
    		$scope.file_list=response.data;
    	},function(response){
    		console.log(response);
    	})
       };

       $scope.selectfile={};

       $scope.filepass = function(){

       	$rootScope.$broadcast('selected_file',$scope.selectfile.value);    
       	$scope.dismiss();

      };

      $scope.file_data = [];
      $scope.public_data=[];

      $scope.filepass1 = function(){
        
        for(var i=0;i<$scope.private_folder.length;i++){
          if($scope.private_folder[i].value){
            $scope.file_data.push($scope.private_folder[i].value);            
          }
          if(i==$scope.private_folder.length-1){
            $rootScope.$broadcast('selected_file1',JSON.stringify($scope.file_data));  
          }
        }

        for(var i=0;i<$scope.public_folder.length;i++){
          if($scope.public_folder[i].value){
            $scope.file_data.push($scope.public_folder[i].value);            
          }
          if(i==$scope.public_folder.length-1){
            $rootScope.$broadcast('selected_file1',JSON.stringify($scope.file_data));  
          }
        }
        
        $scope.file_data=[];
        $scope.dismiss();
      };


      /*$scope.privatefile = function(){
        
        for(var i=0;i<$scope.private_folder.length;i++){
          if($scope.private_folder[i].value){
            $scope.file_data.push($scope.private_folder[i].value);            
          }
          if(i==$scope.private_folder.length-1){
            //$rootScope.$broadcast('selected_file1',JSON.stringify($scope.file_data));  
            $rootScope.$broadcast('selected_file1',$scope.file_data);
          }
        }
        //$scope.dismiss();
      };

      $scope.publicfile=function(){

        for(var i=0;i<$scope.public_folder.length;i++){
          if($scope.public_folder[i].value){
            $scope.public_data.push($scope.public_folder[i].value);            
          }
          if(i==$scope.public_folder.length-1){
            //$rootScope.$broadcast('selected_file2',JSON.stringify($scope.public_data));
            $rootScope.$broadcast('selected_file2',$scope.public_data);  
          }
        }
      }

      $scope.filepass1=function(){
        $scope.privatefile();
        $scope.publicfile();
        $scope.dismiss();
      }*/
}]);