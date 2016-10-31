angular.module('ukebook')
  .directive('printPdf', ['$rootScope', function($rootScope){
    return {
      restrict: 'E',
      templateUrl: 'songs/printPdf/printPdf.template.html',
      controller: 'PrintPdfCtrl',
      controllerAs: 'printCtrl',
      scope: {
        songId: '=?'
      }
    };
  }]);
