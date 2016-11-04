"use strict";
angular.module('ukebook')
  .service('containerApi', function($http, $q) {

    this.download = function(url){
      return $q(function(resolve, reject){
        $http.get(url).then(function(res){
          console.log(res);
        });
      });
    };

    return this;
  });
