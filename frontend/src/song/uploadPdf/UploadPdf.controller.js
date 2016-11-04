angular.module('ukebook')
  .controller('UploadControlCtrl', function($scope, upload){

    $scope.$watch('songId', function(songId) {
      this.uploader = songId ? upload.createUploader(songId, null) : null;
    }.bind(this));
    
  });
