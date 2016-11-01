
angular.module('ukebook')
  .directive('songList', function() {
    return {
      restrict: 'E',
      templateUrl: 'song/songList/songList.template.html',
      controller: 'SongListCtrl',
      link: function($scope, $element, $attributes) {
        $scope.fetchSongList();
      }
    };
  });
