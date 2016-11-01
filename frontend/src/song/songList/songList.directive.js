
angular.module('ukebook')
  .directive('songList', function() {
    return {
      restrict: 'E',
      templateUrl: 'songs/songList/songList.template.html',
      controller: 'SongListCtrl',
      link: function($scope, $element, $attributes) {
        $scope.fetchSongList();
      }
    };
  });
