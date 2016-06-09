(function() {
  'use strict';

  /**
   * @ngdoc     controller
   * @name      app.controller:DisplayController
   * @constructs app.controller:DisplayController
   * @requires  {object}  vehicles  The vehicles service
   * @description
   *   The Display Controller.
   **/
  angular
    .module('app')
    .controller('DisplayController', DisplayController);

  DisplayController.$inject = ['$scope', '$interval', 'user', 'settings'];

  function DisplayController ($scope, $interval, user, settings) {

    // View Model.
    var display = this;

    display.title = 'Display';
    display.user = user;
    display.pod = settings.pod;


    $scope.$on('$routeChangeSuccess', function (event) {
      console.log('display $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function (event) {
      console.log('display $viewContentLoaded');
    });
  }
})();
