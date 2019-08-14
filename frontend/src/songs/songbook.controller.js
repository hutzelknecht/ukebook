// Overview Component

angular.module('ukebook')
  .controller('SongbookCtrl',function($scope, $http, $interval, $routeSegment){

    var scriptasaurus = ukeGeeks.scriptasaurus;

    $scope.fetchSongbook = function(){
      return $http.get('/api/song').then(function(songs){
        $scope.songbook = songs.data;
        $scope.columns = 1;
        if ($routeSegment.name == 'songbook2') {
          $scope.columns = 2;
        }
        $interval(function() {
          scriptasaurus.init();
          scriptasaurus.runByClasses();
          $interval(function() {
            window.status = 'rendered';
            console.log('rendered');
          }, 2000, 1);
        }, 1000, 1);
      });
    };

    $scope.fetchSongbook();

  });


