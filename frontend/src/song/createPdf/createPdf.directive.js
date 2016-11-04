angular.module('ukebook')
  .directive('printPdf', ['$rootScope', function($rootScope){
    return {
      restrict: 'E',
      templateUrl: 'song/createPdf/createPdf.template.html',
      controller: 'CreatePdfCtrl',
      scope: {
        songId: '=?'
      }
    };
  }]);
