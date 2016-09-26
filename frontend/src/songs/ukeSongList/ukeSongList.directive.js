
angular.module('ukebook')
  .directive('ukeSongList', function() {
    return {
      restrict: 'E',
      templateUrl: 'songs/ukeSongList.template.html',
      controller: 'ukeSongListCtrl',
      link: function($scope, $element, $attributes) {
        $scope.fetchSongList();
      }
    };
  });
