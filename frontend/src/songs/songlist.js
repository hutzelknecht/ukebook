// Overview Component

angular.module('ukebook')
  .controller('SongListCtrl',function($rootScope, $scope, $routeSegment, $interval, $http, $songs){

    $scope.songId = $routeSegment.$routeParams.id;

    $scope.fetchSongList = $songs.get;

    $scope.$songs = $songs;

  })
  .directive('ukeSongList',function(){
    return {
      restrict: 'E',
      templateUrl: 'songs/songlist.html',
      controller: 'SongListCtrl',
      link: function($scope, $element, $attributes){

        $scope.fetchSongList();

      }
    }
  });



