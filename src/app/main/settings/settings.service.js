(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:settings
   * @description
   *   Provides a model of the settings.
   */
  angular
    .module('app')
    .factory('settings', settings);

  function settings () {
    var
      settings = {},
      // Constants.
      BAR = 'bar',
      PIE = 'pie';

    settings.pod = {
      list : ['x', 'y', 'z'],
      id : {
        x : { name : 'Weather', type : PIE, metric : 'weather'},
        y : { name : 'Colour',  type : BAR, metric : 'colour' },
        z : { name : 'Speed',   type : PIE, metric : 'speed' }
      }
    };

    return settings;
  }
})();
