angular.module('ukebook')
  .directive('songText',function(){
    return {
      restrict: 'E',
      transclude: 'element',
      template: '<pre ng-class="[\'cols\' + songTextCtrl.columns]">{{songCtrl.song.tab}}</pre>',
      controller: 'SongTextCtrl',
      controllerAs: 'songTextCtrl',
      scope: {
        columns: '=?'
      },
      link: function(scope, element, attr, songCtrl, transclude){
        scope.element = element;
        scope.transclude = transclude;
      }
    }
  });
