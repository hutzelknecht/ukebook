angular.module('ukebook')
  .controller('SongCtrl', [
    '$rootScope',
    '$scope',
    '$location',
    '$routeSegment',
    '$interval',
    '$http',
    '$auth',
    'songApi',
    'upload',
    function($rootScope, $scope, $location, $routeSegment, $interval, $http, $auth, songApi, upload) {
    var scriptasaurus = ukeGeeks.scriptasaurus;
    var tabs;
    this.songId = $routeSegment.$routeParams.id;
    this.fetchSong = function() {
      // var token = 'FqUuPZHx0gddsokoT4UFeHVf6BlxWiJOsi12qpLT1Ewds7bJ0ZGdvahAV1ode5Vx';
      return $http.get('/api/songs/' + this.songId).then(function(song) {
        this.song = song.data;
        this.triggerRelink(this.song.tab);
      }.bind(this));
    };
    this.save = function() {
      $http.put('/api/songs/' + this.songId, this.song).then(function(response) {
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
        $('.ub-two-column-content .ugs-source-wrap').columnize({columns: 2});
      }.bind(this));
    };
  }]);
