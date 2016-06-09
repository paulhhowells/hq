(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:metrics
   * @description
   *   Provides a model of the metrics.
   */
  angular
    .module('app')
    .factory('metrics', metrics);

  function metrics () {
    return {
      weather : 99,
      colour : 57,
      speed : 33.333
    };
  }
})();
