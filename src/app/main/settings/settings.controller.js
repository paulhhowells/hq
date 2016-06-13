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


  SettingsController.$inject = ['$scope', 'feed', 'widget', 'user'];

  function SettingsController ($scope, feed, widget, user) {

    // View Model.
    var vm = this;

    vm.title = 'Settings';
    vm.feed = feed;
    vm.widget = widget;
    vm.user = user;

    $scope.$on('$routeChangeSuccess', function(event) {
      console.log('Settings $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function(event) {
      console.log('Settings $viewContentLoaded');
    });
  }
})();
