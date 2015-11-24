// Overview Component

angular.module('ukebook')
  .controller('SongCtrl',function($rootScope, $scope, $routeSegment){
    let scriptasaurus = ukeGeeks.scriptasaurus;
    $scope.header = $routeSegment.$routeParams.id;
    //scriptasaurus.init();
    //scriptasaurus.run();
  })
  .directive('song',function(){
    return {
      template: '{{data}}',
      controller: 'SongCtrl'
    }
  });



