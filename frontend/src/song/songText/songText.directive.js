angular.module('ukebook')
  .directive('songText',function(){
    return {
      restrict: 'E',
      transclude: 'element',
      template: '<pre>{{songCtrl.song.tab}}</pre>',
      controller: 'SongTextCtrl',
      controllerAs: 'songTextCtrl',
      link: function(scope, element, attr, songCtrl, transclude){
        scope.element = element;
        scope.transclude = transclude;
      }
    }
  });
