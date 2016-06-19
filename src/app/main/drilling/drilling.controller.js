(function() {
  'use strict';

  /**
   * @ngdoc     controller
   * @name      app.controller:DrillingController
   * @constructs app.controller:DrillingController
   * @requires  {object}  $routeParams  $routeParams
   * @description
   *   The Drilling Controller.
   **/
  angular
    .module('app')
    .controller('DrillingController', DrillingController);

  DrillingController.$inject = ['$routeParams'];

  function DrillingController ($routeParams) {
    var drilling = this;

    console.log('DrillingController');

    drilling.title = 'Drilling down';

    drilling.key = $routeParams.key;

    console.log('routeParams', $routeParams);
  }
})();
