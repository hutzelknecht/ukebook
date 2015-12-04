// Overview Component

angular.module('ukebook')
  .controller('OverviewCtrl',function($scope, $location){
      this.allSongs = function(){
        $location.url('/songbook');
      };
  });
