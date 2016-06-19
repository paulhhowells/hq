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

  DisplayController.$inject = ['$scope', '$interval', 'widget', 'feed', 'user', 'settings', 'api'];

  function DisplayController ($scope, $interval, widget, feed, user, settings, api) {

    // View Model.
    var
      display = this,
      displayList;

    display.title = 'Display';
    display.widget = widget;
    display.feed = feed;
    display.user = user;
    display.pod = settings.pod;


    displayList = widget.displayList.getWithFiller();



    $scope.$on('$routeChangeSuccess', function (event) {
      console.log('display $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function (event) {
      console.log('display $viewContentLoaded');
    });

    function getWidgets () {
      console.log('getWidgets');
      return displayList;
    }

  }
})();
