(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.service:time
   * @description
   *   Provides a service for asking the time.
   */
  angular
    .module('app')
    .factory('time', timeService)
    .constant('TODAY', 'TODAY')
    .constant('YESTERDAY', 'YESTERDAY');

  timeService.$inject = ['$filter', 'TODAY', 'YESTERDAY'];

  function timeService ($filter, TODAY, YESTERDAY) {
    var
      timeService = {
        get : get,

        // Constants.
        TODAY : TODAY,
        YESTERDAY : YESTERDAY
      },
      format = 'yyyy-MM-dd',
      dayMilliseconds = 24 * 60 * 60 * 1000;

    return timeService;

    function get (day) {
      var
        time,
        timeStampMilliseconds;

      timeStampMilliseconds = Date.now(); //new Date();

      if (day === YESTERDAY) {
        timeStampMilliseconds -= dayMilliseconds;
      }

      time = $filter('date')(timeStampMilliseconds, format);

      return time;
    }
  }
})();
