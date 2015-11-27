// Overview Component

angular.module('ukebook')
  .controller('SongCtrl',function($rootScope, $scope, $routeSegment, $interval, $http){

    var scriptasaurus = ukeGeeks.scriptasaurus;

    $scope.songId = $routeSegment.$routeParams.id;

    $scope.fetchSong = function(){
      return $http.get('/api/songs/' + $scope.songId).then(function(song){
        $scope.data = song.data.tab;
        $interval(function() {
          scriptasaurus.init();
          scriptasaurus.run();
        }, 0, 1);
      });
    };

  })
  .directive('ukeSongText',function(){
    return {
      restrict: 'E',
      templateUrl: 'song.html',
      controller: 'SongCtrl',
      link: function($scope, $element, $attributes){

        $scope.fetchSong();

      }
    }
  });



