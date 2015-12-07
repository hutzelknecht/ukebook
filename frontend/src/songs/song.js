// Overview Component

angular.module('ukebook')
  .controller('SongCtrl',function($rootScope, $scope, $routeSegment, $interval, $http, $auth){

    var scriptasaurus = ukeGeeks.scriptasaurus;
    var tabs;

    this.songId = $routeSegment.$routeParams.id;

    this.fetchSong = function(){
      return $http.get('/api/songs/' + this.songId).then(function(song){
        this.song = song.data;
        this.triggerRelink(this.song.tab);
      }.bind(this));
    };

    this.save = function(){
      $http.put('/api/songs/' + this.songId, this.song).then(function(response){
        this.song = response.data;
        this.triggerRelink(this.song.tab);
      }.bind(this));
    };

    this.user = $auth.getUser();

    this.fetchSong();

    var previousContent = null;

    this.triggerRelink = function() {
      if (previousContent) {
        previousContent.remove();
        previousContent = null;
      }
      ukeGeeks.scriptasaurus.init();
      $scope.transclude(function (clone) {
        var parentEl = $scope.element.parent();
        parentEl.append(clone);
        previousContent = clone;

        ukeGeeks.scriptasaurus.run(this.song.tab);

      }.bind(this));

    };

  })
  .directive('ukeSongText',function($rootScope, $interval){
    return {
      restrict: 'E',
      transclude: 'element',
      template: '<pre>{{songCtrl.song.tab}}</pre>',
      controller: 'SongCtrl',
      controllerAs: 'songCtrl',
      link: function(scope, element, attr, songCtrl, transclude){
        scope.element = element;
        scope.transclude = transclude;
      }
    }
  });



