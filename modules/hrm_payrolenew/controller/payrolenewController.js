payrollModule=angular.module('payrollModule',[]);
payrollModule.controller('payrollController',['$rootScope','$scope','$location','generatePayroll','getPayrollListing','getPayrollGenerateListing',
	function($rootScope,$scope,$location,generatePayroll,getPayrollListing,getPayrollGenerateListing){
	/*$scope.salary_comp_list;*/
    var comp_list=[];
    var comp_allow=[];
    $scope.salary_comp_allowance;
    
    $scope.get_payroll_listing=function(){
        getPayrollListing({}).then(function(response){
            $rootScope.payroll_listing=response.data;
        },function(response){
            console.log(response);
        });
    };

    $scope.get_payroll_listing();

	$scope.process_payroll=function(){
    	generatePayroll({
    		from_date:$scope.from_date,
    		to_date:$scope.to_date
    	}).then(function(response){
            $scope.modal_dismiss_two();
            $scope.get_payroll_listing();
            /*$('#loanSuccess').fadeIn().delay(5000).fadeOut();
            $scope.loan_success = "Loan Details Added Successfully";
            $scope.loan_error = "";*/
        },function(response){
            console.log(response);
            /*$scope.loan_success='';
            $('#loanError').fadeIn().delay(5000).fadeOut();
            $scope.loan_error=response.data.error[0];*/
        });
    };

    /*$scope.getSalaryComponents=function(){
		getSalaryService({}).then(function (response){			
			$scope.salary_comp_list=response.data.salary_configuration;
            comp_list=response.data.salary_configuration;
			$scope.salary_comp_allowance=response.data.allowance;
            comp_allow=response.data.allowance;

		},function(response){
			console.log(response);
		})
	};
	$scope.getSalaryComponents();*/

    

$scope.next_payroll_page=function(process_date,month){
    console.log('process_date--->',process_date);
    //$scope.obj={'salary_conf':[],'show_data':[],'arr':[]};

    //$scope.obj.show_data=[];
	getPayrollGenerateListing({
    		processed_date:process_date
    	}).then(function(response){
    	    console.log('response----->',response);
    		$rootScope.payroll_generate_listing=response.data;
            var list=response.data;
            $rootScope.column_data=response.data.columns;
            $rootScope.result_data=response.data.results;            

    		$location.path('/hrm_payroll');
            console.log('=========',month.split('-')[0]);
            $rootScope.select_month=month.split('-')[0];
        },function(response){
            console.log(response);
        });
};

$scope.check_payroll_status=function(){

}
/*$scope.payroles = [];
$scope.getsalarylisting=function(){        
        getpayrollService({}).then(function (res){
            console.log('res------------->', res.data);
            for(var i=0;i<res.data.length;i++){     
             $scope.obj = {'salary_configurations':[],'salary_allowances':[]};          
                $scope.obj.uname = res.data[i].uname;
                $scope.obj.net_salary = res.data[i].net_salary;
                if(res.data[i].emp_salaries.length > 0){
                    $scope.obj.employee_id = res.data[i].emp_salaries[0].employee_id;
                    $scope.obj.category = res.data[i].emp_salaries[0].category;
                    $scope.obj.gross_amount = res.data[i].emp_salaries[0].gross_amount;
                    console.log('~~~~~~~~~~~~~~',comp_list.length);
                    console.log('@@@@@@@@@@@@@@',res.data[i].emp_salaries.length);
                    for(var k=0;k<comp_list.length;k++){
                        for(var j=0;j<res.data[i].emp_salaries.length;j++){

                            console.log('QQQQQQQQQQQ',res.data[i].emp_salaries[j].salary.salary);
                            console.log('PPPPPPPPPPP',comp_list[k].salary.salary);
                            if(res.data[i].emp_salaries[j].salary.salary == comp_list[k].salary.salary){
                              $scope.obj.salary_configurations.push(res.data[i].emp_salaries[j].break_down_amount);
                              break;
                            }else{
                                if(j==res.data[i].emp_salaries.length-1){
                                         $scope.obj.salary_configurations.push(0);
                                }                           
                             // break;
                            }
                        }
                    }
                    //console.log('$scope.obj--->',$scope.obj);
                    //$scope.payroles.push($scope.obj);
                    //console.log('$scope.payroles--->',$scope.payroles);
                }else{
                    $scope.obj.employee_id = "";
                    $scope.obj.category = "";
                    $scope.obj.gross_amount = "";
                    
                    for(var k=0;k<comp_list.length;k++){                          
                              $scope.obj.salary_configurations.push(0);                         
                    }
                  //  console.log('$scope.obj--->',$scope.obj);
                    //$scope.payroles.push($scope.obj);
                    //console.log('$scope.payroles--->',$scope.payroles);
                }
             // console.log('res.data.allowances.length------------------',res.data[i].allowances.length);
                if(res.data[i].allowances.length > 0){
                    for(var m=0;m<$scope.comp_allow.length;m++){
                  for(var l=0;l<res.data[i].allowances.length;l++){
                    // console.log('res.data[i].allowances[l].allowance------------------',res.data[i].allowances[l].allowance);
                    
                    //   console.log('$scope.salary_comp_allowance[m].allowance------------------',$scope.salary_comp_allowance[m].allowance);
                        if(res.data[i].allowances[l].allowance == 'Others'){
                         //  console.log('others called');
                           $scope.obj.others = res.data[i].allowances[l].allowance_amount;
                           break;
                        }else if(res.data[i].allowances[l].allowance == $scope.comp_allow[m].allowance){
                           $scope.obj.salary_allowances.push(res.data[i].allowances[l].allowance_amount);
                           break;
                        }else{
                            if(l==res.data[i].allowances.length-1){
                                        $scope.obj.salary_allowances.push(0);
                            } 
                             
                            // break;
                        }
                    }
                  } 
                  console.log('$scope.obj--->',$scope.obj);
                }else{
                    $scope.obj.others = 0;
                    console.log('$scope.obj--->',$scope.obj);
                }

                if(res.data[i].tax_deduction.length > 0){
                    for(var n=0;n<res.data[i].tax_deduction.length;n++){
                        if(res.data[i].tax_deduction[n].deduction == 'PT'){
                            $scope.obj.pt = res.data[i].tax_deduction[n].deduction_amount;
                        }else if(res.data[i].tax_deduction[n].deduction == 'TDS'){
                            $scope.obj.tds = res.data[i].tax_deduction[n].deduction_amount;
                        }else{
                            $scope.obj.pt = 0;
                            $scope.obj.tds = 0;
                        }
                    }
                }else{
                    $scope.obj.pt = 0;
                    $scope.obj.tds = 0;
                }

                $scope.payroles.push($scope.obj);
                console.log('$scope.payroles------->',$scope.payroles);
                 
            }       
               
            
        //  }
        },function(res){
            console.log(res);
        })
    };*/
    
   /* $scope.getsalarylisting=function(){
    	getpayrollService({}).then(function(response){
            console.log('res------------->', response.data);
            $scope.payroll_listing=response.data;
        },function(response){
            console.log(response);
        });
    };*/
	//$scope.getsalarylisting();

    $scope.pdf_gen=function(index){
        $scope.print_payroll_pdf($rootScope.payroll_generate_listing.results[index]);
        //console.log(list[index].id);
    };

$scope.print_payroll_pdf = function (salary_data1) {
     
        //$scope.warehouse_details = JSON.parse(localStorage.getItem('warehouse_info'));
        //console.log('warehouse_info-->',$scope.warehouse_details);
        $scope.obj=salary_data1.salary_data;
        console.log('data',JSON.stringify(salary_data1));

        console.log('$rootScope.obj',$scope.obj);

        /*angular.forEach($scope.obj,function(value,key){
                  delete $scope.obj['PF'];
                  delete $scope.obj['DA'];
                  delete $scope.obj['HRA'];
                  delete $scope.obj['MA'];
                  delete $scope.obj['BASIC'];
                  delete $scope.obj['CA'];
                  delete $scope.obj['PT'];
                  delete $scope.obj['TDS'];
                  delete $scope.obj['LOP'];
            });*/
        /*for(var i=0;i<$rootScope.salary_result.length;i++){

        }*/

        console.log('$rootScope.obj',$scope.obj);
        
        //var other_allowances=
        
        //var total_earnings  = parseFloat($rootScope.result_data.salary_data.basic + $rootScope.result_data.salary_data.DA + $rootScope.result_data.salary_data.HRA + $rootScope.result_data.salary_data.MA + $rootScope.result_data.salary_data.CA + $rootScope.result_data.salary_data.Others);
        //var total_deductions=parseFloat($rootScope.result_data.salary_data.PF + $rootScope.result_data.salary_data.PT + $rootScope.result_data.salary_data.TDS + $rootScope.result_data.salary_data.LOP);

        //console.log('total_earnings',total_earnings);
        //console.log('total_deductions',total_deductions);

        /*if(debit_data.product.tax_rate.tax_name != 'GST'){
                  $scope.gst_amount='-';
                  $scope.gst_rate = '-';
                  $scope.igst_rate= debit_data.product.tax_rate.tax_rate + '%';
                  $scope.igst_amount= tax_amount.toFixed(2);
        }
        else{
                  $scope.gst_amount = (tax_amount/2).toFixed(2);
                  $scope.gst_rate = debit_data.product.tax_rate.tax_rate + '%';
                  $scope.igst_rate = '-';
                  $scope.igst_amount = '-'; 
        }*/


        //------------------new pdf format----------------------//

        var dd = {
    info: {
        title: 'docs title'
    },
    pageSize: 'A4',
    alignment: 'center',
    pageOrientataion: 'portrait', //landscape
    pageMargins: [10, 10, 10, 10],
    header: function(currentPage, pageCount) {
        return {
            text: currentPage.toString() + '/' + pageCount,
            margin: [0, 0, 0, 0]
        }
    },
    footer: [],
      content: [{
        table: {

            body: [
               [{
                    image: 'sampleImage.jpg',
                    width: 60,
                    height: 60,
                    border: [true, true, false, false],
                    },{
                   stack: [
                                'R.T.PHARMA\n',
                                {
                                
                                      text: 'S-22,1st FLOOR,SHIVAJI PARK MKT,WEST PUMJABI BAGH,NEW DELHI-110026 \nPH.: 011-25229676/25229677 E-mail : info@rtpharma.com\nWebsite : www.rtpharma.com',
                                        alignment: 'center', 
                                        bold: false,
                                        color:'#296F8B',
                                        fontSize:10,
                                        
                                },
                                
                            ],
                    alignment: 'center',
                    colSpan:2,
                    color:'#296F8B',
                    bold: true,
                    fontSize:18,
                     margin: [0, 0, 45, 0],
                    border: [false, true, false, false]
                },{},
                {
                    text: '',
                    style: 'tableHeader',
                     
                    border: [false, true, true, true],
                } ],
                
                
                 [{
                 
                    text: [
                                'Salary Slip for period : ',
                                {
                                
                                      text: $scope.payroll_listing.start_date+'-'+$scope.payroll_listing.end_date,
                                      alignment: 'left' ,
                                      color:'#296F8B',
                                      bold: false
                                        
                                },
                              
                              
                            ],
                    colSpan: 4,
                    alignment: 'center',
                    bold: true,
                     fontSize:11,
                      fillColor:'#F4F4F4',
                     color:'#296F8B',
                
                }, {}, {},{}],
                
                
                 [{
                 
                    text: [
                                'Name : ',
                                {
                                
                                      text: salary_data1.employee_data.employee_name,
                                      alignment: 'left' ,
                                      color:'#296F8B',
                                      bold: false
                                        
                                },
                              
                              
                            ],
                    colSpan: 4,
                    alignment: 'left',
                    bold: true,
                     fontSize:11,
                     
                     color:'#296F8B',
                
                }, {}, {},{}],
                 
                [{
                   text: [
                                'Employee No : ',
                                {
                                
                                      text: salary_data1.employee_data.employee_code+'\n',
                                      alignment: 'left' ,
                                      color:'#296F8B',
                                      bold: false
                                        
                                },
                                {
                                
                                      text: 'Location :\nPF No. :\nUAN :\nBank A/c No. :',
                                      alignment: 'left' ,
                                      color:'#296F8B',
                                      bold: false
                                        
                                },
                              
                              
                            ],
                    alignment: 'left',
                    bold: true,
                    fontSize:11,
                    colSpan:2,
                    color:'#296F8B',
                    
                },{}, 
                
                 {
                   text: [
                               
                                {
                                
                                      text: 'No. of Days :\nNo. of Hours Leave :\n\n\nRequried No. of Hours :',
                                      alignment: 'left' ,
                                      color:'#296F8B',
                                      bold: false
                                        
                                },
                               
                              
                              
                            ],
                    alignment: 'left',
                    bold: true,
                    fontSize:11,
                    colSpan:2,
                    color:'#296F8B',
                    
                  
                }, {}],
                
                
                
               
                [{
                    text: 'Earnings',
                    style: 'tableHeader',
                    fillColor:'#F4F4F4',
                    alignment: 'left',
                    color:'#296F8B',
                    fontSize:11,
                    colSpan:2,
                    bold: true
                    
                },  {}, 
                
                {
                    text: 'Deductions',
                    style: 'tableHeader',
                     fillColor:'#F4F4F4',
                    alignment: 'left',
                    color:'#296F8B',
                    fontSize:11,
                     colSpan:2,
                    bold: true
                }, {}],
               
                 [{
                    text: 'Basic Salary :\n\nDearness Allowance :\n\nHouse Rent Allowance :\n\nMedical Allowance :\n\nConvayence Allowance :\n\nOthers :\n\nBonus :\n\n',
                   color:'#296F8B',
                   fontSize:11,
                     border: [true, false, false, false],
                    alignment: 'left'
                   
                    
                },  {
                     text: salary_data1.salary_data.BASIC+'\n\n'+salary_data1.salary_data.DA+'\n\n'+salary_data1.salary_data.HRA+'\n\n'+salary_data1.salary_data.MA+'\n\n'+salary_data1.salary_data.CA+'\n\n'+salary_data1.salary_data.Others,
                    color:'#296F8B',
                    fontSize:11,
                    border: [false, true, true, true],
                    alignment: 'right'
                  
                }, 
                
               {
                    text: 'EPF Contribution :\n\nProfessional Tax :\n\nTDS :\n\nLOP :\n\nOthers :\n\n',
                   color:'#296F8B',
                   fontSize:11,
                   border: [true, true, false, false],
                    alignment: 'left'
                   
                    
                },  {
                    text: salary_data1.salary_data.PF+'\n\n'+salary_data1.salary_data.PT+'\n\n'+salary_data1.salary_data.TDS+'\n\n'+$rootScope.payroll_generate_listing.lop+'\n\n',
                    color:'#296F8B',
                    fontSize:11,
                    border: [false, true, true, true],
                    alignment: 'right'
                  
                }
                ],
                
                
                [{
                    text: 'Total',
                    bold: true,
                    fontSize:11,
                    color:'#296F8B',
                    border: [true, true, false, false],
                     fillColor:'#F4F4F4',
                    alignment: 'left'
                   
                    
                },  {
                    text: '18,015',
                    bold: true,
                    fontSize:11,
                    color:'#296F8B',
                      border: [false, true, false, false],
                       fillColor:'#F4F4F4',
                    alignment: 'right'
                  
                }, 
                {
                   text: 'Total',
                    bold: true,
                    fontSize:11,
                    color:'#296F8B',
                     border: [true, true, false, false],
                      fillColor:'#F4F4F4',
                    alignment: 'left'
                  
                }, {
                    text: '1200',
                    bold: true,
                    fontSize:11,
                    color:'#296F8B',
                     fillColor:'#F4F4F4',
                     border: [false, true, true, true],
                    alignment: 'right'
                }],
                
                [{
                    text: '',
                    bold: true,
                    fontSize:11,
                    color:'#296F8B',
                    border: [true, true, false, false],
                     fillColor:'#F4F4F4',
                     colSpan:2,
                    alignment: 'left'
                   
                    
                },{}, 
                
                {
                   text: 'Net Pay',
                    bold: true,
                    fontSize:11,
                    color:'#296F8B',
                     border: [true, true, false, false],
                      fillColor:'#F4F4F4',
                    alignment: 'left'
                  
                }, {
                    text: '16,815',
                    bold: true,
                    fontSize:11,
                    color:'#296F8B',
                     fillColor:'#F4F4F4',
                     border: [false, true, true, true],
                    alignment: 'right'
                }],
                
                
                 [{
                 
                    text: [
                                'Remarks : ',
                                {
                                
                                      text: '',
                                      alignment: 'left' ,
                                      color:'#296F8B',
                                      bold: false
                                        
                                },
                              
                              
                            ],
                    colSpan: 4,
                    alignment: 'left',
                    bold: true,
                     fontSize:11,
                   
                     color:'#296F8B',
                
                }, {}, {},{}],
                
                   [{
                 
                    text: [
                             
                                {
                                
                                      text: '\n\n\n\n\n',
                                      alignment: 'left' ,
                                      color:'#296F8B',
                                      bold: false
                                        
                                },
                              
                              
                            ],
                    colSpan: 4,
                    alignment: 'left',
                    bold: true,
                    fontSize:11,
                   
                    color:'#296F8B',
                
                }, {}, {},{}]
                
               
                
            ]
        },
        
            layout: {
            
                hLineColor: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? '#296F8B' : '#296F8B';
                },
                vLineColor: function (i, node) {
                    return (i === 0 || i === node.table.widths.length) ? '#296F8B' : '#296F8B';
                },
                
            }
    
      }
   ]
   
   
}      
   

      pdfMake.createPdf(dd).download(salary_data1.employee_data.employee_code+'/'+ salary_data1.employee_data.employee_name+'.pdf');
    }







}]);



