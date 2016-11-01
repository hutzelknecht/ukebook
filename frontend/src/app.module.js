
angular.module('ukebook', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'route-segment',
    'view-segment',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angularFileUpload'
  ])
  .config(function($rootScopeProvider, $routeProvider, $routeSegmentProvider, $httpProvider) {

    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $routeSegmentProvider
      .when('/', 'overview')
      .when('/song/:id', 'song')
      .when('/songbook', 'songbook')
      .when('/songbook2', 'songbook2')

      .segment('song',{
        templateUrl: 'song/Song.html',
        controller: 'SongCtrl',
        controllerAs: 'songCtrl',
        dependencies: ['id']
      })
      .segment('overview',{
        templateUrl: 'overview.html',
        controller: 'OverviewCtrl',
        controllerAs: 'overviewCtrl',
        default: true
      })
      .segment('songbook', {
        templateUrl: 'songbook.html',
        controller: 'SongbookCtrl',
        controllerAs: 'songbookCtrl'
      })
      .segment('songbook2', {
        templateUrl: 'songbook.html',
        controller: 'SongbookCtrl',
        controllerAs: 'songbookCtrl'
      });

    //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  })
  .run(function($rootScope, $interval, $auth){
    $rootScope.showLoginForm = false;
    $rootScope.toggleLogin = function(){
      $interval(function(){
        $auth.toggleLogin();
      },0,1);
    };
  });
