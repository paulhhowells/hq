(function() {
  'use strict';

  /**
   * @ngdoc     controller
   * @name      app.controller:PreferencesController
   * @requires  {object}  $scope  $scope
   * @requires  {object}  feed  The feed service
   * @requires  {object}  widget  The widget service
   * @description
   *   Controller for the Preferences view.
   **/
  angular
    .module('app')
    .controller('PreferencesController', PreferencesController);

  PreferencesController.$inject = ['$scope', 'feed', 'widget', 'user'];

  function PreferencesController ($scope, feed, widget, user) {

    // View Model.
    var vm = this;

    vm.title = 'Preferences';
    vm.feed = feed;
    vm.widget = widget;
    vm.user = user;

    $scope.$on('$routeChangeSuccess', function(event) {
      console.log('Preferences $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function(event) {
      console.log('Preferences $viewContentLoaded');
    });
  }
})();
