angular.module('ukebook')
  .directive('ukeSongText',function(){
    return {
      restrict: 'E',
      transclude: 'element',
      template: '<pre>{{songCtrl.song.tab}}</pre>',
      controller: 'ukeSongTextCtrl',
      controllerAs: 'songCtrl',
      link: function(scope, element, attr, songCtrl, transclude){
        scope.element = element;
        scope.transclude = transclude;
      }
    }
  });
