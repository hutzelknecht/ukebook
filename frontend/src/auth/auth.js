angular.module('ukebook')
  .service('$auth',function($cookies, $http, $location){
    var showLoginForm = false;
    var user = null;
    var token = null;
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
      },
      setToken: function(token){
        $cookies.put('ukebook-token', token);
        $http.defaults.headers.common.Authorization = token;
      },
      getToken: function(){
        return $cookies.get('ukebook-token') || $location.search().access_token;
      }
    }
  })
  .controller('AuthCtrl', function($rootScope, $scope, $auth, $http, $cookies, $q, $location, songApi){

    var access_token = null,
      old_token = $cookies.get('ukebook-token') || $location.search().access_token;

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
      var userId = $cookies.get('ukebook-user-id');
      var url = token ? 'api/users/' + userId : 'api/users/login';
      if (credentials.email && credentials.password) {
        $http[method].apply(this, token ? [url] : [url, credentials]).then(function(response){
          if (!response.data.username) {
            this.setToken(response.data.id);
            this.userId = response.data.userId;
          } else {
            this.userId = response.data.id;
          }

          if (!response.data.username) {
            fetchUser(this.userId).then(setUser.bind(this));
          } else {
            setUser.call(this, response);
          }
        }.bind(this), function(){
          // do nothing for now
        }.bind(this));
      } else {
        // in this case everything went ok, but the user is unknown for now
        console.log('auth token set - no new login attempt');
        this.userId = $cookies.get('ukebook-user-id');
        if (this.userId) {
          fetchUser(this.userId).then(setUser.bind(this));
        } else {
          console.log('user unknown, working only with a token');
        }

      }
    };

    setUser.call(this, 1);

    this.logout = function(){
      this.userId = null;
      this.setToken(null);
      songApi.list = [];
      $rootScope.user = null;
    };

    // get old token from cookie
    if (old_token) {
      $http.defaults.headers.common.Authorization = old_token;
      this.login(old_token);
    }

    function setUser(user){
      this.userName = user.username;
      $cookies.put('ukebook-user-id', user.id);
      $auth.setUser(user);
      $rootScope.user = 1; //$auth.getUser();
      return user;
    }

    function fetchUser(id){
      return $q(function(resolve, reject) {
        $http.get('api/users/' + id).then(function (res) {
          resolve(res.data);
        }, reject);
      });
    }

  })
  .directive('login',function(){
    return {
      restrict: 'E',
      templateUrl: 'auth/login.html',
      controllerAs: 'auth',
      controller: 'AuthCtrl'
    }
  });
