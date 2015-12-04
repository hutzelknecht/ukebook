
angular.module('ukebook', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'route-segment',
    'view-segment',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function($routeProvider, $routeSegmentProvider, $httpProvider) {

    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $routeSegmentProvider
      .when('/', 'overview')
      .when('/song/:id', 'song')
      .when('/songbook', 'songbook')

      .segment('song',{
        templateUrl: 'songpage.html',
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
      });

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  });
