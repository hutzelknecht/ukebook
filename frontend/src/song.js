// Overview Component

angular.module('ukebook')
  .controller('SongCtrl',function($rootScope, $scope){
    let scriptasaurus = ukeGeeks.scriptasaurus;

    $scope.header = 'SONG';

    scriptasaurus.init();
    scriptasaurus.run();

  });



