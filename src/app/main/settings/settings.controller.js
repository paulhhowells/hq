(function() {
  'use strict';

  /**
   * @ngdoc     controller
   * @name      app.controller:SettingsController
   * @requires  {object}  vehicles  The vehicles service
   * @description
   *   The Settings Controller.
   **/
  angular
    .module('app')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'user'];

  function SettingsController ($scope, user) {

    // View Model.
    var vm = this;

    vm.title = 'Settings';
    vm.user = user;

    $scope.$on('$routeChangeSuccess', function(event) {
      console.log('Settings $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function(event) {
      console.log('Settings $viewContentLoaded');
    });
  }
})();
