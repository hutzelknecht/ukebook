// Overview Component

angular.module('ukebook')
  .controller('SongListCtrl',function($rootScope, $scope, $routeSegment, $interval, $http){

    $scope.songId = $routeSegment.$routeParams.id;

    $scope.fetchSongList = function(){
      var fieldsFilter = '?filter[fields][title]=true&filter[fields][id]=true'
      return $http.get('/api/songs' + fieldsFilter).then(function(songs){
        $scope.songs = songs.data;
      });
    };

  })
  .directive('ukeSongList',function(){
    return {
      restrict: 'E',
      templateUrl: 'songlist.html',
      controller: 'SongListCtrl',
      link: function($scope, $element, $attributes){

        $scope.fetchSongList();

      }
    }
  });



