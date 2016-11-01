"use strict";
angular.module('ukebook')
  .controller('SongListCtrl', function($rootScope, $scope, $routeSegment, $interval, $http, songApi) {
    $scope.songId = $routeSegment.$routeParams.id;
    $scope.fetchSongList = songApi.get;
    $scope.$songs = songApi;
    $rootScope.$watch('user', function(user) {
      if (user) {
        $interval($scope.fetchSongList, 0, 1);
      }
    });
  });
