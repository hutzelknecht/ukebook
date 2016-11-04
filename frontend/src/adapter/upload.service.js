angular.module('ukebook')
  .service('upload', ['$rootScope', 'FileUploader', function($rootScope, FileUploader){

    var createUploader = function(songId, $scope){
      var uploader = new FileUploader({
        scope: $rootScope, // to automatically update the html. Default: $rootScope
        url: '/api/files/upload?songId=' + songId,
        formData: [
          { songId: songId }
        ]
      });
      uploader.onAfterAddingFile = function(item) {
        var fileExtension = '.' + item.file.name.split('.').pop();

        item.file.name = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
      };
      return uploader;
    };

    return {
      createUploader: createUploader
    };

  }]);
