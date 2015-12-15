angular.module('ukebook')
  .controller('AddSongCtrl', function($songs){
    this.title = '';
    this.addSong = $songs.create;
  })
  .directive('addSong',function(){
    return {
      templateUrl: 'songs/addsong.html',
      controller: 'AddSongCtrl',
      controllerAs: 'ctrl'
    };
  });
