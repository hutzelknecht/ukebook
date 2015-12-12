// Overview Component

angular.module('ukebook')
  .controller('OverviewCtrl',function($scope, $location, $auth){
      this.allSongs = function(){
        $location.url('/songbook');
      };
  });
