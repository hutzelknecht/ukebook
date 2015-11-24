import {Song} from 'song';

angular.module('ukebook', ['ngAnimate',
    'ngResource',
    'ngRoute',
    'route-segment',
    'view-segment',
    'ngSanitize',
    'ngTouch',
    'ngLocale',
    'ui.bootstrap',
    'LocalStorageModule'
    ])
  .config(function($routeProvider, $routeSegmentProvider, $httpProvider, tmhDynamicLocaleProvider, localStorageServiceProvider, $translateProvider, dialogsProvider) {

    localStorageServiceProvider.setPrefix('ukebook');

    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $routeSegmentProvider
      .when('/', 'overview')
      .when('/error/:status', 'error')

      .segment('error',{
        templateUrl: 'scripts/error/Error.html',
        controller: 'ErrorCtrl',
        dependencies: ['status']
      })
      .segment('overview',{
        templateUrl: 'scripts/main/Overview.html',
        controller: 'MainCtrl',
        default: true
      });

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  });
