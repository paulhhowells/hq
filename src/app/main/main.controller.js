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
    var vm = this;

    vm.title = 'Main';

    vm.$route = $route;
    vm.$location = $location;
    vm.$routeParams = $routeParams;

    $scope.$on('$routeChangeSuccess', function(event) {
      //console.log('Main $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function(event) {
      //console.log('Main $viewContentLoaded');
    });
  }
})();
