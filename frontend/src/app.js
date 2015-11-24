
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

      .segment('song',{
        templateUrl: 'songpage.html',
        controller: 'SongCtrl',
        dependencies: ['id']
      })
      .segment('overview',{
        templateUrl: 'overview.html',
        controller: 'OverviewCtrl',
        default: true
      });

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  });
