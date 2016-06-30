(function() {
  'use strict';

  /**
   * @ngdoc     controller
   * @name      app.controller:MainController
   * @requires  {object}  vehicles  The vehicles service
   * @description
   *   The Main Controller.
   **/
  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$route', '$routeParams', '$location'];

  function MainController ($scope, $route, $routeParams, $location) {
    // A reference to the View Model.
    var main = this;

    main.title = 'Main';

    main.$route = $route;
    main.$location = $location;
    main.$routeParams = $routeParams;

    $scope.$on('$routeChangeSuccess', function(event) {
      //console.log('Main $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function(event) {
      //console.log('Main $viewContentLoaded');
    });
  }
})();
