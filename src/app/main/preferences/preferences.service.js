(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:preferences
   * @description
   *   Provides a model of the preferences.
   */
  angular
    .module('app')
    .factory('preferences', preferencesFactory);

  function preferencesFactory () {
    var
      preferences = {},
      // Constants.
      BAR = 'bar',
      PIE = 'pie';

    preferences.pod = {
      list : ['x', 'y', 'z'],
      id : {
        x : { name : 'Weather', type : PIE, metric : 'weather'},
        y : { name : 'Colour',  type : BAR, metric : 'colour' },
        z : { name : 'Speed',   type : PIE, metric : 'speed' }
      }
    };

    return preferences;
  }
})();
