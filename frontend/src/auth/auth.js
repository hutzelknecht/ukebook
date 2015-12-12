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
  .controller('AuthCtrl',function($rootScope, $scope, $auth, $http){

    var access_token = null;

    this.$auth = $auth;
    this.loginEmail = null;
    this.loginPassword = null;
    this.allowLogin = false;

    this.setToken = function(token){
      access_token = token;
      $http.defaults.headers.common.Authorization = token;
    };

    this.login = function(){
      var credentials = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      $http.post('api/users/login',credentials).then(function(response){
        this.setToken(response.data.id);
        this.userId = response.data.userId;
        $http.get('api/users/'+ this.userId).then(function(response){
          var user = response.data;
          this.userName = user.username;
          $auth.setUser(user);
          $rootScope.user = $auth.getUser();
        }.bind(this));
      }.bind(this));
    };

    this.logout = function(){
      this.userId = null;
      this.setToken(null);
    };

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
