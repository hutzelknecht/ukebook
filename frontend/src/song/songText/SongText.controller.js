"use strict";
angular.module('ukebook').controller('SongTextCtrl', ['$rootScope', '$scope', '$location', '$routeSegment', '$interval', '$http', '$auth', 'songApi', 'upload', function($rootScope, $scope, $location, $routeSegment, $interval, $http, $auth, songApi, upload) {
  var scriptasaurus = ukeGeeks.scriptasaurus;
  var tabs;
  this.songId = $routeSegment.$routeParams.id;
  this.fetchSong = function() {
    return $http.get('/api/song/' + this.songId).then(function(song) {
      this.song = song.data;
      this.triggerRelink(this.song.tab);
    }.bind(this));
  };
  this.save = function() {
    $http.put('/api/song/' + this.songId, this.song).then(function(response) {
      this.song = response.data;
      this.triggerRelink(this.song.tab);
      songApi.get();
    }.bind(this));
  };
  this.delete = function() {
    songApi.delete(this.songId).then(function() {
      $location.url('/');
    });
  };
  this.uploader = upload.createUploader(this.songId, $scope);
  this.user = $auth.getUser();
  this.fetchSong();
  var previousContent = null;
  this.triggerRelink = function() {
    if (previousContent) {
      previousContent.remove();
      previousContent.remove();
      previousContent = null;
    }
    ukeGeeks.scriptasaurus.init();
    $scope.transclude(function(clone) {
      var parentEl = $scope.element.parent();
      parentEl.append(clone);
      previousContent = clone;
      ukeGeeks.scriptasaurus.run(this.song.tab);
      // $('.ub-two-column-content .ugs-source-wrap').columnize({columns: 2});
    }.bind(this));
  };
}]);
