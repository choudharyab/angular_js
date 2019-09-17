'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('stopDigest', function () {
    return {
        link: function (scope) {
            var watchers;

            scope.$on('stop', function () {
                watchers = scope.$$watchers;
                scope.$$watchers = [];
            });

            scope.$on('resume', function () {
                if (watchers)
                    scope.$$watchers = watchers;
            });
        }
    };
}).directive('closeMyModal', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismiss = function() {
                element.modal('hide');
            };
            scope.product_dismiss = function() {
                element.modal('hide');
            };
        }
    }
}).directive('capitalize', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            var capitalize = function(inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            };
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
}).directive('closeModalTwo', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.modal_dismiss_two = function() {
                element.modal('hide');
            };
        }
    }
}).directive('closeModalThree', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.modal_dismiss_three = function() {
                element.modal('hide');
            };
        }
    }
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).directive('closeModalOne', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismiss_modal_one = function() {
                element.modal('hide');
            };
        }
    }
}).directive('closeOtpSuppReturnUpdate', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.otp_modal_dismiss = function() {
                element.modal('hide');
            };
        }
    }
}).directive('noOfPacketsPopup', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.dismiss_no_packt = function() {
                element.modal('hide');
            };
        }
    }
}).directive('closeAddProduct', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.close_add_product = function() {
                element.modal('hide');
            };
        }
    }
}).directive('uploadMyFile', function () {

  return {

      scope: true,        //create a new scope

      link: function (scope, el, attrs) {

          el.bind('change', function (event) {

              var files = event.target.files;

              //iterate files since 'multiple' may be specified on the element

              for (var i = 0; i < files.length; i++) {

                  //emit event upward

                  scope.$emit("selectedFile", { file: files[i] });

              }

          });

      }

  };

})
.directive('ngEnter', function () { //a directive to 'enter key press' in elements with the "ng-enter" attribute

        return function (scope, element, attrs) {

            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
