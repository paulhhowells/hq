(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app.config:routes
   * @description
   *   Routes for the app application.
   */
  angular
    .module('app')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig ($routeProvider, $locationProvider) {
    $routeProvider

      // Route for the Tool view.
      .when('/', {
        templateUrl : '/main/display/display.view.html',
        controllerAs: 'display',
        controller  : 'DisplayController'
      })

      .when('/drilling', {
        templateUrl : '/main/drilling/drilling.view.html',
        controllerAs: 'drilling',
        controller  : 'DrillingController'
      })
      .when('/drilling/:key', {
        templateUrl : '/main/drilling/drilling.view.html',
        controllerAs: 'drilling',
        controller  : 'DrillingController'
      })

      // Route for the Settings view.
      .when('/preferences', {
        templateUrl : '/main/preferences/preferences.view.html',
        controllerAs: 'preferences',
        controller  : 'PreferencesController'
      })

      .otherwise({
        redirectTo: '/'
      });

    // Do not use the HTML5 History API.
    $locationProvider.html5Mode(false);

    // $locationProvider.html5Mode({
    //   enabled: true,
    //
    // // Will not work in IE9, and seems to struggle when app is not at route.
    //   requireBase: false
    // });
  }
})();
