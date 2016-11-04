angular.module('ukebook')
  .directive('downloadButton', function(){
    return {
      restrict: 'E',
      controller: 'DownloadPdfCtrl',
      controllerAs: 'downloadCtrl',
      templateUrl: 'song/downloadPdf/downloadPdf.template.html',
      scope: {
        songId: '='
      }
    };
  });
