// Overview Component

angular.module('ukebook')
  .controller('SongbookCtrl',function($rootScope, $scope, $http, $interval, $routeSegment){

    var scriptasaurus = ukeGeeks.scriptasaurus;

    $scope.fetchSongbook = function(){
      return $http.get('/api/songs').then(function(songs){
        $scope.songbook = songs.data;
        $scope.columns = 1;
        if ($routeSegment.name == 'songbook2') {
          $scope.columns = 2;
          $rootScope.twoColumns = true;
        } else {
          $rootScope.twoColumns = false;
        }
        $interval(function() {
          scriptasaurus.init();
          scriptasaurus.runByClasses();
          // $('.ub-two-column-content .ugs-source-wrap').columnize({columns: 2});
        }, 1000, 1);
      });
    };

    $scope.fetchSongbook();

  });


