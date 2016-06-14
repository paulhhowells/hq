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

  DisplayController.$inject = ['$scope', '$interval', 'widget', 'feed', 'user', 'settings'];

  function DisplayController ($scope, $interval, widget, feed, user, settings) {

    // View Model.
    var display = this;

    display.title = 'Display';
    display.widget = widget;
    display.feed = feed;
    display.user = user;
    display.pod = settings.pod;

    var filler = [
      { display : 'filler' },
      { display : 'filler' },
      { display : 'filler' }
    ];
    var displayList = [].concat(widget.displayList.get(), filler);

    display.getWidgets = function () {
      console.log('getWidgets');
      return displayList;
    };

    $scope.$on('$routeChangeSuccess', function (event) {
      console.log('display $routeChangeSuccess');
    });

    $scope.$on('$viewContentLoaded', function (event) {
      console.log('display $viewContentLoaded');
    });
  }
})();
