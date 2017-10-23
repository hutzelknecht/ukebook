angular.module('ukebook')
  .config(function($rootScopeProvider, $routeProvider, $locationProvider, $routeSegmentProvider, $httpProvider) {

    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.hashPrefix('');

    $routeSegmentProvider
      .when('/', 'overview')
      .when('/song/:id', 'song')
      .when('/songbook', 'songbook')
      .when('/songbook2', 'songbook2')

      .segment('song',{
        templateUrl: 'song/song.html',
        controller: 'SongCtrl',
        controllerAs: 'songCtrl',
        dependencies: ['id']
      })
      .segment('overview',{
        templateUrl: 'overview/overview.template.html',
        controller: 'OverviewCtrl',
        controllerAs: 'overviewCtrl',
        default: true
      })
      .segment('songbook', {
        templateUrl: 'songs/songbook.template.html',
        controller: 'SongbookCtrl',
        controllerAs: 'songbookCtrl'
      })
      .segment('songbook2', {
        templateUrl: 'songs/songbook.template.html',
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
    $rootScope.twoColumns = true;
  });
