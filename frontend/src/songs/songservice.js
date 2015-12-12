angular.module('ukebook')
  .factory('$songs', function($http){

    var sharedService = {};

    sharedService.list = [];

    sharedService.get = function(){
      var fieldsFilter = '?filter[fields][title]=true&filter[fields][id]=true'
      return $http.get('/api/Songs' + fieldsFilter).then(function(songs){
        sharedService.list = songs.data;
      }, function(){
        console.warn('failed to fetch song list');
      });
    };
    sharedService.create = function(){
      return $http.post('/api/Songs', {title: 'bla'}).then(function(songs){
        sharedService.get();
      }, function(){
        console.warn('failed to create a song');
      });
    };
    sharedService.delete = function(id){
      return $http.delete('/api/Songs/' + id).then(function(songs){
        sharedService.get();
      }, function(){
        console.warn('failed to delete song ' + id);
      });
    };

    return sharedService;

  });
