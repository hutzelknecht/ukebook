"use strict";
angular.module('ukebook')
  .factory('songApi', function($http) {
    var sharedService = {};
    sharedService.list = [];
    sharedService.get = function() {
      return $http.get('/api/song/titles').then(function(response) {
        sharedService.list = response.data;
      }, function() {
        console.warn('failed to fetch song list');
      });
    };
    sharedService.create = function(title) {
      return $http.post('/api/song', {title: title || 'New Song'}, {
        headers: {

        }
      }).then(function(songs) {
        sharedService.get();
      }, function(e) {
        console.warn('failed to create a song');
        console.warn(e.status, e.statusText);
      });
    };
    sharedService.update = function(songId, song) {
      return $http.post('/api/song/' + songId, song).then(function(songs) {
        sharedService.get();
      }, function() {
        console.warn('failed to update a song');
      });
    };
    sharedService.delete = function(id) {
      return $http.delete('/api/song/' + id).then(function(songs) {
        return sharedService.get();
      }, function(e) {
        console.warn('failed to delete song ' + id);
        console.warn(e.status, e.statusText);
      });
    };
    return sharedService;
  });
