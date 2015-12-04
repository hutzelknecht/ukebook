// Overview Component

angular.module('ukebook')
  .controller('SongbookCtrl',function($scope, $http, $interval){
    var scriptasaurus = ukeGeeks.scriptasaurus;
    $scope.fetchSongbook = function(){
      return $http.get('/api/songs').then(function(songs){
        $scope.songbook = songs.data;
        $interval(function() {
          scriptasaurus.init();
          scriptasaurus.runByClasses();
        }, 1000, 1);
      });
    };

    $scope.fetchSongbook();

  });


