angular.module('ukebook')
  .controller('PrintPdfCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

    $scope.access_token = $location.search().access_token || $http.defaults.headers.common.Authorization;

    this.print = function(){

      console.log($scope.songId);
      $http({
        url:'/api/Songs/pdf/' + $scope.songId,
        method: 'GET'
      }).then(function(response){
        console.log(response);
      }, function(error){
        console.warn(error);
      });

    };

  }]);
