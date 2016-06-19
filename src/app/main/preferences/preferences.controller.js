(function() {
  'use strict';

  // todo: rename preferences

  /**
   * @ngdoc     controller
   * @name      app.controller:PreferencesController
   * @requires  {object}  feed  The feed service
   * @description
   *   The Preferences Controller.
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
