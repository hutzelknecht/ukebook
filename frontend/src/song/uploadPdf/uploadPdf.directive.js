angular.module('ukebook')
  .directive('uploadControl', function(){
    return {
      restrict: 'E',
      templateUrl: 'song/uploadPdf/uploadPdf.template.html',
      controller: 'UploadControlCtrl',
      controllerAs: 'uploadCtrl',
      scope: {
        songId: '=*'
      }
    }
  });
