"use strict";
angular.module('ukebook')
  .controller('SongListCtrl', function($rootScope, $scope, $routeSegment, $interval, $http, $songs) {
    $scope.songId = $routeSegment.$routeParams.id;
    $scope.fetchSongList = $songs.get;
    $scope.$songs = $songs;
    $rootScope.$watch('user', function(user) {
      if (user) {
        $interval($scope.fetchSongList, 0, 1);
      }
    });
  });
