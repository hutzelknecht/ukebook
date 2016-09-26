angular.module('ukebook')
  .directive('printPdf', ['$rootScope', function($rootScope){
    return {
      restrict: 'E',
      template: '<button class="btn btn-default">print</button>',
      controller: 'printPdfCtrl',
      controllerAs: 'printCtrl'
    };
  }]);
