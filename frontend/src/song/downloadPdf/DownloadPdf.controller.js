angular.module('ukebook')
  .controller('DownloadPdfCtrl', function($scope, $http, $q){

    // TODO: get pdf url with something like this beforehand
    // http://localhost:3000/api/File?filter[where][songId]=44

    // TODO: think about handling no urls

    // TODO: maybe move this to a service and call from song ctrl
    $scope.$watch('songId', function(songId){
      if (songId) {
        // getUrl().then(function(url){
        //   this.url = url;
        // }.bind(this), function(){
        //   this.url = null;
        // }.bind(this));
      }
    }.bind(this));

    function getUrl(songId){
      songId = songId || $scope.songId;
      return $q(function(resolve, reject){
        if (!songId) reject();
        $http.get('/api/File?filter[fields][url]=true&filter[where][songId]=' + songId).then(function(response){
          var url = response.data && response.data[0] && response.data[0].url;
          if (url) {
            resolve(url);
          } else {
            reject('no file for song found');
          }
        });
      });
    }

  });
