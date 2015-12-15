angular.module('ukebook')
  .service('$auth',function(){
    var showLoginForm = false;
    var user = null;
    return {
      toggleLogin: function(){
        return showLoginForm = !showLoginForm;
      },
      isLoginFormVisible: function(){
        return showLoginForm;
      },
      setUser: function(newUser){
        user = newUser;
      },
      getUser: function(){
        return user;
      }
    }
  })
  .controller('AuthCtrl',function($rootScope, $scope, $auth, $http, $cookies){

    var access_token = null,
      old_token= $cookies.get('ukebook-token');

    this.$auth = $auth;
    this.loginEmail = null;
    this.loginPassword = null;
    this.allowLogin = false;

    this.setToken = function(token){
      access_token = token;
      $cookies.put('ukebook-token', token);
      $http.defaults.headers.common.Authorization = token;
    };

    this.login = function(token){
      var credentials = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      var method = token ? 'get' : 'post';
      var url = token ? 'api/users/' + $cookies.get('ukebook-user-id') : 'api/users/login'; //weiter hier !!!
      $http[method].apply(this, token ? [url] : [url,credentials]).then(function(response){
        if (!response.data.username) {
          this.setToken(response.data.id);
          this.userId = response.data.userId;
        } else {
          this.userId = response.data.id;
        }
        var setUser = function(res){
          var user = res.data;
          this.userName = user.username;
          $cookies.put('ukebook-user-id', user.id);
          $auth.setUser(user);
          $rootScope.user = $auth.getUser();
        }.bind(this);
        if (!response.data.username) {
          $http.get('api/users/'+ this.userId).then(function(res){
            setUser(res);
          }.bind(this));
        } else {
          setUser(response);
        }
      }.bind(this));
    };

    this.logout = function(){
      this.userId = null;
      this.setToken(null);
    };

    // get old token from cookie
    if (old_token) {
      $http.defaults.headers.common.Authorization = old_token;
      this.login(old_token);
    }

  })
  .directive('login',function(){
    return {
      restrict: 'E',
      templateUrl: 'auth/login.html',
      controllerAs: 'auth',
      controller: 'AuthCtrl',
      link: function($scope, $element, $attributes){


      }
    }
  });
