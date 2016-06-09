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

      // Route for the Settings view.
      .when('/settings', {
        templateUrl : '/main/settings/settings.view.html',
        controllerAs: 'settings',
        controller  : 'SettingsController'
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
