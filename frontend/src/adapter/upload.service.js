angular.module('ukebook')
  .service('upload', ['$rootScope', 'FileUploader', function($rootScope, FileUploader){

    var createUploader = function(songId, $scope){
      return new FileUploader({
        scope: $rootScope, // to automatically update the html. Default: $rootScope
        url: '/api/files/upload?songId=' + songId,
        formData: [
          { songId: songId }
        ]
      });
    };

    return {
      createUploader: createUploader
    };

  }]);
